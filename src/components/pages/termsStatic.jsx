/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import CKEditorComponent from "../../utils/CkEditor";
import { privacyPages } from "../api/ApiRoutesFile";
import ApiFunction from "../api/apiFuntions";
import { handleError } from "../api/errorHandler";

const TermsStatic = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [description, setDescription] = useState("");
  const { post, get } = ApiFunction()

  useEffect(() => {
    setDescription(terms?.des);
  }, [showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      des: description,
    };
    setIsProcessing(true);
    try {
      const endpoint = `${privacyPages}/terms`
      const res = await post(endpoint, formData);
      if (res?.success) {
        message.success("Content added Successfully");
        fetchData();
        setShowModal(false);
        setDescription("");
      } else {
        message.error("Failed to added Content");
        setShowModal(false);
        setDescription("");
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCKEditor = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const fetchData = async () => {
    const endpoint = `${privacyPages}/terms`
    setLoading(true);
    try {
      const res = await get(endpoint)
      if (res?.success) {
        setTerms(res?.terms);
      } else {
        setTerms([]);
      }
    }
    catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="min-h-screen container-fluid p-3 p-lg-5 mx-auto">
      <div className="flex justify-between mb-4 gap-3 items-center w-full">
        <h4 className="poppins_medium text_black">Terms & Conditions</h4>
        <button
          onClick={() => {
            setShowModal(true)
          }}
          style={{ width: "150px" }}
          className="bg_primary py-2 rounded-3 text_white poppins_medium"
        >
          Add Content
        </button>
      </div>
      {
        loading ? (
          <main className="my-5 d-flex w-100 justify-content-center align-items-center">
            <HashLoader  className="mx-auto"   size={24} color="#1857d2" />
          </main>
        ) : !terms || terms.length === 0 ? (
          <main className="my-5 d-flex w-100 justify-content-center align-items-center">
            <span className="text_secondary poppins_medium">No Content Found</span>
          </main>
        ) : (
          <div className="bg_white rounded-3 p-4 ">
            <div className="poppins_regular" dangerouslySetInnerHTML={{ __html: terms?.des }}></div>
          </div>
        )
      }
      <Modal
        size="xl"
        centered
        style={{ zIndex: 99999, height: '100%', overflow: 'auto' }}
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Body style={{ maxHeight: '90vh', height: '100%', overflow: 'auto' }}>
          <Modal.Header closeButton />
          <Form
            onSubmit={handleSubmit}
            className="w-full"
          >
            <Form.Group className="shadow_def px-3 my-3">
              <h5 className="poppins_medium mb-2 text_dark">
                Description
              </h5>
              <CKEditorComponent ckData={description} setckData={setDescription} />
            </Form.Group>
            <div className="flex justify-content-end my-4 w-100">
              {!isProcessing ? (
                <button
                  type="submit"
                  className="flex justify-center bg_primary py-3 px-4 rounded-3 items-center"
                >
                  <span className="poppins_medium text_white">
                    Add Content
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isProcessing}
                  className="flex justify-center bg_primary py-3 px-5 rounded-3 items-center"
                >
                  <HashLoader  className="mx-auto"   size={18} color="#fff" />
                </button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </main >
  );
};

export default TermsStatic;
