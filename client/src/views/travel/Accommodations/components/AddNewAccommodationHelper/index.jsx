import { AutoComplete, Flex, Form, Input, message, Modal, Spin } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import CityInput from "components/common/CityInput";
import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useMemo, useState } from "react";
import useGetHotelInfoByName from "services/travel/accommodations/common/Queries/useGetHotelInfoByName";
import useGetHotelListByCity from "services/travel/accommodations/common/Queries/useGetHotelListByCity";
import search_loading from "assets/images/search_loading.gif";
import { useNavigate } from "react-router-dom";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const AddNewAccommodationHelper = ({ isOpen, close = () => {} }) => {
  const [form] = useForm();
  const city = useWatch("city", form);
  const name = useWatch("name", form);
  const debounceName = useDebounce(name, 300);
  const [hotelCode, setHotelCode] = useState(undefined);
  const navigate = useNavigate();
  // QUREIES
  const hotelList = useGetHotelListByCity(
    city ? { ...city, HotelName: debounceName || "" } : {}, // Only parse if valid JSON
    { enabled: !!city },
  );
  const hotelOptions = useMemo(
    () => hotelList?.data?.pages?.map((el) => el?.rows)?.flat(),
    [hotelList?.data],
  );

  const hotelInfo = useGetHotelInfoByName();

  useEffect(() => {
    if (city) {
      form.setFieldValue("name", undefined);
      setHotelCode(undefined);
    }
  }, [city]);
  /*
  {
    "HotelCode": 1417428,
    "HotelName": "Hotel MyStays Gotanda",
    "ShortDescription": "<p>HeadLine : In Tokyo (Shinagawa)</p><p>Location : With a stay at Hotel MyStays Gotanda in Tokyo (Shinagawa), you ll be a 5-minute drive from Tokyo Bay and 5 minutes from Tokyo Tower.  This hotel is 7.2 mi (11.5 km) from Tokyo Dome and 8.8 mi (14.1 km) from Tokyo Skytree.</p><p>Rooms : Make yourself at home in one of the 110 guestrooms featuring refrigerators and LED televisions. Complimentary wireless Internet access keeps you connected, and digital programming is available for your entertainment. Private bathrooms with shower/tub combinations feature complimentary toiletries and bidets. Conveniences include phones, as well as desks and blackout drapes/curtains.</p><p>CheckIn Instructions : <ul>  <li>Extra-person charges may apply and vary depending on property policy</li><li>Government-issued photo identification and a credit card or cash deposit may be required at check-in for incidental charges</li><li>Special requests are subject to availability upon check-in and may incur additional charges; special requests cannot be guaranteed</li><li>This property accepts credit cards and cash</li>  </ul></p><p>Special Instructions : Front desk staff will greet guests on arrival. For more details, please contact the property using the information on the booking confirmation.</p>&nbsp;<br/><b>Disclaimer notification: Amenities are subject to availability and may be chargeable as per the hotel policy.</b>",
    "HotelFacilities": "Well-lit path to entrance, Safe-deposit box at front desk, Vending machine, Wheelchair accessible – no, Luggage storage, elevator, Wheelchair-accessible path to elevator, Change of bed sheets (on request), 24-hour front desk, Free WiFi",
    "Attractions": "Distances are displayed to the nearest 0.1 mile and kilometer. <br /> <p>Happoen Garden - 1.8 km / 1.1 mi <br /> Yebisu Garden Place - 3.2 km / 2 mi <br /> Keio University - 3.2 km / 2 mi <br /> Tokyo Bay - 3.3 km / 2 mi <br /> Shiba Park - 4 km / 2.5 mi <br /> Ohi Racecourse - 4.5 km / 2.8 mi <br /> Roppongi Hills - 4.6 km / 2.9 mi <br /> Tokyo Tower - 4.7 km / 2.9 mi <br /> Shinagawa Aquarium - 4.9 km / 3 mi <br /> Tokyo Institute of Technology - 5 km / 3.1 mi <br /> Suntory Hall - 5.5 km / 3.4 mi <br /> Tokyo Anime Center - 5.7 km / 3.6 mi <br /> Shibuya Crossing - 5.9 km / 3.7 mi <br /> Tokyo Midtown - 6 km / 3.8 mi <br /> Cerulean Tower - 6.1 km / 3.8 mi <br /> </p><p>The nearest airports are:<br />Haneda Airport (HND) - 12.9 km / 8 mi<br /> Narita Intl. Airport (NRT) - 75.3 km / 46.8 mi<br /> </p><p></p>",
    "Images": "https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGufhI0oHOajFzRZ1ALWFR4tI=, https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGufhI0oHOajFzRZ1ALWFR4tI=, https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGuU6thc3K3ibiYEEOWOb5XW8=, https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGuWhATBvncz2QfULotlwlSeQ=, https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGuVjO0Jl3qmBpRKEL7yCS/a4=, https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGuTSfy36zTCRO6oyMV/HFWaQ=, https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGuWf7H0mIPWbrukObPUvJCKU=, https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGuTa47j7DHr/9kaRPyNEgnbU=, https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGuSW3WIz+p/O7Qi3pj/55eoI=, https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGuR3TK8o6u8kBmC/EhbskI94=, https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGuajwDIg2sh1ycodjlKv/Y0w=, https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5F3wAmN3NGLXcO42M8tWpgbyAtQiLmCpguhmo71/0W6mdlREFRaBGuTptA3IM+IoMHhC/tVPQj7I=",
    "Address": "2 5 4 Higashigotanda Shinagawa Ku, Shinagawa-kuTokyo 141-0022, Tokyo, 141-0022, Japan",
    "PinCode": "141-0022",
    "CityId": 148251,
    "CityName": "Tokyo",
    "CountryCode": "JP",
    "CountryName": "Japan",
    "PhoneNumber": "81-3-3449-4831",
    "FaxNumber": "81-3-3449-4833",
    "HotelRating": "2",
    "Map": "35.625489|139.728412",
    "CheckInTime": "3:00 PM",
    "CheckOutTime": "11:00 AM",
    "createdAt": "2025-01-08T09:38:14.567Z",
    "updatedAt": "2025-01-08T09:38:14.567Z"
}
  */
  useEffect(() => {
    if (hotelInfo?.data) {
      close();
      navigate(ROUTER_URLS.TRAVEL.ACCOMMODATION.ADD, {
        state: {
          city,
          name: hotelInfo?.data?.HotelName,
          location: {
            location: hotelInfo?.data?.Address ? hotelInfo?.data?.Address : "",
            lat: hotelInfo?.data?.Map ? hotelInfo?.data?.Map?.split("|")[0] : 0,
            lng: hotelInfo?.data?.Map ? hotelInfo?.data?.Map?.split("|")[1] : 0,
          },
          description: [
            {
              name: "english",
              value: hotelInfo?.data ? hotelInfo?.data?.ShortDescription : "",
            },
          ],
          rate: hotelInfo?.data?.HotelRating ? Number(hotelInfo?.data?.HotelRating) : undefined,
          images: hotelInfo?.data?.Images
            ? hotelInfo?.data?.Images?.split(",")?.map((el) => ({
                id: uuidv4(),
                name: el?.trim(),
                link: el?.trim(),
              }))
            : [],
          checkInTime: hotelInfo?.data?.CheckInTime,
          checkOutTime: hotelInfo?.data?.CheckOutTime,
          phoneNumber: hotelInfo?.data?.PhoneNumber
            ? {
                prefix: Array.isArray(hotelInfo?.data?.PhoneNumber?.split("-"))
                  ? hotelInfo?.data?.PhoneNumber?.split("-")[0]
                  : undefined,
                mobile: hotelInfo?.data?.PhoneNumber?.split("-")?.slice(1)?.join(""),
              }
            : "",
          postalCode: hotelInfo?.data?.PinCode,
          address: hotelInfo?.data?.Address,
          metaTitle: hotelInfo?.data?.HotelName,
          metaKeywords: Array.isArray(hotelInfo?.data?.HotelName.split(" "))
            ? [
                ...hotelInfo?.data?.HotelName?.split(" "),
                city?.city,
                city?.country,
                "hotel",
                "stay",
              ]
            : [hotelInfo?.data?.HotelName, city?.city, city?.country, "hotel", "stay"],
          metaDescription: hotelInfo?.data?.ShortDescription?.replace(/<[^>]*>/g, "")?.trim(),
        },
      });
    }
  }, [hotelInfo?.data]);

  return (
    <Modal
      title={"Add new accommodation"}
      open={isOpen}
      onCancel={() => {
        close();
        form.resetFields();
      }}
      okText="Next"
      onOk={() => {
        if (hotelCode) {
          hotelInfo.mutate(hotelCode);
        } else {
          navigate(ROUTER_URLS.TRAVEL.ACCOMMODATION.ADD, {
            state: {
              city,
              name,
            },
          });
          close();
        }
      }}>
      <Form form={form} layout="vertical">
        {hotelInfo?.isPending && (
          <Flex justify="center" align="center" gap={4} vertical style={{ padding: "20px" }}>
            <img
              src={search_loading}
              alt="loading"
              style={{ width: "200px", height: "200px", objectFit: "contain" }}
            />
            <p className="fz-16 text-center">
              Searching for accommodation information
              <br /> This may take a few seconds.
            </p>
          </Flex>
        )}
        <Form.Item name="city" label="City" hidden={hotelInfo?.isPending}>
          <CityInput />
        </Form.Item>
        <Form.Item
          name="name"
          hidden={hotelInfo?.isPending}
          label={<span className="fz-12">Name</span>}
          rules={[{ required: true, message: "Enter accommodation name" }]}>
          <AutoComplete
            onPopupScroll={(e) => {
              if (e.target.scrollTop + e.target.clientHeight === e.target.scrollHeight) {
                hotelList?.fetchNextPage();
              }
            }}
            onSearch={() => {
              if (hotelCode) setHotelCode(undefined);
            }}
            onSelect={(value) =>
              setHotelCode(hotelOptions?.find((el) => value === el?.HotelName)?.HotelCode)
            }
            options={[
              ...(hotelOptions?.length > 0
                ? hotelOptions.map((el) => ({
                    label: el?.HotelName,
                    value: el?.HotelName,
                  }))
                : hotelList?.isFetching
                ? [
                    {
                      label: (
                        <Flex align="center" gap={8}>
                          <Spin size="small" /> <p>Searching for hotels...</p>
                        </Flex>
                      ),
                      value: "loading",
                      disabled: true,
                    },
                  ]
                : [
                    {
                      label: <p>No hotels found</p>,
                      value: "no_results",
                      disabled: true,
                    },
                  ]),
              ...(hotelList?.isFetchingNextPage
                ? [
                    {
                      label: (
                        <Flex align="center" gap={8}>
                          <Spin size="small" /> <p>Loading more hotels...</p>
                        </Flex>
                      ),
                      value: "loading_more",
                      disabled: true,
                    },
                  ]
                : []),
            ]}>
            <Input placeholder="Enter Name Here" />
          </AutoComplete>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewAccommodationHelper;
