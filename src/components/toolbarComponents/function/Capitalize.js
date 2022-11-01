//Packages
import React from "react"

//Assets
import { ReactComponent as CapitalizeIcon } from "@Assets/toolbarIcons/TextElement/capitalize.svg"

function Capitalize(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    handleCapitalize,
    textStyle
  } = props
  return (
    <div
      className="  flex flex-col justify-center items-center"
      onClick={() => handleCapitalize()}
      onMouseOut={() => handleMouseOut("capitalize")}
      onMouseOver={() => handleMouseOver("capitalize")}
    >
      <div
        className={`${
          textStyle.capitalize ? "rounded-md bg-grayF0F0F0" : ""
        } mx-1  p-2 w-10 flex justify-center`}
      >
        <CapitalizeIcon className=" fill-selected cursor-pointer z-50" />
      </div>
      <div
        className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
          horizontalHover === "capitalize"
            ? `text-purple2B3377`
            : `text-transparent`
        }`}
      >
        <div className="relative top-6">Capitalize</div>
      </div>
    </div>
  )
}

export default Capitalize
