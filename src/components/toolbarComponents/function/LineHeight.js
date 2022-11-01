//Packages
import React, { useEffect, useRef, useState } from "react"

//Assets
import { ReactComponent as LineHeightIcon } from "@Assets/toolbarIcons/TextElement/LineHeight.svg"

//Components
import VerticalSlider from "@Components/inputs/VerticalSlider"

function LineHeight(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    handleLineHeight,
    textStyle
  } = props

  const ref = useRef()

  const [openDropDown, setOpenDropDown] = useState(false)

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
    <div className="w-12 h-16" ref={ref}>
      <div
        className=" h-16  flex flex-col justify-center items-center"
        onClick={handleDropDownClick}
        onMouseOut={() => handleMouseOut("lineHeight")}
        onMouseOver={() => handleMouseOver("lineHeight")}
      >
        <LineHeightIcon className="fill-selected cursor-pointer z-50" />
        <div
          className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
            horizontalHover === "lineHeight"
              ? `text-purple2B3377`
              : `text-transparent`
          }`}
        >
          <div className="relative top-6">Line Height</div>
        </div>
      </div>
      {openDropDown && (
        <div className="bg-white z-50 w-12 absolute  rounded-b-md pt-2">
          <div className="flex justify-center flex-col items-center space-y-3">
            <div>
              <VerticalSlider
                defaultValue={1.4}
                max={2.5}
                min={0.5}
                onChange={(e) => handleLineHeight(e.target.value)}
                step={0.1}
                unit={""}
                value={textStyle.lineSpacing}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LineHeight
