import React, { useEffect, useState } from 'react'
import Map from 'components/common/Map';
// API CALLS
import useGetVehicleBrands from 'services/travel/transfer/Queries/useGetVehicleBrands';
import useGetVehicleType from 'services/travel/transfer/Queries/useGetVehicleType';
// styles
import './styles.css';
import { Checkbox, Collapse } from 'antd';
import { ArrowDownSVG } from 'assets/jsx-svg';
import MapDrawer from 'components/common/MapDrawer';
import SvgImage from 'components/common/SvgImage';
const Filters = ({ center, directions, setFilterdResults, results }) => {
    const vehicleBrands = useGetVehicleBrands();
    const vehicleTypes = useGetVehicleType();
    const [isMapDrawerOpen, setIsMapDrawerOpen] = useState(false);
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const tempArr = results?.filter((el) => {
            let temp = true;

            if (temp && brands.length > 0 && !brands.includes(el?.vehicleBrandId)) {
                temp = false;
            }

            if (temp && types.length > 0 && !types.includes(el?.vehicleTypeId)) {
                temp = false;
            }

            return temp;
        })

        setFilterdResults(tempArr)
    }, [brands, types])

    if (results.length === 0) {
        return <></>
    }
    
    const clearFilters = () => {
        setBrands([])
        setTypes([])
    }

    return (
        <div>
            <MapDrawer
                center={center}
                directions={directions}
                open={isMapDrawerOpen}
                onClose={() => setIsMapDrawerOpen(false)}
            />
            <div className='transfer_filters_side'>
                <div className='transfer_filters_section'>
                    <div className="transfer_filters_side_header space-between">
                        <p className='fz-16 fw-600'>Map</p>
                        <p className='fz-12 fw-600' style={{ color: "#2D5FEB", cursor: "pointer" }} onClick={() => setIsMapDrawerOpen(true)}>Full View</p>
                    </div>
                    <Map
                        style={{ borderRadius: "8px", overflow: "hidden" }}
                        width='100%'
                        height='250px'
                        center={center}
                        directions={directions}
                    />
                </div>
                <div className='transfer_filters_section'>
                    <div className="filters_side_header space-between">
                        <p className='fz-16 fw-600'>Filters by</p>
                        <p className='fz-12 fw-600' style={{ color: "#2D5FEB", cursor: "pointer" }} onClick={clearFilters}>Clear Fliters</p>
                    </div>
                    <div className="filter_group">
                        <Collapse
                            expandIcon={<ArrowDownSVG />}
                            ghost
                            defaultActiveKey={["2"]}
                            items={[
                                {
                                    key: '2',
                                    label: <p className='fz-14 fw-600'>Vehicle Type</p>,
                                    children: <div className='transfer_filters_checkbox_group'>
                                        <Checkbox.Group value={types} onChange={(values) => { setTypes(values) }}>
                                            {vehicleTypes?.data?.map(type => <p
                                                key={type.id}
                                                className={`checkbox_item ${type?.icon ? "checkbox_item_with_icon" : ""}`}
                                            >
                                                <Checkbox value={type?.id}>{type?.icon && type?.icon.includes("<svg") ? <SvgImage svgContent={type?.icon}/>: ""}{type?.name}</Checkbox>
                                            </p>)}
                                        </Checkbox.Group>
                                    </div>,
                                }
                            ]}
                        />
                    </div>
                    <div className="filter_group">
                        <Collapse
                            expandIcon={<ArrowDownSVG />}
                            ghost
                            defaultActiveKey={["2"]}
                            items={[
                                {
                                    key: '2',
                                    label: <p className='fz-14 fw-600'>Vehicle Brand</p>,
                                    children: <div className='transfer_filters_checkbox_group'><Checkbox.Group value={brands} onChange={(values) => { setBrands(values) }} className='transfer_filters_checkbox_group'>
                                        {vehicleBrands?.data?.map(brand => <p
                                            key={brand.id}
                                            className='checkbox_item'
                                        >
                                            <Checkbox value={brand?.id}>{brand?.name}</Checkbox>
                                        </p>)}
                                    </Checkbox.Group>
                                    </div>,
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters