import React, { useEffect, useState } from "react";
import { Collapse, ConfigProvider, Input, Slider } from "antd";
import { SearchSVG } from "assets/jsx-svg";
import { useDebounce } from "hooks/useDebounce";
import convertMinutesToTime from "utils/convertMinutesToTime";
// style
import "./styles.css";

const getMinAndMax = (results) => {
  const prices = results?.map((el) => el?.totalPrice || el?.totalSellPrice).filter(Boolean);

  const min = prices ? Math.min(...prices) : 0;
  const max = prices ? Math.max(...prices) : 0;
  return { min: max === min ? 0 : min, max };
};

const Filters = ({ setFilters, results }) => {
  const [name, setName] = useState("");
  const [departureTimeRange, setDepartureTimeRange] = useState([0, 1439]);
  const [arrivalTimeRange, setArrivalTimeRange] = useState([0, 1439]);
  const [priceRange, setPriceRange] = useState([
    getMinAndMax(results)?.min,
    getMinAndMax(results)?.max,
  ]);

  const debounceName = useDebounce(name, 500);
  const debounceDepartureTimeRange = useDebounce(departureTimeRange, 500);
  const debounceArrivalTimeRange = useDebounce(arrivalTimeRange, 500);
  const debouncePriceRange = useDebounce(priceRange, 500);

  useEffect(() => {
    console.log("SET FILTERS SET FILTERS");
    setFilters({
      debounceName,
      debounceDepartureTimeRange,
      debounceArrivalTimeRange,
      debouncePriceRange,
    });
  }, [debounceName, debounceDepartureTimeRange, debounceArrivalTimeRange, debouncePriceRange]);

  const clearFilters = () => {
    setFilters({});
  };

  if (!results || !Array.isArray(results) || results?.length === 0) {
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
            <p className="fz-14 fw-600">Search by company name</p>
            <p className="fz-12 fw-400 mb-1 gc">Know the company name? Search below.</p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              prefix={<SearchSVG color="#3A5EE3" />}
              placeholder="e.g United Airlines"
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
                            [getMinAndMax(results)?.min]: getMinAndMax(results)
                              .min?.toFixed(2)
                              ?.toLocaleString(),
                            [getMinAndMax(results)?.max]: getMinAndMax(results)
                              .max?.toFixed(2)
                              ?.toLocaleString(),
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
              defaultActiveKey={["2"]}
              items={[
                {
                  key: "2",
                  label: <p className="fz-14 fw-600">Departure Time</p>,
                  children: (
                    <Slider
                      range
                      min={0}
                      max={1439} // Total minutes in a day (24 * 60)
                      step={15}
                      value={departureTimeRange}
                      onChange={setDepartureTimeRange}
                      tooltip={{
                        formatter: (value) => convertMinutesToTime(value),
                      }}
                    />
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
                  label: <p className="fz-14 fw-600">Arrival Time</p>,
                  children: (
                    <Slider
                      range
                      min={0}
                      max={1439} // Total minutes in a day (24 * 60)
                      step={15}
                      value={arrivalTimeRange}
                      onChange={setArrivalTimeRange}
                      tooltip={{
                        formatter: (value) => convertMinutesToTime(value),
                      }}
                    />
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
