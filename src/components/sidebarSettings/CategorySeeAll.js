//Packages
import React from "react"
import { Scrollbars } from "react-custom-scrollbars"
import ImageLoader from "../loader/ImageLoader"

function CategorySeeAll(props) {
  const {
    canvas,
    data,
    handleShapeChosen,
    handleBackground,
    resetSeeAllCategoryFlag,
    canvasWidth,
    canvasHeight,
    handleSeeAllClick,
    searchView
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
      {!searchView && (
        <div className="  mx-5  flex justify-between items-center  mt-4 ">
          <div className="text-white font-medium font-Rubik text-lg">
            Graphics
          </div>
          <div
            className=" cursor-pointer  text-sm text-white font-medium font-Rubik"
            onClick={resetSeeAllCategoryFlag}
          >
            Back
          </div>
        </div>
      )}
      <div className="">
        <Scrollbars
          autoHeight={true}
          autoHeightMax={`${
            searchView ? "calc(100vh - 133px)" : "calc(100vh - 110px)"
          }`}
          renderThumbVertical={renderThumb}
          universal={true}
        >
          {data.data.map((elementData, index) => {
            return (
              <div className="mx-5 " key={index}>
                <div
                  className={`flex justify-between items-center mb-1 ${
                    searchView ? "mt-4" : "mt-4"
                  }`}
                >
                  <div className="text-white text-lg font-Rubik font-medium ">
                    {elementData.subCategoryName}
                  </div>
                  {elementData.data.length > 8 && (
                    <div
                      className="text-white   cursor-pointer font-medium text-sm"
                      onClick={() => {
                        handleSeeAllClick(
                          "subCategory",
                          elementData.subCategoryId,
                          elementData.subCategoryName
                        )
                      }}
                    >
                      See All
                    </div>
                  )}
                </div>

                <div
                  className={`p-1 bg-grayEBEBEB rounded-md  grid grid-cols-4`}
                >
                  {elementData.data.slice(0, 8).map((elementSubData, index) => {
                    return (
                      <div key={index}>
                        <ImageLoader
                          activeAction={() =>
                            activeAction(elementSubData, data)
                          }
                          elementData={elementSubData}
                        />
                      </div>
                      // <div className="p-1">
                      //   <LazyLoadImage
                      //     alt={elementSubData.name}
                      //     className={`  w-full h-16   cursor-pointer rounded-xl`}
                      //     src={elementSubData.path}
                      //     onClick={() => activeAction(elementSubData, data)}
                      //     effect="blur"
                      //     threshold={50}
                      //     wrapperClassName="no-inline"
                      //   />
                      // </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </Scrollbars>
      </div>
    </div>
  )
}

export default CategorySeeAll
