import React, { useEffect, useState } from "react";
import BoardItem from "./BoardItem";
import AddNew from "./AddNew";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "react-modal";
import { ItemType } from "./Board";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import * as api from "../../api";
import "./Board.css";

Modal.setAppElement("#root");

interface Props {
  index: number;
  column: { id: string; title: string; items: string[] };
  allItems: ItemType | null;
  handleAddCard: (title: string, columnId: string) => void;
  handleDeleteCard: (cardId: string, columnId: string) => Promise<void>;
  handleDeleteColumn: (columnId: string, cards: string[]) => void;
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(23, 37, 42, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

enum ModalType {
  DeleteColumn = "DeleteColumn",
  ChangeTitle = "ChangeTitle",
}

const BoardColumn: React.FC<Props> = ({
  column,
  allItems,
  index,
  handleAddCard,
  handleDeleteCard,
  handleDeleteColumn,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [addCard, setAddCard] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [columnTitle, setColumnTitle] = useState(column.title);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const params = useParams();
  const { id, title, items: columnItems } = column;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCancelColumn = async () => {
    const { data } = await api.deleteColumn(params.board_id!, column.id);
    handleDeleteColumn(column.id, data.cards);
  };

  const handleChangeTitleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (newColumnTitle.length === 0) return;

    await api.changeColumnTitle(params.board_id!, column.id, newColumnTitle);
    setColumnTitle(newColumnTitle);
    setNewColumnTitle("");
    setModalType(null);
  };

  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <div
            className="board_column rounded w-64 p-2 mr-2 bg-col_background flex flex-col"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <div className="text-center flex" {...provided.dragHandleProps}>
              <div className="flex justify-start items-center grow">
                {columnTitle}
              </div>

              <div className="">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      setModalType(ModalType.ChangeTitle);
                      setAnchorEl(null);
                    }}
                  >
                    Change Title
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setModalType(ModalType.DeleteColumn);
                      setAnchorEl(null);
                    }}
                  >
                    Delete Column
                  </MenuItem>
                </Menu>
              </div>
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

      <Modal
        ariaHideApp={false}
        isOpen={modalType !== null}
        style={customStyles}
      >
        {modalType === ModalType.DeleteColumn ? (
          <>
            <div className="mb-3">
              Are you sure you want to delete the column "column {title}"?
            </div>
            <Stack
              spacing={1}
              direction="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={handleCancelColumn}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={() => setModalType(null)}
                style={{
                  color: "rgb(58, 175, 169)",
                  borderColor: "rgb(58, 175, 169)",
                }}
              >
                Cancel
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <form onSubmit={handleChangeTitleSubmit}>
              <input
                type="text"
                placeholder="New column title"
                className="w-72 mb-3"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
              />

              <Stack
                spacing={1}
                direction="row"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: "rgb(58, 175, 169)" }}
                  // onClick={handleChangeTitleSubmit}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setModalType(null)}
                  style={{
                    color: "rgb(58, 175, 169)",
                    borderColor: "rgb(58, 175, 169)",
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </form>
          </>
        )}
      </Modal>
    </>
  );
};

export default BoardColumn;
