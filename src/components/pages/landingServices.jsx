import { Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { FaEdit } from "react-icons/fa";
import PageHeading from "../dashboard/pageHeading";
import { MdDelete } from "react-icons/md";
import ProductTable from "../dataTable2/productTable";
import debounce from "debounce";
import ApiFunction from "../api/apiFuntions";
import { landingServiceCrud } from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import moment from "moment";
import ImageLoader from "./ImageLoader/ImageLoader";

export default function LandingServices() {
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [search, setSearch] = useState("");
  const [lastId, setLastId] = useState(1);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const { post, get, deleteData } = ApiFunction();
  const navigate = useNavigate();

  const handleEdit = (row) => {
    navigate("/landing/service/form", { state: { landingServiceData: row } });
  };

  const handleDelete = async () => {
    if (!selectedHeader) return;
    setLoading(true);
      await deleteData(`${landingServiceCrud}/${selectedHeader?._id}`)
      .then((result) => {
        if (result?.success) {
          toast.success(result?.message)
          setData((prevData) => prevData.filter((header) => header._id !== selectedHeader._id));
        }
      })
     .catch ((error) => {
       handleError(error);

     }) 
    .finally(() => {
      setLoading(false);
      setIsModalOpen(false);

    })
  };

  const showDeleteModal = (blog) => {
    setSelectedHeader(blog);
    setIsModalOpen(true);
  };

  const fetchBlogs = debounce(async () => {
    setLoading(true);
    try {
      const result = await get(`${landingServiceCrud}`);
      setData(result?.services || []);
    } catch (err) {
      // handleError(err);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    fetchBlogs();
  }, [search, lastId]);

  const column = [
    {
      name: "#",
      minWidth: "50px",
      maxWidth: "60px",
      cell: (_, index) => <span>{index + 1 || "1"}</span>,
    },
    {
      name: "Image",
      minWidth: "60px",
      maxWidth: "80px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <ImageLoader
            circeltrue={true}
            imageUrl={row?.image}
            classes="rounded-full bg-cover w-[35px] h-[35px]"
            style={{ maxWidth: "35px", maxHeight: "35px" }}
          />
        </div>
      ),
    },
    {
      name: "Title",
      minWidth: "200px",
      maxWidth: "400px",
      cell: (row) => <div>{row?.title || "N/A"}</div>,
    },
    {
      name: "Description",
      minWidth: "300px",
      maxWidth: "400px",
      cell: (row) => <div className="line-clamp-2">{row?.description || "N/A"}</div>,
    },
    {
      name: "Category",
      minWidth: "200px",
      maxWidth: "300px",
      cell: (row) => <div className="capitalize">{row?.category || "N/A"}</div>,
    },
    {
      name: "Actions",
      minWidth: "100px",
      maxWidth: "300px",
      cell: (row) => (
        <div className="flex gap-2">
          <div className="cursor-pointer p-2 rounded-full bg-gray-100" onClick={() => handleEdit(row)}>
            <FaEdit size={18} className="text_primary" />
          </div>
          <div className="cursor-pointer p-2 rounded-full bg-gray-100" onClick={() => showDeleteModal(row)}>
            <MdDelete size={20} className="text-red-500" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <main className="container p-4 mx-auto">
        <PageHeading headingText="Header" headingDescription="You Can Add And Manage Home Services Here" buttonText="Add Home Service" path="/landing/service/form" />
        <Container fluid className="bg-white rounded-lg p-4">
          <ProductTable
            rowHeading="List of Home Services"
            columns={column}
            data={data}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setLastId={setLastId}
            // showSearch={true}
            setSearch={setSearch}
            showFilter={false}
            count={count}
            loading={loading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Container>
      </main>
      
      <Modal centered title="Are you sure to delete this blog?" visible={isModalOpen} onOk={handleDelete} onCancel={() => setIsModalOpen(false)}>
      </Modal>
    </>
  );
}
