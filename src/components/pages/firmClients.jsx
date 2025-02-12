import React from "react";
import { Col, Container, Form, Input, Label, Row } from "reactstrap";
import { useState } from "react";
import ProductTable from "../DataTable/productTable";
import AlertSection from "../common/AlertSection";
import ActionButtons from "../common/ActionButtons";
import TopSection from "../dashboard/TopSection";
import { BiMessageDetail } from "react-icons/bi";
import SummaryBox from "../common/SummaryBox";
import { LuEye } from "react-icons/lu";

export default function FirmClients() {
  const [clientManagment, setClientManagment] = useState(false);
  const [clientManagementPage, setClientManagementPage] = useState(0);
  const [openClientDetailModal, setOpenClientDetailModal] = useState(false);

  const clientStats = [
    { detail: "Total Clients", value: "45" },
    { detail: "New Clients ", value: "12" },
    { detail: "Active clients", value: "15" },
    { detail: "Inactive clients", value: "25" },
  ];


  const alertButtons = [
    {
      text: "Action",
      className: "bg-[#212B36] text-white text-[0.812rem] mx-1",
    },
    {
      text: "Dismiss",
      className: "bg-transparrent text-[0.812rem] mx-1",
    },
  ];


  const handleClientDetails = () => {
    setOpenClientDetailModal(true);
  };

  const ClientManagementColumns = [
    {
      name: "#",
      minWidth: "40px",
      maxWidth: "60px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.id || "01"}
        </span>
      ),
    },
    {
      name: "Client Name",
      minWidth: "150px",
      maxWidth: "300px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.clientName || "Darrell Steward"}
        </span>
      ),
    },
    {
      name: "Contact Info",
      minWidth: "150px",
      maxWidth: "350px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.contactInfo || "john@example.com"}
        </span>
      ),
    },
    {
      name: "Service Type",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.serviceType || "VAT Returns"}
        </span>
      ),
    },
    {
      name: "Account Manager",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.accountManager || "Sarah Johnson"}
        </span>
      ),
    },
    {
      name: "Last Interaction",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.lastInteraction || "Oct 17, 2024"}
        </span>
      ),
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <button
            style={{
              color:
                row.status === "in progress"
                  ? "#26A4FF"
                  : row.status === "completed"
                  ? "#56CDAD"
                  : "#8A2BE2",
              background: "#E5F0FF",
            }}
            className="rounded-full whitespace-nowrap py-1 px-2"
          >
            {row.status || "in progress"}
          </button>
        </div>
      ),
    },
    {
      name: "Next Action",
      minWidth: "100px",
      maxWidth: "200px",
      cell: (row) => (
        <div className="flex items-center justify-center space-x-2">
          {/* Icon placeholders for actions */}
          <span className="bg-[#F3F3F9] rounded-full text_primary cursor-pointer p-1">
            <BiMessageDetail size={23} />
          </span>
          <span
            className="bg-[#F3F3F9] rounded-full text_primary cursor-pointer p-1"
            onClick={handleClientDetails}
          >
            <LuEye size={23} />
          </span>
        </div>
      ),
    },
  ];

  const ClientManagementData = [
    {
      id: "01",
      clientName: "Darrell Steward",
      contactInfo: "john@example.com",
      serviceType: "VAT Returns",
      accountManager: "Sarah Johnson",
      lastInteraction: "Oct 17, 2024",
      status: "in progress",
    },
    {
      id: "02",
      clientName: "Jenny Wilson",
      contactInfo: "john@example.com",
      serviceType: "Pay roll",
      accountManager: "Albert Flores",
      lastInteraction: "Oct 17, 2024",
      status: "completed",
    },
    {
      id: "03",
      clientName: "Robert Fox",
      contactInfo: "john@example.com",
      serviceType: "Company",
      accountManager: "Courtney Henry",
      lastInteraction: "Oct 17, 2024",
      status: "waiting for approval",
    },
    {
      id: "04",
      clientName: "Jerome Bell",
      contactInfo: "john@example.com",
      serviceType: "VAT Returns",
      accountManager: "Floyd Miles",
      lastInteraction: "Oct 17, 2024",
      status: "in progress",
    },
    {
      id: "05",
      clientName: "Devon Lane",
      contactInfo: "john@example.com",
      serviceType: "VAT Returns",
      accountManager: "Leslie Alexander",
      lastInteraction: "Oct 17, 2024",
      status: "completed",
    },
  ];

  return (
    <>
      <main className="inter_regular add-firm text-sm lg:container p-[0.5rem] p-md-4 mx-auto">
        <TopSection
          userName="Good morning, Jake"
          description="Here are Alert for summary of the leads overview."
        />

        <AlertSection
          type="info"
          message="Info"
          description='Pending Approval: "Jane Smith&apos;s company tax draft is awaiting approval."'
          buttons={alertButtons}
        />

        <Container fluid className="px-[1rem] md:px-5 py-4 bg_white my-[0.7rem] border container-radius border-white w-full container-shahdow ">
          <p className="poppins_semibold text-[0.95rem]">Today’s Summary</p>
          <p className="poppins_regular text-[0.8rem] text-[#737791]">
            Jobs Summary
          </p>
          {/* <Row className="gap-3 flex flex-wrap">
            <SummaryBox clientStats={clientStats} />
          </Row> */}
        </Container>

        <Container fluid className="px-0">
          <ProductTable
            className="flex items-center justify-between flex-wrap p-[1.5rem] md:gap-3 w-full"
            heading="Team Member List"
            count={0}
            actionButtons={<ActionButtons />}
            loading={clientManagment}
            setCurrentPage={setClientManagementPage}
            currentPage={clientManagementPage}
            columns={ClientManagementColumns}
            data={ClientManagementData}
            setPageNumber={setClientManagementPage}
            type="search"
            pagination={false}
            itemsPerPage={5}
          />
        </Container>
      </main>
    </>
  );
}
