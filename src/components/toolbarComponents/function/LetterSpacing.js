//Packages
import React, { useEffect, useRef, useState } from "react"

//Components
import VerticalSlider from "@Components/inputs/VerticalSlider"

//Assets
import { ReactComponent as LetterSpacingIcon } from "@Assets/toolbarIcons/TextElement/LetterSpacing.svg"

function LetterSpacing(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    handleLetterSpacing,
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
    <div className="w-12 mx-2  " ref={ref}>
      <div
        className="  flex flex-col justify-center items-center"
        onClick={() => handleDropDownClick()}
        onMouseOut={() => handleMouseOut("letterSpacing")}
        onMouseOver={() => handleMouseOver("letterSpacing")}
      >
        <LetterSpacingIcon className="fill-selected cursor-pointer z-50" />

        <div
          className={`  absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
            horizontalHover === "letterSpacing"
              ? `text-purple2B3377`
              : `text-transparent`
          }`}
        >
          <div className="relative  top-6">Letter Spacing</div>
        </div>
      </div>
      {openDropDown && (
        <div className="bg-white z-50 w-12 absolute  rounded-b-md pt-2">
          <div className="flex justify-center flex-col items-center space-y-3">
            <div>
              <VerticalSlider
                defaultValue={0}
                max={800}
                min={-200}
                onChange={(e) => handleLetterSpacing(e.target.value)}
                step={1}
                unit={""}
                value={textStyle.letterSpacing}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LetterSpacing
