//Packages
import React from "react"

//Assets
import { ReactComponent as ArrowDown } from "@Assets/toolbarIcons/TextElement/arrowDown.svg"

function FontFamily(props) {
  const { viewSettings, fontFamily, settingsFunctionality } = props
  return (
    <div
      className="mx-2 flex justify-center items-center h-16 cursor-pointer"
      onClick={() => viewSettings("fontFamily")}
    >
      <div
        className={`border rounded-md py-1 w-52 ${
          settingsFunctionality === "fontFamily"
            ? "border-purple2B3377"
            : "border-grayC4C4C4 "
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="mx-2 h-6 overflow-hidden text-purple2B3377 font-Rubik font-medium">
            {fontFamily}
          </span>
          <ArrowDown className="fill-selected mx-2 " />
        </div>
      </div>
    </div>
  )
}

export default FontFamily
