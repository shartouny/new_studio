// Packages
import React, { useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"

function ImageLoader(props) {
  const { activeAction, elementData, className } = props
  const [loading, setloading] = useState(true)
  return (
    <div className="p-1">
      {loading ? (
        <div className={` absolute  ${className ? className : "post"}`}>
          <div
            className={`${className ? className : "avatar1"} avatar rounded-md`}
          ></div>
        </div>
      ) : (
        ""
      )}
      <LazyLoadImage
        afterLoad={() => {
          setloading(false)
        }}
        // w-full h-16
        alt={elementData.name}
        className={`cursor-pointer rounded-md ${
          className ? className : "w-full h-16"
        }`}
        effect="blur"
        onClick={activeAction}
        src={elementData.path}
        threshold={150}
        wrapperClassName="no-inline"
      />
    </div>
  )
}

export default ImageLoader
