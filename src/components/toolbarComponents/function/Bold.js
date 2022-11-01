//Packages
import React from "react"

//Assets
import { ReactComponent as BoldIcon } from "@Assets/toolbarIcons/TextElement/bold.svg"

function Bold(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    handleBold,
    textStyle
  } = props
  return (
    <div
      className="flex flex-col justify-center items-center "
      onClick={() => handleBold("bold")}
      onMouseOut={() => handleMouseOut("bold")}
      onMouseOver={() => handleMouseOver("bold")}
    >
      <div
        className={`${
          textStyle.fontWeight ? "rounded-md bg-grayF0F0F0" : ""
        } mx-1  p-2 w-10 flex justify-center`}
      >
        <BoldIcon className=" fill-selected cursor-pointer z-50" />
      </div>
      <div
        className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
          horizontalHover === "bold" ? `text-purple2B3377` : `text-transparent`
        }`}
      >
        <div className="relative top-6">Bold</div>
      </div>
    </div>
  )
}

export default Bold
