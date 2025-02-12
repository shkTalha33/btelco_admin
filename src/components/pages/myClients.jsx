/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { Container, Row } from "reactstrap";
import ProductTable from "../DataTable/productTable";
import { useNavigate } from "react-router-dom";
import { FaEye, } from "react-icons/fa6";
import SummaryBox from "../common/SummaryBox";

const MyClients = () => {
  const [loading, setLoading] = useState(false);
  const [myClientsPage, setMyClientsPage] = useState(0);
  const navigate = useNavigate()

 const MyClientsColumns = [
    {
      name: "#",
      minWidth: "40px",
      maxWidth: "60px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.reg || "1"}
        </span>
      ),
    },
    {
      name: "Cleint Name",
      minWidth: "150px",
      maxWidth: "350px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <span>{row?.name || "John"}
          </span>
        </div>
      ),
    },
    {
      name: "Email",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="flex items-center justify-center">
          {row?.email || "example@gmail.com"}
        </span>
      ),
    },
    {
      name: "Address",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="flex items-center justify-center">
          {row?.address || "Jinnah Colony"}
        </span>
      ),
    },
    {
      name: "Plan",
      maxWidth: "250px",
      cell: (row) => (
        <span className=" flex items-center justify-start">
         {row?.plan || "Preimum"}
        </span>
      ),
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <button
            style={{
              color: row.status === "Active" ? "#26A4FF" : "#FF6550",
              background: "#E5F0FF",
            }}
            className="rounded-full whitespace-nowrap py-1 px-2"
          >
            {row.status === "Active" ? "Active" : "InActive"}
          </button>
        </div>
      ),
    },
    {
      name:"Action",
      minWidth:"90px",
      maxWidth:"90px",
      cell: () => (
        <div className="flex justify-between items-center gap-2">
          <span className="flex cursor-pointer justify-center items-center bg-[#f8f8f8]  p-2 rounded-full" onClick={() => navigate("/client/details")}><FaEye size={18} className="text_primary"/></span>
        </div>
      )
    }
  ];
  
 const MyClientsData = [
    {
      reg: "1",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      address: "123 Maple Street, Springfield",
      plan: "Premium",
      status: "Active",
    },
    {
      reg: "2",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      address: "456 Oak Avenue, Metropolis",
      plan: "Basic",
      status: "InActive",
    },
    {
      reg: "3",
      name: "Catherine Davis",
      email: "catherine.davis@example.com",
      address: "789 Pine Road, Smalltown",
      plan: "Enterprise",
      status: "Active",
    },
    {
      reg: "4",
      name: "David Lee",
      email: "david.lee@example.com",
      address: "321 Cedar Lane, Big City",
      plan: "Pro",
      status: "Active",
    },
    {
      reg: "5",
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      address: "654 Birch Boulevard, Capital",
      plan: "Premium",
      status: "InActive",
    },
    {
      reg: "6",
      name: "Frank Harris",
      email: "frank.harris@example.com",
      address: "987 Elm Street, Coastal Town",
      plan: "Basic",
      status: "Active",
    },
    {
      reg: "7",
      name: "Grace Miller",
      email: "grace.miller@example.com",
      address: "147 Willow Way, Suburbia",
      plan: "Enterprise",
      status: "Active",
    },
    {
      reg: "8",
      name: "Henry Brown",
      email: "henry.brown@example.com",
      address: "258 Poplar Place, Ruralville",
      plan: "Pro",
      status: "InActive",
    },
    {
      reg: "9",
      name: "Isabella Martin",
      email: "isabella.martin@example.com",
      address: "369 Sycamore Drive, Metro",
      plan: "Premium",
      status: "Active",
    },
    {
      reg: "10",
      name: "Jack Thompson",
      email: "jack.thompson@example.com",
      address: "741 Aspen Avenue, Hillside",
      plan: "Basic",
      status: "InActive",
    },
  ];

  const clientsStats = [
    { detail: "Total Clients", value: "45" },
    { detail: "New Clients ", value: "12" },
    { detail: "Active Clients", value: "15" },
    { detail: "InActive Clients", value: "18" },
  ];

  return (
    <>
         <main className="min-h-screen inter_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
      <div className="bg_white px-4 py-4 rounded-lg">
        <h4 className="text-[#05004E]">Today Summary</h4>
        <p className="text-[#737791]"> Job Summary</p>
      </div>
      <Container fluid className="px-[1rem] md:px-5 py-4 bg_white my-[0.7rem] border container-radius border-white w-full container-shahdow ">
          <p className="poppins_semibold text-[0.95rem]">Today’s Summary</p>
          <p className="poppins_regular text-[0.8rem] text-[#737791]">
            Jobs Summary
          </p>
          <Row className="">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-none lg:grid-flow-col gap-3">
            <SummaryBox stats={clientsStats} />
            </div>
          </Row>
        </Container>
      
      {/* </Container> */}
      <Container fluid className=" py-4 bg_white my-3 border rounded-lg border-white w-full">
          <ProductTable
            heading="My Clients"
            count={0}
            loading={loading}
            setCurrentPage={setMyClientsPage}
            currentPage={myClientsPage}
            columns={MyClientsColumns}
            data={MyClientsData}
            setPageNumber={setMyClientsPage}
            type="search"
            pagination={true}
            itemsPerPage={5}
          />
      </Container>
      </main>
    </>
  );
};
export default MyClients;
