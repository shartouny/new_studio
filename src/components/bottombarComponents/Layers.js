// Packages
import React, { useState, useEffect } from "react"
import ReactDragListView from "react-drag-listview"
import { Scrollbars } from "react-custom-scrollbars"
import { fabric } from "fabric"

//Assets
import { ReactComponent as OpenArrow } from "@Assets/icons/up-arrow.svg"
import { ReactComponent as CloseArrow } from "@Assets/icons/low-arrow.svg"
import { ReactComponent as Element } from "@Assets/bottombarIcons/element.svg"
import { ReactComponent as Text } from "@Assets/bottombarIcons/text.svg"
import { ReactComponent as Eye } from "@Assets/bottombarIcons/eye.svg"
import { ReactComponent as EyeHidden } from "@Assets/bottombarIcons/eyeHidden.svg"
import { ReactComponent as Personalizer } from "@Assets/icons/personalizer.svg"
import { ReactComponent as DeleteIcon } from "@Assets/icons/delete.svg"
import { ReactComponent as LockIcon } from "@Assets/icons/lock.svg"
import { ReactComponent as UnlockIcon } from "@Assets/icons/unlock.svg"
import { ReactComponent as DuplicateIcon } from "@Assets/icons/copy.svg"

//Helpers
import { handleSetVisible } from "@Helpers/GetLayers"

//Utils
import {
  handleDuplicate,
  handleDelete,
  handleLock
} from "@Utils/topBarTools/commonComponents/CommonComponent.js"

function Layers(props) {
  const {
    canvas,
    layerList,
    setLayerList,
    selectedObjects,
    setSharedStyling,
    sharedStyling
  } = props
  const [isOpenLayer, setIsOpenLayer] = useState(false)
  const [ctrlHeld, setCtrlHeld] = useState(false)
  const [showDeleteAndDuplicateFlag, setShowDeleteAndDuplicateFlag] =
    useState(false)

  function downHandler({ key }) {
    if (key === "Control") {
      setCtrlHeld(true)
    }
  }

  function upHandler({ key }) {
    if (key === "Control") {
      setCtrlHeld(false)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)
    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, [])
  useEffect(() => {
    setShowDeleteAndDuplicateFlag(ShowDeleteAndDuplicate())
  }, [selectedObjects])

  const handleIsViewedClick = (layer, index) => {
    handleSetVisible(canvas, layer, index)
  }

  const handleSelectedLayer = (index, layer) => {
    if (layer.visible) {
      if (ctrlHeld) {
        var allselection = canvas.getActiveObject() ?? []
        canvas.discardActiveObject()
        var sel
        if (allselection.length == 0) {
          sel = new fabric.ActiveSelection(
            canvas.getObjects().filter((obj) => obj.id === layer.id),
            {
              canvas: canvas
            }
          )
          canvas.setActiveObject(sel)
          canvas.requestRenderAll()
        } else {
          var objs = canvas.getObjects()
          var selectedObjs = allselection
          var objArray = []
          objs.forEach((object) => {
            if (object.id === layer.id && object.lock === false)
              objArray.push(object)
            else {
              if (selectedObjs?.category) {
                //single item
                if (selectedObjs.id == object.id && object.lock === false)
                  objArray.push(object)
              } else {
                //group
                if (
                  selectedObjs._objects.includes(object) &&
                  object.lock === false
                )
                  objArray.push(object)
              }
            }
          })

          sel = new fabric.ActiveSelection(objArray, {
            canvas: canvas
          })
          canvas.setActiveObject(sel)
          canvas.requestRenderAll()
        }
      } else canvas.setActiveObject(layer).renderAll()
    }
  }

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const dataa = [...layerList]
      const item = dataa.splice(fromIndex, 1)[0]
      dataa.splice(toIndex, 0, item)
      canvas.moveTo(item, toIndex)
      setLayerList(dataa)
    },
    nodeSelector: "li",
    handleSelector: "a"
  }

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: `#D5D5D5`
    }
    return (
      <div
        className="rounded-xl"
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    )
  }

  const getSelected = (layer, type) => {
    if (type === "text") {
      if (layer.visible) {
        let style = "text-purple2B3377"
        if (selectedObjects.length === 0) style = "bg-white text-purple2B3377"
        if (selectedObjects.id === layer.id) {
          style = "bg-purple1E2351 text-white"
        } else if (
          selectedObjects._objects !== undefined &&
          selectedObjects?._objects?.findIndex((obj) => obj.id === layer.id) !==
            -1
        ) {
          style = "bg-purple1E2351 text-white"
        }

        return style
      } else {
        return "text-grayC4C4C4"
      }
    } else if (type === "svg") {
      if (layer.visible) {
        let style = "fill-selected"
        if (selectedObjects.length === 0) style = " fill-selected"
        if (selectedObjects.id === layer.id) {
          style = " fill-white"
        } else if (
          selectedObjects._objects !== undefined &&
          selectedObjects?._objects?.findIndex((obj) => obj.id === layer.id) !==
            -1
        ) {
          style = " fill-white"
        }

        return style
      } else {
        return "fill-gray"
      }
    }
  }
  const ShowDeleteAndDuplicate = () => {
    if (!selectedObjects?.lock) return true
    else return false
  }
  return (
    <div className="absolute right-72  ">
      <div className="fixed bottom-20   bg-purple1E2351  cursor-pointer">
        <div
          className="flex items-center justify-between w-64 px-3 h-9"
          onClick={() => setIsOpenLayer((prev) => !prev)}
        >
          <div className="font-Rubik font-medium text-white text-sm">
            Layers
          </div>
          <div>{isOpenLayer ? <CloseArrow /> : <OpenArrow />}</div>
        </div>

        {isOpenLayer && (
          <div className="bg-white  ">
            <Scrollbars
              autoHeight={true}
              autoHeightMax={"25rem"}
              renderThumbVertical={renderThumb}
              universal={true}
            >
              <div>
                <ReactDragListView {...dragProps}>
                  <ol>
                    {layerList.map((layer, index) => (
                      <li key={index}>
                        <a>
                          <div className="flex items-stretch justify-start  ">
                            <div
                              className="  p-2 border border-l-2 border-grayC4C4C4"
                              onClick={() => handleIsViewedClick(layer, index)}
                            >
                              {layer.visible ? (
                                <Eye className="fill-selected " />
                              ) : (
                                <EyeHidden className="fill-gray  hover:fill-selected" />
                              )}
                            </div>
                            <div
                              className={`flex items-center   border-r-2  border border-grayC4C4C4 p-2 w-full ${getSelected(
                                layer,
                                "text"
                              )}`}
                              onClick={() => handleSelectedLayer(index, layer)}
                            >
                              {layer.parentCategory === "Text" ? (
                                <Text className={getSelected(layer, "svg")} />
                              ) : layer.parentCategory === "Elements" ? (
                                <Element
                                  className={getSelected(layer, "svg")}
                                />
                              ) : (
                                <Personalizer
                                  className={getSelected(layer, "svg")}
                                />
                              )}
                              <div
                                className={`font-medium font-Rubik  text-xs px-2 fill-white  `}
                              >
                                {layer.name}
                              </div>
                            </div>
                          </div>
                        </a>
                      </li>
                      //
                    ))}
                  </ol>
                </ReactDragListView>
              </div>
            </Scrollbars>
            {layerList.length !== 0 ? (
              <div className="border border-b-2 border-l-2  border-r-2  border-grayC4C4C4 p-2 flex items-center justify-end">
                {showDeleteAndDuplicateFlag && (
                  <DuplicateIcon
                    className={` w-4 mx-2 ${
                      selectedObjects.length !== 0 &&
                      selectedObjects?.name !== "GuidelinesX" &&
                      selectedObjects?.name !== "GuidelinesY"
                        ? "fill-selected"
                        : "fill-gray"
                    }`}
                    onClick={() => {
                      selectedObjects.length !== 0 &&
                        selectedObjects?.name !== "GuidelinesX" &&
                        selectedObjects?.name !== "GuidelinesY" &&
                        handleDuplicate(canvas)
                    }}
                  />
                )}
                {showDeleteAndDuplicateFlag ? (
                  <LockIcon
                    className={` w-4 mx-2 ${
                      selectedObjects.length !== 0 &&
                      selectedObjects?.name !== "GuidelinesX" &&
                      selectedObjects?.name !== "GuidelinesY"
                        ? "fill-selected"
                        : "fill-gray"
                    }`}
                    onClick={() => {
                      if (
                        selectedObjects.length !== 0 &&
                        selectedObjects?.name !== "GuidelinesX" &&
                        selectedObjects?.name !== "GuidelinesY"
                      ) {
                        handleLock(canvas)
                        setSharedStyling((prev) => {
                          return {
                            opacity: prev.opacity,
                            lock: !prev.lock
                          }
                        })
                      }
                    }}
                  />
                ) : (
                  <UnlockIcon
                    className={` w-4 mx-2 ${
                      selectedObjects.length !== 0 &&
                      selectedObjects?.name !== "GuidelinesX" &&
                      selectedObjects?.name !== "GuidelinesY"
                        ? "fill-selected"
                        : "fill-gray"
                    }`}
                    onClick={() => {
                      if (
                        selectedObjects.length !== 0 &&
                        selectedObjects?.name !== "GuidelinesX" &&
                        selectedObjects?.name !== "GuidelinesY"
                      ) {
                        handleLock(canvas)
                        setSharedStyling((prev) => {
                          return {
                            opacity: prev.opacity,
                            lock: !prev.lock
                          }
                        })
                        setShowDeleteAndDuplicateFlag(true)
                      }
                    }}
                  />
                )}
                {showDeleteAndDuplicateFlag && (
                  <DeleteIcon
                    className={` w-4 mx-2 ${
                      selectedObjects.length !== 0 &&
                      selectedObjects?.name !== "GuidelinesX" &&
                      selectedObjects?.name !== "GuidelinesY"
                        ? "fill-selected"
                        : "fill-gray"
                    }`}
                    onClick={() => {
                      selectedObjects.length !== 0 &&
                        selectedObjects?.name !== "GuidelinesX" &&
                        selectedObjects?.name !== "GuidelinesY" &&
                        handleDelete(canvas)
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center text-purple2B3377 pt-2 pb-2">
                No Layers
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Layers
