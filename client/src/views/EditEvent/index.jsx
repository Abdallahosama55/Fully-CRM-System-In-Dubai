import { Tabs } from 'antd'
import React, { lazy, Suspense, useState } from 'react'
// style
import './styles.css'
import LoadingPage from 'components/common/LoadingPage'
import { useParams } from 'react-router-dom';

// Lazy load the tabs
const GeneralTab = lazy(() => import('./Tabs/GeneralTab'));
const InsightsTab = lazy(() => import('./Tabs/InsightsTab'));
const EventOptionsTab = lazy(() => import('./Tabs/EventOptionsTab'));
const EventHallsTab = lazy(() => import('./Tabs/EventHallsTab'));
const SessionsTab = lazy(() => import('./Tabs/SessionsTab'));
const PipelineTab = lazy(() => import('./Tabs/PipelineTab'));
const PeopleTab = lazy(() => import('./Tabs/PeopleTab'));
const ExhibitorsTab = lazy(() => import('./Tabs/ExhibitorsTab'));

const EditEvent = () => {
    const { id: eventId } = useParams();
    const [activeTab, setActiveTab] = useState()
    return (
        <div className="event_edit_page">
            <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(prev => key === "EVENT_PAGE_PREVIEW" ? prev : key)}
                items={[
                    {
                        key: '1',
                        label: 'General',
                        children: (
                            <Suspense fallback={<LoadingPage />}>
                                <GeneralTab />
                            </Suspense>
                        ),
                    },
                    {
                        key: '2',
                        label: 'Insights',
                        children: (
                            <Suspense fallback={<LoadingPage />}>
                                <InsightsTab />
                            </Suspense>
                        ),
                    },
                    {
                        key: '3',
                        label: 'Event options',
                        children: (
                            <Suspense fallback={<LoadingPage />}>
                                <EventOptionsTab />
                            </Suspense>
                        ),
                    },
                    {
                        key: '4',
                        label: 'Event halls',
                        children: (
                            <Suspense fallback={<LoadingPage />}>
                                <EventHallsTab />
                            </Suspense>
                        ),
                    },
                    {
                        key: '5',
                        label: 'Sessions',
                        children: (
                            <Suspense fallback={<LoadingPage />}>
                                <SessionsTab />
                            </Suspense>
                        ),
                    },
                    {
                        key: '6',
                        label: 'Pipeline',
                        children: (
                            <Suspense fallback={<LoadingPage />}>
                                <PipelineTab />
                            </Suspense>
                        ),
                    },
                    {
                        key: '7',
                        label: 'People',
                        children: (
                            <Suspense fallback={<LoadingPage />}>
                                <PeopleTab />
                            </Suspense>
                        ),
                    },
                    {
                        key: '8',
                        label: 'Exhibitors',
                        children: (
                            <Suspense fallback={<LoadingPage />}>
                                <ExhibitorsTab />
                            </Suspense>
                        ),
                    },
                    {
                        key: 'EVENT_PAGE_PREVIEW',
                        label: <p onClick={() => {
                            window.open(`https://portal.ourverse.tf/ev/${eventId}`, '_blank'); // Opens in a new tab
                        }}>Event page preview</p>,
                        children: <></>
                    },
                ]}
            />
        </div>
    );
}

export default EditEvent;
