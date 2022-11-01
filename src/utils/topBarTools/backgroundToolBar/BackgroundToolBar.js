//Packages
import { fabric } from "fabric"

export const handleFilter = (
  canvas,
  action,
  lastBackgroundImage,
  setIsFilterSelected,
  isFilterSelected,
  draw
) => {
  const object = canvas.setBackgroundColor().backgroundImage
  if (action === "Grayscale" && isFilterSelected.Grayscale) {
    const filter = new fabric.Image.filters.Grayscale()
    draw["matrix"] = filter
    setIsFilterSelected({
      Grayscale: false,
      Kodachrome: true,
      Technicolor: true,
      Sepia: true,
      Polaroid: true
    })
  } else if (action === "None") {
    fabric.Image.fromURL(lastBackgroundImage, function (img) {
      var canvasAspect = canvas.getWidth() / canvas.getHeight()
      var imgAspect = img.width / img.height
      var left, top, scaleFactor

      if (canvasAspect >= imgAspect) {
        scaleFactor = canvas.getWidth() / img.width
        left = 0
        top = -(img.height * scaleFactor - canvas.getHeight()) / 2
      } else {
        scaleFactor = canvas.getHeight() / img.height
        top = 0
        left = -(img.width * scaleFactor - canvas.getWidth()) / 2
      }
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        top: top,
        left: left,
        originX: "left",
        originY: "top",
        scaleX: Math.ceil(scaleFactor * 100) / 100,
        scaleY: Math.ceil(scaleFactor * 100) / 100
      })
      setIsFilterSelected({
        Grayscale: true,
        Kodachrome: true,
        Technicolor: true,
        Sepia: true,
        Polaroid: true
      })
    })
  } else if (action === "Sepia" && isFilterSelected.Sepia) {
    const filter = new fabric.Image.filters.Sepia()
    draw["matrix"] = filter
    setIsFilterSelected({
      Sepia: false,
      Kodachrome: true,
      Technicolor: true,
      Grayscale: true,
      Polaroid: true
    })
  } else if (action === "Kodachrome" && isFilterSelected.Kodachrome) {
    const filter = new fabric.Image.filters.Kodachrome()
    draw["matrix"] = filter
    setIsFilterSelected({
      Kodachrome: false,
      Grayscale: true,
      Technicolor: true,
      Sepia: true,
      Polaroid: true
    })
  } else if (action === "Technicolor" && isFilterSelected.Technicolor) {
    const filter = new fabric.Image.filters.Technicolor()
    draw["matrix"] = filter
    setIsFilterSelected({
      Technicolor: false,
      Kodachrome: true,
      Grayscale: true,
      Sepia: true,
      Polaroid: true
    })
  } else if (action === "Polaroid" && isFilterSelected.Polaroid) {
    const filter = new fabric.Image.filters.Polaroid()
    draw["matrix"] = filter
    setIsFilterSelected({
      Polaroid: true,
      Kodachrome: true,
      Technicolor: true,
      Sepia: true,
      Grayscale: true
    })
  }
  object.filters = Object.values(draw)
  object.applyFilters()
  canvas.renderAll()
}

export const handleEffect = (draw, canvas, value, action) => {
  const object = canvas.setBackgroundColor().backgroundImage

  if (action === "Contrast") {
    const filter = new fabric.Image.filters.Contrast({
      contrast: parseFloat(value) / 100
    })

    draw["Contrast"] = filter
  } else if (action === "Saturation") {
    const filter = new fabric.Image.filters.Saturation({
      saturation: parseFloat(value) / 1000
    })

    draw["Saturation"] = filter
  } else if (action === "Vibrance") {
    const filter = new fabric.Image.filters.Vibrance({
      vibrance: parseFloat(value) / 10
    })

    draw["Vibrance"] = filter
  } else if (action === "Tint") {
    const filter = new fabric.Image.filters.BlendColor({
      color: "#1111",
      mode: "tint",
      alpha: value / 100
    })

    draw["Tint"] = filter
  } else if (action === "Highlights") {
    const filter = new fabric.Image.filters.BlendColor({
      color: "#fff",
      mode: "lighten",
      alpha: value / 100
    })
    draw["Highlights"] = filter
  } else if (action === "Multiply") {
    const filter = new fabric.Image.filters.BlendColor({
      color: "#fff",
      mode: "multiply",
      alpha: value / 1000
    })
    draw["Multiply"] = filter
  }
  object.filters = Object.values(draw)
  object.applyFilters()
  canvas.renderAll()
}
