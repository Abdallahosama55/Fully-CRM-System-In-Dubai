import { Checkbox, Collapse, ConfigProvider, Input, Rate, Slider } from 'antd';
import { SearchSVG } from 'assets/jsx-svg';
import { useDebounce } from 'hooks/useDebounce';
import React, { useEffect, useState } from 'react'
import useGetCategories from 'services/travel/experiance/ExperianceTab/Querys/useGetCategories';
import useGetThemes from 'services/travel/experiance/ExperianceTab/Querys/useGetThemes';
// style
import "./styles.css"
import RatingBadge from 'components/common/RatingBadge';
const getMinAndMax = (data) => {
    const finalPrices = data.map(item => item.finalPrice);
    const min = Math.min(...finalPrices) || 0;
    const max = Math.max(...finalPrices) || 0;

    return { min, max }
}

const Filters = ({ setFilterdResults, results }) => {
    const [title, setTitle] = useState("");
    const debounceTitle = useDebounce(title, 500);


    const [rates, setRates] = useState([]);
    const [categories, setCategories] = useState([]);
    const [themes, setThemes] = useState([]);
    const [priceRange, setPriceRange] = useState([getMinAndMax(results).min, getMinAndMax(results).max]);


    // Querys
    const themesQuery = useGetThemes();
    const categoriesQuery = useGetCategories();

    const clearFilters = () => {
        setFilterdResults(results);
        setTitle("")
        setRates([])
        setCategories([])
        setPriceRange([getMinAndMax(results).min, getMinAndMax(results).max])
    }

    useEffect(() => {
        const tempArr = results?.filter((el) => {
            let temp = true;
            if (debounceTitle && !el?.title.toLowerCase().includes(debounceTitle.toLowerCase())) {
                temp = false;
            }

            if (temp && (el.finalPrice < priceRange[0] || el.finalPrice > priceRange[1])) {
                temp = false;
            }

            if (temp && rates.length > 0 && !rates.includes(el.rate)) {
                temp = false;
            }

            if (temp && categories.length > 0) {
                const categoriesMatch = el?.productCategories?.some(productCategory => categories.includes(productCategory.productCategoryId));
                if (!categoriesMatch) {
                    temp = false;
                }
            }

            if (temp && themes.length > 0) {
                const themesMatch = el?.productThemes?.some(productTheme => themes.includes(productTheme?.productThemeId));
                if (!themesMatch) {
                    temp = false;
                }
            }

            return temp;
        })

        setFilterdResults(tempArr)
    }, [rates, priceRange, debounceTitle, categories, themes])

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
                        <p className='fz-14 fw-600'>Search by Experience Name</p>
                        <p className='fz-12 fw-400 mb-1 gc'>Know the experience name? Search below.</p>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            prefix={<SearchSVG color="#3A5EE3" />}
                            placeholder='e.g Best Western'
                        />
                    </div>

                    {getMinAndMax(results)?.min !== getMinAndMax(results).max && <div className="filter_group">
                        <Collapse
                            ghost
                            defaultActiveKey={"3"}
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
                            defaultActiveKey={"4"}
                            items={[
                                {
                                    key: '4',
                                    label: <p className='fz-14 fw-600'>Star Rating</p>,
                                    children: <Checkbox.Group value={rates} onChange={(values) => { setRates(values) }}>
                                        <p className='checkbox_item'><Checkbox value={5}><RatingBadge rate={5}/></Checkbox></p>
                                        <p className='checkbox_item'><Checkbox value={4}><RatingBadge rate={4}/></Checkbox></p>
                                        <p className='checkbox_item'><Checkbox value={3}><RatingBadge rate={3}/></Checkbox></p>
                                        <p className='checkbox_item'><Checkbox value={2}><RatingBadge rate={2}/></Checkbox></p>
                                        <p className='checkbox_item'><Checkbox value={1}><RatingBadge rate={1}/></Checkbox></p>
                                    </Checkbox.Group>,
                                }
                            ]}
                        />
                    </div>
                    {categoriesQuery?.data?.length > 0 && <div className="filter_group">
                        <Collapse
                            ghost
                            defaultActiveKey={"4"}
                            items={[
                                {
                                    key: '4',
                                    label: <p className='fz-14 fw-600'>Experiance categories</p>,
                                    children: <Checkbox.Group value={categories} onChange={(values) => { setCategories(values) }}>
                                        <div className="scrollable-checkbox-group">
                                            {categoriesQuery?.data?.map((el) => (
                                                <p className='checkbox_item' key={el.id}>
                                                    <Checkbox value={el.id}>{el.name}</Checkbox>
                                                </p>
                                            ))}
                                        </div>
                                    </Checkbox.Group>,
                                }
                            ]}
                        />
                    </div>}
                    {themesQuery?.data?.length > 0 && <div className="filter_group">
                        <Collapse
                            ghost
                            defaultActiveKey={"4"}
                            items={[
                                {
                                    key: '4',
                                    label: <p className='fz-14 fw-600'>Experiance themes</p>,
                                    children: <Checkbox.Group value={themes} onChange={(values) => { setThemes(values) }}>
                                        <div className="scrollable-checkbox-group">
                                            {themesQuery?.data?.map((theme) => (
                                                <p className='checkbox_item' key={theme.id}>
                                                    <Checkbox value={theme.id}>{theme.name}</Checkbox>
                                                </p>
                                            ))}
                                        </div>
                                    </Checkbox.Group>,
                                }
                            ]}
                        />
                    </div>}
                </div>
            </div>
        </ConfigProvider>
    )
}

export default Filters