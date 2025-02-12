import React from "react";
import { Col, Container, Row } from "reactstrap";
import { pdfIcon } from "../icons/icon";
import { Checkbox, Divider } from "antd";

export default function InformationDisplaySection({ details }) {
  return (
    <>
      <Container className="cleint-detail-page inter_regular px-4 md:px-5 py-4 bg_white my-3 border rounded-lg border-white w-full">
        {details.map((detail, index) => {
          return (
            <div key={index}>
              <Row>
                <Col md="6">
                  <h4 className="text-[#202430] poppins_medium text-[1.5rem] md:text-[1.75rem]">
                    {detail.title}
                  </h4>
                  <p className="text-[#78828A] text-[1rem] md:text-[1.125rem]">
                    {detail.description}
                  </p>
                </Col>
                <Col md="6">
                  {detail.type === "input" ? (
                    <Row className="gap-2">
                      {detail.subDetails.map((subDetail, i) => {
                        return (
                          <Col
                            key={i}
                            md="12"
                            className="bg-[#F2F2F2] rounded-[5px] py-3 px-4 "
                          >
                            <Row className="text-start">
                              <Col md="3">
                                <p className="text_secondary inter_bold text-[0.937rem] mb-0">
                                  {subDetail.fieldName}
                                </p>
                              </Col>
                              <Col md="9">
                                {subDetail.fieldName === "Image" ? (
                                  <p className="text-[#9B9B9B] inter_medium text-[0.937rem] mb-0">
                                    <img
                                      src={subDetail.value}
                                      alt={subDetail.value}
                                      width={40}
                                    />
                                  </p>
                                ) : subDetail.fieldName === "Pdf" ? (
                                  <p className="text-[#9B9B9B] inter_medium text-[0.937rem] mb-0 flex items-center justify-start gap-2">
                                    <img src={pdfIcon} alt="pdf" width={40} />{" "}
                                    {subDetail.value}
                                  </p>
                                ) : (
                                  <p className="text-[#9B9B9B] inter_medium text-[0.937rem] mb-0">
                                    {subDetail.value}
                                  </p>
                                )}
                              </Col>
                            </Row>
                          </Col>
                        );
                      })}
                    </Row>
                  ) : (
                    <Row className="gap-2">
                      {detail.subDetails.map((subDetail, i) => {
                        return (
                          <Col
                            key={i}
                            md="12"
                            className="rounded-[5px] py-3 px-4 "
                          >
                            <Row className="text-start">
                              <Checkbox>
                                {subDetail.value}
                              </Checkbox>
                            </Row>
                          </Col>
                        );
                      })}
                    </Row>
                  )}
                </Col>
              </Row>
              <Divider />
            </div>
          );
        })}
        <div className="text-end">
          <button className="bg_primary inter_medium text_white py-[1.25rem] px-[8rem] text-[1.3rem] poppins_medium rounded-[.5rem]">
            Save
          </button>
        </div>
      </Container>
    </>
  );
}
