import React, { useEffect, useState } from "react";
// style
import "./styles.css";
import { Checkbox, Collapse, ConfigProvider, Input, Slider } from "antd";
import { SearchSVG } from "assets/jsx-svg";
// API CALLS
import useGetAccommodationPensionsList from "services/travel/accommodations/common/Queries/useGetAccommodationPensionsList";
import useGetAccommodationTypesList from "services/travel/accommodations/common/Queries/useGetAccommodationTypesList";
import { useDebounce } from "hooks/useDebounce";
import RatingBadge from "components/common/RatingBadge";
const getMinAndMax = (data) => {
  const amounts = data.map((item) => item.amount);
  const min = Math.min(...amounts) || 0;
  const max = Math.max(...amounts) || 0;

  return { min, max };
};

const Filters = ({ results = [], setFilters }) => {
  const pensionsList = useGetAccommodationPensionsList({
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const accommodationTypesList = useGetAccommodationTypesList({
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const [name, setName] = useState("");
  const debounceName = useDebounce(name, 500);

  const [location, setLocation] = useState("");
  const debounceLocation = useDebounce(location, 500);

  const [pensions, setPensions] = useState([]);
  const [rates, setRates] = useState([]);
  const [accommodationTypes, setAccommodationTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([
    getMinAndMax(results).min,
    getMinAndMax(results).max,
  ]);

  useEffect(() => {
    setFilters({
      debounceName,
      debounceLocation,
      pensions,
      rates,
      accommodationTypes,
      priceRange,
    });
  }, [debounceName, debounceLocation, pensions, rates, accommodationTypes, priceRange]);

  const clearFilters = () => {
    setName("");
    setLocation("");
    setPensions([]);
    setRates([]);
    setAccommodationTypes([]);
    setPriceRange([getMinAndMax(results).min, getMinAndMax(results).max]);
  };

  if (results.length === 0) {
    return <></>;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            trackBg: "rgb(45,95,235)",
            handleColor: "rgb(45,95,235)",
          },
        },
      }}>
      <div className="filters_side">
        <div className="filters_side_header space-between">
          <p className="fz-16 fw-600">Filters by</p>
          <p
            className="fz-12 fw-600"
            style={{ color: "#2D5FEB", cursor: "pointer" }}
            onClick={clearFilters}>
            Clear Fliters
          </p>
        </div>
        <div className="filters_section">
          <div className="filter_group">
            <p className="fz-14 fw-600">Search by Property Name</p>
            <p className="fz-12 fw-400 mb-1 gc">Know the property name? Search below.</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              prefix={<SearchSVG color="#3A5EE3" />}
              placeholder="e.g Best Western"
            />
          </div>
          <div className="filter_group">
            <Collapse
              ghost
              defaultActiveKey={["2"]}
              items={[
                {
                  key: "2",
                  label: <p className="fz-14 fw-600">Popular Filters</p>,
                  children: (
                    <Checkbox.Group
                      value={pensions}
                      onChange={(values) => {
                        setPensions(values);
                      }}>
                      {pensionsList.data?.map((pension) => (
                        <p key={pension.id} className="checkbox_item">
                          <Checkbox value={pension?.id}>{pension?.name}</Checkbox>
                        </p>
                      ))}
                    </Checkbox.Group>
                  ),
                },
              ]}
            />
          </div>

          {getMinAndMax(results)?.min !== getMinAndMax(results)?.max && (
            <div className="filter_group">
              <Collapse
                ghost
                defaultActiveKey={["3"]}
                items={[
                  {
                    key: "3",
                    label: <p className="fz-14 fw-600">Price Range</p>,
                    children: (
                      <div>
                        <p className="fz-12 fw-400 mb-1 gc">
                          Drag the sliders to choose your min/max hotel price
                        </p>
                        <Slider
                          range={{
                            draggableTrack: true,
                          }}
                          min={getMinAndMax(results)?.min}
                          max={getMinAndMax(results)?.max}
                          value={priceRange}
                          onChange={(value) => {
                            setPriceRange(value);
                          }}
                          defaultValue={[0, 100]}
                          marks={{
                            [getMinAndMax(results)?.min]: getMinAndMax(results).min,
                            [getMinAndMax(results)?.max]: getMinAndMax(results).max,
                          }}
                        />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}

          <div className="filter_group">
            <Collapse
              ghost
              defaultActiveKey={["4"]}
              items={[
                {
                  key: "4",
                  label: <p className="fz-14 fw-600">Star Rating</p>,
                  children: (
                    <Checkbox.Group
                      value={rates}
                      onChange={(values) => {
                        setRates(values);
                      }}>
                      <p className="checkbox_item">
                        <Checkbox value={5}>
                          <RatingBadge rate={5} />
                        </Checkbox>
                      </p>
                      <p className="checkbox_item">
                        <Checkbox value={4}>
                          <RatingBadge rate={4} />
                        </Checkbox>
                      </p>
                      <p className="checkbox_item">
                        <Checkbox value={3}>
                          <RatingBadge rate={3} />
                        </Checkbox>
                      </p>
                      <p className="checkbox_item">
                        <Checkbox value={2}>
                          <RatingBadge rate={2} />
                        </Checkbox>
                      </p>
                      <p className="checkbox_item">
                        <Checkbox value={1}>
                          <RatingBadge rate={1} />
                        </Checkbox>
                      </p>
                    </Checkbox.Group>
                  ),
                },
              ]}
            />
          </div>
          <div className="filter_group">
            <Collapse
              ghost
              defaultActiveKey={["2"]}
              items={[
                {
                  key: "2",
                  label: <p className="fz-14 fw-600">Property Type</p>,
                  children: (
                    <Checkbox.Group
                      value={accommodationTypes}
                      onChange={(values) => {
                        setAccommodationTypes(values);
                      }}>
                      {accommodationTypesList.data?.map((el) => (
                        <p key={el.id} className="checkbox_item">
                          <Checkbox value={el.id}>{el.name}</Checkbox>
                        </p>
                      ))}
                    </Checkbox.Group>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Filters;
