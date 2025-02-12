/* eslint-disable array-bracket-newline */
/* eslint-disable quote-props */
/* eslint-disable prefer-template */
/* eslint-disable semi */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import { Segmented } from "antd";
import React from "react";
import Chart from "react-apexcharts";
import HashLoader from "react-spinners/HashLoader";

const TransactionChart = ({ data, setDetailType , isLoading }) => {
  const options = {
    chart: {
      width: "100vw",
      type: "line",
      stacked: false,
    },
    dataLabels: {
      enabled: false,
      style: {
        fontSize: "16px",
      },
    },
    stroke: {
      curve: "straight",
    },
    markers: {
      size: 5,
      strokeColors: "#52BDCD",
      backgroundColor: "#52BDCD",
      shape: "circle",
      color: "#52BDCD",
      radius: 2,
      offsetX: 0,
      offsetY: 0,
      hover: {
        size: 6,
        sizeOffset: 3,
      },
    },
    colors: ["#52BDCD"],
    xaxis: {
      labels: {
        style: {
          colors: "#908B93",
        },
      },
    },
    yaxis: {
      min: 0,
      max: 50,
      tickAmount: 5,
      labels: {
        style: {
          colors: "#908B93",
        },
        formatter: function (val) {
          return val >= 1000 ? `$ ${(val / 1000).toFixed(1)}k` : val;
        },
      },
    },
    responsive: [
      {
        breakpoint: 500,
        options: {
          chart: {
            height: 250,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
    legend: {
      show: false,
    },
  };

  const seriesArea = [{ name: "Transactions", data: data }];

  return (
    <div className="w-full md:p-3">
      <div className="md:flex justify-between items-start">
        <div className="w-full">
          <h4 className="text-[#101828] archivo_medium text-[1.1rem] md:text-[1.25rem]">
            Transactions
          </h4>
          <p className="inter_regular text_secondary text-[0.85rem] md:text-[1rem]">
            Observe behavior in time slots
          </p>
        </div>
        <div>
          <Segmented
            className="text-[#908B93] capitalize"
            options={["weekly", "monthly", "yearly"]}
            defaultValue="weekly"
            onChange={(value) => {
              setDetailType(value);
            }}
          />
        </div>
      </div>
      <div className="h-auto m-auto">
        {
          isLoading? 
          <HashLoader  className="mx-auto"   color="#1857d2" size={24} className="py-6 text-center mx-auto" />
          :
        <Chart options={options} series={seriesArea} type="area" height={250} />
        }
      </div>
    </div>
  );
};

export default TransactionChart;
