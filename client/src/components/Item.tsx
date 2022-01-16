import React, { useEffect } from "react";
import { Draggable, DropResult, DragStart } from "react-beautiful-dnd";

interface Props {
  id: string;
  index: number;
  item: {
    id: string;
    content: string;
  } | null;
}

const Item: React.FC<Props> = ({ id, index, item }) => {
  return (
    item && (
      <Draggable draggableId={item.id} index={index}>
        {(provided) => (
          <div
            className="bg-card_background rounded p-1 mt-2 max-h-14 overflow-hidden"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {item?.content}
          </div>
        )}
      </Draggable>
    )
  );
};
export default Item;
