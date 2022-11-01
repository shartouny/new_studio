//Packages
import React, { useEffect, useRef, useState } from "react"

//Assets
import { ReactComponent as AlignLeft } from "@Assets/toolbarIcons/TextElement/AlignLeft.svg"
import { ReactComponent as AlignRight } from "@Assets/toolbarIcons/TextElement/AlignRight.svg"
import { ReactComponent as AlignCenter } from "@Assets/toolbarIcons/TextElement/AlignCenter.svg"
import { ReactComponent as AlignJustify } from "@Assets/toolbarIcons/TextElement/AlignJustify.svg"

function TextAlign(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut,
    handleTextAlignment,
    textStyle,
    setTextStyle
  } = props

  const [hover, setHover] = useState(-1)
  const [openDropDown, setOpenDropDown] = useState(false)
  const ref = useRef()

  const handleChangeMouseOver = (index) => {
    setHover(index)
  }
  const handleDropDownClick = () => {
    setOpenDropDown((prev) => !prev)
    setHover(-1)
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (openDropDown && ref.current && !ref.current.contains(e.target)) {
        setOpenDropDown(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [openDropDown])

  return (
    <div>
      <div className="h-full   hidden 2xl:flex  ">
        <div
          className=" flex flex-col justify-center items-center  "
          onClick={() => {
            setTextStyle((prev) => {
              return {
                ...prev,
                textAlign: "left"
              }
            })

            handleTextAlignment("left")
          }}
          onMouseOut={() => handleMouseOut("left")}
          onMouseOver={() => handleMouseOver("left")}
        >
          <div
            className={`${
              textStyle.textAlign === "left" ? "rounded-md bg-grayF0F0F0" : ""
            } mx-1  p-2 w-10 flex justify-center`}
          >
            <AlignLeft className=" fill-selected cursor-pointer z-50" />
          </div>
          <span
            className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center ${
              horizontalHover === "left"
                ? `text-purple2B3377`
                : `text-transparent`
            }`}
          >
            <span className="relative top-6">Justify L.</span>
          </span>
        </div>
        <div
          className="  flex flex-col justify-center items-center  "
          onClick={() => {
            setTextStyle((prev) => {
              return {
                ...prev,
                textAlign: "right"
              }
            })
            handleTextAlignment("right")
          }}
          onMouseOut={() => handleMouseOut("right")}
          onMouseOver={() => handleMouseOver("right")}
        >
          <div
            className={`${
              textStyle.textAlign === "right" ? "rounded-md bg-grayF0F0F0" : ""
            } mx-1  p-2 w-10 flex justify-center`}
          >
            <AlignRight className=" fill-selected cursor-pointer z-50" />
          </div>
          <span
            className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center ${
              horizontalHover === "right"
                ? `text-purple2B3377`
                : `text-transparent`
            }`}
          >
            <span className="relative top-6">Justify R.</span>
          </span>
        </div>
        <div
          className=" flex flex-col justify-center items-center"
          onClick={() => {
            setTextStyle((prev) => {
              return {
                ...prev,
                textAlign: "center"
              }
            })
            handleTextAlignment("center")
          }}
          onMouseOut={() => handleMouseOut("center")}
          onMouseOver={() => handleMouseOver("center")}
        >
          <div
            className={`${
              textStyle.textAlign === "center" ? "rounded-md bg-grayF0F0F0" : ""
            } mx-1  p-2 w-10 flex justify-center`}
          >
            <AlignCenter className=" fill-selected cursor-pointer z-50" />
          </div>
          <span
            className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center ${
              horizontalHover === "center"
                ? `text-purple2B3377`
                : `text-transparent`
            }`}
          >
            <span className="relative top-6">Center</span>
          </span>
        </div>
        <div
          className=" flex flex-col justify-center items-center "
          onClick={() => {
            setTextStyle((prev) => {
              return {
                ...prev,
                textAlign: "justify"
              }
            })
            handleTextAlignment("justify")
          }}
          onMouseOut={() => handleMouseOut("justifyCenter")}
          onMouseOver={() => handleMouseOver("justifyCenter")}
        >
          <div
            className={`${
              textStyle.textAlign === "justify"
                ? "rounded-md bg-grayF0F0F0"
                : ""
            } mx-1  p-2 w-10 flex justify-center`}
          >
            <AlignJustify className=" fill-selected cursor-pointer  z-50 " />
          </div>
          <span
            className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center ${
              horizontalHover === "justifyCenter"
                ? `text-purple2B3377`
                : `text-transparent`
            }`}
          >
            <span className="relative top-6">Justify C.</span>
          </span>
        </div>
      </div>
      {/* SM SCREENS */}
      <div className="h-full   flex 2xl:hidden  ">
        <div className="w-12" ref={ref}>
          <div
            className="  flex flex-col justify-center items-center   "
            onClick={handleDropDownClick}
            onMouseOut={handleMouseOut}
            onMouseOver={() => handleMouseOver("textAlign")}
          >
            {textStyle.textAlign === "center" ? (
              <AlignCenter className="fill-selected cursor-pointer" />
            ) : textStyle.textAlign === "left" ? (
              <AlignLeft className="fill-selected cursor-pointer" />
            ) : textStyle.textAlign === "right" ? (
              <AlignRight className="fill-selected cursor-pointer" />
            ) : (
              <AlignJustify className="fill-selected cursor-pointer" />
            )}

            <div
              className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
                horizontalHover === "textAlign"
                  ? `text-purple2B3377`
                  : `text-transparent`
              }`}
            >
              <div className="relative top-6">T. Align</div>
            </div>
          </div>
          {openDropDown && (
            <div className="bg-white z-50 w-12 absolute  rounded-b-md  pt-2">
              <div className="flex justify-center flex-col items-center space-y-3">
                <div className="py-1">
                  {hover === 0 && (
                    <div className="absolute left-14 w-24 rounded-md px-2 text-purple2B3377  bg-white ">
                      Justify L.
                    </div>
                  )}
                  <AlignLeft
                    className="cursor-pointer fill-selected"
                    onClick={() => {
                      setTextStyle((prev) => {
                        return {
                          ...prev,
                          textAlign: "left"
                        }
                      })

                      handleTextAlignment("left")
                      setOpenDropDown(false)
                    }}
                    onMouseOut={() => handleChangeMouseOver(-1)}
                    onMouseOver={() => handleChangeMouseOver(0)}
                  />
                </div>

                <div className="py-1">
                  {hover === 1 && (
                    <div className="absolute left-14 w-24 rounded-md px-2 text-purple2B3377  bg-white ">
                      Justify R.
                    </div>
                  )}
                  <AlignRight
                    className="cursor-pointer fill-selected"
                    onClick={() => {
                      setTextStyle((prev) => {
                        return {
                          ...prev,
                          textAlign: "right"
                        }
                      })
                      handleTextAlignment("right")
                      setOpenDropDown(false)
                    }}
                    onMouseOut={() => handleChangeMouseOver(-1)}
                    onMouseOver={() => handleChangeMouseOver(1)}
                  />
                </div>

                <div className="py-1">
                  {hover === 2 && (
                    <div className="absolute left-14   rounded-md px-2 text-purple2B3377  bg-white ">
                      Center
                    </div>
                  )}
                  <AlignCenter
                    className="cursor-pointer fill-selected"
                    onClick={() => {
                      setTextStyle((prev) => {
                        return {
                          ...prev,
                          textAlign: "center"
                        }
                      })
                      handleTextAlignment("center")
                      setOpenDropDown(false)
                    }}
                    onMouseOut={() => handleChangeMouseOver(-1)}
                    onMouseOver={() => handleChangeMouseOver(2)}
                  />
                </div>

                <div className="py-1">
                  {hover === 3 && (
                    <div className="absolute left-14 w-24 rounded-md px-2 text-purple2B3377  bg-white ">
                      Justify C.
                    </div>
                  )}
                  <AlignJustify
                    className="cursor-pointer fill-selected mb-2"
                    onClick={() => {
                      setTextStyle((prev) => {
                        return {
                          ...prev,
                          textAlign: "justify"
                        }
                      })
                      handleTextAlignment("justify")
                      setOpenDropDown(false)
                    }}
                    onMouseOut={() => handleChangeMouseOver(-1)}
                    onMouseOver={() => handleChangeMouseOver(3)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TextAlign
