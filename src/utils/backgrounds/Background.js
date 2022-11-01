//Packages
import { fabric } from "fabric"

export const handleBackground = (
  canvas,
  value,
  backgroundType,
  setLastBackgroundImage,
  canvasWidth,
  canvasHeight
) => {
  if (backgroundType === "color picker") {
    const image = new fabric.Image("")
    canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas))
    setLastBackgroundImage()
    canvas.backgroundColor = `rgba(${value.r},${value.g},${value.b},${value.a})`
  } else if (backgroundType === "default color") {
    const image = new fabric.Image("")
    canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas))
    canvas.backgroundColor = value
    setLastBackgroundImage()
  } else if (backgroundType === "image") {
    fabric.Image.fromURL(value, function (img) {
      var canvasAspect = canvasWidth / canvasHeight
      var imgAspect = img.width / img.height
      var left, top, scaleFactor

      if (canvasAspect >= imgAspect) {
        scaleFactor = canvasWidth / img.width
        left = 0
        top = -(img.height * scaleFactor - canvasHeight) / 2
      } else {
        scaleFactor = canvasHeight / img.height
        top = 0
        left = -(img.width * scaleFactor - canvasWidth) / 2
      }

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        top: top,
        left: left,
        originX: "left",
        originY: "top",
        scaleX: Math.ceil(scaleFactor * 100) / 100,
        scaleY: Math.ceil(scaleFactor * 100) / 100
      })
    })
  }
  canvas.renderAll()
}
