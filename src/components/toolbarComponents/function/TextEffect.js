//Packages
import React from "react"

//Assets
import { ReactComponent as EffectIcon } from "@Assets/toolbarIcons/BackgroundElement/effect.svg"

function TextEffect(props) {
  const { horizontalHover, handleMouseOver, handleMouseOut, viewSettings } =
    props
  return (
    <div
      className="mx-4 flex flex-col justify-center items-center "
      onMouseOut={() => handleMouseOut("textEffects")}
      onMouseOver={() => handleMouseOver("textEffects")}
      onClick={() => viewSettings("textEffects")}
    >
      <EffectIcon className=" fill-selected cursor-pointer z-50" />
      <div
        className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
          horizontalHover === "textEffects"
            ? `text-purple2B3377`
            : `text-transparent`
        }`}
      >
        <div className="relative top-6">Effects</div>
      </div>
    </div>
  )
}

export default TextEffect
