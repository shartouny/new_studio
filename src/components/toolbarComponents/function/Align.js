//Packages
import React, { useEffect, useRef, useState } from "react"

//Assets
import { ReactComponent as AlignIcon } from "@Assets/toolbarIcons/align.svg"
import { ReactComponent as HorizontalAlignLeft } from "@Assets/toolbarIcons/horizontalAlignLeft.svg"
import { ReactComponent as HorizontalAlignCenter } from "@Assets/toolbarIcons/horizontalAlignCenter.svg"
import { ReactComponent as HorizontalAlignRight } from "@Assets/toolbarIcons/horizontalAlignRight.svg"
import { ReactComponent as VerticalAlignTop } from "@Assets/toolbarIcons/verticalAlignTop.svg"
import { ReactComponent as VerticalAlignCenter } from "@Assets/toolbarIcons/verticalAlignCenter.svg"
import { ReactComponent as VerticalAlignBottom } from "@Assets/toolbarIcons/verticalAlignBottom.svg"

function Align(props) {
  const { horizontalHover, handleMouseOut, handleMouseOver, handleClickIcon } =
    props
  const [hover, setHover] = useState(-1)
  const [openDropDown, setOpenDropDown] = useState(false)
  const ref = useRef()

  const handleChangeMouseOver = (index) => {
    setHover(index)
  }
  const handleDropDownClick = () => {
    setOpenDropDown((prev) => !prev)
    setHover(-1)
  }

  const handleDropDownIconClick = (functionality) => {
    setOpenDropDown(false)
    handleClickIcon(functionality)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (openDropDown && ref.current && !ref.current.contains(e.target)) {
        setOpenDropDown(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [openDropDown])

  return (
    <div className="w-12" ref={ref}>
      <div
        className="  flex flex-col justify-center items-center   "
        onClick={handleDropDownClick}
        onMouseOut={handleMouseOut}
        onMouseOver={() => handleMouseOver("align")}
      >
        <AlignIcon className="fill-selected cursor-pointer" />

        <div
          className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
            horizontalHover === "align"
              ? `text-purple2B3377`
              : `text-transparent`
          }`}
        >
          <div className="relative top-6">Align</div>
        </div>
      </div>
      {openDropDown && (
        <div className="bg-white z-50 w-12 absolute  rounded-b-md  pt-2">
          <div className="flex justify-center flex-col items-center space-y-3">
            <div>
              {hover === 0 && (
                <div className="absolute left-14 w-44 rounded-md px-2 text-purple2B3377  bg-white ">
                  Horizontal Align Left
                </div>
              )}
              <HorizontalAlignLeft
                className="cursor-pointer"
                onClick={() => handleDropDownIconClick("horizontalAlignLeft")}
                onMouseOut={() => handleChangeMouseOver(-1)}
                onMouseOver={() => handleChangeMouseOver(0)}
              />
            </div>
            <div>
              {hover === 1 && (
                <div className="absolute left-14 w-48 rounded-md px-2 text-purple2B3377  bg-white ">
                  Horizontal Align Center
                </div>
              )}
              <HorizontalAlignCenter
                className="cursor-pointer"
                onClick={() => handleDropDownIconClick("horizontalAlignCenter")}
                onMouseOut={() => handleChangeMouseOver(-1)}
                onMouseOver={() => handleChangeMouseOver(1)}
              />
            </div>

            <div>
              {hover === 2 && (
                <div className="absolute left-14 w-44 rounded-md px-2 text-purple2B3377  bg-white ">
                  Horizontal Align Right
                </div>
              )}
              <HorizontalAlignRight
                className="cursor-pointer"
                onClick={() => handleDropDownIconClick("horizontalAlignRight")}
                onMouseOut={() => handleChangeMouseOver(-1)}
                onMouseOver={() => handleChangeMouseOver(2)}
              />
            </div>

            <div>
              {hover === 3 && (
                <div className="absolute left-14 w-36 rounded-md px-2 text-purple2B3377  bg-white ">
                  Vertical Align Top
                </div>
              )}
              <VerticalAlignTop
                className="cursor-pointer"
                onClick={() => handleDropDownIconClick("verticalAlignTop")}
                onMouseOut={() => handleChangeMouseOver(-1)}
                onMouseOver={() => handleChangeMouseOver(3)}
              />
            </div>

            <div>
              {hover === 4 && (
                <div className="absolute left-14 w-44 rounded-md px-2 text-purple2B3377  bg-white ">
                  Vertical Align Center
                </div>
              )}
              <VerticalAlignCenter
                className="cursor-pointer"
                onClick={() => handleDropDownIconClick("verticalAlignCenter")}
                onMouseOut={() => handleChangeMouseOver(-1)}
                onMouseOver={() => handleChangeMouseOver(4)}
              />
            </div>

            <div>
              {hover === 5 && (
                <div className="absolute left-14 w-44  rounded-md px-2 text-purple2B3377  bg-white ">
                  Vertical Align Bottom
                </div>
              )}
              <VerticalAlignBottom
                className="mb-2 cursor-pointer"
                onClick={() => handleDropDownIconClick("verticalAlignBottom")}
                onMouseOut={() => handleChangeMouseOver(-1)}
                onMouseOver={() => handleChangeMouseOver(5)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Align
