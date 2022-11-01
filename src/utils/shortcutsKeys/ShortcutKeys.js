//Packages
import { fabric } from "fabric"

export const handleSelectAll = (canvas) => {
  canvas.discardActiveObject()
  var sel = new fabric.ActiveSelection(
    canvas.getObjects().filter((obj) => obj.lock === false),
    {
      canvas: canvas
    }
  )
  canvas.setActiveObject(sel)
  canvas.requestRenderAll()
}

export const handlePaste = (canvas, objects) => {
  const top = objects[0].top
  const left = objects[0].left
  objects.map((value, index) => {
    const allColors = value?._objects?.map((v) => v.fill)
    const filteredColor = allColors?.filter(
      (v, i) => allColors?.indexOf(v) === i
    )
    const referenceColors = filteredColor?.map((v) =>
      allColors?.filter((value) => v === value)
    )
    let colorIndex = []
    filteredColor?.forEach((color) => {
      let initialIndex = []
      value?._objects?.forEach((object, index) => {
        if (object.fill === color) initialIndex?.push(index)
      })
      colorIndex?.push(initialIndex)
    })
    const referenceColorIndex = colorIndex
    value.clone((cobj) => {
      if (objects.length > 1) {
        cobj.set("top", index === 0 ? top + 280 : value.top + 40)
        cobj.set("left", index === 0 ? left + 280 : value.left + 20)
      } else {
        cobj.set("top", value.top + 40)
        cobj.set("left", value.left + 20)
      }
      cobj.set({
        hasBorders: false,
        borderColor: "#1114",
        cornerColor: "#2B3377",
        cornerSize: 8,
        transparentCorners: false,
        cornerStyle: "circle",
        category: value.category,
        name: value.name + " copy",
        id: value.name + new Date().getTime(),
        lock: false,
        visible: true,
        parentCategory: value.parentCategory,
        referenceColorIndex: referenceColorIndex,
        referenceColor: referenceColors
      })
      canvas.setActiveObject(cobj)
      canvas.add(cobj)
      canvas.item(canvas.size() + 100)
      canvas.renderAll()
    })
  })
  canvas.renderAll()
}

export const handleArrowMovment = (canvas, actionKey) => {
  const objects = canvas.getActiveObjects()
  let count = 0
  if (actionKey === "ArrowUp") {
    objects.map((value) => {
      if (value.lock === false || value.name === "GuidelinesY") {
        count = value.top
        value.set("top", count - 5)
        canvas.renderAll()
      }
    })
  }
  if (actionKey === "ArrowDown") {
    objects.map((value) => {
      if (value.lock === false || value.name === "GuidelinesY") {
        count = value.top
        value.set("top", count + 5)
        canvas.renderAll()
      }
    })
  }
  if (actionKey === "ArrowRight") {
    objects.map((value) => {
      if (value.lock === false || value.name === "GuidelinesX") {
        count = value.left
        value.set("left", count + 5)
        canvas.renderAll()
      }
    })
  }
  if (actionKey === "ArrowLeft") {
    objects.map((value) => {
      if (value.lock == false || value.name === "GuidelinesX") {
        count = value.left
        value.set("left", count - 5)
        canvas.renderAll()
      }
    })
  }
}
