import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useModal } from "../../hooks/useModal";
import { useCard } from "../../hooks/useCard";
import Modal from "react-modal";
import ModalBox from "./ModalBox";
import * as api from "../../api";

interface Props {
  id: string;
  index: number;
  item: {
    id: string;
    content: string;
  } | null;
}

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(23, 37, 42, 0.2)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
};

const BoardItem: React.FC<Props> = ({ id, index, item }) => {
  const { cardId, setCardId } = useCard();
  const [title, setTitle] = useState<string>(item!.content);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const { data: card } = await api.getCard(id);
        console.log(card);
        setDescription(card.description);
        setLabel(card.label);
        // setLabel(card.label);
        setLoading(false);
      } catch (error) {}
    };

    fetchCard();
  }, [id]);

  return (
    item && (
      <>
        <Draggable draggableId={item.id} index={index}>
          {(provided) => (
            <div
              className="bg-card_background rounded p-1 mt-2 max-h-14 overflow-hidden"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div onClick={() => setModalOpen(true)}>{title}</div>
            </div>
          )}
        </Draggable>

        <Modal
          ariaHideApp={false}
          isOpen={modalOpen}
          // isOpen={cardId.length > 0 && cardId === id}
          style={customStyles}
        >
          <ModalBox
            title={title}
            description={description}
            label={label}
            loading={loading}
            setDescription={setDescription}
            setLabel={setLabel}
            setTitle={setTitle}
            setModalOpen={setModalOpen}
            id={id}
          />
        </Modal>
      </>
    )
  );
};

export default BoardItem;
