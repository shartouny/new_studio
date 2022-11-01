//Packages
import React, { useEffect, useRef, useState } from "react"

//Assets
import { ReactComponent as BringToFront } from "@Assets/toolbarIcons/bringToFront.svg"
import { ReactComponent as BringForward } from "@Assets/toolbarIcons/bringForward.svg"
import { ReactComponent as SendBackward } from "@Assets/toolbarIcons/sendBackward.svg"
import { ReactComponent as SendToBack } from "@Assets/toolbarIcons/sendToBack.svg"
import { ReactComponent as PositionIcon } from "@Assets/toolbarIcons/position.svg"

function Position(props) {
  const { horizontalHover, handleMouseOut, handleMouseOver, handleClickIcon } =
    props
  const [hover, setHover] = useState(-1)
  const ref = useRef()
  const [openDropDown, setOpenDropDown] = useState(false)

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
        onMouseOver={() => handleMouseOver("position")}
      >
        <PositionIcon className=" fill-selected cursor-pointer" />
        <div
          className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
            horizontalHover === "position"
              ? `text-purple2B3377`
              : `text-transparent`
          }`}
        >
          <div className="relative top-6">Position</div>
        </div>
      </div>
      {openDropDown && (
        <div className="bg-white z-50 w-12 absolute  rounded-b-md pt-2">
          <div className="flex justify-center flex-col items-center space-y-3">
            <div>
              {hover === 0 && (
                <div className="absolute left-14 w-32 rounded-md px-2 text-purple2B3377  bg-white ">
                  Bring to Front
                </div>
              )}
              <BringToFront
                className="cursor-pointer"
                onClick={() => handleDropDownIconClick("bringToFront")}
                onMouseOut={() => handleChangeMouseOver(-1)}
                onMouseOver={() => handleChangeMouseOver(0)}
              />
            </div>
            <div>
              {hover === 1 && (
                <div className="absolute left-14 w-32 rounded-md px-2 text-purple2B3377  bg-white ">
                  Bring Forward
                </div>
              )}
              <BringForward
                className="cursor-pointer"
                onClick={() => handleDropDownIconClick("bringForward")}
                onMouseOut={() => handleChangeMouseOver(-1)}
                onMouseOver={() => handleChangeMouseOver(1)}
              />
            </div>

            <div>
              {hover === 2 && (
                <div className="absolute left-14 w-32 rounded-md px-2 text-purple2B3377  bg-white ">
                  Send Backward
                </div>
              )}
              <SendBackward
                className="cursor-pointer"
                onClick={() => handleDropDownIconClick("sendBackward")}
                onMouseOut={() => handleChangeMouseOver(-1)}
                onMouseOver={() => handleChangeMouseOver(2)}
              />
            </div>

            <div>
              {hover === 3 && (
                <div className="absolute left-14 w-28 rounded-md px-2 text-purple2B3377  bg-white ">
                  Send to Back
                </div>
              )}
              <SendToBack
                className="mb-2 cursor-pointer"
                onClick={() => handleDropDownIconClick("sendToBack")}
                onMouseOut={() => handleChangeMouseOver(-1)}
                onMouseOver={() => handleChangeMouseOver(3)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Position
