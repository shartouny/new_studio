// Packages
import React from "react"
import "../../style/slider.css"

function Slider(props) {
  const { onChange, value, min, max, step, defaultValue, unit, viewedValue } =
    props
  return (
    <div className="flex space-x-3 items-center justify-center">
      <input
        className="slider"
        defaultValue={defaultValue}
        max={max}
        min={min}
        onChange={onChange}
        step={step}
        type="range"
        value={value}
      />
      <span className="w-10">
        {viewedValue}
        {unit}
      </span>
    </div>
  )
}
export default Slider
