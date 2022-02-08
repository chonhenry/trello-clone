import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useCard } from "../../hooks/useCard";
import Modal from "react-modal";
import ModalBox from "./ModalBox";
import * as api from "../../api";

interface Props {
  id: string;
  index: number;
  columnId: string;
  item: {
    id: string;
    content: string;
  } | null;
  handleDeleteCard: (cardId: string, columnId: string) => Promise<void>;
}

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(23, 37, 42, 0.7)",
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

const labelColors = [
  "#61bd4f",
  "#f2d600",
  "#ff9f1a",
  "#eb5a46",
  "#c377e0",
  "#00c2e0",
  "#ff78cb",
  "#b3bac5",
  "#344563",
];

const BoardItem: React.FC<Props> = ({
  id,
  index,
  item,
  columnId,
  handleDeleteCard,
}) => {
  const [title, setTitle] = useState<string>(item!.content);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [label, setLabel] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const { data: card } = await api.getCard(id);
        setDescription(card.description);
        setLabel(card.label);
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
              {label && (
                <div
                  className="rounded w-12 h-3"
                  style={{ background: `${label}` }}
                ></div>
              )}
              <div onClick={() => setModalOpen(true)}>{title}</div>
            </div>
          )}
        </Draggable>

        <Modal ariaHideApp={false} isOpen={modalOpen} style={customStyles}>
          <ModalBox
            title={title}
            description={description}
            label={label}
            loading={loading}
            setDescription={setDescription}
            setLabel={setLabel}
            setTitle={setTitle}
            setModalOpen={setModalOpen}
            labelColors={labelColors}
            id={id}
            handleDeleteCard={handleDeleteCard}
            columnId={columnId}
          />
        </Modal>
      </>
    )
  );
};

export default BoardItem;
