import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner
} from "reactstrap";
import * as Yup from "yup";
import ApiFunction from "../api/apiFuntions";
import {
  headerCrud,
  serviceCategoryCrud
} from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import { uploadFile } from "../api/uploadFile.jsx";
import FileUpload from "../dashboard/FileUpload.js";

export default function HeaderForm() {
  const [ckData, setCkData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const [selectedData, setSelectedData] = useState(
    location.state?.headerData || null
  );
  const [lastId, setLastId] = useState(1);
  const [headerLoading, setHeaderLoading] = useState(false);

  const { get, post, put } = ApiFunction();
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    image: Yup.string().required("Header Image is required"),
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Header Category is required"),
    description: Yup.string().required("Description is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const image = watch("image");

  const onSubmit = async (data) => {
    const apiEndpoint = selectedData ?  `${headerCrud}/${selectedData?._id}` : `${headerCrud}`;
    const method = selectedData ? put : post;
    setIsLoading(true);
    await method(apiEndpoint, data)
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          navigate("/service/header");
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setIsLoading(false);
        reset();
        setCkData("");
      });
  };

  const handleFileChange = async (event, setter) => {
    const selectedFile = event.target?.files[0];
    setHeaderLoading(true);
    await uploadFile(selectedFile)
      .then((result) => {
        setValue(setter, result?.data?.image);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setHeaderLoading(false);
      });
    return selectedFile ? event.target?.files : null;
  };

  useEffect(() => {
    if (selectedData) {
      reset({
        title: selectedData.title || "",
        category: selectedData.category || "",
        description: selectedData.description || "",
      });
      setValue("image", selectedData?.image);
    }
  }, [selectedData, reset]);

  const fetchData = async () => {
    setLoading(true);
    const endpoint = `${serviceCategoryCrud}`;
    try {
      const res = await get(endpoint);
      if (res?.success) {
        setCategories(res?.categories);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <main className="min-h-screen email-firm poppins_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <Container
          fluid
          className="px-[1rem] md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full"
        >
          <h4 className="inter_medium mb-4 text_darkprimary">
            {selectedData ? "Update" : "Create"} Header
          </h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md="6" className="mb-3 flex flex-col w-full">
                <FileUpload
                  label="Image"
                  control={control}
                  name="image"
                  imageUrl={image}
                  fileLoading={headerLoading}
                  handleFileChange={(e) => handleFileChange(e, "image")}
                  error={errors.image}
                />
              </Col>
              <Col md="6" className="mb-3 flex flex-col w-full">
                <Label className="form-label" for="title">
                  Title
                </Label>
                <Controller
                  id="title"
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Title"
                      invalid={errors.title && true}
                    />
                  )}
                />

                {errors.title && (
                  <FormFeedback>{errors.title.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-3 flex flex-col w-full">
                <Label className="form-label" for="category">
                  Category
                </Label>
                <Controller
                  id="category"
                  name="category"
                  control={control}
                  defaultValue={selectedData?.category || ""} // Ensure default value is set
                  render={({ field }) => (
                    <Input
                      type="select"
                      {...field}
                      invalid={errors.category && true}
                    >
                      <option value="">Select Category</option>
                      {categories.map((item) => (
                        <option
                          key={item?._id}
                          value={item?.title}
                          selected={selectedData?.category === item?._id}
                        >
                          {item?.title}
                        </option>
                      ))}
                    </Input>
                  )}
                />

                {errors.category && (
                  <FormFeedback>{errors.category.message}</FormFeedback>
                )}
              </Col>
              <Col md="6" className="mb-3 flex flex-col w-full">
                <Label className="form-label" for="description">
                  Description
                </Label>
                <Controller
                  id="description"
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="textarea" // Changed to textarea
                      rows="10" // Adjust the height
                      placeholder="Enter Description"
                      invalid={errors.description && true}
                      className="!h-24 resize-none"
                    />
                  )}
                />
                {errors.description && (
                  <FormFeedback>{errors.description.message}</FormFeedback>
                )}
              </Col>

              <div className="w-100 my-3 text-end">
                <button
                  type="submit"
                  className="px-[3rem] py-[0.7rem] text-[1.1rem] poppins_medium bg_primary rounded-md text_white"
                >
                  {isLoading ? (
                    <Spinner size="sm" color="#fff" />
                  ) : selectedData ? (
                    "Update"
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </Row>
          </Form>
        </Container>
      </main>
    </>
  );
}
