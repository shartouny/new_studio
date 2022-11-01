// Packages
import React from "react"
import { useRef } from "react"

const FileUploader = ({
  id,
  className,
  icon,
  placeholder,
  handleFileUpload
}) => {
  const inputFile = useRef(null)

  const handleUploadClick = () => {
    inputFile.current.click()
  }

  return (
    <>
      <div
        className={`cursor-pointer flex items-center justify-center ${className}`}
        onClick={handleUploadClick}
      >
        {icon && (
          <div>
            <img alt="upload-icon" src={icon} />
          </div>
        )}
        {placeholder && <div className="p-1">{placeholder}</div>}
        <input
          id={id}
          onChange={handleFileUpload}
          onClick={(event) => {
            event.target.value = null
          }}
          ref={inputFile}
          style={{ display: "none" }}
          type="file"
        />
      </div>
    </>
  )
}

export default FileUploader
