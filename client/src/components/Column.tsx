import React, { useEffect } from "react";
import Item from "./Item";
import { ItemType, ColumnType } from "./HomepageBoard";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  column: { id: string; title: string; items: string[] };
  allItems: ItemType | null;
}

const Column: React.FC<Props> = ({ column, allItems }) => {
  const { id, title, items: columnItems } = column;

  useEffect(() => {}, []);

  const addCard = () => {
    console.log("addcard");
  };

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          className="droppable rounded w-48 p-2 mr-2 bg-col_background flex flex-col"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="text-center">{title}</div>
          <div className="overflow-auto grow">
            {columnItems.map((itemId, index) => (
              <Item
                key={itemId}
                id={itemId}
                index={index}
                item={allItems && allItems[itemId]}
              />
            ))}
            {provided.placeholder}
          </div>
          <div className="mt-1 cursor-pointer" onClick={addCard}>
            + Add a card
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Column;
