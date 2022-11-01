//Pcakages
import React from "react"

//Assets
import { ReactComponent as UnderlineIcon } from "@Assets/toolbarIcons/TextElement/underline.svg"

function Underline(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    handleUnderLine,
    textStyle
  } = props
  return (
    <div
      className=" flex flex-col justify-center items-center"
      onClick={() => handleUnderLine("underline")}
      onMouseOut={() => handleMouseOut("underline")}
      onMouseOver={() => handleMouseOver("underline")}
    >
      <div
        className={`${
          textStyle.underline ? "rounded-md bg-grayF0F0F0" : ""
        } mx-1  p-2 w-10 flex justify-center`}
      >
        <UnderlineIcon className=" fill-selected cursor-pointer z-50" />
      </div>{" "}
      <div
        className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
          horizontalHover === "underline"
            ? `text-purple2B3377`
            : `text-transparent`
        }`}
      >
        <div className="relative top-6">Underline</div>
      </div>
    </div>
  )
}

export default Underline
