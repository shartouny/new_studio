//Packages
import { fabric } from "fabric"

export const handleAddPersonalizerTextBox = (
  canvas,
  textType,
  value,
  name,
  id,
  data
) => {
  const fabricObject = new fabric.Textbox(value, {
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
  canvas.item(canvas.getObjects().indexOf(fabricObject)).set({
    hasBorders: true,
    borderColor: "#2B3377",
    cornerColor: "#2B3377",
    cornerSize: 8,
    transparentCorners: false,
    cornerStyle: "circle",
    category: "Text",
    name: name,
    parentCategory: "Personalizer",
    id: id,
    data: data,
    lock: false,
    visible: true,
    hasControls: false
  })
  canvas.setActiveObject(fabricObject)
  canvas.renderAll()
}

export const handleAddPersonalizerImage = (canvas, name, id, data) => {
  var obj = new fabric.Rect({
    width: 200,
    height: 200,
    hasBorders: true,
    borderColor: "#2B3377",
    hasControls: false,
    name: name,
    id: id,
    parentCategory: "Personalizer",
    data: data,
    fill: "#1115"
  })
  canvas.viewportCenterObject(obj)
  canvas.add(obj)
}
