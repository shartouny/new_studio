import React, { useEffect, useRef, useState } from "react"
import teelaunchLogo from "../../assets/images/teelaunchLogo.svg"
import dots from "../../assets/icons/dots.svg"
import saveIcon from "../../assets/icons/save.svg"
import downloadIcon from "../../assets/icons/downloadIcon.svg"
import nextIcon from "../../assets/icons/next.svg"
//utils
import { handleDownload, handleNext } from "../../utils/header/Download"
import { getLayers, handleDeleteLayer } from "../../helpers/GetLayers"

function TopBar(props) {
  const {
    canvas,
    savedTamplate,
    canvasWidth,
    canvasHeight,
    setTemplateState,
    templateState,
    setNotification
  } = props
  const [isOpen, setIsOpen] = useState(false)

  const ref = useRef()

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpen])

  const handleSaveAsTemplate = () => {
    let layers = getLayers(canvas)

    layers = layers.filter(
      (layer) =>
        layer.name === "GuidelinesY" ||
        layer.name === "GuidelinesX" ||
        layer.name === "PrintBleed"
    )

    layers.map((layer) => handleDeleteLayer(canvas, layer))

    const image = canvas
      .toDataURL({
        format: "png",
        multiplier: canvasWidth / canvas.getWidth()
      })
      .replace("image/png", "image/octet-stream")
    setTemplateState([
      ...templateState,
      {
        id: templateState.length + 1,
        template: btoa(JSON.stringify(savedTamplate)),
        thumbnailImage: image
      }
    ])
    const test = JSON.stringify([
      ...templateState,
      {
        id: templateState.length + 1,
        template: btoa(JSON.stringify(savedTamplate)),
        thumbnailImage: image
      }
    ])
    localStorage.setItem("test", test)
    setNotification({ text: "Successfully added as template!", isOpen: true })
    setIsOpen(false)
    setTimeout(() => {
      setNotification({ text: "", isOpen: false })
    }, 2000)
  }
  return (
    <div
      className="bg-purple2B3377 h-16 z-40 flex items-center justify-between px-9 "
      style={{ boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)" }}
    >
      <img alt="teelaunchLogo" src={teelaunchLogo} />
      <div ref={ref}>
        <div
          // onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
          className="h-10 flex justify-center items-center space-x-8"
        >
          <img
            alt="saveIcon"
            className="cursor-pointer"
            onClick={() => {
              localStorage.setItem(
                "savedTemplate",
                btoa(JSON.stringify(savedTamplate))
              )
              handleSaveAsTemplate()
            }}
            src={saveIcon}
          />
          <img
            alt="downloadIcon"
            className="cursor-pointer"
            onClick={() => {
              handleDownload(canvas, canvasWidth, canvasHeight)
              setNotification({
                text: "Image successfully downloaded!",
                isOpen: true
              })
              setIsOpen(false)
              setTimeout(() => {
                setNotification({ text: "", isOpen: false })
              }, 2000)
            }}
            src={downloadIcon}
          />
          {window.parent !== window && (
            <img
              alt="nextIcon"
              className="cursor-pointer"
              onClick={() => {
                setNotification({
                  text: "Please Wait until window close...",
                  isOpen: true
                })
                handleNext(canvas, canvasWidth)
                setTimeout(() => {
                  setNotification({ text: "", isOpen: false })
                }, 6000)
              }}
              src={nextIcon}
            />
          )}
        </div>
        {/* {isOpen && (
          <div className=" bg-white absolute w-40 top-14 right-4 divide-y divide-gray-300 border-2 ">
            <div
              className="flex justify-center py-1 text-md cursor-pointer text-purple2B3377 hover:bg-gray-300 hover:text-white"
              onClick={() => {
                localStorage.setItem(
                  "savedTemplate",
                  btoa(JSON.stringify(savedTamplate))
                )
                handleSaveAsTemplate()
              }}
            >
              Save as Template
            </div>
            <div
              className="flex justify-center py-1 text-md cursor-pointer text-purple2B3377 hover:bg-gray-300 hover:text-white"
              onClick={() => {
                handleDownload(canvas, canvasWidth, canvasHeight)
                setNotification({
                  text: "Image successfully downloaded!",
                  isOpen: true
                })
                setIsOpen(false)
                setTimeout(() => {
                  setNotification({ text: "", isOpen: false })
                }, 2000)
              }}
            >
              Download
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default TopBar
