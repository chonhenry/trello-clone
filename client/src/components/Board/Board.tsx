import React, { useState, useEffect } from "react";
import isLoggedIn from "../../utils/isLoggedIn";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import BoardColumn from "./BoardColumn";
import AddNew from "./AddNew";
import * as api from "../../api";
import "./Board.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import Stack from "@mui/material/Stack";

export interface ItemType {
  [id: string]: { id: string; content: string };
}

export interface ColumnType {
  [id: string]: { id: string; title: string; items: string[] };
}

const Board: React.FC = () => {
  const [items, setItems] = useState<ItemType | null>(null);
  const [columns, setColumns] = useState<ColumnType>({});
  const [columnsOrder, setColumnsOrder] = useState<string[]>([]);
  const [addColumn, setAddColumn] = useState(false);
  const [boardLoading, setBoardLoading] = useState(true);
  const [deleteTable, setDeleteTable] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

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
        handleDeleteCard={handleDeleteCard}
        handleDeleteColumn={handleDeleteColumn}
      />
    ));
  };

  const onDragEnd = async (result: DropResult) => {
    const startIndex = result.source.index;
    const startColumnId = result.source.droppableId;
    const finishIndex = result.destination?.index;
    const finishColumnId = result.destination?.droppableId;
    const itemId = result.draggableId;
    const type = result.type;

    if (finishColumnId === undefined || finishIndex === undefined) return;

    // drag and drop column
    if (type === "column") {
      let newColumnsOrder = [...columnsOrder];

      newColumnsOrder.splice(startIndex, 1);
      newColumnsOrder.splice(finishIndex, 0, itemId);

      setColumnsOrder(newColumnsOrder);
      await api.saveColumnsOrder(
        params.board_id!,
        startIndex,
        finishIndex,
        itemId
      );
      return;
    }

    // drag and drop card
    if (startColumnId === finishColumnId) {
      // card is dropped on the same column
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

      await api.saveCardsOrderSameColumn(
        params.board_id!,
        startIndex,
        finishIndex,
        startColumnId,
        itemId
      );
    } else {
      // card is dropped on a different column
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

      const { data } = await api.saveCardsOrderDifferentColumn(
        params.board_id!,
        startIndex,
        finishIndex,
        startColumnId,
        finishColumnId,
        itemId
      );

      console.log(data);
    }
  };

  const handleDeleteColumn = (columnId: string, cards: string[]) => {
    const newColumns = { ...columns };
    delete newColumns[columnId];
    setColumnsOrder((prev) => prev.filter((id) => id !== columnId));
    setColumns(newColumns);

    const newItems = { ...items };
    cards.forEach((card) => {
      delete newItems[card];
    });
    setItems(newItems);
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
    try {
      const { data } = await api.addCard(content, params.board_id!, columnId);
      const id = data.card_id;

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
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCard = async (cardId: string, columnId: string) => {
    try {
      const newItems = { ...items };
      delete newItems[cardId];
      setItems(newItems);

      const newColumns = { ...columns };
      newColumns[columnId].items = newColumns[columnId].items.filter(
        (item) => item !== cardId
      );
      setColumns(newColumns);

      await api.deleteCard(cardId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBoard = async () => {
    const { data } = await api.deleteBoard(params.board_id!);

    console.log(data);
    navigate("/");
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
            <div className="mr-2">
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

            <div>
              <Stack direction="row" spacing={2}>
                {!deleteTable ? (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => setDeleteTable(true)}
                  >
                    Delete Board
                  </Button>
                ) : (
                  <div>
                    <Button
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      color="error"
                      style={{ marginRight: "6px" }}
                      onClick={() => handleDeleteBoard()}
                    >
                      confirm delete
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<CancelIcon />}
                      style={{
                        borderColor: "rgb(58, 175, 169)",
                        backgroundColor: "rgb(58, 175, 169)",
                      }}
                      onClick={() => setDeleteTable(false)}
                    >
                      cancel
                    </Button>
                  </div>
                )}
              </Stack>
            </div>
          </>
        )}
      </div>
    </DragDropContext>
  );
};

export default Board;
