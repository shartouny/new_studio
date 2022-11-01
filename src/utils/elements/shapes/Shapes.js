//Packages
import { fabric } from "fabric"

import { getBase64FromUrl } from "../../../helpers/GetBase64"

export const handleLoadElement = (
  canvas,
  elementData,
  element,
  setAllColors,
  canvasWidth
) => {
  getBase64FromUrl(elementData.path)
    .then((base64) => {
      if (elementData.extension === "svg") {
        new fabric.loadSVGFromURL(base64, function (objects, options) {
          const allColors = objects.map((color) => color.fill)
          const filteredColor = allColors.filter(
            (v, i) => allColors.indexOf(v) === i
          )
          const referenceColors = filteredColor.map((v) =>
            allColors.filter((value) => v === value)
          )
          let colorIndex = []
          filteredColor.forEach((color) => {
            let initialIndex = []
            objects.forEach((object, index) => {
              if (object.fill === color) initialIndex.push(index)
            })
            colorIndex.push(initialIndex)
          })
          const referenceColorIndex = colorIndex

          setAllColors(filteredColor)

          const obj = fabric.util.groupSVGElements(objects, options)
          obj.name = elementData.name
          obj.category = element.categorieName
          obj.parentCategory = "Elements"
          obj.id = elementData.name + new Date().getTime()
          obj.hasBorders = false
          obj.borderColor = "#1114"
          obj.cornerColor = "#2B3377"
          obj.cornerSize = 8
          obj.transparentCorners = false
          obj.cornerStyle = "circle"
          obj.lock = false
          obj.visible = true
          obj.referenceColorIndex = [...referenceColorIndex]
          obj.referenceColor = [...referenceColors]
          obj.scaleToWidth(canvasWidth / 5)
          canvas.viewportCenterObject(obj)
          canvas.add(obj)
          canvas.setActiveObject(obj)
          canvas.renderAll()
        })
      } else {
        new fabric.Image.fromURL(base64, (img) => {
          img.scaleToWidth(canvasWidth / 5)
          img.name = elementData.name
          img.category = element.categorieName
          img.parentCategory = "Elements"
          img.id = elementData.name + new Date().getTime()
          img.hasBorders = false
          img.borderColor = "#1114"
          img.cornerColor = "#2B3377"
          img.cornerSize = 8
          img.transparentCorners = false
          img.cornerStyle = "circle"
          img.lock = false
          img.visible = true
          img.crossOrigin = "anonymous"
          canvas.viewportCenterObject(img)
          canvas.setActiveObject(img)
          canvas.add(img)
          canvas.renderAll()
        })
      }
    })
    .catch(() => {
      console.log("Error To Add Image")
    })
}
