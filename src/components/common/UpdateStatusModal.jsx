import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Controller, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { Form, FormFeedback, Input, Label } from "reactstrap";
import * as Yup from "yup";
import { updateStaff } from "../api/ApiRoutesFile";
import ApiFunction from "../api/apiFuntions";
import { setAndUpdateStaff, setDeleteStaff } from "../redux/staff";
import toast from "react-hot-toast";
import { handleError } from "../api/errorHandler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

function UpdateStatusModal({ show, setShow, heading, updateAbleItem }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setShow(false);
  const { put } = ApiFunction();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const apiEndpoint = `${updateStaff}${updateAbleItem?._id}`;
    const apiMethod = put;
    setIsLoading(true);
    try {
      const result = await apiMethod(apiEndpoint, data);
      if (result?.success) {
        if (result?.staff.status === "deleted") {
          dispatch(setDeleteStaff(result?.staff));
        } else {
          dispatch(setAndUpdateStaff(result?.staff));
        }
        toast.success(result?.message);
        navigate("/employee");
        reset();
      }
    } catch (err) {
      handleError(err);
    } finally {
      setShow(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (updateAbleItem?.status) {
      setValue("status", updateAbleItem?.status);
    }
  }, [updateAbleItem]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div className="d-flex justify-content-between align-items-center w-100 p-3">
        <h5 className="mb-0  text_dark inter_semibold text-[1.25rem]">
          {heading || "Update Status"}
        </h5>
        <Button
          variant="link"
          className="p-0 m-0 text-dark"
          onClick={handleClose}
          style={{
            fontSize: "1.5rem",
            lineHeight: "1",
            cursor: "pointer",
          }}
          aria-label="Close"
        >
          <IoMdClose />
        </Button>
      </div>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className={`w-full`}>
            <Label className="form-label" for="status">
              Status
            </Label>
            <Controller
              id="status"
              name="status"
              control={control}
              render={({ field }) => (
                <Input
                  className="text-sm"
                  type="select"
                  {...field}
                  defaultValue={updateAbleItem?.status}
                  invalid={errors.status && true}
                >
                  <option className="text-sm" value="online">
                    Online
                  </option>
                  <option className="text-sm" value="deactivated">
                    Deactivated
                  </option>
                  <option className="text-sm" value="deleted">
                    Deleted
                  </option>
                </Input>
              )}
            />
            {errors.status && (
              <FormFeedback>{errors.status.message}</FormFeedback>
            )}
          </div>
          <div className="mt-3 text-end">
            <Button disabled={isLoading} type="submit" variant="primary">
              {isLoading ? (
                <HashLoader  className="mx-auto"   color="#fff" size={16} />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </Form>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
      </Modal.Body>
    </Modal>
  );
}

export default UpdateStatusModal;
