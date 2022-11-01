//Packages
import React from "react"

//Assets
import { ReactComponent as Divider } from "@Assets/toolbarIcons/divider.svg"

function Colors(props) {
  const { allColors, handleChangeElementColor, elementSelectedColor } = props

  return (
    <div className="   flex  h-full  justify-center items-center">
      {allColors &&
        allColors.map((color, index) => (
          <div
            className={`rounded-full flex items-center justify-center h-7 w-7 mx-2 cursor-pointer  ${
              elementSelectedColor === index ? ` border-black border-2` : ``
            } `}
            key={index}
            onClick={() => handleChangeElementColor(index, color)}
          >
            <div
              className="rounded-full h-5 w-5 border border-grayC4C4C4 "
              style={{
                backgroundColor: color.r
                  ? `rgb(${color.r},${color.g},${color.b},${color.a})`
                  : color
              }}
            ></div>
          </div>
        ))}

      {allColors && allColors.length != 0 && <Divider className="mx-2" />}
    </div>
  )
}

export default Colors
