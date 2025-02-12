import React from "react";
import { Controller } from "react-hook-form";
import { Input, FormFeedback } from "reactstrap";
import { RiImage2Line } from "react-icons/ri";
import HashLoader from "react-spinners/HashLoader";

const FileUpload = ({
  control,
  name,
  imageUrl,
  setImageUrl,
  fileLoading,
  handleFileChange,
  label,
  error,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <div className="file-upload w-full mb-3 position-relative">
          <label
            htmlFor={`${name}Input`}
            style={{ cursor: "pointer", display: "flex" }}
            className="file-upload-label"
          >
            {fileLoading ? (
              <div className="file-upload-loading w-full border rounded-4 py-[3.5rem] bg_light text_primary d-flex justify-content-center align-items-center">
                <HashLoader  className="mx-auto"   color="#1857d2" size={35} />
              </div>
            ) : (
              <div className="file-upload-preview rounded-4 w-full text_black relative flex gap-3 justify-start items-center">
                <span className="w-1/4">{label}</span>
                <div className="file-upload-image bg-[#F8F8FD] w-3/4 h-[150px] text-sm rounded-lg flex justify-center items-center border border-dashed">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Preview"
                      style={{
                        objectFit: "cover",
                        height: "150px",
                        width: "100%",
                      }}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="file-upload-placeholder flex flex-col text-center m-2 justify-center items-center">
                      <RiImage2Line size={"20px"} />
                      <span className="text-xs poppins_regular my-2">
                        Click to replace <span className="text-[#7C8493]"> or drag and drop</span>
                      </span>
                      <span className="text-xs text-[#7C8493]">
                        SVG, PNG, JPG or GIF (max. 400 x 400px)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </label>
          <Input
            type="file"
            name={name}
            id={`${name}Input`}
            accept="image/*"
            className={`visually-hidden ${error ? "is-invalid" : ""}`}
            onChange={(event) => {
              handleFileChange(event, setImageUrl);
              onChange(event.target.files);
            }}
          />
          {error && <FormFeedback style={{ display: "block" }}>{error.message}</FormFeedback>}
        </div>
      )}
    />
  );
};

export default FileUpload;
