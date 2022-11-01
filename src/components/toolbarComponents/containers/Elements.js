//Packages
import React from "react"

//Components
import Colors from "@Components/toolbarComponents/function/Colors"

function ElementsToolbar(props) {
  const { allColors, handleChangeElementColor, elementSelectedColor } = props
  return (
    <div className="flex  h-16 justify-center items-center   ">
      {allColors && (
        <Colors
          allColors={allColors}
          elementSelectedColor={elementSelectedColor}
          handleChangeElementColor={handleChangeElementColor}
        />
      )}
    </div>
  )
}

export default ElementsToolbar
