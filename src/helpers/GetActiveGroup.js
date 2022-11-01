export const getActiveGroup = (canvas) => {
  const objects = canvas.getActiveObjects()
  const test = objects.map((value) => value.get("type"))
  const textBox = test.every((value) => value === "textbox")
  const shape = test.every(
    (value) => value === "group" || value === "circle" || value === "rect"
  )
  const image = test.every((value) => value === "image")
  const result = {
    textBox: textBox,
    shape: shape,
    image: image
  }
  return result
}
