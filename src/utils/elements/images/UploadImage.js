//Packages
import { fabric } from "fabric"

import { getBase64FromUrl } from "../../../helpers/GetBase64"

export const handleUploadImage = (canvas, img, e1, setNotification) => {
  const imgObject = URL.createObjectURL(img)
  const imgType = img.type
  getBase64FromUrl(imgObject)
    .then((base64) => {
      if (imgType === "image/svg+xml") {
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
          const obj = fabric.util.groupSVGElements(objects, options)
          obj.name = "image SVG"
          obj.category = "Graphics"
          obj.parentCategory = "Elements"
          obj.id = "SVG" + new Date().getTime()
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
          canvas.viewportCenterObject(obj)
          canvas.add(obj)
          canvas.setActiveObject(obj)
          canvas.renderAll()
        })
      } else if (imgType === "image/png" || imgType === "image/jpeg") {
        new fabric.Image.fromURL(base64, (img) => {
          img.scale(0.75)
          if (e1 === "background") {
            img.scaleToWidth(canvas.width)
            img.scaleToHeight(canvas.height)
          } else if (e1 === "normalImage") {
            img.scaleToWidth(200)
            img.scaleToHeight(200)
            img.hasBorders = false
            img.borderColor = "#1114"
            img.cornerColor = "#2B3377"
            img.cornerSize = 8
            img.transparentCorners = false
            img.cornerStyle = "circle"
            img.category = "Graphics"
            img.name = `image`
            img.lock = false
            img.visible = true
            img.parentCategory = "Elements"
            img.id = "upload" + new Date().getTime()
            img.referenceColorIndex = []
            img.referenceColors = []
          }
          canvas.viewportCenterObject(img)
          canvas.add(img)
          canvas.setActiveObject(img)
          canvas.renderAll()
        })
      } else {
        setNotification({
          text: "Uploaded file is not an image!",
          isOpen: true
        })
        setTimeout(() => {
          setNotification({ text: "", isOpen: false })
        }, 2000)
      }
    })
    .catch(() => console.log("Error To Upload Image"))
}
