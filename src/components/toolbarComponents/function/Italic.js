//Packages
import React from "react"

//Assets
import { ReactComponent as ItalicIcon } from "@Assets/toolbarIcons/TextElement/italic.svg"

function Italic(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    handleItalic,
    textStyle
  } = props
  return (
    <div
      className=" flex flex-col justify-center items-center"
      onClick={() => handleItalic("italic")}
      onMouseOut={() => handleMouseOut("italic")}
      onMouseOver={() => handleMouseOver("italic")}
    >
      <div
        className={`${
          textStyle.fontStyle ? "rounded-md bg-grayF0F0F0" : ""
        } mx-1  p-2 w-10 flex justify-center`}
      >
        <ItalicIcon className=" fill-selected cursor-pointer z-50" />
      </div>
      <div
        className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
          horizontalHover === "italic"
            ? `text-purple2B3377`
            : `text-transparent`
        }`}
      >
        <div className="relative top-6">Italic</div>
      </div>
    </div>
  )
}

export default Italic
