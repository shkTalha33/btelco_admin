import React from "react";
import { Col } from "reactstrap";

export default function SummaryBox({stats}) {

  return (
    <>
      {stats.map((stat) => {
        return (
          <Col className="bg-[#FFEFF18C] py-[1.5rem] lead-box-shahdow flex items-center justify-center flex-col gap-3 md:min-h-[200px] rounded-lg">
            <h6 className="inter_semibold text-center md:text-start">{stat.detail}</h6>
            <p className="poppins_semibold text-[1.75rem] md:text-[3rem] text_darkprimary text-center md:text-start">{stat.value}</p>
          </Col>
        );
      })}
    </>
  );
}
