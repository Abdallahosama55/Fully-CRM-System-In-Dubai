import React, { useEffect, useState } from "react";
import { Checkbox, Collapse } from "antd";
import { ArrowDownSVG } from "assets/jsx-svg";
import SvgImage from "components/common/SvgImage";
import isValidSVG from "utils/isValidSVG";
// API CALLS
import useListPackagesThemes from "services/travel/packages/common/Queries/useListPackagesThemes";
import useListPackagesWhoCanJoin from "services/travel/packages/common/Queries/useListPackagesWhoCanJoin";
// styles
import "./styles.css";
const Filters = ({ setFilterdResults, results }) => {
  const [themes, setThemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const packagesThemes = useListPackagesThemes();
  const whoCanJoinList = useListPackagesWhoCanJoin();
  useEffect(() => {
    const tempArr = results?.filter((el) => {
      let temp = true;

      if (
        temp &&
        Array.isArray(el?.tripThemes) &&
        Array.isArray(themes) && themes?.length > 0 &&
        !el.tripThemes?.some((theme) => themes.includes(theme?.toLowerCase()))
      ) {
        temp = false;
      }

      if (
        temp &&
        Array.isArray(el?.tripWhoCanJoin) &&
        Array.isArray(categories) && categories?.length > 0 &&
        !el.tripWhoCanJoin?.some((category) => categories.includes(category?.toLowerCase()))
      ) {
        temp = false;
      }

      return temp;
    });

    setFilterdResults(tempArr);
  }, [themes, categories]);

  if (results.length === 0) {
    return <></>;
  }
  const clearFilters = () => {
    setThemes([]);
    setCategories([]);
  };

  return (
    <div>
      <div className="package_filters_side">
        <div className="package_filters_section">
          <div className="filters_side_header space-between">
            <p className="fz-16 fw-600">Filters by</p>
            <p
              className="fz-12 fw-600"
              style={{ color: "#2D5FEB", cursor: "pointer" }}
              onClick={clearFilters}>
              Clear Fliters
            </p>
          </div>
          <div className="filter_group">
            <Collapse
              expandIcon={<ArrowDownSVG />}
              ghost
              defaultActiveKey={["2"]}
              items={[
                {
                  key: "2",
                  label: <p className="fz-14 fw-600">Package Category</p>,
                  children: (
                    <div className="package_filters_checkbox_group">
                      <Checkbox.Group
                        value={categories}
                        onChange={(values) => {
                          setCategories(values);
                        }}>
                        {whoCanJoinList?.data?.map((category) => (
                          <p
                            key={category.id}
                            className={`checkbox_item ${
                              category?.icon ? "checkbox_item_with_icon" : ""
                            }`}>
                            <Checkbox value={category?.name?.toLowerCase()}>
                              {category?.icon && isValidSVG(category?.icon) ? (
                                <SvgImage svgContent={category?.icon} />
                              ) : (
                                ""
                              )}
                              {category?.name}
                            </Checkbox>
                          </p>
                        ))}
                      </Checkbox.Group>
                    </div>
                  ),
                },
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
                  key: "2",
                  label: <p className="fz-14 fw-600">Package Theme</p>,
                  children: (
                    <div className="package_filters_checkbox_group">
                      <Checkbox.Group
                        value={themes}
                        onChange={(values) => {
                          setThemes(values);
                        }}
                        className="package_filters_checkbox_group">
                        {packagesThemes?.data?.map((theme) => (
                          <p key={theme.id} className="checkbox_item">
                            <Checkbox value={theme?.name?.toLowerCase()}>{theme?.name}</Checkbox>
                          </p>
                        ))}
                      </Checkbox.Group>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
