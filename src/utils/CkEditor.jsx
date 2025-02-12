/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable implicit-arrow-linebreak */
import React, { useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Spinner } from "reactstrap";
import { message } from "antd";
import { uploadFile } from "../components/api/uploadFile";

const CKEditorComponent = ({ ckData, setCkData }) => {
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const MyUploadAdapter = (loader) => {
    return {
      upload() {
        setLoading(true); // Start loading
        return loader.file.then(
          (file) =>
            new Promise(async (resolve, reject) => {
              try {
                const res = await uploadFile(file);
                if (res?.data?.image) {
                  setLoading(false);
                  message.success("Image uploaded successfully!");
                  resolve({ default: res?.data?.image });
                } else {
                  setLoading(false); // Stop loading on failure
                  message.error("Image upload failed. Invalid response format.");
                  reject("Image upload failed. Invalid response format.");
                }
              } catch (error) {
                setLoading(false);
                message.error("Image upload error. Please try again.");
                reject("Image upload error. Please try again.");
              }
            })
        );
      },
      abort() {
        setLoading(false);
        message.error("Image upload aborted.");
      },
    };
  };

  return (
    <div style={{ position: "relative", borderRadius: "20px" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "1rem",
            borderRadius: "50%",
          }}
        >
          <Spinner />
        </div>
      )}

      {/* CKEditor */}
      <CKEditor
        editor={ClassicEditor}
        data={ckData}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "imageUpload",
            "blockQuote",
            "undo",
            "redo",
          ],
          language: "en",
          image: {
            toolbar: [
              "imageTextAlternative",
              "imageStyle:full",
              "imageStyle:side",
            ],
          },
        }}
        onReady={(editor) => {
          if (editor) {
            editorRef.current = editor;
            editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
              MyUploadAdapter(loader);
          }
        }}
        
        onChange={(event, editor) => {
          const data = editor.getData();
          setCkData(data);
        }}
      />
    </div>
  );
};

export default CKEditorComponent;