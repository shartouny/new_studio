//Packages
import React from "react"

//Assets
import { ReactComponent as FilterIcon } from "@Assets/toolbarIcons/BackgroundElement/filter.svg"

function Filter(props) {
  const { horizontalHover, handleMouseOver, handleMouseOut, viewSettings } =
    props
  return (
    <div
      className="mx-4 flex flex-col justify-center items-center "
      onClick={() => viewSettings("filters")}
      onMouseOut={() => handleMouseOut("filters")}
      onMouseOver={() => handleMouseOver("filters")}
    >
      <FilterIcon className=" fill-selected cursor-pointer z-10" />
      <div
        className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
          horizontalHover === "filters"
            ? `text-purple2B3377`
            : `text-transparent`
        }`}
      >
        <div className="relative top-6">Filters</div>
      </div>
    </div>
  )
}

export default Filter
