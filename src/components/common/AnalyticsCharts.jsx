import React, { useState } from "react";
import Chart from "react-apexcharts";

const AnalyticsCharts = ({ options, series, title, type }) => {
  return (
    <div>
      <h2 className="text_darkprimary inter_medium text-[1.25rem] md:text-[1.5rem]">{title}</h2>
      <Chart
        options={options}
        series={series}
        type={type}
        height={350}
      />
    </div>
  );
};

export default AnalyticsCharts;
