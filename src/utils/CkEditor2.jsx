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

  class MyUploadAdapter {
    constructor(loader) {
      this.loader = loader;
    }

    upload() {
      return this.loader.file.then(async (file) => {
        setLoading(true);
        try {
          const res = await uploadFile(file);
          if (res?.data?.image) {
            setLoading(false);
            message.success("Image uploaded successfully!");
            return { default: res?.data?.image };
          } else {
            setLoading(false);
            message.error("Image upload failed.");
            throw new Error("Invalid response format");
          }
        } catch (error) {
          setLoading(false);
          message.error("Image upload error. Please try again.");
          throw error;
        }
      });
    }

    abort() {
      setLoading(false);
      message.error("Image upload aborted.");
    }
  }

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
              new MyUploadAdapter(loader);
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
