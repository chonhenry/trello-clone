import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useModal } from "../../hooks/useModal";
import { useCard } from "../../hooks/useCard";

interface Props {
  id: string;
  index: number;
  item: {
    id: string;
    content: string;
  } | null;
}

const BoardItem: React.FC<Props> = ({ id, index, item }) => {
  const { setModalOpen } = useModal();
  const { setCardId } = useCard();

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
            <div
              onClick={() => {
                setCardId(id);
                setModalOpen(true);
              }}
            >
              {item?.content}
            </div>
          </div>
        )}
      </Draggable>
    )
  );
};

export default BoardItem;
