//Alignments
export const handleAlignment = (canvas, action) => {
  const object = canvas.getActiveObject()
  if (object) {
    const viwePortCoords = canvas.vptCoords
    if (action === "alignLeft") object.set("left", 0).setCoords()
    else if (action === "alignRight")
      object
        .set({ left: viwePortCoords.br.x - object.width * object.scaleX })
        .setCoords()
    else if (action === "top") object.set("top", 0).setCoords()
    else if (action === "bottom")
      object
        .set({ top: viwePortCoords.br.y - object.height * object.scaleY })
        .setCoords()
    else if (action === "centerHorizontaly")
      canvas.viewportCenterObjectH(object)
    else if (action === "centerVertically") canvas.viewportCenterObjectV(object)
  }
  canvas.renderAll()
}

//Delete
export const handleDelete = (canvas) => {
  const object = canvas.getActiveObjects()
  object.map((value) => value.lock === false && canvas.remove(value))
  canvas.discardActiveObject().renderAll()
}

//Duplicate
export const handleDuplicate = (canvas) => {
  var isGroupSelected = false
  var groupObj = []
  canvas.getActiveObject().clone(
    function (clonedObj) {
      canvas.discardActiveObject()
      if (clonedObj.type == "activeSelection") {
        isGroupSelected = true
        // active selection needs a reference to the canvas.
        clonedObj.canvas = canvas
        clonedObj.forEachObject(function (obj) {
          groupObj.push(obj)
          //remove obj from the group
          clonedObj.removeWithUpdate(obj)
          const allColors = obj?._objects?.map((v) => v.fill)
          const filteredColor = allColors?.filter(
            (v, i) => allColors?.indexOf(v) === i
          )
          const referenceColors = filteredColor?.map((v) =>
            allColors?.filter((value) => v === value)
          )
          let colorIndex = []
          filteredColor?.forEach((color) => {
            let initialIndex = []
            obj?._objects?.forEach((object, index) => {
              if (object.fill === color) initialIndex?.push(index)
            })
            colorIndex?.push(initialIndex)
          })
          const referenceColorIndex = colorIndex

          obj.name = obj.name + " copy"
          obj.id = obj.name + new Date().getTime()
          obj.referenceColorIndex = referenceColorIndex
          obj.referenceColor = referenceColors
          obj.set({
            left: obj.left + 20,
            top: obj.top + 40
          })
          canvas.add(obj)
        })
      } else {
        //signle object duplicate
        const allColors = clonedObj?._objects?.map((v) => v.fill)
        const filteredColor = allColors?.filter(
          (v, i) => allColors?.indexOf(v) === i
        )
        const referenceColors = filteredColor?.map((v) =>
          allColors?.filter((value) => v === value)
        )
        let colorIndex = []
        filteredColor?.forEach((color) => {
          let initialIndex = []
          clonedObj?._objects?.forEach((object, index) => {
            if (object.fill === color) initialIndex?.push(index)
          })
          colorIndex?.push(initialIndex)
        })
        const referenceColorIndex = colorIndex

        clonedObj.name = clonedObj.name + " copy"
        clonedObj.id = clonedObj.name + new Date().getTime()
        clonedObj.left = clonedObj.left + 10
        clonedObj.top = clonedObj.top + 10
        clonedObj.referenceColorIndex = referenceColorIndex
        clonedObj.referenceColor = referenceColors
        canvas.add(clonedObj)
      }

      //recreate selection if is was a group else select single object if isn't a group
      if (isGroupSelected) {
        var sel = new fabric.ActiveSelection(groupObj, {
          canvas: canvas
        })
        canvas.setActiveObject(sel)
      } else canvas.setActiveObject(clonedObj)
      canvas.requestRenderAll()
    },
    [
      "name",
      "id",
      "category",
      "parentCategory",
      "data",
      "data.data.text",
      "data.data.placeholder",
      "hasBorders",
      "borderColor",
      "cornerColor",
      "cornerSize",
      "transparentCorners",
      "cornerStyle",
      "lock",
      "lockMovementX",
      "lockMovementY",
      "selectable",
      "evented",
      "referenceColorIndex",
      "referenceColor"
    ]
  )
}

//Flip
export const handleFlip = (
  canvas,
  action,
  isFlipSelected,
  setIsFlipSelected
) => {
  const object = canvas.getActiveObject()
  if (object) {
    if (action === "flipX") {
      if (!isFlipSelected.flipX) {
        object.set({ flipX: false }).setCoords()
        setIsFlipSelected({ flipX: true, flipY: isFlipSelected.flipY })
      } else {
        object.set({ flipX: true }).setCoords()
        setIsFlipSelected({ flipX: false, flipY: isFlipSelected.flipY })
      }
    } else if (action === "flipY") {
      if (!isFlipSelected.flipY) {
        object.set("flipY", false).setCoords()
        setIsFlipSelected({ flipX: isFlipSelected.flipX, flipY: true })
      } else {
        object.set("flipY", true).setCoords()
        setIsFlipSelected({ flipX: isFlipSelected.flipX, flipY: false })
      }
    }
  }
  canvas.renderAll()
}

//Opacity
export const handleOpacity = (canvas, value) => {
  const objects = canvas.getActiveObjects()
  objects && objects.map((v) => v.set({ opacity: value }))

  canvas.renderAll()
}

//Position
export const handlePosition = (canvas, action) => {
  const object = canvas.getActiveObject()
  if (object) {
    if (action === "sendToBack") canvas.sendToBack(object)
    else if (action === "bringToFront") canvas.bringToFront(object)
    else if (action === "sendBackward") canvas.sendBackwards(object)
    else if (action === "bringForward") canvas.bringForward(object)
  }
  canvas._historySaveAction()
  canvas.renderAll()
}

export const handleLock = (canvas) => {
  const objects = canvas.getActiveObjects()
  if (objects) {
    objects.map((object) => {
      if (object.hasBorders) {
        object.set({
          hasControls: true,
          hasBorders: false,
          lockMovementY: false,
          lockMovementX: false,
          selectable: true,
          lock: false
        })
      } else {
        object.set({
          hasControls: false,
          hasBorders: true,
          lockMovementY: true,
          lockMovementX: true,
          borderColor: "blue",
          evented: true,
          editable: false,
          selectable: false,
          lock: true
        })
        canvas.discardActiveObject()
      }
    })
  }
  canvas.renderAll()
}
