import { Avatar, Button, Col, Dropdown, Image, Menu, Row, Typography } from 'antd';
import { BookingEngineSVG, CloseSVG, DownSvg, MeetingSVG } from 'assets/jsx-svg';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CallsAndMeetingsAdd from 'views/Collaboration/CallsAndMeetingsAdd';
import { useUserContext } from 'context/userContext';

import COMPANY_APPS_NAMES from 'constants/COMPANY_APPS_NAMES';
import { stringAvatar } from 'utils/string';
import ROUTER_URLS from 'constants/ROUTER_URLS';
// style
import "./styles.css"
import Logo from 'components/common/Logo';
import { useDrawer } from 'hooks/useDrawer';
import OFFICER_TYPES from 'constants/OFFICER_TYPES';
const MobileSideBar = ({ setDrawerOpen, collapsed, logout, navigate }) => {
    const DrawerAPI = useDrawer();
    const { user, setUser } = useUserContext();
    const [current, setCurrent] = useState('');
    return <div className='mobile_Side_bar'>
        <Row align={"middle"} justify={"space-between"}>
            {DrawerAPI.Render}
            <Col>
                <Link to="/">
                    <Logo />
                </Link>
            </Col>
            <Col>
                <CloseSVG className="clickable" onClick={() => setDrawerOpen((prev) => !prev)} />
            </Col>
        </Row>


        <Button
            className="w-100 mobile_side_bar_action_btn"
            onClick={() => {
                if (user?.companyApps?.find(el => el.name === COMPANY_APPS_NAMES.VINDO_TRAVEL)) {
                    navigate(ROUTER_URLS.TRAVEL.BOOKING.ONLINE_BOOKING);
                    setDrawerOpen(false)
                } else {
                    DrawerAPI.open("40%");
                    DrawerAPI.setDrawerContent(<CallsAndMeetingsAdd DrawerAPI={DrawerAPI}/>);
                }
            }}
            style={{ background: user?.officerType === OFFICER_TYPES.AGENT ? '#29323C' : 'transparent linear-gradient(269deg, #3a5ee3 0%, #8fcaf3 100%) 0% 0% no-repeat padding-box' }}
            icon={user?.companyApps?.find(el => el.name === COMPANY_APPS_NAMES.VINDO_TRAVEL) ? <BookingEngineSVG /> : <MeetingSVG />}>
            {!collapsed && (user?.officerType === OFFICER_TYPES.AGENT ? <Typography.Text className="booking_engine">Booking Engine</Typography.Text>
                : <Typography.Text className="schedule_meeting">Schedule Meeting</Typography.Text>)}
        </Button>
        <div className="mobile_menus_section">
            {user?.companyMenu?.map((itemsGtoup, index) => {
                return <div className="mobile_menu_group_section" key={index}>
                    <Typography.Paragraph
                        className="fz-12 fw-400 mobile_menu_group_title"
                    >{itemsGtoup.group}
                    </Typography.Paragraph>
                    <Menu
                        selectedKeys={[current]}
                        onClick={(e) => setCurrent(e.key)}
                        className="mobile_menu_group"
                        defaultSelectedKeys={location.pathname ? location.pathname : ""}
                        mode="inline"
                        items={itemsGtoup?.children.map(item => {
                            return {
                                key: item?.key || item.name,
                                label: item?.index ? <Link onClick={() => setDrawerOpen(false)} to={item?.index}>{item.name}</Link> : <p>{item.name}</p>,
                                icon: <img src={item.icon} alt={item.name} />,
                                children: (item?.children && item.children.length > 0) ? item.children.map(el => {
                                    return {
                                        key: el.key,
                                        label: <Link onClick={() => setDrawerOpen(false)} to={el?.index}>{el.name}</Link>
                                    }
                                }) : undefined
                            }
                        })}
                        inlineCollapsed={collapsed}
                        activeKey={location.pathname ? location.pathname : ""}
                    />
                </div>
            })}
        </div>
        <div>
            <Dropdown
                menu={{
                    items: [
                        {
                            key: 1,
                            label: <Link to={`/employee/${user.id}`}>Profile</Link>,
                        },
                        { key: 2, label: "Logout", onClick: () => logout(navigate, setUser) },
                    ],
                }}
                trigger={["click"]}>
                <button
                    className="clock-in-btn"
                    style={{
                        width: "100%",
                        padding: "5px",
                        borderRadius: "25px",
                        cursor: "pointer",

                        border: "none",
                    }}>
                    <Row align="middle" gutter={[12, 0]} wrap={false}>
                        <Col>
                            <Avatar
                                src={user.profileImage}
                                size={40}
                                {...stringAvatar(user?.fullName ?? "")}
                            />
                        </Col>
                        <Col>
                            <Row gutter={[6, 0]} wrap={false}>
                                <Col>
                                    <Typography.Text style={{ maxWidth: "100px" }} ellipsis className="fw-500">
                                        {user.fullName}
                                    </Typography.Text>
                                </Col>
                                <Col>
                                    <DownSvg />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </button>
            </Dropdown>
        </div>
    </div>
}

export default MobileSideBar