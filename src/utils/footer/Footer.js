//Packages
import { fabric } from "fabric"

import { handleBackground } from "../../utils/backgrounds/Background"

export const handleRotate = (
  canvas,
  setCanvasWidth,
  setCanvasHeight,
  canvasWidth,
  canvasHeight,
  printBleed,
  printBleedImg,
  lastBackgroundImage,
  setLastBackgroundImage
) => {
  const allObjects = canvas.getObjects()
  //centering objects
  allObjects.length > 0 &&
    allObjects.map((value) => canvas.viewportCenterObject(value))
  //changing dimensions
  canvas.setDimensions({ width: canvas.height, height: canvas.width })

  if (printBleed) {
    allObjects.map(
      (value) => value.name === "PrintBleed" && canvas.remove(value)
    )

    new fabric.Image.fromURL(printBleedImg, (img) => {
      var img1 = img.set({
        scaleX: canvasHeight / img.height,
        scaleY: canvasWidth / img.width,
        name: "PrintBleed",
        lock: true,
        hasBorders: false,
        selectable: false,
        hoverCursor: "default",
        lockMovementX: true,
        lockMovementY: true,
        opacity: 0.5
      })
      canvas.add(img1)
      img1.moveTo(-9999)
    })
  }

  if (lastBackgroundImage) {
    handleBackground(
      canvas,
      lastBackgroundImage,
      "image",
      setLastBackgroundImage,
      canvasHeight,
      canvasWidth
    )
    canvas._historySaveAction()
  }

  canvas.renderAll()
  //switching setting state dimension
  setCanvasWidth(canvasHeight)
  setCanvasHeight(canvasWidth)
}

export const handlePrintBleed = (
  canvas,
  data,
  canvasWidth,
  canvasHeight,
  printBleed
) => {
  if (!printBleed) {
    new fabric.Image.fromURL(data, (img) => {
      var img1 = img.set({
        scaleX: canvasWidth / img.width,
        scaleY: canvasHeight / img.height,
        name: "PrintBleed",
        lock: true,
        hasBorders: false,
        selectable: false,
        hoverCursor: "default",
        lockMovementX: true,
        lockMovementY: true,
        opacity: 0.5,
        evented: false
      })
      canvas.add(img1)
      img1.moveTo(-9999)

      canvas.renderAll()
    })
  } else {
    const object = canvas.getObjects()
    object.map((value) => value.name === "PrintBleed" && canvas.remove(value))
  }
}
