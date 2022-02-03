import React, { useState } from "react";
import { useModal } from "../../hooks/useModal";
import CloseIcon from "@mui/icons-material/Close";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import LabelIcon from "@mui/icons-material/Label";
import DescriptionIcon from "@mui/icons-material/Description";

const ModalBox: React.FC = () => {
  const { setModalOpen } = useModal();
  const [textareaOnFocus, setTextareaOnFocus] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const renderLabels = () => {
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

    return labelColors.map((color) => (
      <div
        className="w-full h-7 mb-1 rounded hover:cursor-pointer"
        key={color}
        style={{ backgroundColor: color }}
      ></div>
    ));
  };

  return (
    <div className="bg-red- p-6 relative" style={{ width: "770px" }}>
      <div
        className="absolute top-1 right-1 p-1 cursor-pointer hover:bg-col_background rounded-full"
        onClick={() => setModalOpen(false)}
      >
        <CloseIcon />
      </div>

      <div className="flex mb-2">
        <div className="mr-2 pt-1">
          <SubtitlesIcon />
        </div>
        <div className="grow">
          <div className="font-bold text-2xl">
            <input
              className="pl-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => console.log("title onblur")}
            />
          </div>
          <div className="ml-2">in column</div>
        </div>
      </div>

      <div className="flex">
        <div className="w-3/4 bg-red-30 mr-3">
          <div className="mb-1">
            <DescriptionIcon /> Description
          </div>
          <textarea
            className="mb-2 w-full h-80 bg-col_background"
            style={{ resize: "none", border: "none" }}
            onFocus={() => setTextareaOnFocus(true)}
            onBlur={() => setTextareaOnFocus(false)}
          />
          {textareaOnFocus && (
            <button className="bg-green py-2 px-4 text-white rounded">
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
    </div>
  );
};

export default ModalBox;
