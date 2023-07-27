import Link from "next/link";
import React from "react";
import NavbarTwo from "@/components/navbarTwo";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import axios from "axios";

function Profile() {
  const router = useRouter();
  let company = [...new Array(2)];

  return (
    <div id="profile_page">
      <Navigations />

      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col col-md-4">
            <div className="card p-4">
              <div className="d-flex justify-content-center">
                <img
                  src="/profile.jpg"
                  alt="profile"
                  style={{
                    height: "150px",
                    width: "150px",
                    borderRadius: "50%",
                  }}
                />
              </div>

              <h1 style={{ fontSize: "30px", marginTop: "30px" }}>
                Louis Tomlinson {router?.query?.id}
              </h1>
              <p>Web Developer</p>

              <p className="text-black-50">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum erat orci, mollis nec gravida sed, ornare quis urna.
                Curabitur eu lacus fringilla, vestibulum risus at.
              </p>

              <button className="btn btn-primary btn-lg mt-4 mb-3">Hire</button>

              <h2 style={{ fontSize: "25px" }}>Skills</h2>

              <div className="d-inline">
                {[
                  "Phyton",
                  "Laravel",
                  "Golang",
                  "Ruby",
                  "Rust",
                  "Javascript",
                  "Express",
                ].map((item, key) => (
                  <span key={key} class="badge bg-warning m-1 p-2 ">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="col col-md-8">
            <div className="card p-4">
              <ul className="nav nav-underline">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">
                    Pengalaman kerja
                  </a>
                </li>
              </ul>

              {company.map((item, key) => (
                <div className="row mt-4" key={key}>
                  <div className="col col-md-2">
                    <img src="hiring-1.jpg" style={{ width: "100%" }} />
                  </div>
                  <div className="col col-md-10">
                    <h5 className="mb-0">Trainer</h5>
                    <p className="mb-0">Pijar Camp</p>
                    <div className="d-flex align-items-center">
                      <p style={{ color: "#9EA0A5" }}>
                        July 2019 - January 2020
                      </p>
                      <p style={{ marginLeft: "30px", color: "#9EA0A5" }}>
                        6 months
                      </p>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vestibulum erat orci, mollis nec gravida sed, ornare quis
                      urna. Curabitur eu lacus fringilla, vestibulum risus at.
                    </p>

                    {key === company.length - 1 ? null : <hr />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// looping / create this page as much data we have
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const {
    data: { data },
  } = await axios.get("http://localhost:3200/v1/job/all");

  // Get the paths we want to pre-render based on posts
  const paths = data.map((post) => ({
    params: { id: post?.id?.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
}

// convert this page into html
export async function getStaticProps() {
  return {
    props: {
      id: null,
    },
    revalidate: 10,
  };
}

export default Profile;