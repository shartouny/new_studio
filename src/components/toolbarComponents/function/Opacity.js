//Packages
import React, { useEffect, useRef, useState } from "react"

//Assets
import { ReactComponent as OpacityIcon } from "@Assets/toolbarIcons/opacity.svg"

//Components
import VerticalSlider from "@Components/inputs/VerticalSlider"

function Opacity(props) {
  const {
    horizontalHover,
    handleMouseOut,
    handleMouseOver,
    handleOpacityChange,
    opacity
  } = props
  const [openDropDown, setOpenDropDown] = useState(false)
  const ref = useRef()

  const handleDropDownClick = () => {
    setOpenDropDown((prev) => !prev)
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
        onMouseOver={() => handleMouseOver("opacity")}
      >
        <OpacityIcon className="fill-selected cursor-pointer" />
        <div
          className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
            horizontalHover === "opacity"
              ? `text-purple2B3377`
              : `text-transparent`
          }`}
        >
          <div className="relative top-6">Opacity</div>
        </div>
      </div>
      {openDropDown && (
        <div className="bg-white z-50 w-12 absolute  rounded-b-md pt-2">
          <div className="flex justify-center flex-col items-center space-y-3">
            <div>
              <VerticalSlider
                max={100}
                min={0}
                onChange={handleOpacityChange}
                step={1}
                unit={"%"}
                // defaultValue={0}
                value={opacity}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Opacity
