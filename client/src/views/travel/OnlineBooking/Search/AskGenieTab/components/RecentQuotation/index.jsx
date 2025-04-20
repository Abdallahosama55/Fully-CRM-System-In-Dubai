import React from "react";
import HomeSection from "../HomeSection";
import { Flex, Image } from "antd";
const mockData = [
  { id: 1, image: "https://picsum.photos/200", title: "Atlantis", type: "Hotel" },
  { id: 2, image: "https://picsum.photos/250", title: "3 days in Dubai", type: "Package" },
  { id: 3, image: "https://picsum.photos/300", title: "Amman to Istanbul", type: "Flight" },
  { id: 4, image: "https://picsum.photos/350", title: "colosseum", type: "Experiences" },
  { id: 5, image: "https://picsum.photos/400", title: "Dodge", type: "Transfer" },
  { id: 6, image: "https://picsum.photos/200", title: "Atlantis", type: "Hotel" },
  { id: 7, image: "https://picsum.photos/250", title: "3 days in Dubai", type: "Package" },
  { id: 8, image: "https://picsum.photos/300", title: "Amman to Istanbul", type: "Flight" },
  { id: 9, image: "https://picsum.photos/350", title: "colosseum", type: "Experiences" },
  { id: 10, image: "https://picsum.photos/400", title: "Dodge", type: "Transfer" },
];
const RecentQuotation = () => {
  return (
    <HomeSection title={"Recent quotation"}>
      {mockData?.slice(0, 5)?.map((el) => (
        <Flex gap={8} key={el?.id} style={{ marginBottom: "1rem" }}>
          <Image src={el?.image} width={"40px"} height={"40px"} style={{ borderRadius: "4px " }} />
          <div>
            <p className="sm_text_medium">{el?.title}</p>
            <p className="xs_text_regular">{el?.type}</p>
          </div>
        </Flex>
      ))}
    </HomeSection>
  );
};

export default RecentQuotation;
