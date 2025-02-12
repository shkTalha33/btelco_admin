import React from "react";
import Chart from "react-apexcharts";
import HashLoader from "react-spinners/HashLoader";

const DounutChart = ({ data, isLoading }) => {
  const packagesDatas = data || [];
  const labels = packagesDatas.map((item) => item?.name || "N/A");
  const seriesData = packagesDatas.map((item) => item?.count || 0);

  const options = {
    chart: {
      type: "donut",
      width: "100%",
    },
    labels: labels,
    colors: ["#6D80E5", "#E37882", "#FFA500", "#00FF00", "#FF00FF"],
    legend: {
      position: "right",
      fontSize: "16px",
      fontFamily: "Poppins, sans-serif",
      labels: {
        colors: "#908B93",
      },
      markers: {
        width: 16,
        height: 16,
        radius: 50,
      },
      itemMargin: {
        vertical: 8,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "45%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 1400,
        options: {
          chart: {
            width: "80%",
          },
          legend: {
            position: "bottom",
            fontSize: "14px",
          },
        },
      },
      {
        breakpoint: 1024,
        options: {
          chart: {
            width: "90%",
          },
          legend: {
            position: "bottom",
            fontSize: "12px",
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
            fontSize: "12px",
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
            fontSize: "10px",
          },
        },
      },
    ],
  };

  const series = seriesData;

  return (
    <div className="w-full md:p-3">
      <div className="md:flex justify-between items-start">
        <div className="w-full">
          <h4 className="text-[#101828] archivo_medium mb-3">Subscription</h4>
        </div>
      </div>
      <div className="lg:flex items-center flex-wrap justify-center">
        <div className="text-start lg:w-[60%]">
          {isLoading ? (
            <HashLoader  className="mx-auto"  
              color="#1857d2"
              size={24}
              className="py-6 text-center mx-auto"
            />
          ) : (
            <Chart
              options={options}
              series={series}
              type="donut"
              height={300}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DounutChart;
