export const handleAddTemplate = (canvas, template) => {
  canvas.clear()
  if (template) {
    const jsonObject = JSON.parse(atob(template))
    canvas.loadFromJSON(jsonObject, canvas.renderAll.bind(canvas))
  }
}

export const handleAddTemplateFromUrl = (canvas, base64Tamplate, templates) => {
  canvas.clear()
  let temp = JSON.parse(templates)
  temp?.map(
    (value) =>
      value.id === Number(base64Tamplate) &&
      canvas.loadFromJSON(
        JSON.parse(atob(value.template)),
        canvas.renderAll.bind(canvas)
      )
  )
}
