import React from "react";
import AlertSection from "../common/AlertSection";
import TopSection from "../dashboard/TopSection";
import { Col, Container, Row } from "reactstrap";
import SummaryBox from "../common/SummaryBox";
import { useNavigate } from "react-router-dom";

export default function Analytics() {

    const navigate = useNavigate()

  const alertButtons = [
    {
        text:"Action",
        className:"bg-[#212B36] text-white text-[0.812rem] mx-1"
    },
    {
        text:"Dismiss",
        className:"bg-transparrent text-[0.812rem] mx-1"
    },
  ];

  const leadStats = [
    { detail: "Total Login", value: "45" },
    { detail: "Active Users", value: "12" },
    { detail: "InActive Users", value: "15" },
    { detail: "New Users", value: "25" },
  ];

  const handleEditClick = () => {
    navigate("/lead/management")
  }


  const buttons = [
    {
      text: "Lead Conversion",
      className:"bg-[#212B36] text-white text-[0.812rem] mx-1",
      onClick: handleEditClick
    },
  ];

  return (
    <>
      <main className="inter_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto lead-conversion">
        <TopSection
          userName="Good morning, Jake"
          description="Here are Alert for Analytics overview."
          buttons={buttons}
        />
        <AlertSection
          type="info"
          message="Info"
          description="New Analytics Notification: &quot;You have 5 new notifications waiting for follow-up.&quot;"
          buttons={alertButtons}
        />
        <Container fluid className="px-4 md:px-5 py-4 bg_white my-[0.7rem] border container-radius border-white w-full container-shahdow ">
          <Row className="gap-3 flex flex-wrap">
            <SummaryBox stats={leadStats} />
          </Row>
        </Container>
{/* 
        <Container className="px-4 md:px-5 py-4 bg_white my-[0.7rem] border container-radius border-white w-full container-shahdow ">
          <p className="poppins_semibold text-[0.95rem]">Today’s Summary</p>
          <p className="poppins_regular text-[0.8rem] text-[#737791]">
            Jobs Summary
          </p>
          <Row className="gap-3 flex flex-wrap">
            <SummaryBox leadStats={leadStats} />
          </Row>
        </Container>
        <Container className="px-0">
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
        </Container> */}

        {/* <DetailsModal
          title="Lead Detail"
          items={items}
          openModal={openLeadDetailModal}
          setOpenModal={setOpenLeadDetailModal}
          handleDropDownClick={handleDropDownClick}
        /> */}

        {/* <AssignManager
          title="Assigned Lead To Followup"
          setOpenAssignModal={setOpenAssignLeadModal}
          openAssignModal={openAssignLeadModal}
        /> */}

        {/* <Modal
          title="Schedule Follow Up"
          centered
          width={320}
          footer={null}
          closeIcon={
            <span className="bg_mainsecondary p-1 rounded-full">
              <IoClose />
            </span>
          }
          open={openSheduleModal}
          onOk={() => setOpenSheduleModal(false)}
          onCancel={() => setOpenSheduleModal(false)}
        >
          <DatePickerComponent />
          <div className="date-section">
            <button className="date-btn">Today</button>
            <button className="date-btn">Tommorrow</button>
            <button className="date-btn">This Week</button>
          </div>
          <div className="">
            <button
              className="bg-[#212B36] poppins_bold text-[0.85rem] text_white py-[.5rem] px-[2.4rem] rounded-[0.5rem] w-full"
              onClick={() => {
                setOpenSheduleModal(false);
              }}
            >
              Save
            </button>
          </div>
        </Modal> */}

        {/* <Modal
          title="Change Status"
          centered
          width={400}
          footer={null}
          closeIcon={
            <span className="bg_mainsecondary p-1 rounded-full">
              <IoClose />
            </span>
          }
          open={openStatusModal}
          onOk={() => setOpenStatusModal(false)}
          onCancel={() => setOpenStatusModal(false)}
        >
          <Row className="my-4">
            <Col md="6">
              <Checkbox className="my-2">
                <span className="bg_mainsecondary rounded-[2rem] py-2 px-3 text-[blue]">
                  New
                </span>
              </Checkbox>
            </Col>
            <Col md="6">
              <Checkbox className="my-2">
                <span className="bg_mainsecondary rounded-[2rem] py-2 px-3 text-[orange]">
                  Converted
                </span>
              </Checkbox>
            </Col>
            <Col md="6">
              <Checkbox className="my-2">
                <span className="bg_mainsecondary rounded-[2rem] py-2 px-3 text-[red]">
                  Follow-Up
                </span>
              </Checkbox>
            </Col>
            <Col md="6">
              <Checkbox className="my-2">
                <span className="bg_mainsecondary rounded-[2rem] py-2 px-3 text-[purple]">
                  Contacted
                </span>
              </Checkbox>
            </Col>
          </Row>
          <div className="">
            <button
              className="bg-[#212B36] poppins_bold text-[0.85rem] text_white py-[.5rem] px-[2.4rem] rounded-[0.5rem] w-full"
              onClick={() => {
                setOpenStatusModal(false);
              }}
            >
              Save
            </button>
          </div>
        </Modal> */}
{/* 
        <Modal
          title="Send Proposal"
          centered
          width={400}
          footer={null}
          closeIcon={
            <span className="bg_mainsecondary p-1 rounded-full">
              <IoClose />
            </span>
          }
          open={openProposalModal}
          onOk={() => setOpenProposalModal(false)}
          onCancel={() => setOpenProposalModal(false)}
        >
          <Form className="proposal-section mb-4 gap-2">
            <Label className="mt-2">Proposal Title*</Label>
            <Input placeholder="Enter Title" />
            <Label className="mt-2">Proposal Description*</Label>
            <Input
              type="textarea"
              placeholder="Enter Description"
              className="resize-none"
            />
          </Form>
          <p className="text-[#363942] text-[0.9rem] poppins_medium">
            Our Pricing For You
          </p>
          <Tabs defaultActiveKey="1" items={tabItems} onChange={onChange} />
          <div className="">
            <button
              className="bg-[#212B36] poppins_bold text-[0.85rem] text_white py-[.5rem] px-[2.4rem] rounded-[0.5rem] w-full"
              onClick={() => {
                setOpenProposalModal(false);
              }}
            >
              Save
            </button>
          </div>
        </Modal> */}
      </main>
    </>
  );
}
