//Packages
import React from "react"

//Assets
import { ReactComponent as EffectIcon } from "@Assets/toolbarIcons/BackgroundElement/effect.svg"

function Effect(props) {
  const { horizontalHover, handleMouseOver, handleMouseOut, viewSettings } =
    props
  return (
    <div
      className="mx-4 flex flex-col justify-center items-center "
      onClick={() => viewSettings("effects")}
      onMouseOut={() => handleMouseOut("effects")}
      onMouseOver={() => handleMouseOver("effects")}
    >
      <EffectIcon className=" fill-selected cursor-pointer z-10" />
      <div
        className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
          horizontalHover === "effects"
            ? `text-purple2B3377`
            : `text-transparent`
        }`}
      >
        <div className="relative top-6">Effects</div>
      </div>
    </div>
  )
}

export default Effect
