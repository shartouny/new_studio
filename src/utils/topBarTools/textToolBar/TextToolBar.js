import { getActiveText } from "../../../helpers/GetActiveText"

export const handleFontFmaily = (canvas, value) => {
  const object = canvas.getActiveObjects()
  object.map((v) => v.set({ fontFamily: value }))
  canvas.renderAll()
}

export const handleFontSize = (canvas, value) => {
  const object = canvas.getActiveObjects()
  object.map((v) => {
    if (value <= 600) {
      v.set({ fontSize: value })
      canvas.renderAll(canvas)
      canvas.viewportCenterObjectH(v)
    }
  })
}

export const handleTextFormate = (canvas, action, value, setTextFormate) => {
  const object = canvas.getActiveObjects()
  let activeText = getActiveText(canvas)
  if (action === "bold") {
    if (activeText?.fontWeight) {
      object.map((v) => v.set({ fontWeight: "normal" }))
      setTextFormate({ isBold: false })
    } else {
      object.map((v) => v.set({ fontWeight: value }))
      setTextFormate({ isBold: true })
    }
  } else if (action === "italic") {
    if (activeText?.fontStyle) {
      object.map((v) => v.set({ fontStyle: "normal" }))
      setTextFormate({ isItalic: false })
    } else {
      object.map((v) => v.set({ fontStyle: value }))
      setTextFormate({ isItalic: true })
    }
  } else if (action === "underline") {
    if (activeText?.underline) {
      object.map((v) => v.set({ underline: false }))
      setTextFormate({ isUnderline: false })
    } else {
      object.map((v) => v.set({ underline: true }))
      setTextFormate({ isUnderline: true })
    }
  }
  canvas.renderAll()
}

export const handleCapitalize = (canvas, textFormate, setTextFormate) => {
  const object = canvas.getActiveObjects()
  if (textFormate) {
    object.map((v) => (v.text = v.text.toLowerCase()))
    setTextFormate({ isCapitalize: false })
  } else {
    object.map((v) => (v.text = v.text.toUpperCase()))
    setTextFormate({ isCapitalize: true })
  }
  canvas.renderAll()
}

export const handleTextAlignment = (canvas, action) => {
  const object = canvas.getActiveObjects()
  object.map((v) => v.set("textAlign", "right"))
  if (action === "left") object.map((v) => v.set("textAlign", "left"))
  else if (action === "right") object.map((v) => v.set("textAlign", "right"))
  else if (action === "center") object.map((v) => v.set("textAlign", "center"))
  else if (action === "justify")
    object.map((v) => v.set("textAlign", "justify"))

  canvas.renderAll()
}

export const handleLetterSpacing = (canvas, value) => {
  const object = canvas.getActiveObjects()
  object.map((v) => v.set("charSpacing", value))
  canvas.renderAll()
}

export const handleLineHeight = (canvas, value) => {
  const object = canvas.getActiveObjects()
  object.map((v) => v.set("lineHeight", value))
  canvas.renderAll()
}
