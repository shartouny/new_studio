//Packages
import React from "react"

//Assets
import { ReactComponent as RedoIcon } from "@Assets/toolbarIcons/HistoryElement/redo.svg"

function Redo(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    canvas,
    historyClick,
    historyCount
  } = props
  return (
    <div
      className="mx-2 flex flex-col justify-center items-center "
      onClick={() => (historyClick === historyCount ? "" : canvas.redo())}
      onMouseOut={() => handleMouseOut("redo")}
      onMouseOver={() => handleMouseOver("redo")}
    >
      <RedoIcon
        className={`${
          historyClick === historyCount
            ? "fill-gray"
            : "fill-selected cursor-pointer"
        }   z-10`}
      />
      <div
        className={` absolute   font-Rubik text-xs font-medium text-center  ${
          horizontalHover === "redo" && historyClick !== historyCount
            ? `text-purple2B3377 cursor-pointer`
            : `text-transparent`
        }`}
      >
        <div className="relative top-6">Redo</div>
      </div>
    </div>
  )
}

export default Redo
