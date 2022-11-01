//Packages
import React from "react"

//Assets
import { ReactComponent as UndoIcon } from "@Assets/toolbarIcons/HistoryElement/undo.svg"

function Undo(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    canvas,
    historyClick
  } = props
  return (
    <div
      className="mx-2 flex flex-col justify-center items-center "
      onClick={() => canvas.undo()}
      onMouseOut={() => handleMouseOut("undo")}
      onMouseOver={() => handleMouseOver("undo")}
    >
      <UndoIcon
        className={`${
          historyClick === 0 ? "fill-gray" : "fill-selected cursor-pointer"
        }   z-10`}
      />
      <div
        className={` absolute   font-Rubik text-xs font-medium text-center  ${
          horizontalHover === "undo" && historyClick !== 0
            ? `text-purple2B3377 cursor-pointer`
            : `text-transparent`
        }`}
      >
        <div className="relative top-6">Undo</div>
      </div>
    </div>
  )
}

export default Undo
