//Packages
import { fabric } from "fabric"

export const handleAddTextBox = (canvas, textType, value) => {
  const fabricObject = new fabric.Textbox(value, {
    category: "Text",
    id: "Text" + new Date().getTime(),
    name:
      textType === "title"
        ? "Title"
        : textType === "subheader"
        ? "Sub header"
        : textType === "bodyText"
        ? "Body Text"
        : "",
    parentCategory: "Text",
    hasBorders: false,
    borderColor: "#1114",
    cornerColor: "#2B3377",
    cornerSize: 8,
    transparentCorners: false,
    cornerStyle: "circle",
    lock: false,
    visible: true,
    width: 400,
    textAlign: "center",
    pathSide: "left",
    fontSize:
      textType === "title"
        ? 60
        : textType === "subheader"
        ? 40
        : textType === "bodyText"
        ? 20
        : "",
    pathStartOffset: 0,
    fontWeight:
      textType === "title"
        ? "bold"
        : textType === "subheader"
        ? "400"
        : textType === "bodyText"
        ? ""
        : ""
  })
  canvas.viewportCenterObject(fabricObject)
  canvas.add(fabricObject)

  canvas.setActiveObject(fabricObject)
  canvas.renderAll()
}
