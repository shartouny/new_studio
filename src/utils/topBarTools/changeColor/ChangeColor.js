export const handleChangeColor = (
  canvas,
  elementSelectedColor,
  pickedColor,
  action
) => {
  const objects = canvas.getActiveObjects()
  const r = action === "custome color" && pickedColor.r
  const b = action === "custome color" && pickedColor.b
  const g = action === "custome color" && pickedColor.g
  const a = action === "custome color" && pickedColor.a
  objects.map((object) => {
    if (object) {
      if (object?._objects) {
        object._objects.length > 1
          ? object._objects.map(
              (color, index) =>
                object.referenceColorIndex[elementSelectedColor].includes(
                  index
                ) &&
                color
                  .set(
                    "fill",
                    action === "custome color"
                      ? `rgba(${r}, ${g}, ${b}, ${a})`
                      : pickedColor
                  )
                  .setCoords()
            )
          : console.log("elementSelectedColor")
        object.referenceColor[elementSelectedColor] = object.referenceColor[
          elementSelectedColor
        ].map(() =>
          action === "custome color"
            ? `rgba(${r}, ${g}, ${b}, ${a})`
            : pickedColor
        )
      } else {
        object
          .set(
            "fill",
            action === "custome color"
              ? `rgba(${r}, ${g}, ${b}, ${a})`
              : pickedColor
          )
          .setCoords()
      }
    }
  })
  canvas._historySaveAction()
  canvas.renderAll()
}
