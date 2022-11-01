//Packages
import React from "react"

//Components
import Filter from "@Components/toolbarComponents/function/Filter"
import Effect from "@Components/toolbarComponents/function/Effect"

function BackgroundToolbar(props) {
  const {
    // canvas,
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    settingsFunctionality,
    viewSettings
    // handleOpacityChange,
    // opacity,
    // handleClickIcon
  } = props
  return (
    <div className="flex justify-center items-center   h-16 ">
      <Effect
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
        settingsFunctionality={settingsFunctionality}
        viewSettings={viewSettings}
      />

      <Filter
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
        settingsFunctionality={settingsFunctionality}
        viewSettings={viewSettings}
      />

      {/* <Crop
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
      /> */}

      {/* <Flip
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
        handleClickIcon={handleClickIcon}
      />
      <Opacity
        handleMouseOut={handleMouseOut}
        handleMouseOver={handleMouseOver}
        horizontalHover={horizontalHover}
        handleOpacityChange={handleOpacityChange}
        opacity={opacity}
      /> */}
    </div>
  )
}

export default BackgroundToolbar
