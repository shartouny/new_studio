//Packages
import React, { useEffect, useRef } from "react"

//Assets
import { ReactComponent as CustomColor } from "../../assets/icons/customColor.svg"
import { ReactComponent as CustomColor2 } from "../../assets/icons/customColor2.svg"

//Components
import ColorPicker from "@Components/inputs/ColorPicker"

function ColorPickerButton(props) {
  const {
    handleOpenColorPicker,
    openColorPicker,
    color,
    handleColorChange,
    className,
    type
  } = props
  const ref = useRef(null)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (openColorPicker && ref.current && !ref.current.contains(e.target)) {
        handleOpenColorPicker(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [openColorPicker])

  return (
    <div>
      {type === "primary" ? (
        <CustomColor className={className} onClick={handleOpenColorPicker} />
      ) : (
        <CustomColor2 className={className} onClick={handleOpenColorPicker} />
      )}
      {openColorPicker && (
        <div className="  absolute   z-50">
          <div className="relative left-14 bottom-14 bg-red-500">
            <div className="  w-full  " ref={ref}>
              <ColorPicker
                color={color}
                handleColorChange={handleColorChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPickerButton
