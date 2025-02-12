import { useState } from "react"; // Ensure you import useState
import { avatar1 } from "../components/icons/icon";
import ImageLoader from "../components/pages/ImageLoader/ImageLoader";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button, DatePicker, Dropdown, Menu, Modal, Space } from "antd";
import { FaExclamation, FaEye } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const ActionCell = ({ row }) => {
  const [isChangeBillDateModalOpen, setIsChangeBillDateModalOpen] = useState(false);
  const [isGenerateBillModalOpen, setIsGenerateBillModalOpen] = useState(false);

  const handleChangeBillDate = () => {
    setIsChangeBillDateModalOpen(true);
  };

  const handleGenerateBill = () => {
    setIsGenerateBillModalOpen(true);
  };

  const handlePlanChange = (newPlan) => {
    // Handle upgrading or downgrading plan here
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={handleGenerateBill}>
        Generate Bill
      </Menu.Item>
      <Menu.Item key="1" onClick={handleChangeBillDate}>
        Change Bill Date
      </Menu.Item>
      <Menu.Item key="2">
        {row.plan === "basic" ? (
          <span onClick={() => handlePlanChange("premium")}>Upgrade</span>
        ) : (
          <span onClick={() => handlePlanChange("basic")}>Downgrade</span>
        )}
      </Menu.Item>
      <Menu.Item key="3">
        Pause/Cancel Subscription
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center justify-center relative ">
      <Dropdown overlay={menu} trigger={["click"]}>
        <BsThreeDotsVertical size={15} className="cursor-pointer" />
      </Dropdown>
      <Modal
        style={{ fontFamily: "inter_regular" }}
        width={300}
        title="Generate Bill"
        centered
        open={isChangeBillDateModalOpen}
        footer={null}
        onCancel={() => setIsChangeBillDateModalOpen(false)}
      >
        <DatePicker style={{ width: "100%", margin: "30px 0px" }} />
        <Button
          type="primary"
          style={{ backgroundColor: "black", color: "white", width: "100%" }}
          onClick={() => setIsChangeBillDateModalOpen(false)}
        >
          Save
        </Button>
      </Modal>
      <Modal
        style={{ fontFamily: "inter_regular", textAlign: "center" }}
        width={300}
        centered
        open={isGenerateBillModalOpen}
        closable={false}
        footer={null}
        onCancel={() => setIsGenerateBillModalOpen(false)}
      >
        <div>
          <div
            className="w-28 h-28 rounded-full bg_black inter_regular"
            style={{
              width: "30px",
              height: "30px",
              color: "white",
              margin: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaExclamation size={20} />
          </div>
          <p className="text-xs inter_regular my-4">
            Are You Sure You Want To Generate Bill
          </p>
          <div>
            <button
              className="px-3 py-1 bg-[#FF5630] rounded-md text_white mr-5"
              onClick={() => setIsGenerateBillModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1 bg_primary rounded-md text_white ml-5"
              onClick={() => setIsGenerateBillModalOpen(false)}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};


export const data = [
  {
    _id: "1",
    reg: "1",
    logo: avatar1,
    firstname: "Abstergo Ltd.",
    phone: "070 5472 6467",
    email: "tanya.hill@example.com",
    due: "22/04/24",
    generate: "07/09/23",
    admin: "Shane",
    status: "Paid",
    plan: "premium",
    amount: "100,000",
    active: true,
    renewalDate: "22/04/25",
  },
  {
    _id: "2",
    reg: "2",
    logo: avatar1,
    firstname: "Abstergo Ltd.",
    phone: "070 5472 6467",
    email: "tanya.hill@example.com",
    due: "22/04/24",
    generate: "07/09/23",
    admin: "Shane",
    status: "Pending",
    plan: "premium",
    amount: "100,000",
    active: false,
    renewalDate: "22/04/25",
  },
  {
    _id: "3",
    reg: "3",
    logo: avatar1,
    firstname: "Talha Ltd.",
    phone: "070 5472 6467",
    email: "tanya.hill@example.com",
    due: "22/04/24",
    generate: "07/09/23",
    admin: "Shane",
    status: "Pending",
    plan: "basic",
    amount: "50,000",
    active: true,
    renewalDate: "22/04/25",
  },
  {
    _id: "4",
    reg: "4",
    logo: avatar1,
    firstname: "Talha Ltd.",
    phone: "070 5472 6467",
    email: "tanya.hill@example.com",
    address: "3890 Poplar Dr.",
    due: "12/09/24",
    generate: "07/09/23",
    status: "Paid",
    plan: "basic",
    amount: "75,000",
    active: true,
    renewalDate: "12/09/25",
  },
  {
    _id: "5",
    reg: "5",
    logo: avatar1,
    firstname: "Talha Ltd.",
    phone: "070 5472 6467",
    email: "tanya.hill@example.com",
    address: "3890 Poplar Dr.",
    due: "12/09/24",
    generate: "07/09/23",
    status: "Pending",
    plan: "premium",
    amount: "100,000",
    active: false,
    renewalDate: "12/09/25",
  },
  {
    _id: "6",
    reg: "6",
    logo: avatar1,
    firstname: "Talha Ltd.",
    phone: "070 5472 6467",
    email: "tanya.hill@example.com",
    address: "3890 Poplar Dr.",
    due: "12/09/24",
    generate: "07/09/23",
    status: "Pending",
    plan: "basic",
    amount: "60,000",
    active: true,
    renewalDate: "12/09/25",
  },
  {
    _id: "7",
    reg: "7",
    logo: avatar1,
    firstname: "Talha Ltd.",
    phone: "070 5472 6467",
    email: "tanya.hill@example.com",
    address: "3890 Poplar Dr.",
    due: "12/09/24",
    generate: "07/09/23",
    status: "Pending",
    plan: "basic",
    amount: "60,000",
    active: true,
    renewalDate: "12/09/25",
  },
  {
    _id: "8",
    reg: "8",
    logo: avatar1,
    firstname: "Talha Ltd.duwbuecbeycbeceucbecc",
    phone: "070 5472 6467",
    email: "tanya.hill@example.com",
    due: "22/04/24",
    generate: "07/09/23",
    status: "Paid",
    plan: "premium",
    amount: "120,000",
    active: false,
    renewalDate: "22/04/25",
  },
  {
    _id: "9",
    reg: "9",
    logo: avatar1,
    firstname: "Talha Ltd.",
    phone: "070 5472 6467",
    email: "tanya.hill@example.com",
    due: "22/04/24",
    generate: "07/09/23",
    status: "Pending",
    plan: "basic",
    amount: "55,000",
    active: true,
    renewalDate: "22/04/25",
  },
  {
    _id: "10",
    reg: "10",
    logo: avatar1,
    firstname: "Talha Ltd.cnsccnduxjc n",
    phone: "070 5472 6467",
    email: "tanya.hill@example.com",
    due: "22/04/24",
    generate: "07/09/23",
    admin: "Shane",
    status: "Paid",
    plan: "premium",
    amount: "100,000",
    active: true,
    renewalDate: "22/04/25",
  },
];

export const columns = [
  {
    name: "#",
    minWidth: "50px",
    maxWidth: "60px",
    cell: (row) => (
      <span className="flex items-center justify-center">
        {row?.reg || "1"}
      </span>
    ),
  },
  {
    name: "Logo",
    minWidth:"60px",
    maxWidth: "70px",
    cell: (row) => (
      <div className="flex items-center justify-center">
        <ImageLoader
          circeltrue={true}
          imageUrl={row?.logo}
          classes="rounded-full"
          style={{ maxWidth: "35px", maxHeight: "35px", objectFit: "cover" }}
        />
      </div>
    ),
  },
  {
    name: "First Name",
    maxWidth: "300px",
    cell: (row) => (
      <span className="flex items-center justify-center">
        {row?.firstname || "John"}
      </span>
    ),
  },
  {
    name: "Plan",
    maxWidth: "300px",
    cell: (row) => (
      <span className="flex items-center justify-center">
        {row?.plan || "premium"}
      </span>
    ),
  },
  {
    name: "Bill Generate Date",
    maxWidth: "300px",
    cell: (row) => (
      <span className="flex items-center justify-center">
        {row?.generate || "12/07/24"}
      </span>
    ),
  },
  {
    name: "Bill Due Date",
    minWidth: "140px",
    maxWidth: "200px",
    cell: (row) => (
      <span className="flex items-center justify-center">
        {row?.due || "17/08/24"}
      </span>
    ),
  },
  {
    name: "Bill Amount",
    minWidth: "100px",
    maxWidth: "300px",
    cell: (row) => (
      <span className="flex items-center justify-center">
        {row?.amount || "100,000"}
      </span>
    ),
  },
  {
    name: "Status",
    cell: (row) => (
      <div className="flex items-center justify-center">
        <button
          style={{
            color: row.status === "Paid" ? "#26A4FF" : "#FF6550",
            background: "#E5F0FF",
          }}
          className="rounded-full whitespace-nowrap py-1 px-2"
        >
          {row.status === "Paid" ? "Paid" : "Pending"}
        </button>
      </div>
    ),
  },
  {
    name: "Activity",
    maxWidth: "140px",
    cell: (row) => (
      <span className="flex items-center justify-center">
        {row?.active ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    name: "Renewal Date",
    maxWidth: "300px",
    cell: (row) => (
      <span className="flex items-center justify-center">
        {row?.renewalDate || "N/A"}
      </span>
    ),
  },
  {
    name: "Action",
    maxWidth: "100px",
    cell: (row) => <ActionCell row={row} />,
  },,
];

export const BillData = [
  {
    reg: 1,
    user: "Alice Johnson",
    charges: "150,000",
    totaluser: 10,
  },
  {
    reg: 2,
    user: "Bob Smith",
    charges: "250,000",
    totaluser: 5,
  },
  {
    reg: 3,
    user: "Charlotte Brown",
    charges: "100,000",
    totaluser: 20,
  },
  {
    reg: 4,
    user: "David Wilson",
    charges: "200,000",
    totaluser: 8,
  },
  {
    reg: 5,
    user: "Emma Thompson",
    charges: "300,000",
    totaluser: 15,
  },
  {
    reg: 6,
    user: "Frank Garcia",
    charges: "120,000",
    totaluser: 12,
  },
  {
    reg: 7,
    user: "Grace Lee",
    charges: "400,000",
    totaluser: 25,
  },
  {
    reg: 8,
    user: "Hannah Kim",
    charges: "180,000",
    totaluser: 18,
  },
  {
    reg: 9,
    user: "Isaac Martinez",
    charges: "90,000",
    totaluser: 6,
  },
  {
    reg: 10,
    user: "John Doe",
    charges: "110,000",
    totaluser: 7,
  },
];

export const BillColumns = [
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
    name: "User",
    minWidth: "150px",
    maxWidth: "250px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.user.length > 15
          ? row.firstname.slice(0, 14) + "...."
          : row?.firstname || "John"}
      </span>
    ),
  },
  {
    name: "charges",
    minWidth: "100px",
    maxWidth: "300px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.charges || "100,000"}
      </span>
    ),
  },
  {
    name: "Total Users",
    minWidth: "100px",
    maxWidth: "300px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.totaluser || "1"}
      </span>
    ),
  },
  {
    name: "Total Amount",
    minWidth: "100px",
    maxWidth: "300px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.charges || "100"}
      </span>
    ),
  },
];

export const TransactionColumns = [
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
    name: "Logo",
    minWidth: "70px",
    maxWidth: "70px",
    cell: (row) => (
      <div className="flex items-center justify-center">
        <ImageLoader
          circeltrue={true}
          imageUrl={row?.logo}
          classes="rounded-full"
          style={{ maxWidth: "35px", maxHeight: "35px", objectFit: "cover" }}
        />
      </div>
    ),
  },
  {
    name: "First Name",
    minWidth: "150px",
    maxWidth: "250px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.firstname.length > 15
          ? row.firstname.slice(0, 14) + "...."
          : row?.firstname || "John"}
      </span>
    ),
  },
  {
    name: "Date",
    minWidth: "180px",
    maxWidth: "200px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.date || "12/07/24"}
      </span>
    ),
  },
  {
    name: "Amount",
    minWidth: "100px",
    maxWidth: "300px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.amount || "100,000"}
      </span>
    ),
  },
  {
    name: "paytype",
    minWidth: "100px",
    maxWidth: "300px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.paytype || "Paypal"}
      </span>
    ),
  },
  {
    name: "Status",
    cell: (row) => (
      <div className="flex items-center justify-center">
        <button
          style={{
            color: row.status === "Paid" ? "#26A4FF" : "#FF6550",
            background: "#E5F0FF",
          }}
          className="rounded py-1 px-2"
        >
          {row.status === "Success" ? "Success" : "Pending"}
        </button>
      </div>
    ),
  },
];

export const TransactionData = [
  {
    reg: 1,
    logo: avatar1,
    firstname: "Johnathan",
    date: "2024-07-12",
    amount: "100,000",
    paytype: "Paypal",
    status: "Success",
  },
  {
    reg: 2,
    logo: avatar1,
    firstname: "Alice",
    date: "2024-07-13",
    amount: "200,000",
    paytype: "Credit Card",
    status: "Pending",
  },
  {
    reg: 3,
    logo: avatar1,
    firstname: "Michael",
    date: "2024-07-14",
    amount: "150,000",
    paytype: "Paypal",
    status: "Success",
  },
  {
    reg: 4,
    logo: avatar1,
    firstname: "Catherine",
    date: "2024-07-15",
    amount: "250,000",
    paytype: "Bank Transfer",
    status: "Pending",
  },
  {
    reg: 5,
    logo: avatar1,
    firstname: "Robert",
    date: "2024-07-16",
    amount: "300,000",
    paytype: "Credit Card",
    status: "Success",
  },
  {
    reg: 6,
    logo: avatar1,
    firstname: "Sophia",
    date: "2024-07-17",
    amount: "350,000",
    paytype: "Paypal",
    status: "Pending",
  },
  {
    reg: 7,
    logo: avatar1,
    firstname: "David",
    date: "2024-07-18",
    amount: "400,000",
    paytype: "Credit Card",
    status: "Success",
  },
  {
    reg: 8,
    logo: avatar1,
    firstname: "Emma",
    date: "2024-07-19",
    amount: "450,000",
    paytype: "Bank Transfer",
    status: "Pending",
  },
  {
    reg: 9,
    logo: avatar1,
    firstname: "James",
    date: "2024-07-20",
    amount: "500,000",
    paytype: "Paypal",
    status: "Success",
  },
  {
    reg: 10,
    logo: avatar1,
    firstname: "Olivia",
    date: "2024-07-21",
    amount: "550,000",
    paytype: "Credit Card",
    status: "Pending",
  },
  {
    reg: 11,
    logo: avatar1,
    firstname: "William",
    date: "2024-07-22",
    amount: "600,000",
    paytype: "Paypal",
    status: "Success",
  },
  {
    reg: 12,
    logo: avatar1,
    firstname: "Ava",
    date: "2024-07-23",
    amount: "650,000",
    paytype: "Bank Transfer",
    status: "Pending",
  },
  {
    reg: 13,
    logo: avatar1,
    firstname: "Benjamin",
    date: "2024-07-24",
    amount: "700,000",
    paytype: "Credit Card",
    status: "Success",
  },
  {
    reg: 14,
    logo: avatar1,
    firstname: "Isabella",
    date: "2024-07-25",
    amount: "750,000",
    paytype: "Paypal",
    status: "Pending",
  },
  {
    reg: 15,
    logo: avatar1,
    firstname: "Lucas",
    date: "2024-07-26",
    amount: "800,000",
    paytype: "Bank Transfer",
    status: "Success",
  },
  {
    reg: 16,
    logo: avatar1,
    firstname: "Mia",
    date: "2024-07-27",
    amount: "850,000",
    paytype: "Credit Card",
    status: "Pending",
  },
  {
    reg: 17,
    logo: avatar1,
    firstname: "Henry",
    date: "2024-07-28",
    amount: "900,000",
    paytype: "Paypal",
    status: "Success",
  },
  {
    reg: 18,
    logo: avatar1,
    firstname: "Amelia",
    date: "2024-07-29",
    amount: "950,000",
    paytype: "Bank Transfer",
    status: "Pending",
  },
  {
    reg: 19,
    logo: avatar1,
    firstname: "Alexander",
    date: "2024-07-30",
    amount: "1,000,000",
    paytype: "Credit Card",
    status: "Success",
  },
  {
    reg: 20,
    logo: avatar1,
    firstname: "Charlotte",
    date: "2024-07-31",
    amount: "1,050,000",
    paytype: "Paypal",
    status: "Pending",
  },
];

export const StaffColumns = [
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
    name: "Name",
    minWidth: "200px",
    maxWidth: "350px",
    cell: (row) => (
      <div className="flex items-center justify-center">
        <ImageLoader
          circeltrue={true}
          imageUrl={row?.logo}
          classes="rounded-full w-8 h-8 mr-2"
        />
        <span>
          {row?.firstname.length > 15
            ? row.firstname.slice(0, 14) + "...."
            : row?.firstname || "John"}
        </span>
      </div>
    ),
  },
  {
    name: "Role",
    minWidth: "150px",
    maxWidth: "250px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.role || "staff"}
      </span>
    ),
  },
  {
    name: "Email",
    minWidth: "150px",
    maxWidth: "250px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.email || "example@gmail.com"}
      </span>
    ),
  },
  {
    name: "Mobile",
    minWidth: "150px",
    maxWidth: "250px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.mobile || "0123456789"}
      </span>
    ),
  },
  {
    name: "Assign Firm",
    minWidth: "150px",
    maxWidth: "250px",
    cell: (row) => (
      <span className="text-center flex items-center justify-center">
        {row?.assignie.length > 15
          ? row.assignie.slice(0, 14) + "...."
          : row?.assignie || "John"}
      </span>
    ),
  },
  {
    name: "Action",
    minWidth: "150px",
    maxWidth: "300px",
    cell: () => (
      <div className="flex justify-between items-center gap-2">
        <span className="flex cursor-pointer justify-center items-center bg-[#f8f8f8]  p-2 rounded-full">
          <FaEdit size={16} className="text_primary" />
        </span>
        <span className="flex cursor-pointer justify-center items-center bg-[#f8f8f8]  p-2 rounded-full">
          <RiDeleteBin6Line size={17} className="text_primary " />
        </span>
      </div>
    ),
  },
];

export const StaffData = [
  {
    reg: 1,
    firstname: "John Doe",
    role: "Manager",
    email: "johndoe@example.com",
    mobile: "1234567890",
    assignie: "ABC Corp",
    logo: avatar1,
  },
  {
    reg: 2,
    firstname: "Jane Smith",
    role: "Supervisor",
    email: "janesmith@example.com",
    mobile: "0987654321",
    assignie: "XYZ Ltd",
    logo: avatar1,
  },
  {
    reg: 3,
    firstname: "Robert Johnson",
    role: "Analyst",
    email: "robertj@example.com",
    mobile: "5551234567",
    assignie: "Tech Solutions",
    logo: avatar1,
  },
  {
    reg: 4,
    firstname: "Emily Brown",
    role: "Team Lead",
    email: "emilyb@example.com",
    mobile: "5559876543",
    assignie: "Innovate Ltd",
    logo: avatar1,
  },
  {
    reg: 5,
    firstname: "Michael Davis",
    role: "Developer",
    email: "michaeld@example.com",
    mobile: "5553332222",
    assignie: "WebWorks",
    logo: avatar1,
  },
  {
    reg: 6,
    firstname: "Sarah Wilson",
    role: "Designer",
    email: "sarahw@example.com",
    mobile: "5552223333",
    assignie: "Creative Minds",
    logo: avatar1,
  },
  {
    reg: 7,
    firstname: "David Lee",
    role: "Consultant",
    email: "davidl@example.com",
    mobile: "5554445555",
    assignie: "GrowthHub",
    logo: avatar1,
  },
  {
    reg: 8,
    firstname: "Jessica Martinez",
    role: "Product Manager",
    email: "jessicam@example.com",
    mobile: "5556667777",
    assignie: "Prodify",
    logo: avatar1,
  },
  {
    reg: 9,
    firstname: "Chris White",
    role: "Software Engineer",
    email: "chrisw@example.com",
    mobile: "5558889999",
    assignie: "DevOps Inc",
    logo: avatar1,
  },
  {
    reg: 10,
    firstname: "Karen Clark",
    role: "Marketing Lead",
    email: "karenc@example.com",
    mobile: "5557776666",
    assignie: "Brandify",
    logo: avatar1,
  },
  {
    reg: 11,
    firstname: "Matthew Hall",
    role: "Sales Executive",
    email: "matth@example.com",
    mobile: "5559998888",
    assignie: "SalesForce",
    logo: avatar1,
  },
  {
    reg: 12,
    firstname: "Laura Young",
    role: "HR Manager",
    email: "lauray@example.com",
    mobile: "5551112222",
    assignie: "PeopleOps",
    logo: avatar1,
  },
  {
    reg: 13,
    firstname: "Daniel Allen",
    role: "Data Analyst",
    email: "daniela@example.com",
    mobile: "5552224444",
    assignie: "DataWorks",
    logo: avatar1,
  },
  {
    reg: 14,
    firstname: "Olivia King",
    role: "Project Coordinator",
    email: "oliviak@example.com",
    mobile: "5553335555",
    assignie: "ManageIt",
    logo: avatar1,
  },
  {
    reg: 15,
    firstname: "James Wright",
    role: "Operations Manager",
    email: "jamesw@example.com",
    mobile: "5554446666",
    assignie: "OpsNow",
    logo: avatar1,
  },
  {
    reg: 16,
    firstname: "Megan Lopez",
    role: "QA Engineer",
    email: "meganl@example.com",
    mobile: "5555557777",
    assignie: "QualityFirst",
    logo: avatar1,
  },
  {
    reg: 17,
    firstname: "Andrew Scott",
    role: "Content Strategist",
    email: "andrewsc@example.com",
    mobile: "5556668888",
    assignie: "Contentify",
    logo: avatar1,
  },
  {
    reg: 18,
    firstname: "Rachel Adams",
    role: "Financial Analyst",
    email: "rachela@example.com",
    mobile: "5557779999",
    assignie: "FinTech",
    logo: avatar1,
  },
  {
    reg: 19,
    firstname: "Joshua Baker",
    role: "IT Support",
    email: "joshuab@example.com",
    mobile: "5558881111",
    assignie: "IT Solutions",
    logo: avatar1,
  },
  {
    reg: 20,
    firstname: "Samantha Gonzalez",
    role: "UX Designer",
    email: "samanthag@example.com",
    mobile: "5559992222",
    assignie: "DesignLab",
    logo: avatar1,
  },
];

export const StaffRoleData = [
  {
    reg: 1,
    firstname: "Johnathan",
    email: "john.doe@example.com",
  },
  {
    reg: 2,
    firstname: "Alice",
    email: "alice.smith@example.com",
  },
  {
    reg: 3,
    firstname: "Michael",
    email: "michael.jones@example.com",
  },
  {
    reg: 4,
    firstname: "Eleanor",
    email: "eleanor.martin@example.com",
  },
  {
    reg: 5,
    firstname: "Robert",
    email: "robert.brown@example.com",
  },
  {
    reg: 6,
    firstname: "Sarah",
    email: "sarah.wilson@example.com",
  },
  {
    reg: 7,
    firstname: "David",
    email: "david.anderson@example.com",
  },
  {
    reg: 8,
    firstname: "Emily",
    email: "emily.thomas@example.com",
  },
  {
    reg: 9,
    firstname: "Chris",
    email: "chris.jackson@example.com",
  },
  {
    reg: 10,
    firstname: "Jessica",
    email: "jessica.miller@example.com",
  },
];

export const StaffRoleColumns = [
  {
    name: "#",
    maxWidth: "60px",
    cell: (row) => (
      <span className=" w-full flex items-center justify-start">
        {row?.reg || "1"}
      </span>
    ),
  },
  {
    name: "Name",
    maxWidth: "300px",
    cell: (row) => (
      <div className=" w-full flex items-center justify-start">
        <span>
          {row?.firstname || "John"}
        </span>
      </div>
    ),
  },
  {
    name: "Email",
    maxWidth: "400px",
    cell: (row) => (
      <span>
        {row?.email || "example@gmail.com"}
      </span>
    ),
  },
  {
    name: "Action",
    minWidth: "300px",
    cell: () => (
      <div className="flex justify-start items-center gap-2 w-full">
        <span className="flex cursor-pointer justify-center items-center bg-[#f8f8f8] p-2 rounded-full">
          <FaEdit size={18} className="text_primary" />
        </span>
        <span className="flex cursor-pointer justify-center items-center bg-[#f8f8f8] p-2 rounded-full">
          <RiDeleteBin6Line size={18} className="text_primary" />
        </span>
      </div>
    ),
  },
];

export const FeaturePageColumns = [
  {
    name: "#",
    minWidth: "60px",
    maxWidth: "80px",
    cell: (row) => (
      <span className=" w-full flex items-center justify-start">
        {row?.reg || "1"}
      </span>
    ),
  },
  {
    name: "Title",
    minWidth: "300px",
    cell: (row) => (
      <div className=" w-full flex items-center justify-start">
        <span>
          {row?.title || "John"}
        </span>
      </div>
    ),
  },
  {
    name: "description",
    minWidth: "500px",
    maxWidth: "700px",
    cell: (row) => (
      <span className="overflow-hidden text-ellipsis">
        {row?.description || "example@gmail.com"}
      </span>
    ),
  },
  {
    name: "Action",
    minWidth: "120px",
    cell: () => (
      <div className="flex justify-start items-center gap-2 w-full">
        <span className="flex cursor-pointer justify-center items-center bg-[#f8f8f8] p-2 rounded-full">
          <FaEdit size={18} className="text_primary" />
        </span>
        <span className="flex cursor-pointer justify-center items-center bg-[#f8f8f8] p-2 rounded-full">
          <RiDeleteBin6Line size={18} className="text_primary" />
        </span>
      </div>
    ),
  },
];

export const FeaturePageData = [
  {
    reg: "1",
    title: "Project Alpha",
    description: "A short description of Project Alpha.",
  },
  {
    reg: "2",
    title: "Website Redesign",
    description:
      "An extensive project focusing on the redesign of the company's primary website.",
  },
  {
    reg: "3",
    title: "CRM Integration",
    description:
      "Implementation of a CRM system to streamline client management and improve sales operations.",
  },
  {
    reg: "4",
    title: "Mobile App Development",
    description:
      "Development of a mobile app with user-friendly design and cross-platform compatibility.",
  },
  {
    reg: "5",
    title: "Social Media Strategy",
    description:
      "Creation of a robust social media marketing strategy to increase online presence.",
  },
  {
    reg: "6",
    title: "Inventory Management System",
    description:
      "A comprehensive inventory system to manage stock levels and track product movements.",
  },
  {
    reg: "7",
    title: "SEO Optimization",
    description:
      "Optimization of website content and structure to improve search engine rankings.",
  },
  {
    reg: "8",
    title: "Content Marketing",
    description:
      "Strategy for generating and promoting valuable content to attract and retain customers.",
  },
  {
    reg: "9",
    title: "Customer Support Chatbot",
    description:
      "Development of an AI-powered chatbot to provide 24/7 customer support.",
  },
  {
    reg: "10",
    title: "Email Campaigns",
    description:
      "Creation of targeted email campaigns to boost customer engagement and sales.",
  },
];

export const registerFirmData = [
  {
    reg: "1",
    logo: avatar1, // Placeholder URL for logos
    firm: "Tech Solutions International",
    admin: "Alice Johnson",
  },
  {
    reg: "2",
    logo: avatar1,
    firm: "Global Innovations LLC",
    admin: "Michael Smith",
  },
  {
    reg: "3",
    logo: avatar1,
    firm: "Creative Minds Co.",
    admin: "Emily Davis",
  },
  {
    reg: "4",
    logo: avatar1,
    firm: "Pioneer Tech Partners",
    admin: "John Doe",
  },
  {
    reg: "5",
    logo: avatar1,
    firm: "NextGen Solutions",
    admin: "Sarah Lee",
  },
  {
    reg: "6",
    logo: avatar1,
    firm: "Innovatech Group",
    admin: "David Wilson",
  },
  {
    reg: "7",
    logo: avatar1,
    firm: "Future Vision Holdings",
    admin: "Sophia Brown",
  },
  {
    reg: "8",
    logo: avatar1,
    firm: "Bright Ideas Ltd.",
    admin: "Robert Taylor",
  },
  {
    reg: "9",
    logo: avatar1,
    firm: "Synergy Solutions",
    admin: "Laura Miller",
  },
  {
    reg: "10",
    logo: avatar1,
    firm: "Elite Consulting Group",
    admin: "James Anderson",
  },
];
