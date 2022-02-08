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
import * as api from "../../api";
import "./Board.css";

Modal.setAppElement("#root");

interface Props {
  index: number;
  column: { id: string; title: string; items: string[] };
  allItems: ItemType | null;
  handleAddCard: (title: string, columnId: string) => void;
  handleDeleteCard: (cardId: string, columnId: string) => Promise<void>;
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

const BoardColumn: React.FC<Props> = ({
  column,
  allItems,
  index,
  handleAddCard,
  handleDeleteCard,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addCard, setAddCard] = useState(false);

  const { id, title, items: columnItems } = column;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeTitle = () => {
    console.log("handleChangeTitle");
    setAnchorEl(null);
  };

  const handleCancelColumn = async () => {
    console.log("handleCancelColumn");
    const { data } = await api.deleteColumn(column.id);
    console.log(data);
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
                {title}
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
                  <MenuItem onClick={handleChangeTitle}>Change Title</MenuItem>
                  <MenuItem
                    onClick={() => {
                      setConfirmDelete(true);
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

      <Modal ariaHideApp={false} isOpen={confirmDelete} style={customStyles}>
        <div className="mb-3">
          Are you sure you want to delete the column "column name"?
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
            onClick={() => setConfirmDelete(false)}
            style={{
              color: "rgb(58, 175, 169)",
              borderColor: "rgb(58, 175, 169)",
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default BoardColumn;
