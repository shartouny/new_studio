//Packages
import React, { useState } from "react"

//Components
import ElementsContainer from "@Components/toolbarComponents/containers/Elements"
import TextContainer from "@Components/toolbarComponents/containers/Text"
import SharedContainer from "@Components/toolbarComponents/containers/Shared"
import BackgroundContainer from "@Components/toolbarComponents/containers/Background"
import DefaultContainer from "@Components/toolbarComponents/containers/Default"
import HistoryContainer from "@Components/toolbarComponents/containers/History"

//utils
import {
  handleDuplicate,
  handleOpacity,
  handleDelete,
  handleAlignment,
  handleFlip,
  handlePosition,
  handleLock
} from "@Utils/topBarTools/commonComponents/CommonComponent"

function ToolBar(props) {
  const {
    canvas,
    allColors,
    selectedTabIndex,
    handleChangeElementColor,
    elementSelectedColor,
    viewElementsBar,
    viewSettings,
    fontFamily,
    settingsFunctionality,
    viewTextBar,
    textStyle,
    setTextStyle,
    sharedStyling,
    setSharedStyling,
    lastBackgroundImage,
    viewDefaultbar,
    historyClick,
    historyCount,
    setTextFormate,
    textFormate
  } = props
  const [horizontalHover, setHorizontalHover] = useState(-1)
  const [isFlipSelected, setIsFlipSelected] = useState({
    flipX: true,
    flipY: true
  })
  const handleMouseOut = () => {
    setHorizontalHover(-1)
  }
  const handleMouseOver = (name) => {
    setHorizontalHover(name)
  }

  const handleClickIcon = (functionality) => {
    if (functionality === "flipHorizontal")
      handleFlip(canvas, "flipY", isFlipSelected, setIsFlipSelected)
    else if (functionality === "flipVertical")
      handleFlip(canvas, "flipX", isFlipSelected, setIsFlipSelected)
    else if (functionality === "delete") handleDelete(canvas)
    else if (functionality === "horizontalAlignLeft")
      handleAlignment(canvas, "alignLeft")
    else if (functionality === "horizontalAlignCenter")
      handleAlignment(canvas, "centerHorizontaly")
    else if (functionality === "horizontalAlignRight")
      handleAlignment(canvas, "alignRight")
    else if (functionality === "verticalAlignTop")
      handleAlignment(canvas, "top")
    else if (functionality === "verticalAlignCenter")
      handleAlignment(canvas, "centerVertically")
    else if (functionality === "verticalAlignBottom")
      handleAlignment(canvas, "bottom")
    else if (functionality === "duplicate") handleDuplicate(canvas)
    else if (functionality === "bringToFront")
      handlePosition(canvas, "bringToFront")
    else if (functionality === "bringForward")
      handlePosition(canvas, "bringForward")
    else if (functionality === "sendBackward")
      handlePosition(canvas, "sendBackward")
    else if (functionality === "sendToBack")
      handlePosition(canvas, "sendToBack")
    else if (functionality === "lock") {
      setSharedStyling((prev) => {
        return { ...prev, lock: !prev.lock }
      })
      handleLock(canvas)
    }
  }

  const handleOpacityChange = (e) => {
    handleOpacity(canvas, e.target.value / 100)
    setSharedStyling((prev) => {
      return {
        ...prev,
        opacity: e.target.value
      }
    })
  }

  return (
    <div className="bg-white   flex-wrap   flex main-canvas-container-open justify-end  items-center 2xl:px-4">
      <div className="text-left h-16  flex-grow">
        <HistoryContainer
          canvas={canvas}
          handleMouseOut={handleMouseOut}
          handleMouseOver={handleMouseOver}
          historyClick={historyClick}
          historyCount={historyCount}
          horizontalHover={horizontalHover}
        />
      </div>
      {lastBackgroundImage !== "" &&
        lastBackgroundImage !== undefined &&
        selectedTabIndex === 2 &&
        !viewTextBar &&
        !viewElementsBar &&
        !viewDefaultbar && (
          <BackgroundContainer
            canvas={canvas}
            handleClickIcon={handleClickIcon}
            handleMouseOut={handleMouseOut}
            handleMouseOver={handleMouseOver}
            horizontalHover={horizontalHover}
            settingsFunctionality={settingsFunctionality}
            viewSettings={viewSettings}
          />
        )}
      {viewTextBar && !sharedStyling.lock && (
        <TextContainer
          canvas={canvas}
          fontFamily={fontFamily}
          handleMouseOut={handleMouseOut}
          handleMouseOver={handleMouseOver}
          horizontalHover={horizontalHover}
          setTextFormate={setTextFormate}
          setTextStyle={setTextStyle}
          settingsFunctionality={settingsFunctionality}
          textFormate={textFormate}
          textStyle={textStyle}
          viewSettings={viewSettings}
        />
      )}
      {viewElementsBar && !sharedStyling.lock && (
        <ElementsContainer
          allColors={allColors}
          elementSelectedColor={elementSelectedColor}
          handleChangeElementColor={(index) => handleChangeElementColor(index)}
          handleClickIcon={handleClickIcon}
          handleMouseOut={handleMouseOut}
          handleMouseOver={handleMouseOver}
          horizontalHover={horizontalHover}
        />
      )}
      {viewDefaultbar && !sharedStyling.lock ? (
        <SharedContainer
          handleClickIcon={handleClickIcon}
          handleMouseOut={handleMouseOut}
          handleMouseOver={handleMouseOver}
          handleOpacityChange={handleOpacityChange}
          horizontalHover={horizontalHover}
          opacity={sharedStyling.opacity}
        />
      ) : (
        ""
      )}
      {viewDefaultbar ? (
        <DefaultContainer
          handleClickIcon={handleClickIcon}
          handleMouseOut={handleMouseOut}
          handleMouseOver={handleMouseOver}
          handleOpacityChange={handleOpacityChange}
          horizontalHover={horizontalHover}
          opacity={sharedStyling.opacity}
          sharedStyling={sharedStyling}
        />
      ) : (
        ""
      )}
    </div>
  )
}

export default ToolBar
