import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  ModalFooter,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import ApiFunction from "../api/apiFuntions";
import {
  emailConfigureGet,
  emailConfigureSend,
  getCompanies,
} from "../api/ApiRoutesFile";
import debounce from "debounce";
import { handleError } from "../api/errorHandler";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CKEditorComponent from "../../utils/CkEditor";
import HashLoader from "react-spinners/HashLoader";

export default function EmailFirm() {
  const [ckData, setCkData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firmData, setFirmData] = useState([]);
  const [lastId, setLastId] = useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);

  const { get, post } = ApiFunction();
  const navigate = useNavigate()

  const emailConfiguration = debounce(async () => {
    await get(emailConfigureGet)
      .then((result) => {
        if (result?.success) {
          setShowEditor(true);
        }
      })
      .catch((err) => {
        // console.error(err);
      });
  }, 300);

  useEffect(() => {
    emailConfiguration();
  }, []);

  const getAllCompanies = debounce(async () => {
    setLoading(true);
    await post(`${getCompanies}/${lastId}`)
      .then((result) => {
        if (result?.success) {
          setFirmData((prevFirms) => [...prevFirms, ...result?.users]);
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);

  useEffect(() => {
    getAllCompanies();
  }, [lastId]);

  const schema = Yup.object().shape({
    subject: Yup.string().required("Subject is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (selectedEmails.length === 0) {
      toast.error("Please select at least one email.");
      return;
    }

    if (!ckData) {
      toast.error("Description Cannot Be Empty");
      return;
    }
    const dataToSend = {
      email: selectedEmails.map((emailObj) => emailObj.email),
      subject: data.subject,
      html: ckData,
    };

    setIsLoading(true);
    await post(emailConfigureSend, dataToSend)
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setIsLoading(false);
        reset();
        setSelectedEmails([]);
        setCkData("");
      });
  };

  const handleEmailSelect = (firm) => {
    setSelectedEmails((prev) => {
      const exists = prev.some((item) => item.email === firm.email);
      if (exists) {
        // Remove the email if already selected
        return prev.filter((item) => item.email !== firm.email);
      } else {
        return [...prev, firm];
      }
    });
  };

  const isEmailSelected = (email) => {
    return selectedEmails.some((item) => item.email === email);
  };

  const handleRemoveEmail = (email) => {
    setSelectedEmails((prev) => prev.filter((item) => item.email !== email));
  };

  return (
    <>
      <main className="min-h-screen email-firm poppins_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <Container
          fluid
          className="px-[1rem] md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full"
        >
          <h4 className="inter_medium mb-4 text_darkprimary">Create Email</h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="12" className="mb-3 flex flex-col w-full">
                <Label className="form-label" for="subject">
                  Subject
                </Label>
                <Controller
                  id="subject"
                  name="subject"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      disabled={!showEditor}
                      {...field}
                      placeholder="Enter Subject"
                      invalid={errors.subject && true}
                    />
                  )}
                />
                {errors.subject && (
                  <FormFeedback>{errors.subject.message}</FormFeedback>
                )}
              </Col>
              <Col md="12" className="mb-3 flex flex-col w-full">
                <Label className="form-label" for="firm">
                  Firm
                </Label>
                <div className="d-flex flex-wrap align-items-center border p-2 rounded-md">
                  {selectedEmails.map((firm) => (
                    <div
                      key={firm.email}
                      className="d-flex align-items-center border rounded-pill px-3 py-2 me-2"
                      style={{ border: "1px solid black", padding: "5px" }}
                    >
                      <img
                        src={firm.firm_logo}
                        alt={firm.name}
                        style={{
                          width: "25px",
                          height: "25px",
                          borderRadius: "50%",
                          marginRight: "5px",
                        }}
                      />
                      <span>{firm.name}</span>
                      <button
                        type="button"
                        className="btn-close ms-2 text-[10px]"
                        aria-label="Close"
                        onClick={() => handleRemoveEmail(firm.email)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="bg-[#f4f4f4] w-[35px] h-[35px] rounded-full text-[19px] poppins_regular"
                    onClick={() => setModalOpen(true)}
                  >
                    +
                  </button>
                </div>
              </Col>
                <Col md="12" className="gap-3">
                  <Label>Description</Label>
                  <CKEditorComponent ckData={ckData} setckData={setCkData} />
                
                </Col>
                <div className="w-100 my-3 text-end">
                {showEditor ? 
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-[3rem] py-[0.7rem] text-[1.1rem] poppins_medium bg_primary rounded-md text_white"
                >
                  {isLoading ? <HashLoader  className="mx-auto"   color="#fff" size={18} /> :  "Submit" }
                </button>
                :
                <button
                  type="button"
                  className="px-[3rem] py-[0.7rem] text-[1.1rem] poppins_medium bg_primary rounded-md text_white"
                  onClick={() => navigate("/email/setting")}
                >
                  Configure Email
                </button>
                }
              </div>
            </Row>
          </Form>
        </Container>
      </main>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(!modalOpen)}
        centered
      >
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Select Firm
        </ModalHeader>
        <ModalBody className=" max-h-[70vh] overflow-auto">
          {loading ? (
            <div className="py-[4rem] d-flex items-center justify-center">
              <HashLoader  className="mx-auto"   color="#fff" size={20} />
            </div>
          ) : (
            firmData.map((firm, index) => (
              <div
                key={index}
                className="d-flex align-items-center mb-2"
                style={{
                  cursor: "pointer",
                  background: isEmailSelected(firm.email) ? "#f4f4f4" : "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                }}
                onClick={() => handleEmailSelect(firm)}
              >
                <img
                  src={firm?.firm_logo}
                  alt={firm.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <span>{firm?.email}</span>
                {isEmailSelected(firm.email) && (
                  <span style={{ marginLeft: "auto", color: "green" }}>
                    <FaCheck />
                  </span>
                )}
              </div>
            ))
          )}
        </ModalBody>
        <ModalFooter>
          <button
            className="btn btn-primary"
            onClick={() => setLastId(lastId + 1)}
          >
            See More
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
