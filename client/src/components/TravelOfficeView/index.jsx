import { Col, Row, Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import OfficeInfo from './components/OfficeInfo'
import useGetOfficeByID from 'services/agencies/Queries/useGetOfficeByID'
import { InsightsSVG, ReportsSVG, UsersSVG, StatementsSVG, SupportSVG2, ActivitiesSVG2 } from 'assets/jsx-svg'
// style
import "./styles.css";
import Statements from 'views/Finance/Statements'
import OfficeUsers from './components/OfficeUsers'
import InsightsTab from './components/InsightsTab'

const TravelOfficeView = ({ officerId  , DrawerAPI}) => {
    const officeById = useGetOfficeByID(officerId);
    const [activeTab, setActiveTab] = useState("1");
    useEffect(() => {
        DrawerAPI.setRootClassName("travel_office_view_drawer");
    }, [])

    return (
        <div className='travel_office_view'>
            <div style={{display:"flex" , gap:"10px"}}>
                <div style={{width:"250px"}}>
                    <OfficeInfo data={officeById?.data} DrawerAPI={DrawerAPI}/>
                </div>
                <div style={{width:"calc(100% - 260px)"}}>
                    <Tabs
                        activeKey={activeTab}
                        onChange={setActiveTab}
                        items={[
                            {
                                key: '1',
                                label: 'Insights',
                                icon: <InsightsSVG color={activeTab === "1" ? "#FFF" : "#000"} />,
                                children: <InsightsTab id={officerId} />,
                            },
                            {
                                key: '2',
                                label: 'Reports',
                                icon: <ReportsSVG color={activeTab === "2" ? "#FFF" : "#000"} />,
                                children: `Content of Tab Pane ${activeTab}`,
                            },
                            {
                                key: '3',
                                label: 'Statements',
                                icon: <StatementsSVG color={activeTab === "3" ? "#FFF" : "#000"} />,
                                children: <Statements officerId={officerId} officeType={officeById?.data?.type}/>,
                            }, {
                                key: '4',
                                label: 'Users',
                                icon: <UsersSVG color={activeTab === "4" ? "#FFF" : "#000"} />,
                                children: <OfficeUsers officerId={officerId} />,
                            }, {
                                key: '5',
                                label: 'Support',
                                icon: <SupportSVG2 color={activeTab === "5" ? "#FFF" : "#000"} />,
                                children: `Content of Tab Pane ${activeTab}`,
                            }, {
                                key: '6',
                                label: 'Activities',
                                icon: <ActivitiesSVG2 color={activeTab === "6" ? "#FFF" : "#000"} />,
                                children: `Content of Tab Pane ${activeTab}`,
                            },
                        ]} />
                </div>
            </div>
        </div>
    )
}

export default TravelOfficeView