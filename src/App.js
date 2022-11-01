// imports
import Main from "./Main"
import "./App.css"
import "react-lazy-load-image-component/src/effects/blur.css"

import React, { useEffect, useState } from "react"

function App() {
  const [loading, setLoading] = useState(true)
  const [canvasWidth, setCanvasWidth] = useState(550)
  const [canvasHeight, setCanvasHeight] = useState(650)

  const [canvasType, setCanvasType] = useState("both")
  const [base64Tamplate, setBase64Tamplate] = useState()

  const [printBleedImg, setPrintBleedImg] = useState("")


  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)

    const configObject = queryParams.get("config")
    if (configObject) {
      const configJson = JSON.parse(atob(configObject))
      setCanvasWidth(configJson.width)
      setCanvasHeight(configJson.height)
      setCanvasType(configJson.stage)
      setPrintBleedImg(configJson.printBleed)
    }
    const template = queryParams.get("template")
    setLoading(false)
    template && setBase64Tamplate(template)
  }, [loading])

  return (
    <>
      {!loading && (
        <Main
          base64Tamplate={base64Tamplate}
          canvasHeight={canvasHeight}
          canvasType={canvasType}
          canvasWidth={canvasWidth}
          printBleedImg={printBleedImg}
          setCanvasHeight={setCanvasHeight}
          setCanvasType={setCanvasType}
          setCanvasWidth={setCanvasWidth}
        />
      )}
    </>
  )
}

export default App
