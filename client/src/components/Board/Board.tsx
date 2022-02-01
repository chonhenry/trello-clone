import React, { useState, useEffect } from "react";
import isLoggedIn from "../../utils/isLoggedIn";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import BoardColumn from "./BoardColumn";
import AddNew from "./AddNew";
import "./Board.css";

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
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!isLoggedIn()) navigate("/");
  //   }, [navigate]);

  //   useEffect(() => {
  //     const items_qty = 15;
  //     let itms: ItemType = {};

  //     const titles = [];

  //     for (let i = 0; i < items_qty; i++) {
  //       titles.push(`Task ${i + 1}`);
  //     }

  //     for (let i = 0; i < items_qty; i++) {
  //       const id = uuidv4();
  //       const new_item = {
  //         id,
  //         content: titles[i],
  //       };

  //       itms[id] = new_item;
  //     }

  //     setItems(itms);

  //     let col1Items = [];
  //     let col2Items = [];
  //     let col3Items = [];

  //     for (const key in itms) {
  //       let n = parseInt(itms[key].content.split(" ")[1]);

  //       if (n <= 4) col1Items.push(itms[key].id);
  //       else if (n <= 7) col2Items.push(itms[key].id);
  //       else col3Items.push(itms[key].id);
  //     }

  //     const col1 = {
  //       id: uuidv4(),
  //       title: "Open",
  //       items: col1Items,
  //     };

  //     const col2 = {
  //       id: uuidv4(),
  //       title: "In Progress",
  //       items: col2Items,
  //     };

  //     const col3 = {
  //       id: uuidv4(),
  //       title: "Done",
  //       items: col3Items,
  //     };

  //     setColumnsOrder([col1.id, col2.id, col3.id]);

  //     setColumns({
  //       [col1.id]: col1,
  //       [col2.id]: col2,
  //       [col3.id]: col3,
  //     });
  //   }, []);

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
    // console.log("columns:", columns);
    // console.log("onDragEnd:", result);

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

  const handleAddColumn = (title: string) => {
    const id = uuidv4();
    const newCol = {
      id,
      title,
      items: [],
    };

    setColumnsOrder((prev) => [...prev, id]);

    setColumns((prev) => ({ ...prev, [id]: newCol }));

    setAddColumn(false);
  };

  const handleAddCard = (content: string, columnId: string) => {
    console.log(content);
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
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board w-full flex p-3">
        <Droppable droppableId={"home"} direction="horizontal" type="column">
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
      </div>
    </DragDropContext>
  );
};

export default Board;
