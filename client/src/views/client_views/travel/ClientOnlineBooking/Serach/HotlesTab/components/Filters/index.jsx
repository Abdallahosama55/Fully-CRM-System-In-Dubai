import React, { useEffect, useState } from 'react'
// style
import "./styles.css"
import { Checkbox, Collapse, ConfigProvider, Input, Slider } from 'antd'
import { LocationSVG2, SearchSVG } from 'assets/jsx-svg'
// API CALLS
import { useDebounce } from 'hooks/useDebounce';
import RatingBadge from 'components/common/RatingBadge'
import useGetAccommodationPensionsListClient from 'services/travel/client_side/booking/Accommodation/Queries/useGetAccommodationPensionsListClient'
import useGetAccommodationTypesListClient from 'services/travel/client_side/booking/Accommodation/Queries/useGetAccommodationTypesListClient'
const getMinAndMax = (data) => {
    const amounts = data.map(item => item.amount);
    const min = Math.min(...amounts) || 0;
    const max = Math.max(...amounts) || 0;

    return { min, max }
}

const Filters = ({ setFilterdResults, results }) => {
    const pensionsList = useGetAccommodationPensionsListClient();
    const accommodationTypesList = useGetAccommodationTypesListClient();
    const [name, setName] = useState("");
    const debounceName = useDebounce(name, 500);

    const [location, setLocation] = useState("");
    const debounceLocation = useDebounce(location, 500);

    const [pensions, setPensions] = useState([]);
    const [rates, setRates] = useState([]);
    const [accommodationTypes, setAccommodationTypes] = useState([]);
    const [priceRange, setPriceRange] = useState([getMinAndMax(results).min, getMinAndMax(results).max]);

    const clearFilters = () => {
        setFilterdResults(results);
        setName("")
        setLocation("")
        setPensions([])
        setRates([])
        setAccommodationTypes([])
        setPriceRange([getMinAndMax(results).min, getMinAndMax(results).max])
    }

    useEffect(() => {
        const tempArr = results?.filter((el) => {
            let temp = true;
            if (debounceName && !el?.name.toLowerCase().includes(debounceName.toLowerCase())) {
                temp = false;
            }

            if (temp && debounceLocation && !el?.location.toLowerCase().includes(debounceLocation.toLowerCase())) {
                temp = false;
            }

            if (temp && (el.amount < priceRange[0] || el.amount > priceRange[1])) {
                temp = false;
            }

            if (temp && pensions.length > 0) {
                const pensionMatch = el.pensionData.some(pension => pensions.includes(pension.id));
                if (!pensionMatch) {
                    temp = false;
                }
            }

            if (temp && rates.length > 0 && !rates.includes(el.rate)) {
                temp = false;
            }

            if (temp && accommodationTypes.length > 0 && !accommodationTypes.includes(el.accommodationTypeId)) {
                temp = false;
            }

            return temp;
        })

        setFilterdResults(tempArr)
    }, [debounceName, debounceLocation, pensions, rates, accommodationTypes, priceRange])

    if (results.length === 0) {
        return <></>
    }

    return (
        <ConfigProvider theme={{
            "components": {
                "Slider": {
                    "trackBg": "rgb(45,95,235)",
                    "handleColor": "rgb(45,95,235)"
                }
            }
        }}>
            <div className='filters_side'>
                <div className="filters_side_header space-between">
                    <p className='fz-16 fw-600'>Filters by</p>
                    <p className='fz-12 fw-600' style={{ color: "#2D5FEB", cursor: "pointer" }} onClick={clearFilters}>Clear Fliters</p>
                </div>
                <div className='filters_section'>
                    <div className="filter_group">
                        <p className='fz-14 fw-600'>Search by Property Name</p>
                        <p className='fz-12 fw-400 mb-1 gc'>Know the property name? Search below.</p>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            prefix={<SearchSVG color="#3A5EE3" />}
                            placeholder='e.g Best Western'
                        />
                    </div>
                    <div className="filter_group">
                        <Collapse
                            ghost
                            defaultActiveKey={["1"]}
                            items={[
                                {
                                    key: '1',
                                    label: <p className='fz-14 fw-600'>Search by Location</p>,
                                    children: <Input
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        prefix={<LocationSVG2 color="#3A5EE3" />} placeholder='e.g City center' />,
                                }
                            ]}
                        />
                    </div>
                    <div className="filter_group">
                        <Collapse
                            ghost
                            defaultActiveKey={["2"]}
                            items={[
                                {
                                    key: '2',
                                    label: <p className='fz-14 fw-600'>Popular Filters</p>,
                                    children: <Checkbox.Group value={pensions} onChange={(values) => { setPensions(values) }}>
                                        {pensionsList.data?.map(pension => <p
                                            key={pension.id}
                                            className='checkbox_item'
                                        >
                                            <Checkbox value={pension?.id}>{pension?.name}</Checkbox>
                                        </p>)}
                                    </Checkbox.Group>,
                                }
                            ]}
                        />
                    </div>

                    {getMinAndMax(results)?.min !== getMinAndMax(results)?.max && <div className="filter_group">
                        <Collapse
                            ghost
                            defaultActiveKey={["3"]}
                            items={[
                                {
                                    key: '3',
                                    label: <p className='fz-14 fw-600'>Price Range</p>,
                                    children: <div>
                                        <p className='fz-12 fw-400 mb-1 gc'>Drag the sliders to choose your min/max hotel price</p>
                                        <Slider
                                            range={{
                                                draggableTrack: true,
                                            }}
                                            min={getMinAndMax(results)?.min}
                                            max={getMinAndMax(results)?.max}
                                            value={priceRange}
                                            onChange={(value) => { setPriceRange(value) }}
                                            defaultValue={[0, 100]}
                                            marks={
                                                {
                                                    [getMinAndMax(results)?.min]: getMinAndMax(results).min,
                                                    [getMinAndMax(results)?.max]: getMinAndMax(results).max
                                                }
                                            }
                                        />
                                    </div>,
                                }
                            ]}
                        />
                    </div>}

                    <div className="filter_group">
                        <Collapse
                            ghost
                            defaultActiveKey={["4"]}
                            items={[
                                {
                                    key: '4',
                                    label: <p className='fz-14 fw-600'>Star Rating</p>,
                                    children: <Checkbox.Group value={rates} onChange={(values) => { setRates(values) }}>
                                        <p className='checkbox_item'><Checkbox value={5}><RatingBadge rate={5} /></Checkbox></p>
                                        <p className='checkbox_item'><Checkbox value={4}><RatingBadge rate={4} /></Checkbox></p>
                                        <p className='checkbox_item'><Checkbox value={3}><RatingBadge rate={3} /></Checkbox></p>
                                        <p className='checkbox_item'><Checkbox value={2}><RatingBadge rate={2} /></Checkbox></p>
                                        <p className='checkbox_item'><Checkbox value={1}><RatingBadge rate={1} /></Checkbox></p>
                                    </Checkbox.Group>,
                                }
                            ]}
                        />
                    </div>
                    <div className="filter_group">
                        <Collapse
                            ghost
                            defaultActiveKey={["2"]}
                            items={[
                                {
                                    key: '2',
                                    label: <p className='fz-14 fw-600'>Property Type</p>,
                                    children: <Checkbox.Group value={accommodationTypes} onChange={(values) => { setAccommodationTypes(values) }}>
                                        {accommodationTypesList.data?.map(el => <p key={el.id} className='checkbox_item'>
                                            <Checkbox value={el.id}>{el.name}</Checkbox>
                                        </p>)}
                                    </Checkbox.Group>,
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}

export default Filters