//Packages
import React from "react"

//Assets
import { ReactComponent as BulletPointsIcon } from "@Assets/toolbarIcons/TextElement/BulletPoints.svg"

function BulletPoints(props) {
  const {
    horizontalHover,
    handleMouseOver,
    handleMouseOut
    // handleBulletPoint
  } = props
  return (
    <div
      className="mx-4 flex flex-col justify-center items-center"
      onMouseOut={() => handleMouseOut("bulletPoints")}
      onMouseOver={() => handleMouseOver("bulletPoints")}
      // onClick={() => handleBulletPoint()}
    >
      <BulletPointsIcon className="fill-selected cursor-pointer z-50" />
      <div
        className={` absolute cursor-pointer  font-Rubik text-xs font-medium text-center  ${
          horizontalHover === "bulletPoints"
            ? `text-purple2B3377`
            : `text-transparent`
        }`}
      >
        <div className="relative top-6">Bullet Points</div>
      </div>
    </div>
  )
}

export default BulletPoints
