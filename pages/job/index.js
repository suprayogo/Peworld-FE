import React, { useCallback } from "react";
import NavbarTwo from "@/components/navbarTwo";
import Footer from "@/components/footer";
import Link from "next/link";
import axios from "axios";

import _debounce from "lodash/debounce";

function Job(props) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(
    props?.request?.data?.total_page
  );
  const [data, setData] = React.useState(props?.request?.data?.rows);

  const handleNextPage = (page) => {
    axios
      .get(`https://hire-job.onrender.com/v1/job?page=${page}&limit=8`)
      .then(({ data: { data } }) => {
        setTotalPage(data?.total_page);
        setData(data?.rows);
        setCurrentPage(page);
      });
  };

  const handleSearch = (keyword) => {
    if (keyword.trim()) {
      axios
        .get(`https://hire-job.onrender.com/v1/job/filter?keyword=${keyword}`)
        .then(({ data: { data } }) => {
          setTotalPage(0);
          setData(data ?? []);
          setCurrentPage(1);
        });
    } else {
      handleNextPage(1);
    }
  };

  const debounceFn = useCallback(_debounce(handleSearch, 1000), []);

  return (
    <>
   <NavbarTwo/>

      <div className="container py-5">
        <div class="mb-3">
          <input
            class="form-control"
            placeholder="Search name, job, skills or location..."
            onChange={(e) => {
              debounceFn(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e.target.value);
              }
            }}
          />
        </div>

        <div className="row">
          {data.length === 0 ? (
            <>
              <div className="d-flex justify-content-center mb-3 mt-5">
                <img src="/empty.svg" style={{ width: "300px" }} />
              </div>
              <h3 className="text-center">Data not found</h3>
            </>
          ) : null}
          {data.map((item, key) => (
            <div className="col col-md-3 mb-4" key={key}>
              <Link href={`/job/${item?.id}`}>
                <div class="card">
                  <img
                    src={
                      item?.photo ??
                      "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    class="card-img-top"
                    alt="profile"
                    width="100%"
                    style={{
                      minHeight: "300px",
                      maxHeight: "300px",
                      objectFit: "cover",
                      backgroundColor: "#38373D",
                    }}
                  />
                  <div class="card-body">
                    <h5 class="card-text text-decoration-none">
                      {item?.fullname ?? "Unknown"}
                    </h5>
                    <p class="card-text text-decoration-none">
                      {item?.job_title ?? "Unknown"}
                    </p>

                    {item?.skills?.slice(0, 4)?.map((res, key) => (
                      <span
                        class="badge text-bg-warning"
                        style={{ marginRight: "10px" }}
                        key={key}
                      >
                        {res}
                      </span>
                    ))}

                    {item?.skills?.length >= 5 ? (
                      <span
                        class="badge text-bg-warning"
                        style={{ marginRight: "10px" }}
                      >
                        {" "}
                        {item?.skills?.length - 4} more +
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {totalPage > 0 ? (
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item">
                <a
                  class="page-link"
                  href="#"
                  onClick={() => {
                    if (currentPage > 1) {
                      handleNextPage(currentPage - 1);
                    }
                  }}
                >
                  Previous
                </a>
              </li>
              {[...new Array(totalPage)]?.map((item, key) => {
                const _page = ++key;

                return (
                  <li
                    class={`page-item ${_page === currentPage ? "active" : ""}`}
                    key={key}
                    onClick={() => handleNextPage(_page)}
                  >
                    <a class="page-link" href="#">
                      {_page}
                    </a>
                  </li>
                );
              })}
              <li
                class="page-item"
                onClick={() => {
                  if (currentPage < totalPage) {
                    handleNextPage(currentPage + 1);
                  }
                }}
              >
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        ) : null}
      </div>

      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const request = await axios
    .get("https://hire-job.onrender.com/v1/job?page=1&limit=8")
    .then((res) => res.data);

  // Pass data to the page via props
  return { props: { request } };
}

export default Job;