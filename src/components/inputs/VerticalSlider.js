// Packages
import React from "react"
import "../../style/verticalSlider.css"

function VerticalSlider(props) {
  const { onChange, value, min, max, step, unit } = props
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="h-48">
        <div className="relative top-20">
          <input
            className="sliderVertical cursor-pointer transform rotate-90"
            max={max}
            min={min}
            onChange={onChange}
            orient="vertical"
            step={step}
            type="range"
            value={value}
          />
        </div>
      </div>
      <span className="w-full   text-purple2B3377 p-1 font-Rubik text-xs font-medium text-center">
        {value}
        {unit}
      </span>
    </div>
  )
}

export default VerticalSlider
