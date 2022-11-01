// Packages
import React, { useState } from "react"

//Assets
import { ReactComponent as RotateHorizontal } from "@Assets/bottombarIcons/rotateHorizontal.svg"
import { ReactComponent as RotateVertical } from "@Assets/bottombarIcons/rotateVertical.svg"
import { ReactComponent as Ruler } from "@Assets/bottombarIcons/ruler.svg"
import { ReactComponent as Border } from "@Assets/bottombarIcons/border.svg"
import { ReactComponent as Guides } from "@Assets/bottombarIcons/guides.svg"
import { ReactComponent as FullScreen } from "@Assets/bottombarIcons/fullScreen.svg"

//Components
import Slider from "@Components/inputs/Slider"
import Layers from "@Components/bottombarComponents/Layers"

//utils
import { handlePrintBleed, handleRotate } from "@Utils/footer/Footer"

function BottomBar(props) {
  const {
    canvas,
    borderAction,
    zoomIn,
    setZoomValue,
    zoomValue,
    printBleed,
    guides,
    ruler,
    handleChangeRulerClicked,
    handleChangeGuidesClicked,
    setCanvasWidth,
    setCanvasHeight,
    lastBackgroundImage,
    canvasType,
    canvasHeight,
    canvasWidth,
    setLastBackgroundImage,
    layerList,
    setLayerList,
    handleFullscreen,
    setRuler,
    selectedObjects,
    setSharedStyling,
    setZoomValueBeforeFullscreen,
    printBleedImg,
    sharedStyling
  } = props
  //   const [zoomValue, setZoomValue] = useState(0)
  const [orientation, setOrientation] = useState("portrait")

  return (
    <div>
      <Layers
        canvas={canvas}
        layerList={layerList}
        selectedObjects={selectedObjects}
        setLayerList={setLayerList}
        setSharedStyling={setSharedStyling}
        sharedStyling={sharedStyling}
      />
      <div className="bg-white h-20 flex w-full justify-between items-center px-8">
        <div className="flex space-x-3">
          <Ruler
            className={`${
              ruler ? "fill-selected" : "fill-gray"
            } hover:fill-selected cursor-pointer`}
            onClick={handleChangeRulerClicked}
          />
          <Guides
            className={`${
              guides ? "fill-selected" : "fill-gray"
            } hover:fill-selected cursor-pointer`}
            onClick={handleChangeGuidesClicked}
          />
          <Border
            className={`${
              printBleed ? "stroke-selected" : "stroke-gray"
            } hover:stroke-selected cursor-pointer`}
            onClick={(e) => {
              borderAction(e)
              handlePrintBleed(
                canvas,
                printBleedImg,
                canvasWidth,
                canvasHeight,
                printBleed
              )
            }}
          />
        </div>
        <div className="flex space-x-3">
          {canvasType === "portrait" ? (
            <RotateVertical
              className={`${
                canvasType === "portrait" ? "stroke-selected" : "stroke-gray"
              } hover:stroke-selected cursor-pointer`}
            />
          ) : canvasType === "landscape" ? (
            <RotateHorizontal
              className={`${
                canvasType === "landscape" ? "stroke-selected" : "stroke-gray"
              } hover:stroke-selected cursor-pointer self-end`}
            />
          ) : canvasType === "both" ? (
            <>
              <RotateVertical
                className={`${
                  orientation === "portrait"
                    ? "stroke-selected"
                    : "stroke-gray cursor-pointer"
                } hover:stroke-selected `}
                onClick={() => {
                  if (orientation === "landscape") {
                    handleRotate(
                      canvas,
                      setCanvasWidth,
                      setCanvasHeight,
                      canvasWidth,
                      canvasHeight,
                      printBleed,
                      printBleedImg,
                      lastBackgroundImage,
                      setLastBackgroundImage
                    )
                    setOrientation((prev) => {
                      return prev === "portrait" ? "landscape" : "portrait"
                    })
                  }
                }}
              />
              <RotateHorizontal
                className={`${
                  orientation === "landscape"
                    ? "stroke-selected "
                    : "stroke-gray cursor-pointer"
                } hover:stroke-selected  self-end`}
                onClick={() => {
                  if (orientation === "portrait") {
                    handleRotate(
                      canvas,
                      setCanvasWidth,
                      setCanvasHeight,
                      canvasWidth,
                      canvasHeight,
                      printBleed,
                      printBleedImg,
                      lastBackgroundImage,
                      setLastBackgroundImage
                    )
                    setOrientation((prev) => {
                      return prev === "portrait" ? "landscape" : "portrait"
                    })
                  }
                }}
              />
            </>
          ) : (
            canvasType === "hide" && <div />
          )}
        </div>
        <div className="flex space-x-3 ">
          <Slider
            max={(canvasWidth * 4.5 * (800 / canvasWidth)) / canvasWidth}
            min={(100 * (800 / canvasWidth)) / canvasWidth}
            onChange={(e) => {
              setZoomValue(e.target.value)
              if (e.target.value > zoomValue)
                zoomIn(
                  canvas,
                  e.target.value,
                  "in",
                  canvasWidth,
                  canvasHeight,
                  setZoomValue,
                  lastBackgroundImage,
                  setLastBackgroundImage
                )
              else
                zoomIn(
                  canvas,
                  e.target.value,
                  "out",
                  canvasWidth,
                  canvasHeight,
                  setZoomValue,
                  lastBackgroundImage,
                  setLastBackgroundImage
                )
            }}
            step={
              ((canvasWidth * 4.5 * (800 / canvasWidth)) / canvasWidth -
                (100 * (800 / canvasWidth)) / canvasWidth) /
              100
            }
            unit={""}
            value={zoomValue}
            viewedValue={""} //Math.round((zoomValue * 100) / 2)}
          />
          {/* <br /> */}
          {/* {(zoomValue * 100).toFixed(2)} */}
          <FullScreen
            className="fill-gray hover:fill-selected cursor-pointer"
            onClick={() => {
              // canvas.
              setZoomValueBeforeFullscreen(zoomValue)
              setZoomValue(800 / canvasWidth)
              zoomIn(
                canvas,
                800 / canvasWidth,
                "",
                canvasWidth,
                canvasHeight,
                "",
                lastBackgroundImage,
                setLastBackgroundImage
              )

              handleFullscreen()
              setRuler(false)
              canvas.forEachObject((object) => {
                object.selectable = false
                object.evented = false
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default BottomBar
