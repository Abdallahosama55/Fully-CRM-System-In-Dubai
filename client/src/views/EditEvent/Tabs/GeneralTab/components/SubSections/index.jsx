import { Button, Divider, Empty, message } from 'antd';
import React from 'react'
import { useParams } from 'react-router-dom';
import useDeleteEventSection from 'services/event-sections/Mutations/useDeleteEventSection';
import useGetEventSections from 'services/event-sections/Queries/useGetEventSections';
import { queryClient } from 'services/queryClient';
import EditEventSection from 'views/EditEvent/components/EditEventSection';
import NewSubSection from './NewSubSection';
import SubSectionCard from './SubSectionCard';
import { useDrawer } from 'hooks/useDrawer';

const SubSections = () => {
    const DrawerAPI = useDrawer();
    const { id } = useParams();
    // sub sections
    const eventSections = useGetEventSections(id);
    const deleteSubSection = useDeleteEventSection({
        onSuccess: (_, payload) => {
            queryClient.setQueryData(eventSections.key, (oldData) => {
                return {
                    count: oldData?.count - 1,
                    rows: oldData?.rows?.filter((section) => section.id !== payload)
                }
            })
            message.success("section deleted successfully")
        },
        onError: (error) => {
            message.error(error.message || "something went wrong")
        }
    })

    return <EditEventSection
        className='sub_sections'
        title={"Sub Sections (Optional)"}
        headerEnd={<Button type={"primary"} onClick={() => {
            DrawerAPI.setDrawerContent(<NewSubSection DrawerAPI={DrawerAPI} eventId={id} handelAdd={(res) => {
                queryClient.setQueryData(eventSections.key, (oldData) => {
                    return {
                        count: oldData?.count ? oldData?.count + 1 : 1,
                        rows: oldData?.rows ? [...oldData.rows, res] : [res]
                    }
                })
            }} />)
            DrawerAPI.open("55%")
            DrawerAPI.setRootClassName("gray_bg_drawer")
        }}>Add New</Button>}>
        {DrawerAPI.Render}
        {eventSections?.data?.rows?.length === 0 && <Empty
            style={{ margin: "5rem 0" }}
            description={"No subsection"}
        />}
        {eventSections?.data?.rows?.map((section, index) => <>
            <SubSectionCard
                handelDelete={deleteSubSection.mutate}
                handelEdit={() => eventSections.refetch()}
                key={section?.id}
                eventId={id}
                id={section?.id}
                image={section?.image}
                title={section?.title}
                description={section?.description}
            />
            {index !== eventSections?.data?.rows?.length - 1 && <Divider />}
        </>)}
    </EditEventSection>
}

export default SubSections