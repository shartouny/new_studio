export const getActiveText = (canvas) => {
  const textObject = canvas.getActiveObject()
  const fontWeight = textObject?.fontWeight == "bold" ? true : false
  const fontStyle = textObject?.fontStyle == "italic" ? true : false
  const underline = textObject?.underline ? true : false
  const lock = !textObject?.editable ? true : false

  const returnedObject = {
    fontFamily: textObject.fontFamily,
    fontSize: textObject.fontSize,
    color: textObject.fill,
    fontWeight: fontWeight,
    fontStyle: fontStyle,
    underline: underline,
    capitalize:
      textObject.text === textObject.text.toUpperCase() ? true : false,
    textAlign: textObject.textAlign,
    letterSpacing: textObject.__dimensionAffectingProps.charSpacing,
    lineSpacing: textObject.__dimensionAffectingProps.lineHeight,
    opacity: textObject?.opacity ? textObject.opacity * 100 : 100,
    lock: lock
  }
  return returnedObject
}
