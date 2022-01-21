import React, { useEffect, useState } from "react";
import Item from "./Item";
import AddNew from "./AddNew";
import { ItemType } from "./HomepageBoard";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  column: { id: string; title: string; items: string[] };
  allItems: ItemType | null;
  handleAddCard: (title: string, columnId: string) => void;
}

const Column: React.FC<Props> = ({
  column,
  allItems,
  index,
  handleAddCard,
}) => {
  const [addCard, setAddCard] = useState(false);

  const { id, title, items: columnItems } = column;

  useEffect(() => {}, []);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="droppable relative rounded w-44 p-2 mr-2 bg-col_background flex flex-col"
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
          {!addCard ? (
            <div
              className="mt-1 cursor-pointer"
              onClick={() => setAddCard(true)}
            >
              + Add a card
            </div>
          ) : (
            <AddNew
              handleAddCard={handleAddCard}
              cancelAdd={() => {
                setAddCard(false);
              }}
              columnId={column.id}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Column;
