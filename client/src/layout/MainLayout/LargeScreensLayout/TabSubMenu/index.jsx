import Logo from "components/common/Logo";
import React, { useEffect, useMemo, useState } from "react";
// style
import "./styles.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SvgImage from "components/common/SvgImage";
import isValidSVG from "utils/isValidSVG";
import { Button, Dropdown, message, Typography } from "antd";
import { ArrowDownSVG, PlusSVG, VedioCallFilledSVG } from "assets/jsx-svg";
import CallsAndMeetingsAdd from "views/Collaboration/CallsAndMeetingsAdd";
import { useDrawer } from "hooks/useDrawer";
import { useUserContext } from "context/userContext";
import ROUTER_URLS from "constants/ROUTER_URLS";
import { ONLINE_BOOKING_TAB_MENU_ITEM_KEY } from "..";
import usePageTitle from "hooks/usePageTitle";
import NewQuotationModal from "components/AddToQuotation/NewQuotationModal";
import useCreateQuotation from "services/travel/quotation/Mutations/useCreateQuotation";

const TRAVEL_DROPDOWN_MENU_ACTIONS = {
  NEW_QUOTATION: "NEW_QUOTATION",
  START_LIVE_ITINERARY: "START_LIVE_ITINERARY",
  BOOK_FROM_LOCAL: "BOOK_FROM_LOCAL",
};

const TabSubMenu = ({ subMenu, isSubMenuOpen, closeSubMenu, setActiveSubMenuId }) => {
  const DrawerAPI = useDrawer();
  const [activeSubMenuItemId, setActiveSubMenuItemId] = useState(undefined);
  const [isActionDropDownOpen, setIsActionDropDownOpen] = useState(false);
  const [isAddNewTripOpen, setIsAddNewTripOpen] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    if (!isSubMenuOpen && isActionDropDownOpen) {
      setIsActionDropDownOpen(false);
    }
  }, [isSubMenuOpen, isActionDropDownOpen]);
  console.log({ subMenu });
  useEffect(() => {
    if (pathname !== "/") {
      if (Array.isArray(subMenu?.children)) {
        let temp = undefined;

        subMenu?.children?.forEach((section) => {
          if (Array.isArray(section?.children)) {
            section?.children?.forEach((item) => {
              if (item?.index === pathname) {
                temp = item?.id;
              }
            });
          }
        });

        setActiveSubMenuItemId(temp);
      }
    }
  }, [subMenu]);

  const navigate = useNavigate();
  const { setPageTitle } = usePageTitle();

  const [activeAction, setActiveAction] = useState(TRAVEL_DROPDOWN_MENU_ACTIONS.NEW_QUOTATION);

  const { user } = useUserContext();
  const isTravel = useMemo(
    () => Boolean(user?.companyApps?.find((el) => el?.name === "Vindo-Travel")),
    [user.companyApps],
  );

  const createQuotation = useCreateQuotation({
    onSuccess: (res) => {
      message.success("Quotation created successfully");
      setIsAddNewTripOpen(false);
      setIsActionDropDownOpen(false);
      closeSubMenu();
      navigate(ROUTER_URLS.TRAVEL.QUOTATION.VIEW.replace(":id", res));
    },
    onError: (error) => {
      message.error(error?.message || "something went wrong");
    },
  });

  const handelFinish = (values) => {
    const temp = {
      ...values,
    };
    createQuotation.mutate(temp);
  };

  return (
    <>
      <NewQuotationModal
        isOpen={isAddNewTripOpen}
        close={() => setIsAddNewTripOpen(false)}
        handelFinish={handelFinish}
        loading={createQuotation?.isPending}
      />
      {DrawerAPI.Render}
      <div className="main_layout_tab_sub_menu">
        <div className="sub_menu_header">
          <Logo />
          {isTravel ? (
            <Dropdown
              trigger={["click"]}
              open={isActionDropDownOpen}
              onOpenChange={(value) => setIsActionDropDownOpen(value)}
              menu={{
                items: [
                  {
                    key: TRAVEL_DROPDOWN_MENU_ACTIONS.NEW_QUOTATION,
                    label: <p>New Quotation</p>,
                    onClick: () => {
                      setIsAddNewTripOpen(true);
                      setActiveAction(TRAVEL_DROPDOWN_MENU_ACTIONS.NEW_QUOTATION);
                    },
                  },
                  {
                    key: TRAVEL_DROPDOWN_MENU_ACTIONS.START_LIVE_ITINERARY,
                    label: <p>Start live itinerary</p>,
                    onClick: () => {
                      DrawerAPI.open("40%");
                      DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd DrawerAPI={DrawerAPI} />);
                      setActiveAction(TRAVEL_DROPDOWN_MENU_ACTIONS.START_LIVE_ITINERARY);
                    },
                  },
                  user?.displayLocalVoucher && {
                    key: TRAVEL_DROPDOWN_MENU_ACTIONS.BOOK_FROM_LOCAL,
                    label: <p>Local Voucher</p>,
                    onClick: () => {
                      closeSubMenu();
                      navigate("/?isLocalBook=true");
                      setPageTitle("Local Book");
                      setActiveSubMenuId(ONLINE_BOOKING_TAB_MENU_ITEM_KEY);
                    },
                  },
                ]?.filter(Boolean),
              }}>
              <>
                <div
                  className="mt-1"
                  style={{
                    borderRadius: "8px",
                    display: "flex",
                    background: "var(--vbooking-b900)",
                  }}>
                  <Button
                    type="text"
                    style={{
                      height: "40px",
                      borderInlineEnd: "1px solid rgba(255, 255, 255, 0.20)",
                      width: "calc(100% - 35px)",
                    }}
                    onClick={() => {
                      if (activeAction === TRAVEL_DROPDOWN_MENU_ACTIONS.START_LIVE_ITINERARY) {
                        DrawerAPI.open("40%");
                        DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd DrawerAPI={DrawerAPI} />);
                      } else if (activeAction === TRAVEL_DROPDOWN_MENU_ACTIONS.NEW_QUOTATION) {
                        setIsAddNewTripOpen(true);
                        setActiveAction(TRAVEL_DROPDOWN_MENU_ACTIONS.NEW_QUOTATION);
                      } else {
                        closeSubMenu();
                        navigate("/?isLocalBook=true");
                        setPageTitle("Local Book");
                      }
                    }}
                    icon={<PlusSVG />}>
                    <Typography.Text
                      className="sm_text_medium"
                      ellipsis={{
                        tooltip:
                          activeAction === TRAVEL_DROPDOWN_MENU_ACTIONS.NEW_QUOTATION
                            ? "New Quotation"
                            : activeAction === TRAVEL_DROPDOWN_MENU_ACTIONS.START_LIVE_ITINERARY
                            ? "Start live itinerary"
                            : "Local Voucher",
                      }}
                      style={{ color: "#fff" }}>
                      {activeAction === TRAVEL_DROPDOWN_MENU_ACTIONS.NEW_QUOTATION
                        ? "New Quotation"
                        : activeAction === TRAVEL_DROPDOWN_MENU_ACTIONS.START_LIVE_ITINERARY
                        ? "Start live itinerary"
                        : "Local Voucher"}
                    </Typography.Text>
                  </Button>

                  <Button
                    onClick={() => setIsActionDropDownOpen((prev) => !prev)}
                    type="text"
                    style={{ color: "#fff", height: "40px", width: "35px" }}
                    icon={<ArrowDownSVG color="#fff" />}
                  />
                </div>
              </>
            </Dropdown>
          ) : (
            <Button
              block
              icon={<VedioCallFilledSVG />}
              onClick={() => {
                DrawerAPI.open("40%");
                DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd DrawerAPI={DrawerAPI} />);
              }}
              className="mt-1"
              type="primary"
              style={{
                background: "var(--vbooking-b900)",
                height: "40px",
                borderRadius: "8px",
              }}>
              Schedule Meeting
            </Button>
          )}
        </div>
        <div>
          {subMenu?.children?.map((section, index) => (
            <div className="sub_menu_section" key={section?.id}>
              {section?.name !== "-" ? (
                <>
                  {index === 0 && <div className="sections_devider" />}
                  <p className="section_title">{section?.name}</p>
                </>
              ) : (
                <div className="sections_devider" />
              )}

              {section?.children?.map((el) => (
                <Link key={el.id} to={el?.index} onClick={() => setActiveSubMenuItemId(el.id)}>
                  <div
                    className={`sub_menu_item ${el?.id === activeSubMenuItemId ? "active" : ""}`}>
                    {el?.icon ? (
                      isValidSVG(el?.icon) ? (
                        <SvgImage
                          svgContent={el?.icon}
                          width="24px"
                          height="24px"
                          className="sub_menu_item-icon"
                        />
                      ) : (
                        <img
                          src={el?.icon}
                          alt={el?.name}
                          width={24}
                          height={24}
                          style={{ objectFit: "contain" }}
                        />
                      )
                    ) : (
                      <span></span>
                    )}
                    <p className="sm_text_medium">{el?.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TabSubMenu;
