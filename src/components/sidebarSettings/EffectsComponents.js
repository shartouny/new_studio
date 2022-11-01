//Packages
import React from "react"

//Components
import Slider from "@Components/inputs/Slider"

//Utils
import { handleEffect } from "@Utils/topBarTools/backgroundToolBar/BackgroundToolBar"

function EffectsComponents(props) {
  const { canvas, drawRef, effects, setEffects } = props

  return (
    <div>
      {/* Vibrance */}
      <div className="text-base font-medium text-purple2B3377 font-Rubik">
        Vibrance
      </div>
      <div className="text-base font-medium text-purple2B3377 font-Rubik">
        <Slider
          max={100}
          min={-100}
          onChange={(e) => {
            setEffects((prev) => {
              return { ...prev, vibrance: e.target.value }
            })
            handleEffect(drawRef, canvas, e.target.value, "Vibrance")
          }}
          step={1}
          unit={"%"}
          value={effects.vibrance}
          viewedValue={effects.vibrance}
        />
      </div>
      {/* Contrast */}
      <div className="text-base font-medium text-purple2B3377 font-Rubik">
        Contrast
      </div>
      <div className="text-base font-medium text-purple2B3377 font-Rubik">
        <Slider
          max={100}
          min={-100}
          onChange={(e) => {
            setEffects((prev) => {
              return { ...prev, contrast: e.target.value }
            })
            handleEffect(drawRef, canvas, e.target.value, "Contrast")
          }}
          step={1}
          unit={"%"}
          value={effects.contrast}
          viewedValue={effects.contrast}
        />
      </div>
      {/* Saturation */}
      <div className="text-base font-medium text-purple2B3377 font-Rubik">
        Saturation
      </div>
      <div className="text-base font-medium text-purple2B3377 font-Rubik">
        <Slider
          max={100}
          min={-100}
          onChange={(e) => {
            setEffects((prev) => {
              return { ...prev, saturation: e.target.value }
            })
            handleEffect(drawRef, canvas, e.target.value, "Saturation")
          }}
          step={1}
          unit={"%"}
          value={effects.saturation}
          viewedValue={effects.saturation}
        />
      </div>
      {/* Tint */}
      <div className="text-base font-medium text-purple2B3377 font-Rubik">
        Tint
      </div>
      <div className="text-base font-medium text-purple2B3377 font-Rubik">
        <Slider
          max={100}
          min={-100}
          onChange={(e) => {
            setEffects((prev) => {
              return { ...prev, tint: e.target.value }
            })
            handleEffect(drawRef, canvas, e.target.value, "Tint")
          }}
          step={1}
          unit={"%"}
          value={effects.tint}
          viewedValue={effects.tint}
        />
      </div>
      {/* Highlights */}
      <div className="text-base font-medium text-purple2B3377 font-Rubik">
        Highlights
      </div>
      <div className="text-base font-medium text-purple2B3377 font-Rubik">
        <Slider
          max={100}
          min={0}
          onChange={(e) => {
            setEffects((prev) => {
              return { ...prev, highlights: e.target.value }
            })
            handleEffect(drawRef, canvas, e.target.value, "Highlights")
          }}
          step={1}
          unit={"%"}
          value={effects.highlights}
          viewedValue={effects.highlights}
        />
      </div>
    </div>
  )
}

export default EffectsComponents
