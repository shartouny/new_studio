//Packages
import React from "react"

//Components
import Undo from "@Components/toolbarComponents/function/Undo"
import Redo from "@Components/toolbarComponents/function/Redo"

function HistoryToolbar(props) {
  const {
    canvas,
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    historyClick,
    historyCount
  } = props
  return (
    <div className="flex justify-start items-center   h-full ">
      <Undo
        canvas={canvas}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        historyClick={historyClick}
        historyCount={historyCount}
        horizontalHover={horizontalHover}
      />

      <Redo
        canvas={canvas}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        historyClick={historyClick}
        historyCount={historyCount}
        horizontalHover={horizontalHover}
      />
    </div>
  )
}

export default HistoryToolbar
