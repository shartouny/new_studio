//Packages
import React from "react"

function Fabric(props) {
  const {
    // canvas,
    printBleed,
    canvasWidth,
    canvasHeight,
    triggerClick,
    zoomValue,
    ruler,
    createHorizontalLine,
    createVerticalLine,
    fullscreenFlag,
    widthRef
  } = props

  return (
    <div className="flex flex-col absolute z-0 inset-0">
      <div
        className="relative z-0 min-h-0"
        style={{
          flex: "1",
          contain: "content"
        }}
      >
        {ruler && (
          <div className="absolute border bg-white border-grayC4C4C4 z-0  h-full w-8">
            &nbsp;
          </div>
        )}
        <div
          className={`relative ${
            fullscreenFlag ? "overflow-hidden" : "overflow-scroll"
          } h-full `}
          id="scrolldiv"
          role="none"
          tabIndex="-1"
        >
          {ruler && (
            <div
              className="pl-10 border bg-white border-grayC4C4C4 z-50 fixed w-full"
              onClick={createHorizontalLine}
            >
              <div
                className="mx-auto  transform -translate-x-2 flex h-8 overflow-x-hidden"
                style={{
                  width: canvasWidth * zoomValue,
                  backgroundImage: "url(rulerpicHorizontal.svg)",
                  backgroundRepeatX: "repeat",
                  backgroundRepeatY: "no-repeat",
                  backgroundSize: "50vw",
                  marginTop: "5px"
                }}
              ></div>
            </div>
          )}

          <div
            className="flex absolute min-w-full min-h-full"
            onClick={(e) => e.target.id === "parentDiv" && triggerClick()}
            ref={widthRef}
          >
            <div
              className="my-10 flex relative z-0 h-auto"
              id="parentDiv"
              style={{
                gridArea: "canvas",
                flex: 1,
                transform: "scale(1)"
              }}
            >
              {ruler && (
                <div
                  className="  ml-1  w-10 my-auto  z-40 "
                  onClick={createVerticalLine}
                  style={{
                    height: canvasHeight * zoomValue,
                    backgroundImage: "url(rulerpicVertical.svg)",
                    backgroundRepeatY: "repeat",
                    backgroundRepeatX: "no-repeat",
                    backgroundSize: "2vh"
                  }}
                ></div>
              )}
              <div className="relative m-auto flex flex-row justify-center flex-shrink-0">
                <div className="mx-20">
                  <div className="relative  ">
                    <div className="flex flex-col relative" id="jdfhdf">
                      <div className={`overflow-hidden  `}>
                        <canvas
                          className={`${
                            printBleed && "border-2 border-red-500"
                          } `}
                          id="canvas-main"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-44"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Fabric
