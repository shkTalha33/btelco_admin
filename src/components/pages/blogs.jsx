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
  Row
} from "reactstrap";
import * as Yup from "yup";
import CKEditorComponent from "../../utils/CkEditor";
import ApiFunction from "../api/apiFuntions";
import {
  blogCategoryCrud,
  blogCrud
} from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";

export default function Blogs() {
  const [ckData, setCkData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const [selectedData, setSelectedData] = useState(
    location.state?.blogData || null
  );
  const [lastId, setLastId] = useState(1);

  const { get, post, put } = ApiFunction();
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
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
    console.log(data.category);
    console.log(ckData);
    if (!ckData) {
      toast.error("Description Cannot Be Empty");
      return;
    }
    const dataToSend = {
      title: data.title,
      category: data.category,
      description: ckData,
    };
    const apiEndpoint = selectedData
      ? `${blogCrud}/${selectedData?._id}`
      : `${blogCrud}`;
    const method = selectedData ? put : post;
    setIsLoading(true);
    await method(apiEndpoint, dataToSend)
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message);
          navigate("/blog/management");
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

  const fetchData = async () => {
    setLoading(true);
    const endpoint = `${blogCategoryCrud}`;
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

  useEffect(() => {
    if (selectedData) {
      reset({
        title: selectedData.title || "",
        category: selectedData.category || "",
      });
      setCkData(selectedData.description || "");
    }
  }, [selectedData, reset]);

  return (
    <>
      <main className="min-h-screen email-firm poppins_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <Container
          fluid
          className="px-[1rem] md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full"
        >
          <h4 className="inter_medium mb-4 text_darkprimary">
            {selectedData ? "Update" : "Create"} Blog
          </h4>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
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
                      disabled={selectedData}
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

              <Col md="12" className="gap-3">
                <Label>Description</Label>
                <CKEditorComponent ckData={ckData} setCkData={setCkData} />
              </Col>
              <div className="w-100 my-3 text-end">
                <button
                  type="submit"
                  className="px-[3rem] py-[0.7rem] text-[1.1rem] poppins_medium bg_primary rounded-md text_white"
                >
                  {selectedData ? "Update" : "Submit"}
                </button>
              </div>
            </Row>
          </Form>
        </Container>
      </main>
    </>
  );
}
