import React, { useEffect, useState } from "react";
import BoardItem from "./BoardItem";
import AddNew from "./AddNew";
import { ItemType } from "./Board";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./Board.css";

interface Props {
  index: number;
  column: { id: string; title: string; items: string[] };
  allItems: ItemType | null;
  handleAddCard: (title: string, columnId: string) => void;
  handleDeleteCard: (cardId: string, columnId: string) => Promise<void>;
}

const BoardColumn: React.FC<Props> = ({
  column,
  allItems,
  index,
  handleAddCard,
  handleDeleteCard,
}) => {
  const [addCard, setAddCard] = useState(false);

  const { id, title, items: columnItems } = column;

  useEffect(() => {}, []);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="board_column rounded w-64 p-2 mr-2 bg-col_background flex flex-col"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div className="text-center" {...provided.dragHandleProps}>
            {title}
          </div>
          <Droppable droppableId={id}>
            {(provided) => (
              <div
                className="overflow-auto"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {columnItems.length === 0 && <div className="h-1"></div>}
                {columnItems.map((itemId, index) => (
                  <BoardItem
                    key={itemId}
                    id={itemId}
                    columnId={column.id}
                    index={index}
                    item={allItems && allItems[itemId]}
                    handleDeleteCard={handleDeleteCard}
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

export default BoardColumn;
