export const GetSelectedObjects = (canvas) => {
  const object = canvas.getActiveObject()
  if (object) return object
  else return []
}
