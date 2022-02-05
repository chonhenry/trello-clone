import React, { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import LabelIcon from "@mui/icons-material/Label";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckIcon from "@mui/icons-material/Check";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useParams } from "react-router-dom";
import * as api from "../../api";

interface Props {
  id: string;
  loading: boolean;
  description: string;
  title: string;
  label: string;
  labelColors: string[];
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setLabel: React.Dispatch<React.SetStateAction<string>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBox: React.FC<Props> = ({
  id,
  loading,
  title,
  label,
  labelColors,
  description,
  setTitle,
  setModalOpen,
  setLabel,
  setDescription,
}) => {
  const [textareaOnFocus, setTextareaOnFocus] = useState(false);
  const params = useParams();

  const changeLabel = async (color: string) => {
    if (color === label) {
      setLabel("");
      await api.changeCardLabel(id, "");
    } else {
      setLabel(color);
      await api.changeCardLabel(id, color);
    }

    await api.updateDate(params.board_id!);
  };

  const renderLabels = () => {
    return labelColors.map((color) => (
      <div
        className="w-full h-7 mb-1 rounded hover:cursor-pointer text-white text-center"
        key={color}
        style={{ backgroundColor: color }}
        onClick={() => changeLabel(color)}
      >
        {label === color && <CheckIcon />}
      </div>
    ));
  };

  const saveDescription = async () => {
    await api.changeCardDescription(id, description);
    await api.updateDate(params.board_id!);
  };

  const deleteCard = async () => {
    const { data } = await api.deleteCard(id);
    console.log(data);
  };

  return (
    <div className="bg-red- p-6 relative" style={{ width: "770px" }}>
      <div
        className="absolute top-3 right-3 p-1 cursor-pointer hover:bg-col_background rounded-full"
        onClick={() => setModalOpen(false)}
      >
        <CloseIcon />
      </div>

      <div
        className="absolute bottom-3 right-3 p-1 cursor-pointer hover:bg-col_background rounded-full"
        onClick={() => deleteCard()}
      >
        <DeleteForeverIcon />
      </div>

      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <div className="flex mb-2">
            <div className="mr-1 pt-1">
              <SubtitlesIcon />
            </div>
            <div className="grow">
              <div className="font-bold text-2xl">
                <input
                  className="pl-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => {
                    api.changeCardTitle(id, title);
                    api.updateDate(params.board_id!);
                  }}
                />
              </div>
              {/* <div className="ml-2">in column</div> */}
            </div>
          </div>

          <div className="flex">
            <div className="w-3/4 bg-red-30 mr-3">
              <div className="mb-1">
                <DescriptionIcon /> <span className="ml-1">Description</span>
              </div>
              <textarea
                className="mb-2 w-full h-80 rounded bg-col_background"
                style={{ resize: "none", border: "none" }}
                onFocus={() => setTextareaOnFocus(true)}
                onBlur={() => {
                  setTextareaOnFocus(false);
                  saveDescription();
                }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {textareaOnFocus && (
                <button
                  className="bg-green py-2 px-4 text-white rounded"
                  onClick={() => saveDescription()}
                >
                  Save
                </button>
              )}
            </div>

            <div className="w-1/4 ">
              <div className="mb-1">
                <LabelIcon /> Labels
              </div>

              {renderLabels()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModalBox;
