/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import debounce from "debounce";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
} from "reactstrap";
import * as Yup from "yup";
import ApiFunction from "../../api/apiFuntions";
import {
  faqCat,
  faqCreate,
  faqDelete,
  faqEdit,
  faqGet,
} from "../../api/ApiRoutesFile";
import { handleError } from "../../api/errorHandler";
import DeleteModel from "../../common/deleteModal";
import ProductTable from "../../dataTable2/productTable";
import { setAddAndUpdateFaq, setAllFaqs, setDeleteFaq } from "../../redux/faq";
import ButtonComponent from "../../common/ButtonComponent";

const CreateFAQsSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [faqLoading, setFaqLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteAbleFaqId, setDeleteAbleFaqId] = useState(null);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [lastId, setLastId] = useState(1);
  const { post, put, get, deleteData } = ApiFunction();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const allFaqs = useSelector((state) => state.faq.allFaqs);
  const navigate = useNavigate();

  const FaqsColumns = [
    {
      name: "#",
      minWidth: "60px",
      maxWidth: "80px",
      cell: (_, index) => (
        <span className="flex items-start justify-start">
          {(parseInt(lastId) - 1) * 10 + (index + 1) || "1"}
        </span>
      ),
    },
    {
      name: "Category",
      minWidth: "200px",
      cell: (row) => (
        <div className=" w-full flex items-center justify-start">
          <span>{row?.cat?.title || "Not found"}</span>
        </div>
      ),
    },
    {
      name: "Type",
      minWidth: "150px",
      cell: (row) => (
        <div className=" w-full flex items-center justify-start">
          <span className="capitalize">{row?.type || "Not specified"}</span>
        </div>
      ),
    },
    {
      name: "Title",
      minWidth: "200px",
      cell: (row) => (
        <div className=" w-full flex items-center justify-start">
          <span>{row?.title || "John"}</span>
        </div>
      ),
    },
    {
      name: "Description",
      minWidth: "570px",
      maxWidth: "700px",
      cell: (row) => (
        <span className="overflow-hidden text-ellipsis">
          {row?.desc || "example@gmail.com"}
        </span>
      ),
    },
    {
      name: "Action",
      minWidth: "120px",
      cell: (row) => (
        <div className="flex justify-start items-center gap-2 w-full">
          <Link
            to={{ pathname: "/faq", search: `faq=${row?._id}` }}
            className="flex cursor-pointer justify-center items-center bg-[#f8f8f8] p-2 rounded-full"
          >
            <FaEdit size={18} className="text_primary" />
          </Link>
          <span
            className="flex cursor-pointer justify-center items-center bg-[#f8f8f8] p-2 rounded-full"
            onClick={() => handleDelete(row)}
          >
            <RiDeleteBin6Line size={18} className="text_primary" />
          </span>
        </div>
      ),
    },
  ];

  const updateableFaqId = searchParams.get("faq");

  const selectedFaq = allFaqs.find((faq) => {
    return faq?._id === updateableFaqId;
  });

  const onError = (errors) => {
    // console.error("Validation Errors:", errors);
  };

  const schema = Yup.object().shape({
    cat: Yup.string().required("Category is required"),
    type: Yup.string()
      .required("Type is required"),
    title: Yup.string().required("Title is required"),
    desc: Yup.string().required("Description is required"),
  });

  const fetchData = async () => {
    const endpoint = `${faqCat}/all`;
    try {
      const res = await get(endpoint);
      if (res?.success) {
        setCategories(res?.categories);
      }
    } catch (error) {
      handleError(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const apiEndpoint = updateableFaqId
      ? `${faqEdit}${updateableFaqId}`
      : faqCreate;
    const method = updateableFaqId ? put : post;
    setIsLoading(true);
    await method(apiEndpoint, data)
      .then((result) => {
        if (result?.success) {
          dispatch(setAddAndUpdateFaq(result?.faqs));
          toast.success(result?.message);
          navigate("/faq");
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setValue("title", "");
        setValue("desc", "");
        setValue("type", "");
        reset();
        setIsLoading(false);
      });
  };

  const handleDelete = (row) => {
    setIsModalOpen(true);
    setDeleteAbleFaqId(row);
  };

  const handleDeleteFaqs = async (item) => {
    setLoading(true);
    await deleteData(`${faqDelete}${item?._id}`)
      .then((response) => {
        dispatch(setDeleteFaq(item));
        toast.success(response?.message);
        setIsModalOpen(false);
      })
      .catch((err) => {
        return handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (updateableFaqId) {
      setValue("title", selectedFaq?.title);
      setValue("desc", selectedFaq?.desc);
      setValue("cat", selectedFaq?.cat?._id);
      setValue("type", selectedFaq?.type);
    }
  }, [selectedFaq]);

  const getAllFaqs = debounce(async () => {
    const searchQuery = { search: search ? search : "" };
    setFaqLoading(true);
    await get(`${faqGet}${lastId}`, searchQuery)
      .then((result) => {
        if (result?.success) {
          dispatch(setAllFaqs(result?.faqs));
          setCount(result?.count?.totalPage);
          setItemsPerPage(result?.count?.currentPageSize);
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setFaqLoading(false);
      });
  }, 300);

  useEffect(() => {
    getAllFaqs();
  }, [search, lastId]);

  return (
    <main className="lg:container p-[0.5rem] md:p-4 mx-auto">
      <Container
        fluid
        className=" py-4 p-[0.5rem] md:p-4 bg_white border rounded-lg border-white w-full"
      >
        <h4 className="poppins_medium mb-4" style={{ color: "#151D48" }}>
          Create Feature Sections
        </h4>
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="d-flex flex-column gap-2 w-100"
        >
          <div className="flex flex-col w-[100%]">
            <div className="w-100 mb-3">
              <Label className="form-label" for="title">
                Title
              </Label>
              <Controller
                id="title"
                name="title"
                defaultValue=""
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
            </div>
          </div>
          <div className="w-100 mb-3">
            <Label className="form-label" for="desc">
              Description
            </Label>
            <Controller
              id="desc"
              name="desc"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  type="textarea"
                  style={{ height: "120px" }}
                  {...field}
                  className="resize-none"
                  placeholder="Enter Description"
                  invalid={errors.desc && true}
                />
              )}
            />
            {errors.desc && <FormFeedback>{errors.desc.message}</FormFeedback>}
          </div>

          <div className="flex flex-col w-[100%]">
            <div className="w-100 mb-3">
              <Label className="form-label" for="cat">
                Select Category
              </Label>
              <Controller
                id="cat"
                name="cat"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input {...field} type="select" invalid={errors.cat && true}>
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors.cat && <FormFeedback>{errors.cat.message}</FormFeedback>}
            </div>
          </div>

          <div className="flex flex-col w-[100%]">
            <div className="w-100 mb-3">
              <Label className="form-label" for="type">
                Select Type
              </Label>
              <Controller
                id="type"
                name="type"
                defaultValue=""
                control={control}
                render={({ field }) => (
                  <Input {...field} type="select" invalid={errors.type && true}>
                    <option value="">Select Type</option>
                    <option value="landing">Landing</option>
                    <option value="company">Company</option>
                  </Input>
                )}
              />
              {errors.type && (
                <FormFeedback>{errors.type.message}</FormFeedback>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="ml-auto">
            <ButtonComponent
              loading={isLoading}
              btnText={updateableFaqId ? "Update" : "Submit"}
            />
          </div>
        </Form>
      </Container>
      <Container
        fluid
        className=" py-4 p-[0.5rem] md:p-4 bg_white my-3 border rounded-lg border-white w-full"
      >
        <ProductTable
          rowHeading={"List of FAQs"}
          columns={FaqsColumns}
          data={allFaqs}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setLastId={setLastId}
          setSearch={setSearch}
          count={count}
          loading={faqLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>

      <DeleteModel
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        setIsModalOpen={setIsModalOpen}
        sureText="Are You Sure To Delete This FAQ?"
        deleteItem={() => handleDeleteFaqs(deleteAbleFaqId)}
        loading={loading}
      />
    </main>
  );
};
export default CreateFAQsSection;
