import React, { useEffect, useState } from "react";
import { Button, Col, Empty, message, Row } from "antd";
import Filters from "./components/Filters";
import PackageCard from "./components/PackageCard";
// API CALL
import useGetPackageSearchResults from "services/travel/booking/Package/Queries/useGetPackageSearchResults";
// ASSETS
import { LocationSVG2, SearchSVG } from "assets/jsx-svg";
import empty_booking_screen from "assets/images/empty_booking_screen.png";
import useSearchState from "hooks/useSearchState";
import CityInput from "components/common/CityInput";
import TurboLoadingPage from "components/common/TurboLoadingPage";
const PackagesTab = ({ setTabContent }) => {
  const [packageSearch, setPackageSearch] = useSearchState("package_search", "");

  const [results, setResults] = useState([]);
  const [filterdResults, setFilterdResults] = useState([]);
  const [page, setPage] = useState(1);

  const packageSearchResults = useGetPackageSearchResults(
    {
      city: packageSearch?.city,
      page,
      size: 10,
    },
    { enabled: false },
  );

  useEffect(() => {
    if (packageSearchResults.data?.rows) {
      setResults(packageSearchResults.data?.rows);
      setFilterdResults(packageSearchResults.data?.rows);
    }

    if (packageSearchResults?.data && packageSearchResults?.data.length === 0) {
      message.warning(`No available packages in ${packageSearch?.city}`);
    }
  }, [packageSearchResults?.data, packageSearchResults?.isSuccess]);

  useEffect(() => {
    if (packageSearchResults.isLoading || packageSearchResults.isFetching) {
      setTabContent(<TurboLoadingPage height="calc(100dvh - 200px)" />);
    } else if (results.length === 0) {
      setTabContent(
        <div className="mt-1 mb-1 center-items" style={{ minHeight: "450px" }}>
          <Empty
            image={empty_booking_screen}
            description={<p>Please fill the fields above to see result here.</p>}
          />
        </div>,
      );
    } else if (results.length > 0) {
      setTabContent(
        <Row gutter={[24, 16]}>
          <Col lg={6} sm={24}>
            <Filters setFilterdResults={setFilterdResults} results={results} />
          </Col>
          <Col lg={18} sm={24}>
            <Row gutter={[12, 12]}>
              {results.length > 0 && filterdResults?.length !== 0 ? (
                filterdResults?.map((el) => (
                  <PackageCard
                    key={el.id}
                    data={el}
                    searchInfo={{
                      destination: packageSearch?.city,
                    }}
                  />
                ))
              ) : (
                <Empty
                  className="w-100"
                  style={{
                    padding: "5rem 0",
                    borderRadius: "8px",
                    border: "1px solid var(--gray-300)",
                  }}
                  image={empty_booking_screen}
                  description={<p style={{ color: "#314155" }}>No vehicles match your filters</p>}
                />
              )}
              {}
            </Row>
          </Col>
        </Row>,
      );
    }
  }, [packageSearchResults?.isLoading, results, filterdResults, packageSearch]);

  const handelSearch = () => {
    packageSearchResults.refetch();
  };

  return (
    <Row gutter={[10, 10]}>
      <Col lg={22}>
        <CityInput
          prefix={<LocationSVG2 />}
          placeholder={"Destination"}
          className="w-100"
          value={packageSearch}
          onChange={(value) => setPackageSearch(value)}
        />
      </Col>
      <Col lg={2}>
        <div className="d-flex" style={{ justifyContent: "flex-end" }}>
          <Button
            icon={<SearchSVG color="#fff" />}
            type="primary"
            style={{ padding: "10px 8px" }}
            onClick={handelSearch}>
            Search
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default PackagesTab;
