export const getActiveImage = (imageObject) => {
  const opacity = imageObject.opacity * 100
  const lock = imageObject?.lockMovementX ? true : false

  const returnedObject = {
    opacity: opacity,
    lock: lock
  }
  return returnedObject
}
