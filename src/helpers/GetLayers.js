export const getLayers = (canvas) => {
  const objects = canvas.getObjects()
  return objects
}

export const handleSetVisible = (canvas, layer, index) => {
  if (layer.visible === true) {
    layer.set({ visible: false })
    canvas.discardActiveObject()
    canvas.renderAll()
  } else {
    layer.set({ visible: true })
    canvas.setActiveObject(canvas.item(index)).renderAll()
    canvas.renderAll()
  }
}

export const handleDeleteLayer = (canvas, layer) => {
  canvas.remove(layer)
  canvas.discardActiveObject().renderAll()
}
