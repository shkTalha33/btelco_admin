import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { IoClose } from 'react-icons/io5';
import HashLoader from 'react-spinners/HashLoader';

function DeleteModel(props) {
    const { deleteItem, onHide, loading, sureText } = props;
  
    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="p-3">
          <div className="flex justify-between items-center mb-3">
            <span className="poppins_medium">{sureText} </span>
            <span
              title="Close"
              onClick={onHide}
              className="p-1 rounded-full cursor-pointer bg_primaryLight"
            >
              <IoClose className="w-[20px] h-[20px]" />
            </span>
          </div>
          <div className="flex justify-end items-center gap-2">
            <button
              disabled={loading}
              onClick={() => {
                deleteItem();
              }}
              className="btn btn-danger"
            >
                {loading ? <HashLoader  className="mx-auto"   color="#fff" size={16} /> : "Delete"}
            </button>
            <button
              title="Close"
              onClick={onHide}
              className="btn btn-dark"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    );
  }
  
export default DeleteModel;