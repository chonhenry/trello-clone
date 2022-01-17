import React, { useEffect } from "react";
import Item from "./Item";
import { ItemType } from "./HomepageBoard";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  column: { id: string; title: string; items: string[] };
  allItems: ItemType | null;
}

const Column: React.FC<Props> = ({ column, allItems, index }) => {
  const { id, title, items: columnItems } = column;

  useEffect(() => {}, []);

  const addCard = () => {
    console.log("addcard");
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="droppable rounded w-48 p-2 mr-2 bg-col_background flex flex-col"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="text-center" {...provided.dragHandleProps}>
            {title}
          </div>
          <Droppable droppableId={id}>
            {(provided) => (
              <div
                className="grow overflow-auto"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
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
            )}
          </Droppable>
          <div className="mt-1 cursor-pointer" onClick={addCard}>
            + Add a card
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
