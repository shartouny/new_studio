// Packages
import React from "react"

//Assets
import { ReactComponent as OpenArrow } from "@Assets/icons/up-arrow.svg"
import { ReactComponent as CloseArrow } from "@Assets/icons/low-arrow.svg"

function PersonalizerDropdown(props) {
  const {
    selectedObjects,
    setSelectedObjects,
    handleTextChange,
    index,
    handleChangeRadio,
    handleWidthHeightChange,
    personalizerLayer,
    personalizerOpen,
    setPersonalizerOpen,
    canvas
  } = props

  const handleChangeOpen = (e, layer, index) => {
    if (layer.visible) canvas.setActiveObject(layer).renderAll()

    if (index === personalizerOpen) setPersonalizerOpen(-1)
    else {
      setPersonalizerOpen(index)
      setSelectedObjects(layer)
    }
  }
  return (
    <div>
      {personalizerLayer.visible && (
        <div
          className={`flex flex-col mx-3 my-3 ${
            selectedObjects.id === personalizerLayer.id
              ? "border border-red-500"
              : ""
          }
      `}
        >
          <button
            className={`rounded-sm bg-grayFAFAFA text-purple1E2351 py-1.5 flex justify-between  text-xs font-Rubik font-medium  w-full px-2`}
            id={"addImageLayer"}
            onClick={(e) => handleChangeOpen(e, personalizerLayer, index)}
          >
            <div className="p-1">
              <img
                alt="icon"
                src={
                  personalizerLayer.name.startsWith(
                    "Image Personalization Layer"
                  )
                    ? "personalizerImageLayer.svg"
                    : "personalizerTextLayer.svg"
                }
              />
            </div>

            <div className="p-1">{personalizerLayer.name}</div>
            <div className="self-center p-1">
              {personalizerOpen === index ? <OpenArrow /> : <CloseArrow />}
            </div>
          </button>

          {personalizerOpen === index && (
            <div className="bg-white pb-2 rounded-b-sm">
              {personalizerLayer.name.startsWith(
                "Image Personalization Layer"
              ) ? (
                <div className="mx-2">
                  <div className="font-Rubik font-medium text-purple1E2351 text-xs py-2">
                    Image Type
                    <div className="flex justify-between items-center py-2">
                      <div className="flex justify-center items-center">
                        <input
                          checked={
                            personalizerLayer.data.data.imageType === "JPEG"
                          }
                          className="cursor-pointer"
                          id={"JPEG"}
                          name={"imageType" + index}
                          onClick={(e) => handleChangeRadio(e, index)}
                          type="radio"
                          value={"JPEG"}
                        />
                        <div className="mx-1">JPEG</div>
                      </div>
                      <div className="flex justify-center items-center">
                        <input
                          checked={
                            personalizerLayer.data.data.imageType === "PNG"
                          }
                          className="cursor-pointer"
                          id={"PNG"}
                          name={"imageType" + index}
                          onClick={(e) => handleChangeRadio(e, index)}
                          type="radio"
                          value={"PNG"}
                        />
                        <div className="mx-1">PNG</div>
                      </div>
                      <div className="flex justify-center items-center">
                        <input
                          checked={
                            personalizerLayer.data.data.imageType === "SVG"
                          }
                          className="cursor-pointer"
                          id={"SVG"}
                          name={"imageType" + index}
                          onClick={(e) => handleChangeRadio(e, index)}
                          type="radio"
                          value={"SVG"}
                        />
                        <div className="mx-1">SVG</div>
                      </div>
                    </div>
                    <div className="my-2">Image Dimension</div>
                    <div className="flex items-center justify-center">
                      <div>
                        <input
                          className="w-full text-center border border-purple1E2351 rounded-md p-2 text-xs focus:outline-none"
                          id={"width"}
                          onChange={(e) =>
                            handleWidthHeightChange(e, personalizerLayer, index)
                          }
                          placeholder="300"
                          type="number"
                          value={personalizerLayer.data.data.width}
                        />
                        <div className="text-purple1E2351 font-medium font-Rubik text-center">
                          Width
                        </div>
                      </div>
                      <div className="mx-2">X</div>
                      <div>
                        <input
                          className="w-full text-center border border-purple1E2351 rounded-md p-2 text-xs focus:outline-none"
                          id={"height"}
                          onChange={(e) =>
                            handleWidthHeightChange(e, personalizerLayer, index)
                          }
                          placeholder="300"
                          type="number"
                          value={personalizerLayer.data.data.height}
                        />
                        <div className="text-purple1E2351 font-medium font-Rubik text-center">
                          Height
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-2">
                  <div className="py-1">
                    <div className="text-purple1E2351 font-Rubik  text-xs py-1 font-medium">
                      Text Box Name
                    </div>
                    <input
                      className="w-full border border-purple1E2351 rounded-md p-2 text-xs text-purple1E2351 focus:outline-none"
                      id="textBoxName"
                      onChange={(e) => handleTextChange(e, index)}
                      placeholder="Text Box Name"
                      value={personalizerLayer.data.data.text}
                    />
                  </div>
                  <div className="py-1">
                    <div className="text-purple1E2351 font-Rubik  text-xs py-1 font-medium">
                      Placeholder
                    </div>
                    <input
                      className="w-full border border-purple1E2351 rounded-md p-2 text-xs text-purple1E2351 focus:outline-none"
                      id="placeholder"
                      onChange={(e) => handleTextChange(e, index)}
                      placeholder="Placeholder"
                      value={personalizerLayer.data.data.placeholder}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PersonalizerDropdown
