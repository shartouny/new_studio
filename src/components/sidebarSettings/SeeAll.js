//Packages
import React from "react"
import { Scrollbars } from "react-custom-scrollbars"
import ImageLoader from "../loader/ImageLoader"

function SeeAll(props) {
  const {
    canvas,
    data,
    handleShapeChosen,
    handleBackground,
    resetSeeAllFlag,
    canvasWidth,
    canvasHeight,
    seeAll,
    searchTerm
  } = props
  const activeAction = (elementData, data) => {
    switch (data.categorieName) {
      case "Wallpapers":
        handleBackground(elementData.path, "image", canvasWidth, canvasHeight)
        canvas._historySaveAction()

        break
      case "Patterns":
        handleBackground(elementData.path, "image", canvasWidth, canvasHeight)
        canvas._historySaveAction()

        break
      default:
        handleShapeChosen(elementData, data)
        break
    }
  }

  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: `#EBEBEB`,
      opacity: `0.4`
    }
    return (
      <div
        className="rounded-xl"
        style={{ ...style, ...thumbStyle }}
        {...props}
      />
    )
  }
  return (
    <div>
      <div className=" mx-5  flex justify-between items-center  my-4 ">
        <div className="text-white font-medium font-Rubik text-lg">
          {seeAll.name}
        </div>
        <div
          className=" cursor-pointer  text-sm text-white font-medium font-Rubik"
          onClick={() =>
            resetSeeAllFlag(
              searchTerm === "" ? (data?.subCategoryName ? true : false) : false
            )
          }
        >
          Back
        </div>
      </div>
      <div className="">
        <Scrollbars
          autoHeight={true}
          autoHeightMax={"calc(100vh - 120px)"}
          renderThumbVertical={renderThumb}
          universal={true}
        >
          <div
            className={` mx-5  p-1 bg-grayEBEBEB rounded-md  grid grid-cols-4`}
          >
            {data.data.map((elementData, index) => {
              return (
                <div key={index}>
                  <ImageLoader
                    activeAction={() => activeAction(elementData, data)}
                    elementData={elementData}
                    //  className="h-16 w-16"
                  />
                </div>
              )
            })}
          </div>
        </Scrollbars>
      </div>
    </div>
  )
}

export default SeeAll
