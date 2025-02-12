import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { FaEdit } from "react-icons/fa";
import PageHeading from "../dashboard/pageHeading";
import { RiDeleteBin6Line } from "react-icons/ri";
import ProductTable from "../dataTable2/productTable";
import debounce from "debounce";
import ApiFunction from "../api/apiFuntions";
import { getStaff } from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import { useDispatch, useSelector } from "react-redux";
import { setAllStaff } from "../redux/staff";
import ImageLoader from "./ImageLoader/ImageLoader";
import { Link } from "react-router-dom";
import UpdateStatusModal from "../common/UpdateStatusModal";

export default function StaffManagement() {
  const [loading, setLoading] = useState(false);
  const [showUpateStatusModal, setShowUpateStatusModal] = useState(false);
  const [updateableStaff, setUpdateableStaff] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [lastId, setLastId] = useState(1);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { post } = ApiFunction()

  const column = [
    {
      name: "Profile",
      minWidth: "80px",
      maxWidth: "90px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <ImageLoader
            circeltrue={true}
            imageUrl={row?.profile}
            classes="rounded-full bg-cover w-[35px] h-[35px]"
            style={{ maxWidth: "35px", maxHeight: "35px" }}
          />
        </div>
      ),
    },
    {
      name: "First Name",
      minWidth: "200px",
      maxWidth: "300px",
      cell: (row) => <div className="">{row?.fname || "John"}</div>,
    },
    {
      name: "Last Name",
      minWidth: "200px",
      maxWidth: "300px",
      cell: (row) => <div className="">{row?.lname || "John"}</div>,
    },
    {
      name: "Email",
      minWidth: "200px",
      maxWidth: "300px",
      cell: (row) => (
        <span className="">{row?.email || "example@gmail.com"}</span>
      ),
      headerAlign: "center",
    },
    // {
    //   name: "Type",
    //   minWidth: "150px",
    //   maxWidth: "200px",
    //   cell: (row) => (
    //     <span className="text-center flex items-center justify-center">
    //       {row?.type || "Trail"}
    //     </span>
    //   ),
    // },
    {
      name: "Status",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <div className="flex items-center justify-center whitespace-nowrap" onClick={() => handleUpdateStatus(row)}>
          <button
            style={{
              color: row?.status === "online" ? "#26A4FF" : "#FF6550",
              background: "#E5F0FF",
            }}
            className="rounded-full py-1 px-3 capitalize"
          >
            {row?.status || "Deactivate"}
          </button>
        </div>
      ),
    },
    {
      name: "Action",
      minWidth: "100px",
      maxWidth: "300px",
      cell: (row) => (
        <div className="flex justify-start items-center gap-2 w-full">
          <Link to={{ pathname:"/employee/add", search:`page=${lastId}&selectedStaff=${row?._id}` }} className="flex cursor-pointer justify-center items-center bg-[#f8f8f8] p-2 rounded-full" >
            <FaEdit size={18} className="text_primary" />
          </Link>
        </div>
      ),
      headerAlign: "center",
    },
  ];

  const handleUpdateStatus = (row) => {
    setUpdateableStaff(row)
    setShowUpateStatusModal(true)
  }

  
  const data = useSelector(state => state.staff.allStaff)
  const dispatch = useDispatch()
  
  const getAllEmployees = debounce(async() =>{
    const searchQuery = {search : search  ? search : ''};
    setLoading(true)
    await post(`${getStaff}${lastId}`, searchQuery)
    .then((result) => {
      dispatch(setAllStaff(result?.staff))
    })
    .catch((err) => {
      handleError(err)
    })
    .finally(() => {
      setLoading(false)
    })
  }, 300)

  useEffect(() => {
   getAllEmployees()
  }, [search, lastId])
  

  return (
    <>
      <main className="inter_regular add-firm text-sm lg:container p-[0.5rem] md:p-4 mx-auto">
        <PageHeading
          headingText="Employee"
          headingDescription="You Can Add Employee And Manage"
          buttonText="Add Employee"
          path="/employee/add"
        />

        <Container fluid className="bg_white rounded-lg ">
          <div className="p-2 md:p-[1rem] border border-white w-full">
            <ProductTable
              rowHeading={"List of Employees"}
              columns={column}
              data={data}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              setLastId={setLastId}
              showSearch={true}
              setSearch={setSearch}
              showFilter={false}
              count={count}
              loading={loading}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Container>
      </main>
      <UpdateStatusModal
          show={showUpateStatusModal}
          setShow={setShowUpateStatusModal}
          heading="Update Status"
          updateAbleItem={updateableStaff}
        /> 
    </>
  );
}
