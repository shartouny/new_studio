//packages
import React from "react"

//Assets
import { ReactComponent as CropIcon } from "@Assets/toolbarIcons/BackgroundElement/crop.svg"

function Crop(props) {
  const { horizontalHover, handleMouseOver, handleMouseOut } = props
  return (
    <div
      className="mx-4 flex flex-col justify-center items-center "
      onMouseOut={() => handleMouseOut("crop")}
      onMouseOver={() => handleMouseOver("crop")}
    >
      <CropIcon className=" fill-selected cursor-pointer z-50" />
      <div
        className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
          horizontalHover === "crop" ? `text-purple2B3377` : `text-transparent`
        }`}
      >
        <div className="relative top-6">Crop</div>
      </div>
    </div>
  )
}

export default Crop
