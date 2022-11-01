//Packages
import React from "react"
import { ChromePicker } from "react-color"
import "../../style/colorpicker.css"

const ColorPicker = (props) => {
  const { color, handleColorChange } = props

  return (
    <>
      <ChromePicker color={color} onChange={handleColorChange} />
    </>
  )
}

export default ColorPicker
