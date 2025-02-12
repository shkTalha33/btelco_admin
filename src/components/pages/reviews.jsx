import React from "react";
import TopSection from "../dashboard/TopSection";
import { Col, Container, Row } from "reactstrap";
import { Divider, Dropdown, Rate } from "antd";
import { avatar } from "../icons/icon";
import { HiOutlineDotsVertical } from "react-icons/hi";

export default function Reviews() {
  const reviewData = [
    {
      image: avatar,
      rating: 5,
      name: "Miles, Esther",
      ad: "4K UHD LED Smart TV with Chromecast Built-in",
      review:
        "The Dropbox HQ in San Francisco is one of the best designed & most comfortable offices I have ever witnessed. Great stuff! If you happen to visit SanFran, don't miss the chance to witness it yourself.",
    },
    {
      image: avatar,
      rating: 4,
      name: "Miles, Esther",
      ad: "4K UHD LED Smart TV with Chromecast Built-in",
      review:
        "The Dropbox HQ in San Francisco is one of the best designed & most comfortable offices I have ever witnessed. Great stuff! If you happen to visit SanFran, don't miss the chance to witness it yourself.",
    },
    {
      image: avatar,
      rating: 4.5,
      name: "Miles, Esther",
      ad: "4K UHD LED Smart TV with Chromecast Built-in",
      review:
        "The Dropbox HQ in San Francisco is one of the best designed & most comfortable offices I have ever witnessed. Great stuff! If you happen to visit SanFran, don't miss the chance to witness it yourself.",
    },
    {
      image: avatar,
      rating: 5,
      name: "Miles, Esther",
      ad: "4K UHD LED Smart TV with Chromecast Built-in",
      review:
        "The Dropbox HQ in San Francisco is one of the best designed & most comfortable offices I have ever witnessed. Great stuff! If you happen to visit SanFran, don't miss the chance to witness it yourself.",
    },
  ];

  const items = [
    {
      label: 'Review Feedback',
      key: '1',
    },
    {
      label: 'Request for revision',
      key: '2',
    }
  ];

  const onClick = ({ key }) => {
  };

  return (
    <>
      <main className="inter_regular add-firm text-sm lg:container p-2 p-md-4 mx-auto">
        <TopSection
          userName="Good morning, Jake"
          description="Here are Alert for summary of the leads overview."
        />
        <Container fluid className="px-4 md:px-[1.875rem] py-[1.5rem] bg_white my-[0.7rem] border container-radius border-white w-full container-shahdow ">
          <Row className="">
            <Col xs="3" sm="2" className="py-[1.18rem] px-[1.18rem] bg-[#FFF8E0] text-[2rem] inter_semibold flex items-center justify-center">
              4.5
            </Col>
            <Col xs="9" sm="10" className="flex flex-col gap-[.5rem]">
              <Rate allowHalf disabled defaultValue={4.5} />
              <p className="text-[1rem] md:text-[1rem] inter_bold text-[#191F33] mb-0">
                4.5 Star Average Rating
              </p>
              <p className="text-[0.875rem] inter_regular text-[#767E94] mb-0">
                644,653 People Writed Review
              </p>
            </Col>
          </Row>
        </Container>

        <Container fluid className="px-[1rem] md:px-[1.875rem] py-[1.5rem] bg_white my-[0.7rem] border container-radius border-white w-full container-shahdow ">
          <h6 className="text_primary text-[1rem] inter_bold">Reviews</h6>
          <Divider />
          {reviewData.map((review, index) => {
            return (
              <Row key={index} className="my-[2rem]">
                <Col md="12">
                  <Row className="items-center sm:items-start">
                    <Col xs="3" sm="2" md="1" className="order-1">
                      <img
                        src={review.image}
                        alt="Person"
                        className="rounded-full w-[2.5rem] sm:w-[5.5rem]"
                      />
                    </Col>
                    <Col sm="8" md="9" className="flex flex-col gap-2 order-3 order-sm-1 pt-[1rem] sm:pt-0">
                      <div className="flex gap-[.5rem]">
                        <Rate allowHalf disabled defaultValue={review.rating} />
                        <p className="text-[0.875rem] inter_semibold text-[#191F33] mb-0">
                          {review.rating} Star Ratings
                        </p>
                      </div>
                      <div className="flex gap-[.5rem]">
                        <p className="text-[0.85rem] md:text-[1rem] text-[#191F33] inter_semibold mb-0 whitespace-nowrap">
                          {review.name}
                        </p>
                        <p className="text-[0.75rem] inter_regular text-[#464D61] mb-0">
                          <span className="text-[0.75rem] text-[#939AAD]">
                            Ads:
                          </span>
                          {review.ad}
                        </p>
                      </div>
                      <p className="text-[0.85rem] md:text-[1rem] inter_regular text-[#464D61] mb-0 md:w-[80%]">
                        {review.review}
                      </p>
                    </Col>
                    <Col xs="9" sm="2" md="2" className="text-end md:text-center order-1">
                      <Dropdown
                        menu={{
                          items,
                          onClick,
                        }}
                      >
                        <div className="bg_mainsecondary inline-block p-[0.3rem] sm:p-[0.5rem] rounded-full cursor-pointer">
                          <HiOutlineDotsVertical
                            className="text_primary text-[1.1rem] sm:text-[1.375rem]"
                          />
                        </div>
                      </Dropdown>
                    </Col>
                  </Row>
                </Col>
              </Row>
            );
          })}
          <div className="text-center">
            <button className="bg_mainsecondary text_primary text-[1rem] py-[0.7rem] px-[3rem] rounded-[0.25rem]">
              Load More
            </button>
          </div>
        </Container>
      </main>
    </>
  );
}
