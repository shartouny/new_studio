import { handleBackground } from "../../utils/backgrounds/Background"
export const zoom = (
  canvas,
  zoomValue,
  type,
  canvasWidth,
  canvasHeight,
  setZoomValue,
  lastBackgroundImage,
  setLastBackgroundImage
) => {
  canvas.setZoom(zoomValue)
  canvas.setHeight(canvasHeight * zoomValue)
  canvas.setWidth(canvasWidth * zoomValue)

  handleBackground(
    canvas,
    lastBackgroundImage,
    "image",
    setLastBackgroundImage,
    canvasWidth,
    canvasHeight
  )
}
