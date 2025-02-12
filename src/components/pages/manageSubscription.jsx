import debounce from "debounce";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { BillData } from "../../utils/dummyData";
import ApiFunction from "../api/apiFuntions";
import {
  getCompaniesSubscriptions,
  subscriptionCount,
} from "../api/ApiRoutesFile";
import { handleError } from "../api/errorHandler";
import ProductTable from "../dataTable2/productTable";
import TableWithoutPaging from "../dataTable2/tableWithoutPaging";
import { avatar } from "../icons/icon";

export default function ManageSubscription() {
  const [subscriptionPage, setSubscriptionPage] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [subscriptionData, setSubscriptionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [lastId, setLastId] = useState(1);
  const [lastId1, setLastId1] = useState(1);
  const [subscriptionCountData, setSubscriptionCountData] = useState([]);
  const [select, setSelect] = useState("");
  const [selectPlan, setSelectPlan] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [itemsPerPage1, setItemsPerPage1] = useState(5);
  const { get, post } = ApiFunction();

  useEffect(() => {
    const total = BillData.reduce((accumulator, currentValue) => {
      return accumulator + parseInt(currentValue.charges);
    }, 0);

    setTotalAmount(total);
  }, [BillData]);

  const fetchSubscriptions = debounce(async () => {
    setLoading(true);
    const apiData = { sub_status: select, search: search };
    await post(`${getCompaniesSubscriptions}/${lastId}`, apiData)
      .then((result) => {
        if (result.success) {
          setSubscriptionData(result?.users);
          setCount(result?.count?.totalPage);
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, 300);
  const fetchSubscriptionsCount = debounce(async () => {
    setLoading2(true);
    await get(subscriptionCount)
      .then((result) => {
        if (result.success) {
          setSubscriptionCountData(result?.packages);
        }
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading2(false);
      });
  }, 300);

  useEffect(() => {
    fetchSubscriptions();
  }, [lastId, search, select, selectPlan]);

  useEffect(() => {
    fetchSubscriptionsCount();
  }, []);

  const subscriptionsCountcolumns = [
    {
      name: "#",
      minWidth: "60px",
      maxWidth: "80px",
      cell: (_, index) => (
        <span className="flex items-start justify-start">
          {(parseInt(lastId1) - 1) * 10 + (index + 1) || "1"}
        </span>
      ),
    },
    {
      name: "Package Name",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="flex justify-center items-center">{row?.name}</span>
      ),
    },
    {
      name: "Interval",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="flex justify-center items-center capitalize">
          {row?.interval || "N/A"}
        </span>
      ),
    },
    {
      name: "Total Subscribed Plan's",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="flex justify-center items-center">{row?.count}</span>
      ),
    },
  ];

  const subscriptionsColumns = [
    {
      name: "#",
      minWidth: "40px",
      maxWidth: "60px",
      cell: (_, index) => (
        <span className="flex items-start justify-start">
          {(parseInt(lastId) - 1) * 10 + (index + 1) || "1"}
        </span>
      ),
    },
    {
      name: "Logo",
      minWidth: "70px",
      maxWidth: "70px",
      cell: (row) => (
        <img
          src={row?.admin?.profile || avatar}
          alt="firm-logo"
          className="rounded-[50%] w-[35px] h-[35px]"
        />
      ),
    },
    {
      name: "Name",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="flex justify-center items-center capitalize">
          {row?.admin?.fname + " " + row?.admin?.lname}
        </span>
      ),
    },
    {
      name: "Email",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="flex justify-center items-center">
          {row?.admin?.email}
        </span>
      ),
    },
    {
      name: "Plan",
      minWidth: "150px",
      maxWidth: "250px",
      cell: (row) => (
        <span className="flex justify-center items-center capitalize">
          {row?.current_sub?.plan_type || "N/A"}
        </span>
      ),
    },
    {
      name: "Bill Due Date",
      minWidth: "180px",
      maxWidth: "200px",
      cell: (row) => (
        <span className="flex justify-center items-center text-center">
          {row?.expirey_date
            ? moment(row?.expirey_date).format("MM/DD/YYYY")
            : "N/A"}
        </span>
      ),
    },
    {
      name: "Bill Amount",
      minWidth: "100px",
      maxWidth: "300px",
      cell: (row) => (
        <span className="flex justify-center items-center text-center">
          {row?.current_sub?.amount || "N/A"}
        </span>
      ),
    },
    {
      name: "Status",
      cell: (row) => (
        <div className="flex justify-center items-center">
          <button
            style={{
              color: row.sub_status === "Paid" ? "#26A4FF" : "#FF6550",
              background: "#E5F0FF",
            }}
            className="px-2 py-1 rounded-full"
          >
            {row.sub_status || "No Plan Buy"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <main className="inter_regular add-firm text-sm lg:container p-[0.5rem] p-md-4 mx-auto">
        <Container
          fluid
          className="px-[1rem] md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full"
        >
          <ProductTable
            rowHeading={"list of Subscriptions"}
            count={count}
            loading={loading}
            setCurrentPage={setSubscriptionPage}
            currentPage={subscriptionPage}
            columns={subscriptionsColumns}
            data={subscriptionData}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setLastId={setLastId}
            setSearch={setSearch}
            setSelect={setSelect}
            // setSelectPlan={setSelectPlan}
            showSearch={true}
            showFilter={true}
          />
        </Container>
        <Container
          fluid
          className="px-[1rem] py-4 md:px-5  bg_white my-3 border rounded-lg border-white w-full"
        >
          <TableWithoutPaging
            rowHeading={"subscription bill receive payment"}
            columns={subscriptionsCountcolumns}
            data={subscriptionCountData}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            count={count}
            loading={loading2}
          />
        </Container>
      </main>
    </>
  );
}
