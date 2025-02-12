import { Checkbox, Modal, Tabs } from "antd";
import React from "react";
import { Col, Container, Form, Input, Label, Row } from "reactstrap";
import SummaryBox from "../common/SummaryBox";
import { useState } from "react";
import ProductTable from "../DataTable/productTable";
import AlertSection from "../common/AlertSection";
import ActionButtons from "../common/ActionButtons";
import TopSection from "../dashboard/TopSection";
import ImageLoader from "./ImageLoader/ImageLoader";
import { IoClose } from "react-icons/io5";
import { avatar1 } from "../icons/icon";
import { FaEye } from "react-icons/fa6";
// import DatePickerComponent from "../common/ScheduleDatePicker";
// import LeadPricing from "../common/leadPricing";
// import DetailsModal from "../common/detailsModal";
// import AssignManager from "../common/AssignManager";

export default function LeadManagement() {
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadManagementPage, setLeadManagementPage] = useState(0);
  const [openLeadDetailModal, setOpenLeadDetailModal] = useState(false);
  const [openSheduleModal, setOpenSheduleModal] = useState(false);
  const [openAssignLeadModal, setOpenAssignLeadModal] = useState(false);
  const [openProposalModal, setOpenProposalModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);

  const leadStats = [
    { detail: "Total Lead", value: "45" },
    { detail: "New Lead ", value: "12" },
    { detail: "Follow Up", value: "15" },
    { detail: "Lost", value: "25" },
    { detail: "Conversion Rate", value: "40%" },
  ];

  const alertButtons = [
    {
        text:"Action",
        className:"bg-[#212B36] text-white text-[0.812rem] mx-1"
    },
    {
        text:"Dismiss",
        className:"bg-transparrent text-[0.812rem] mx-1"
    },
  ]

  const handleDropDownClick = ({ key }) => {
    setOpenLeadDetailModal(false);
    if (key === "shedule") {
      setOpenSheduleModal(true);
    } else if (key === "lead") {
      setOpenAssignLeadModal(true);
    } else if (key === "proposal") {
      setOpenProposalModal(true);
    } else if (key === "status") {
      setOpenStatusModal(true);
    }
  };

  const items = [
    {
      label: "Shedule Follow-Up",
      key: "shedule",
    },
    {
      type: "divider",
    },
    {
      label: "Assigned Lead",
      key: "lead",
    },
    {
      type: "divider",
    },
    {
      label: "Send Proposal",
      key: "proposal",
    },
    {
      type: "divider",
    },
    {
      label: "Change Status",
      key: "status",
    },
  ];

  const handleLeadDetails = () => {
    setOpenLeadDetailModal(true);
  };

  const LeadConversionData = [
    {
      reg: "1",
      logo: avatar1, // Placeholder image URL
      name: "John Doe",
      contact: "john.doe@example.com",
      source: "LinkedIn",
      status: "New",
      assignedManager: "Sara John",
      nextAction: "Contact Lead",
    },
    {
      reg: "2",
      logo: avatar1,
      name: "Michael Smith",
      contact: "michael.smith@example.com",
      source: "Website",
      status: "Converted",
      assignedManager: "David Carter",
      nextAction: "Send Proposal",
    },
    {
      reg: "3",
      logo: avatar1,
      name: "Emily Davis",
      contact: "emily.davis@example.com",
      source: "Referral",
      status: "Follow up",
      assignedManager: "Jessica Lee",
      nextAction: "Schedule Meeting",
    },
    {
      reg: "4",
      logo: avatar1,
      name: "Sophia Brown",
      contact: "sophia.brown@example.com",
      source: "Email Campaign",
      status: "New",
      assignedManager: "Anna Clark",
      nextAction: "Contact Lead",
    },
    {
      reg: "5",
      logo: avatar1,
      name: "Daniel Johnson",
      contact: "daniel.johnson@example.com",
      source: "Social Media",
      status: "Follow up",
      assignedManager: "Robert Wilson",
      nextAction: "Follow Up Call",
    },
  ];

  const LeadConversionColumns = [
    {
      name: "#",
      minWidth: "50px",
      maxWidth: "60px",
      cell: (row) => (
        <span className="text-center flex items-center justify-center">
          {row?.reg || "1"}
        </span>
      ),
    },
    {
      name: "Lead Name",
      minWidth: "150px",
      maxWidth: "300px",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <ImageLoader
            circeltrue={true}
            imageUrl={row?.logo}
            classes="rounded-full w-8 h-8 mr-2"
          />
          <span>
            {row?.name.length > 15
              ? row.name.slice(0, 14) + "...."
              : row?.name || "John"}
          </span>
        </div>
      ),
    },
    {
      name: "Contact Info",
      minWidth: "150px",
      maxWidth: "300px",
      cell: (row) => (
        <span className="text-center  flex items-center justify-center">
          {row?.contact || "abc@gmail.com"}
        </span>
      ),
    },
    {
      name: "source",
      minWidth: "100px",
      maxWidth: "300px",
      cell: (row) => (
        <span className="text-center  flex items-center justify-center">
          {row?.source || "website"}
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
                row.status === "New"
                  ? "#26A4FF"
                  : row.status === "Converted"
                  ? "#4640DE"
                  : "#FFB836",
              background: "#E5F0FF",
            }}
            className="rounded-full py-1 px-3 whitespace-nowrap"
          >
            {row.status === "New"
              ? "New"
              : row.status === "Converted"
              ? "Converted"
              : "Follow up"}
          </button>
        </div>
      ),
    },
    {
      name: "Assigned Manager",
      minWidth: "150px",
      maxWidth: "300px",
      cell: (row) => (
        <span className="text-center  flex items-center justify-center">
          {row?.nextAction || "Sara John"}
        </span>
      ),
    },
    {
      name: "Next Action",
      minWidth: "150px",
      maxWidth: "350px",
      cell: (row) => (
        <span className="text-center flex items-center justify-between">
          <span className="max-w-[80px]">{row?.nextAction || "Contact Lead"}</span>

          <span
            className="p-1 bg_mainsecondary rounded-full ml-3 text-end cursor-pointer"
            onClick={handleLeadDetails}
          >
            <FaEye size={18} className="text_primary" />
          </span>
        </span>
      ),
    },
  ];

  const onChange = (key) => {
  };

  return (
    <>
      <main className="inter_regular add-firm text-sm lg:container p-[0.5rem] p-md-4 mx-auto lead-conversion">
        <TopSection
          userName="Good morning, Jake"
          description="Here are Alert for summary of the leads overview."
        />
        <AlertSection
          type="info"
          message="Info"
          description="New Lead Notification: &quot;You have 5 new leads waiting for follow-up.&quot;"
          buttons={alertButtons}
        />

        <Container fluid className="px-[1rem] md:px-5 py-4 bg_white my-[0.7rem] border container-radius border-white w-full container-shahdow ">
          <p className="poppins_semibold text-[0.95rem]">Today’s Summary</p>
          <p className="poppins_regular text-[0.8rem] text-[#737791]">
            Jobs Summary
          </p>
          <Row className="">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-none lg:grid-flow-col gap-3">
            <SummaryBox stats={leadStats} />
            </div>
          </Row>
        </Container>
         <Container fluid className="py-4  my-3  bg_white rounded-lg">
          <div className="p-[1rem]">
          <ProductTable
            className="flex items-center justify-between flex-wrap p-[1.5rem] md:gap-3 w-full"
            heading="Lead Management"
            count={0}
            actionButtons={<ActionButtons />}
            loading={leadLoading}
            setCurrentPage={setLeadManagementPage}
            currentPage={leadManagementPage}
            columns={LeadConversionColumns}
            data={LeadConversionData}
            setPageNumber={setLeadManagementPage}
            type="search"
            pagination={true}
            itemsPerPage={5}
          />
          </div>
         </Container>
      </main>
    </>
  );
}
