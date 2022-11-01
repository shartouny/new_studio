//Packages
import React, { useEffect, useRef, useState } from "react"

//Assets
import { ReactComponent as ColorPickerIcon } from "@Assets/toolbarIcons/TextElement/ColorPicker.svg"

//Component
import ColorPickerTable from "@Components/inputs/ColorPicker"

function ColorPicker(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    handleChangeColor,
    colorValue
  } = props
  const ref = useRef()
  const [openPicker, setOpenPicker] = useState(false)

  const handlePickerClick = () => {
    setOpenPicker(true)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (openPicker && ref.current && !ref.current.contains(e.target)) {
        setOpenPicker(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [openPicker])

  return (
    <div>
      <div
        className="mx-4 flex flex-col justify-center items-center  "
        onClick={handlePickerClick}
        onMouseOut={() => handleMouseOut("textColor")}
        onMouseOver={() => handleMouseOver("textColor")}
      >
        <ColorPickerIcon className="fill-gray hover:fill-selected cursor-pointer   z-50" />
        <div className="absolute  ">
          <div
            className="top-3 relative  h-1.5 w-6 rounded-md"
            style={{ background: colorValue }}
          >
            &nbsp;
          </div>
        </div>
        <div
          className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
            horizontalHover === "textColor"
              ? `text-purple2B3377`
              : `text-transparent`
          }`}
        >
          <div className="relative top-6">Color</div>
          {openPicker && (
            <div className="relative top-32 z-50" ref={ref}>
              <ColorPickerTable
                color={colorValue}
                handleColorChange={(color) => handleChangeColor(color)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
