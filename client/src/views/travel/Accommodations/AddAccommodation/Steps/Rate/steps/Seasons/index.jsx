import React, { useEffect, useState } from 'react'
import { ArrowRightSVG, Delete2SVG, EditSVG, PlusSVG } from 'assets/jsx-svg';
import CustomButton from 'components/common/Button';
import AddSeason from './AddSeason';
import useGetSeasonsList from 'services/travel/accommodations/Rate/Seasons/Queries/useGetSeasonsList';
import { Button, Col, message, Radio, Row, Skeleton, Switch, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import useGetSeasonsType from 'services/travel/accommodations/Rate/Seasons/Queries/useGetSeasonsType';
import useDeleteSeason from 'services/travel/accommodations/Rate/Seasons/Mutations/useDeleteSeason';
import { queryClient } from 'services/queryClient';
import { STEPS_KEYS } from '..';
// style
import "./styles.css"
import SEASSONS_TYPE from 'constants/SEASSONS_TYPE';
import useAddSeason from 'services/travel/accommodations/Rate/Seasons/Mutations/useAddSeason';
import useDisabelOpenSeason from 'services/travel/accommodations/Rate/Seasons/Mutations/useDisabelOpenSeason';
import useSetActivateSeasonType from 'services/travel/accommodations/Rate/Seasons/Mutations/useSetActivateSeasonType';
import { useDrawer } from 'hooks/useDrawer';

const Seasons = ({ id, moveTo }) => {
    const DrawerAPI = useDrawer();
    const [seasonType, setSeasonType] = useState(undefined);

    const seasonsListQuery = useGetSeasonsList(id, {})
    const seasonsTypeQuery = useGetSeasonsType(id, {})

    const [isOpenSeassonActive, setIsOpenSeassonActive] = useState(false);
    const [isCustomeSeassonsActive, setIsCustomeSeassonsActive] = useState(false);
    const [isRepeatYearlyActive, setIsRepeatYearlyActive] = useState(false);

    const [isSwitchesDataSet, setIsSwitchesDataSet] = useState(false);

    useEffect(() => {
        if (!isSwitchesDataSet && seasonsListQuery?.data?.data[0] && seasonType) {
            setIsSwitchesDataSet(true);
            const temp = seasonsListQuery?.data?.data?.find((el) => el?.active)
            if (temp?.type === SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY) {
                setIsRepeatYearlyActive(temp)
            } else if (temp?.type === SEASSONS_TYPE.NO_REPEAT) {
                setIsCustomeSeassonsActive(temp)
            } else if (temp?.type === SEASSONS_TYPE.OPEN_SEASON) {
                setIsOpenSeassonActive(temp)
            }
        }
    }, [isSwitchesDataSet, seasonsListQuery?.data?.data, seasonType])

    useEffect(() => {
        if (seasonsTypeQuery.data?.type) {
            setSeasonType(seasonsTypeQuery.data?.type);
            if (seasonsTypeQuery.data?.type === SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY) {
                setIsRepeatYearlyActive(true)
            } else if (seasonsTypeQuery.data?.type === SEASSONS_TYPE.NO_REPEAT) {
                setIsCustomeSeassonsActive(true)
            } else if (seasonsTypeQuery.data?.type === SEASSONS_TYPE.OPEN_SEASON) {
                setIsOpenSeassonActive(true)
            }
        } else {
            setSeasonType(SEASSONS_TYPE.OPEN_SEASON);
        }
    }, [seasonsTypeQuery.data])
    // mutations
    const deleteSeasonMutation = useDeleteSeason({
        onSuccess: (_, id) => {
            queryClient.setQueryData(seasonsListQuery.key, (prev) => {
                return { data: prev.data.filter(el => el.id !== id) }
            })
        },
        onError: (error) => message.error(error.message)
    });

    const addSeasonMutation = useAddSeason({
        onSuccess: async () => {
            await seasonsListQuery.refetch();
            await seasonsTypeQuery.refetch();
            setIsRepeatYearlyActive(false);
            setIsCustomeSeassonsActive(false);
            message.success("Open season activated successfully")
        },
        onError: (error) => {
            setIsOpenSeassonActive(prev => !prev)
            message.error(error.message)
        }
    });

    const disabelOpenSeason = useDisabelOpenSeason({
        onSuccess: async () => {
            await seasonsListQuery.refetch();
            await seasonsTypeQuery.refetch();
            message.success("Open season deactivated successfully")
        },
        onError: () => {
            setIsOpenSeassonActive(prev => !prev);
            message.error("somthing went wrong");
        }
    })

    const setActivateSeasonTypeMutation = useSetActivateSeasonType({
        onSuccess: async () => {
            setIsOpenSeassonActive(false);
            if (seasonType === SEASSONS_TYPE.NO_REPEAT) {
                setIsRepeatYearlyActive(false);
                message.success(isCustomeSeassonsActive ? "Custome seassons enabled" : "Custome seassons disabled")
            } else if (seasonType === SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY) {
                setIsCustomeSeassonsActive(false);
                message.success(isRepeatYearlyActive ? "Repeat yearly seassons enabled" : "Repeat yearly seassons disabled")
            }
            await seasonsListQuery.refetch();
            await seasonsTypeQuery.refetch();

        },
        onError: () => {
            if (seasonType === SEASSONS_TYPE.NO_REPEAT) {
                setIsRepeatYearlyActive(prev => !prev)
            } else if (seasonType === SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY) {
                setIsCustomeSeassonsActive(prev => !prev)
            }

            message.error("somthing went wrong");
        }
    })

    if (seasonsListQuery.isLoading || seasonsTypeQuery.isLoading) {
        return <Skeleton active />
    }

    return (
        <div>
            {DrawerAPI.Render}
            <div className="top_section space-between">
                <Typography.Title level={5} className="mb-1 fz-16">Select Season Type</Typography.Title>
                <p className='move_link' onClick={() => {
                    if (seasonsListQuery.data.length === 0) {
                        message.error("Add at least one season")
                    } else {
                        moveTo(STEPS_KEYS.RATE)
                    }
                }}>Rate <ArrowRightSVG color="#000" /></p>
            </div>
            <Row gutter={[12, 12]} className='mt-1'>
                <Col md={8} xs={24}>
                    <div className={`seasson_type_card ${seasonType === SEASSONS_TYPE.OPEN_SEASON ? "active_seasson" : ""}`}
                        onClick={() => setSeasonType(SEASSONS_TYPE.OPEN_SEASON)}>
                        <Radio
                            value={SEASSONS_TYPE.OPEN_SEASON}
                            checked={seasonType === SEASSONS_TYPE.OPEN_SEASON}
                        >Full-Year Season</Radio>
                        <Typography.Paragraph ellipsis={{
                            rows: 3
                        }} className="seasson_type_description fz-12 fw-400">This type contains only one season that lasts the entire year (e.g., from 1 Jan to 31 Dec).</Typography.Paragraph>
                    </div>
                </Col>
                <Col md={8} xs={24}>
                    <div className={`seasson_type_card${seasonType === SEASSONS_TYPE.NO_REPEAT ? " active_seasson" : ""}`}
                        onClick={() => setSeasonType(SEASSONS_TYPE.NO_REPEAT)}>
                        <Radio
                            value={SEASSONS_TYPE.NO_REPEAT}
                            checked={seasonType === SEASSONS_TYPE.NO_REPEAT}
                        >Custom Season Durations</Radio>
                        <Typography.Paragraph ellipsis={{
                            rows: 3
                        }} className="seasson_type_description fz-12 fw-400">This type is for specific date durations (e.g., from 1 Jan 2024 to 3 Mar 2024) and allows multiple seasons to be added.</Typography.Paragraph>
                    </div>
                </Col>

                <Col md={8} xs={24}>
                    <div className={`seasson_type_card ${seasonType === SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY ? "active_seasson" : ""}}`}
                        onClick={() => setSeasonType(SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY)}>
                        <Radio
                            value={SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY}
                            checked={seasonType === SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY}
                        >Month Repeat Every Year Season</Radio>
                        <Typography.Paragraph ellipsis={{
                            rows: 3
                        }} className="seasson_type_description fz-12 fw-400">This type allows you to choose a start and end month, creating a season that repeats every year during those months (e.g., from June to August annually).</Typography.Paragraph>
                    </div>
                </Col>
            </Row>
            {
                seasonType === SEASSONS_TYPE.OPEN_SEASON && <>
                    <Typography.Paragraph className='fz-14 fw-400 mt-1'>
                        The full-year option will occupy the entire year, This means no other seasons can overlap with or be added during this period.
                    </Typography.Paragraph>
                    <p className='fz-14 fw-500'><Switch
                        checked={isOpenSeassonActive}
                        disabled={addSeasonMutation.isLoading || addSeasonMutation.isPaused || disabelOpenSeason.isLoading || disabelOpenSeason.isPending}
                        onChange={async () => {
                            if (!isOpenSeassonActive) {
                                addSeasonMutation.mutate({
                                    type: SEASSONS_TYPE.OPEN_SEASON,
                                    accommodationId: id
                                })
                            } else {
                                disabelOpenSeason.mutate({
                                    type: SEASSONS_TYPE.OPEN_SEASON,
                                    accommodationId: id,
                                })
                            }
                            await seasonsTypeQuery.refetch();
                            setIsOpenSeassonActive(prev => !prev)
                        }} /> <span style={{ marginInlineStart: "8px" }}>{!isOpenSeassonActive ? "Enable" : "Disable"} full-year season</span></p>
                    <Typography.Paragraph style={{ marginTop: "4px", marginBottom: "1rem" }} className="gc">
                        if you enabled the full year season all other seasons types will be disabled
                    </Typography.Paragraph>
                </>
            }
            {
                seasonType !== SEASSONS_TYPE.OPEN_SEASON && <>
                    <p className='fz-14 fw-500 mt-1'>
                        <Switch
                            checked={seasonType === SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY ? isRepeatYearlyActive : isCustomeSeassonsActive}
                            disabled={setActivateSeasonTypeMutation.isLoading || setActivateSeasonTypeMutation.isPending}
                            onChange={async (value) => {
                                setActivateSeasonTypeMutation.mutate({
                                    action: value,
                                    type: seasonType,
                                    accommodationId: id
                                })
                                if (seasonType === SEASSONS_TYPE.MONTH_REPEATING_ANNUALLY) {
                                    setIsRepeatYearlyActive(value)
                                } else if (seasonType === SEASSONS_TYPE.NO_REPEAT) {
                                    setIsCustomeSeassonsActive(value)
                                }
                                await seasonsListQuery.refetch();
                                await seasonsTypeQuery.refetch();
                            }}
                        /> <span style={{ marginInlineStart: "8px" }}>{seasonType === SEASSONS_TYPE.NO_REPEAT ? !isRepeatYearlyActive ? "Enable" : "Disable" : !isCustomeSeassonsActive ? "Enable" : "Disable"} all {seasonType === SEASSONS_TYPE.NO_REPEAT ? "custom" : "repeat yearly"} seasons</span></p>
                    <Typography.Paragraph style={{ marginTop: "4px", marginBottom: "1rem" }} className="gc">
                        if you enabled this seasons type all other seasons types will be disabled
                    </Typography.Paragraph>
                </>
            }
            <Table
                loading={seasonsListQuery.isLoading || seasonsListQuery.isPending || seasonsListQuery.isFetching}
                scroll={{ x: 700 }}
                style={{ marginTop: "32px" }}
                columns={[
                    {
                        title: "Season Name",
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: "Minimum Stay",
                        dataIndex: 'minStay',
                        key: 'minStay',
                    },
                    {
                        title: "Period",
                        dataIndex: 'startDate',
                        key: 'startDate',
                        render: (_, rowData) => `${dayjs(rowData.startDate).format("YYYY/MM/DD")} - ${dayjs(rowData.endDate).format("YYYY/MM/DD")}`
                    },
                    {
                        title: "State",
                        dataIndex: 'active',
                        key: 'active',
                        render: (activeState) => activeState ? "Active" : "Inactive"
                    },
                    {
                        title: <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                            {seasonType !== SEASSONS_TYPE.OPEN_SEASON && <CustomButton
                                color="dark"
                                icon={<PlusSVG />}
                                size='small'
                                onClick={() => {
                                    DrawerAPI.setDrawerContent(<AddSeason
                                        getSeassonType={() => seasonType}
                                        onEnd={() => {
                                            DrawerAPI.close();
                                            queryClient.invalidateQueries(seasonsListQuery.key)
                                            queryClient.invalidateQueries(seasonsTypeQuery.key)
                                        }}
                                        accommodationId={id}
                                    />)
                                    DrawerAPI.open("40%");
                                }}
                            >New Season</CustomButton>}
                        </div>,
                        dataIndex: 'id',
                        key: 'id',
                        render: (editID) => <div className='actions'>
                            {seasonType !== SEASSONS_TYPE.OPEN_SEASON && <>
                                <Button size='small' onClick={() => {
                                    DrawerAPI.setDrawerContent(<AddSeason
                                        getSeassonType={() => seasonType}
                                        editId={editID}
                                        accommodationId={id}
                                        onEnd={() => {
                                            DrawerAPI.close();
                                            queryClient.invalidateQueries(seasonsListQuery.key)
                                            queryClient.invalidateQueries(seasonsTypeQuery.key)
                                        }}
                                    />)
                                    DrawerAPI.open("40%");
                                }}>
                                    <EditSVG />
                                </Button>
                                <Button
                                    size='small'
                                    style={{ borderColor: "red" }}
                                    onClick={() => deleteSeasonMutation.mutate(editID)}
                                >
                                    <Delete2SVG color="red" />
                                </Button>
                            </>}
                        </div>
                    },
                ]}
                dataSource={seasonsListQuery.data?.data.filter(el => el?.type === seasonType)}
            />

        </div >
    )
}

export default Seasons