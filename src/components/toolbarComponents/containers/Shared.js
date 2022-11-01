//packages
import React from "react"

//Components
import Position from "@Components/toolbarComponents/function/Position"
import Opacity from "@Components/toolbarComponents/function/Opacity"
import Align from "@Components/toolbarComponents/function/Align"
import Flip from "@Components/toolbarComponents/function/Flip"

//Assets
import { ReactComponent as Divider } from "@Assets/toolbarIcons/divider.svg"

function SharedToolbar(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    opacity,
    handleOpacityChange,
    handleClickIcon
  } = props
  return (
    <div className="flex justify-center items-center   h-16 ">
      <Align
        handleClickIcon={handleClickIcon}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
      />

      <Flip
        handleClickIcon={handleClickIcon}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
      />
      <Position
        handleClickIcon={handleClickIcon}
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
      />

      <Opacity
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        handleOpacityChange={handleOpacityChange}
        horizontalHover={horizontalHover}
        opacity={opacity}
      />

      <Divider />
    </div>
  )
}

export default SharedToolbar
