//packages
import React from "react"

function SettingsColor(props) {
  const { allColors, handleChangeElementColor, elementSelectedColor } = props

  return (
    <div className=" m-3 flex justify-start flex-wrap items-center">
      {allColors &&
        allColors.map((color, index) => (
          <div
            className={`rounded-full flex items-center justify-center h-8 w-8 mx-2 cursor-pointer  ${
              elementSelectedColor === index ? ` border-black border-2` : ``
            } `}
            key={index}
            onClick={() => {
              handleChangeElementColor(index, color)
            }}
          >
            <div
              className="rounded-full h-6 w-6 border border-grayC4C4C4 "
              style={{
                backgroundColor: color.r
                  ? `rgb(${color.r},${color.g},${color.b},${color.a})`
                  : color
              }}
            ></div>
          </div>
        ))}
    </div>
  )
}

export default SettingsColor
