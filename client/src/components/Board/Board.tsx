import React, { useState, useEffect } from "react";
import isLoggedIn from "../../utils/isLoggedIn";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import { useModal } from "../../hooks/useModal";
import BoardColumn from "./BoardColumn";
import AddNew from "./AddNew";
import ModalBox from "./ModalBox";
import Modal from "react-modal";
import * as api from "../../api";
import "./Board.css";

export interface ItemType {
  [id: string]: { id: string; content: string };
}

export interface ColumnType {
  [id: string]: { id: string; title: string; items: string[] };
}

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(23, 37, 42, 0.7)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    // width: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
};

const Board: React.FC = () => {
  const [items, setItems] = useState<ItemType | null>(null);
  const [columns, setColumns] = useState<ColumnType>({});
  const [columnsOrder, setColumnsOrder] = useState<string[]>([]);
  const [addColumn, setAddColumn] = useState(false);
  const [boardLoading, setBoardLoading] = useState(true);
  const navigate = useNavigate();
  const params = useParams();
  const { modalOpen, setModalOpen } = useModal();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/");
  }, [navigate]);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const { data: cards } = await api.getCardsTitle(params.board_id!);
        const itemsState: ItemType = {};

        cards.forEach((card: any) => {
          itemsState[card._id] = {
            id: card._id,
            content: card.title,
          };
        });

        setItems(itemsState);

        const { data: board } = await api.getBoard(params.board_id!);
        const { columns } = board;
        const order = columns.map((column: any) => column._id);
        setColumnsOrder(order);

        let cols: ColumnType = {};
        columns.forEach((column: any) => {
          const col = {
            id: column._id,
            title: column.title,
            items: column.cards,
          };

          cols[column._id] = col;
        });
        setColumns(cols);

        setBoardLoading(false);
      } catch (error) {}
    };

    loadBoard();
  }, [params.board_id]);

  const renderColumns = () => {
    return columnsOrder.map((colId, index) => (
      <BoardColumn
        key={colId}
        column={columns[colId]}
        index={index}
        allItems={items}
        handleAddCard={handleAddCard}
      />
    ));
  };

  const onDragEnd = (result: DropResult) => {
    const startIndex = result.source.index;
    const startColumnId = result.source.droppableId;
    const finishIndex = result.destination?.index;
    const finishColumnId = result.destination?.droppableId;
    const itemId = result.draggableId;
    const type = result.type;

    if (finishColumnId === undefined || finishIndex === undefined) return;

    if (type === "column") {
      let newColumnsOrder = [...columnsOrder];

      newColumnsOrder.splice(startIndex, 1);
      newColumnsOrder.splice(finishIndex, 0, itemId);

      setColumnsOrder(newColumnsOrder);

      return;
    }

    if (startColumnId === finishColumnId) {
      const column = { ...columns[startColumnId] };
      const items = [...column.items];

      items.splice(startIndex, 1);
      items.splice(finishIndex, 0, itemId);

      const newColumns: ColumnType = {
        ...columns,
        [startColumnId]: {
          id: startColumnId,
          title: column.title,
          items,
        },
      };

      setColumns(newColumns);
    } else {
      const startColumn = { ...columns[startColumnId] };
      const startItems = [...startColumn.items];
      const finishColumn = { ...columns[finishColumnId] };
      const finishItems = [...finishColumn.items];

      startItems.splice(startIndex, 1);
      finishItems.splice(finishIndex, 0, itemId);

      const newColumns: ColumnType = {
        ...columns,
        [startColumnId]: {
          id: startColumnId,
          title: startColumn.title,
          items: startItems,
        },
        [finishColumnId]: {
          id: finishColumnId,
          title: finishColumn.title,
          items: finishItems,
        },
      };

      setColumns(newColumns);
    }
  };

  const handleAddColumn = async (title: string) => {
    const id = uuidv4();
    const newCol = {
      id,
      title,
      items: [],
    };

    setColumnsOrder((prev) => [...prev, id]);

    setColumns((prev) => ({ ...prev, [id]: newCol }));

    setAddColumn(false);

    try {
      await api.addColumn(params.board_id!, id, title);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCard = async (content: string, columnId: string) => {
    const id = uuidv4();

    const newCard = {
      id,
      content,
    };

    setItems((prev) => ({ ...prev, [id]: newCard }));

    const column = { ...columns[columnId] };
    const colItems = [...column.items, id];

    setColumns((prev) => ({
      ...prev,
      [columnId]: { ...prev[columnId], items: colItems },
    }));

    try {
      api.addCard(content, params.board_id!, columnId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board w-full flex p-3 overflow-auto">
        {boardLoading ? (
          <div>loading your board...</div>
        ) : (
          <>
            <Droppable
              droppableId={"home"}
              direction="horizontal"
              type="column"
            >
              {(provided) => (
                <div
                  className="flex content-star items-start"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {renderColumns()}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div className="">
              {!addColumn ? (
                <div
                  className="cursor-pointer bg-col_background/70 rounded p-2 w-44"
                  onClick={() => setAddColumn(true)}
                >
                  + Add a column
                </div>
              ) : (
                <div className="bg-col_background rounded p-2">
                  <AddNew
                    handleAddColumn={handleAddColumn}
                    cancelAdd={() => {
                      setAddColumn(false);
                    }}
                  />
                </div>
              )}
            </div>

            <Modal ariaHideApp={false} isOpen={modalOpen} style={customStyles}>
              <ModalBox />
            </Modal>
          </>
        )}
      </div>
    </DragDropContext>
  );
};

export default Board;
