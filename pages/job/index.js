import React, { useState, useEffect } from "react";
import NavbarTwo from "@/components/navbarTwo";
import Footer from "@/components/footer";
import axios from "axios";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import _debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";


function Job(props) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("Sort");
  const sortOptions = ["Nama", "Skill", "Lokasi"];
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.data);
  const auth = useSelector((state) => state?.auth);

  console.log(auth);

  // server rendering code here
  const [data, setData] = React.useState(props?.request?.data);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [firstPageInSet, setFirstPageInSet] = React.useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setShowDropdown(false);

    // Filter the data based on the selected option and search text
    let sortedData = [];
    if (option === "Nama") {
      sortedData = data.filter(
        (item) =>
          item.fullname.toLowerCase().includes(searchText.toLowerCase()) &&
          item.id !== user?.id
      );
      // Update the filtered data
      setFilteredData(sortedData);
    } else if (option === "Skill") {
      sortedData = data.filter((item) =>
        item.skills.some(
          (skill) =>
            skill.toLowerCase().includes(searchText.toLowerCase()) &&
            item.id !== user?.id
        )
      );
      // Update the filtered data
      setFilteredData(sortedData);
    }
  };
  const itemsPerPage = 3;

  const profiles = filteredData
    .filter((item) => item.id !== user?.id)
    .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
      if ((currentPage + 1) % 5 === 0) {
        setFirstPageInSet(firstPageInSet + 5);
      }
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      if (currentPage % 5 === 0) {
        setFirstPageInSet(firstPageInSet - 5);
      }
    }
  };

  return (
    <>
      <NavbarTwo />
      <nav
        className="navbar navbar-expand-lg navbar-primary"
        style={{ backgroundColor: "#5E50A1", marginTop: "15vh" }}
      >
        <div className="container">
          <a className="navbar-brand fs-4 text-light fw-bold ms-3">Top Jobs</a>
        </div>
      </nav>
      <div className="container ">
        <div className="row ">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12 mt-5 ">
            <div
              className="search mb-5"
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="text"
                className="form-control form-control-lg bg-body-tertiary"
                aria-label="Text input with dropdown button"
                placeholder="search for any skill"
                value={searchText}
                onChange={handleSearchInputChange}
                style={{
                  flex: 1,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  padding: "10px",
                  borderRadius: "4px",
                }}
              />

              <div className="action d-inline-flex align-items-center ms-2 me-2">
                <div
                  className="vertical-line"
                  style={{ borderLeft: "2px solid #9EA0A5", height: "40px" }}
                ></div>
                <div className="btn-group ms-2 me-2">
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{
                      textAlign: "center",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    {sortOption}
                  </button>
                  {showDropdown && (
                    <div className="dropdown-menu show">
                      {sortOptions.map((option, index) => (
                        <div key={index}>
                          <a
                            className="dropdown-item"
                            href="#"
                            onClick={() => handleSortOptionClick(option)}
                          >
                            {option}
                          </a>
                        </div>
                      ))}
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => {
                          setShowDropdown(false);
                        }}
                      >
                        Close
                      </a>
                    </div>
                  )}
                </div>
                <button
                  className="btn btn-primary"
                  style={{
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    padding: "10px",
                    borderRadius: "4px",
                  }}
                  type="button"
                  id="button-addon2"
                  onClick={() => handleSortOptionClick(sortOption)}
                >
                  Search
                </button>
              </div>
            </div>

            {profiles.map((profile, index) => (
              <div
                className="card "
                style={{
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  padding: "10px",
                  borderRadius: "4px",
                }}
                key={index}
              >
                <div className="row align-items-center mt-3 mb-3 ms-3">
                  <div className="col-12 col-md-2 text-center">
                    <img
                      src={profile?.photo || "/default_photo.jpg"}
                      alt="profile"
                      className="img-fluid rounded-circle object-fit-cover"
                      style={{ width: `20vh`, height: `20vh` }}
                    />
                  </div>
                  <div className="col-12 col-md-8 text-center text-md-start text-lg-start">
                    <h5>
                      {profile?.fullname
                        ? profile?.fullname.charAt(0).toUpperCase() +
                          profile?.fullname.slice(1)
                        : "Nama tidak tersedia"}
                    </h5>

                    <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                      <FontAwesomeIcon icon={faSuitcase} />
                      <p className="m-0 ms-2 text-secondary">
                        {profile?.job_title && profile.job_title !== "-"
                          ? profile.job_title
                          : "Job title tidak tersedia"}
                      </p>
                    </div>

                    <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p className="m-0 ms-2 text-secondary">
                        {profile?.domicile && profile.domicile !== "-"
                          ? profile.domicile
                          : "Domisili tidak tersedia"}
                      </p>
                    </div>
                    <div>
                      {Array.isArray(profile.skills) ? (
                        profile.skills.map((skill, key) => (
                          <span key={key} className="badge bg-warning m-1 p-2">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="badge bg-warning m-1 p-2">
                          {profile.skills}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-2 text-center text-md-right mt-sm-3 mt-xs-3">
                    {/* this when in user page want to use the redux data */}
                    <Link href={`/job/${profile.id}`}>
                      <button className="btn btn-primary">Lihat Profile</button>
                    </Link>
                    {/* this when use the next router */}
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-center mt-4 mb-4">
              <button
                className="btn btn-outline-primary "
                onClick={handlePrev}
                disabled={currentPage === 0} // Disable 'Prev' button on the first page
              >
                Prev
              </button>
              {[...Array(5)].map((_, i) => {
                const pageNumber = firstPageInSet + i;
                if (pageNumber < totalPages) {
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`btn ${
                        currentPage === pageNumber
                          ? "btn-primary ms-2"
                          : "btn-outline-primary ms-2"
                      }`}
                    >
                      {pageNumber + 1}
                    </button>
                  );
                }
                return null;
              })}
              <button
                className="btn btn-outline-primary ms-2"
                onClick={handleNext}
                disabled={currentPage === totalPages - 1} // Disable 'Next' button on the last page
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/job/all`);
  const data = response.data; // Assuming the response is an object that contains the array in a property called 'data'

  // Check if the data is an array
  if (Array.isArray(data)) {
    // Assuming the array contains objects with 'id' property
    data.sort((a, b) => a.id - b.id);
  }

  // Pass data to the page via props
  return { props: { request: data } };
}
// job?page=1&limit=8

export default Job;
