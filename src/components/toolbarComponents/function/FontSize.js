//Packages
import React from "react"

//Assets
import { ReactComponent as ArrowUp } from "@Assets/toolbarIcons/TextElement/arrowUp.svg"
import { ReactComponent as ArrowDown } from "@Assets/toolbarIcons/TextElement/arrowDown.svg"

function FontSize(props) {
  const { handleFontSize, textStyle } = props

  const incremantNumber = () => {
    handleFontSize(parseInt(textStyle.fontSize) + 1)
  }
  const decremantNumber = (e) => {
    if (e.target.value !== 0) handleFontSize(parseInt(textStyle.fontSize) - 1)
  }
  const handleInputChange = (e) => {
    if (e.target.value >= 0 && e.target.value <= 600)
      handleFontSize(e.target.value)
  }

  return (
    <div className="mx-2 h-full   flex justify-center items-center">
      <div className="border border-grayC4C4C4 rounded-md py-1">
        <div className="flex justify-between items-center">
          <span className="mx-2 text-purple2B3377 font-Rubik font-medium">
            <input
              className="w-7 text-center outline-none"
              onChange={handleInputChange}
              type="number"
              value={textStyle.fontSize}
            />
          </span>
          <div className="flex justify-center items-center flex-col mx-2">
            <ArrowUp
              className="fill-selected  my-1 cursor-pointer"
              onClick={incremantNumber}
            />
            <ArrowDown
              className="fill-selected my-1 cursor-pointer"
              onClick={decremantNumber}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FontSize
