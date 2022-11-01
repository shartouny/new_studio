export const GetShapeColor = (object) => {
  let obj = {}
  //function that return a svg colors
  if (object?._objects) {
    const filteredColor = object.referenceColor?.map((v) => v[0])
    const opacity = object?.opacity ? object.opacity * 100 : 100
    const lock = object?.lockMovementX ? true : false
    obj = {
      filteredColor: filteredColor,
      opacity: opacity,
      lock: lock
    }
  } else {
    const filteredColor = [object.fill]
    const lock = object?.lockMovementX ? true : false
    const opacity = object?.opacity ? object.opacity * 100 : 100
    obj = {
      filteredColor,
      opacity: opacity,
      lock: lock
    }
  }
  return obj
}
