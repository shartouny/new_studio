import { getLayers, handleDeleteLayer } from "../../helpers/GetLayers"

export const handleDownload = (canvas, canvasWidth) => {
  let layers = getLayers(canvas)

  layers = layers.filter(
    (layer) =>
      layer.name === "GuidelinesY" ||
      layer.name === "GuidelinesX" ||
      layer.name === "PrintBleed"
  )

  layers.map((layer) => handleDeleteLayer(canvas, layer))

  const image = canvas
    .toDataURL({
      format: "png",
      multiplier: canvasWidth / canvas.getWidth()
    })
    .replace("image/png", "image/octet-stream")

  const link = document.createElement("a")
  link.download = "my-image.png"
  link.href = image
  link.click()
}

export const handleNext = (canvas, canvasWidth) => {
  let layers = getLayers(canvas)

  layers = layers.filter(
    (layer) =>
      layer.name === "GuidelinesY" ||
      layer.name === "GuidelinesX" ||
      layer.name === "PrintBleed"
  )

  layers.map((layer) => handleDeleteLayer(canvas, layer))

  const image = canvas.toDataURL({
    format: "png",
    multiplier: canvasWidth / canvas.getWidth()
  })
  let data = new Date().getTime()
  var file = dataURLtoFile(image, `teelaunch-studio-${data}.png`)
  window.parent.postMessage({ file: file, status: "Done" }, "*")
}

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: "image/png" })
}
