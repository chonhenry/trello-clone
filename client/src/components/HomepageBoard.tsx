import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Column from "./Column";

export interface ItemType {
  [id: string]: { id: string; content: string };
}

export interface ColumnType {
  [id: string]: { id: string; title: string; items: string[] };
}

const HomepageBoard: React.FC = () => {
  const [items, setItems] = useState<ItemType | null>(null);
  const [columns, setColumns] = useState<ColumnType>({});

  useEffect(() => {
    const items_qty = 10;
    let itms: ItemType = {};

    for (let i = 1; i <= items_qty; i++) {
      const id = uuidv4();
      const new_item = {
        id,
        content: `item ${i}`,
      };

      itms[id] = new_item;
    }

    setItems(itms);

    let col1Items = [];
    let col2Items = [];

    for (const key in itms) {
      let n = parseInt(itms[key].content.split(" ")[1]);

      if (n <= 4) col1Items.push(itms[key].id);
      else col2Items.push(itms[key].id);
    }

    const col1 = {
      id: uuidv4(),
      title: "column 1",
      items: col1Items,
    };

    const col2 = {
      id: uuidv4(),
      title: "column 2",
      items: col2Items,
    };

    setColumns({
      [col1.id]: col1,
      [col2.id]: col2,
    });
  }, []);

  const renderColumns = () => {
    return Object.values(columns).map((col, index) => (
      <Column key={col.id} column={col} index={index} allItems={items} />
    ));
  };

  const onDragEnd = (result: DropResult) => {
    // console.log("columns:", columns);
    console.log("onDragEnd:", result);

    const startIndex = result.source.index;
    const startColumnId = result.source.droppableId;
    const finishIndex = result.destination?.index;
    const finishColumnId = result.destination?.droppableId;
    const itemId = result.draggableId;

    // console.log("startIndex:", startIndex);
    // console.log("startColumnId:", startColumnId);
    // console.log("finishIndex:", finishIndex);
    // console.log("finishColumnId:", finishColumnId);

    if (finishColumnId === undefined || finishIndex === undefined) return;

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

  return (
    <div
      className="main mb-12 flex p-3 xl:mr-24 xl:mb-0 bg-cool_gray/50"
      style={{ height: "537px", width: "700px" }}
    >
      <DragDropContext onDragEnd={onDragEnd}>{renderColumns()}</DragDropContext>
      <div>
        <div className="cursor-pointer bg-col_background/70 rounded p-2">
          + Add a column
        </div>
      </div>
    </div>
  );
};

export default HomepageBoard;
