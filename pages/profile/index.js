import React from "react";
import NavbarTwo from "@/components/navbarTwo";
import Footer from "@/components/footer";
import requireAuth from "@/middlewares/requireAuth";
import axios from "axios";
import { useState, useEffect } from "react";
import ExperienceCard from "@/pages/profile/experienceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function Profile() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response?.data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div id="profile-page">
        <NavbarTwo />

        <div className="container mt-5 mb-5" style={{ paddingTop: "80px" }}>
          <div className="row">
            <div className="col-3">
              <div
                className="card"
                style={{ boxShadow: "0 0 10px 3px rgba(100, 100, 100, 0.7)" }}
              >
                <img
                  src={profile?.photo}
                  className="rounded-circle object-fit-cover mx-auto d-block mt-3"
                  width={`100`}
                  height={`100`}
                  alt="card"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {profile?.fullname
                      ?.toLowerCase()
                      .replace(/(?<= )[^\s]|^./g, (a) => a.toUpperCase())}
                  </h5>
                  <p className="card-text">
                    {profile?.job_title
                      ?.toLowerCase()
                      .replace(/(?<= )[^\s]|^./g, (a) => a.toUpperCase())}
                  </p>
                  <div className="card-location mb-0 d-flex">
                    <img
                      className="me-2"
                      src="/map-pin.png"
                      width={`20`}
                      height={`20`}
                    />
                    <p className="text-muted">
                      {profile?.domicile
                        ?.toLowerCase()
                        .replace(/(?<= )[^\s]|^./g, (a) => a.toUpperCase())}
                    </p>
                  </div>

                  <p className="text-muted mb-2">
                    {profile?.company
                      ?.toLowerCase()
                      .replace(/(?<= )[^\s]|^./g, (a) => a.toUpperCase())}
                  </p>
                  <p className="text-muted mb-0">
                    {profile?.description?.charAt(0).toUpperCase() +
                      profile?.description?.substring(1).toLowerCase()}
                  </p>
                </div>

                <Link href="/profile/edit" className="btn btn-primary mt-0 mb-2 ms-2 me-2">
                  Edit profile
                </Link >



                <h5 className="card-title ms-3">Skills</h5>
                <div className="card-skills ms-2 ">
                  <div className="d-inline ">
                    {profile?.skills?.map((item, key) => (
                      <span key={key} class="badge bg-warning m-1 p-2 ">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-location mb-0 ms-3 mt-2 d-flex">
                  <img
                    className="me-2"
                    src="/mail.png"
                    width={`20`}
                    height={`20`}
                  />
                  <p className="text-muted">{profile?.email?.toLowerCase()}</p>
                </div>

                <div className="card-location mb-0 ms-3 d-flex">
                  <FontAwesomeIcon
                    icon={faPhone}
                    size="lg"
                    style={{ color: "#9EA0A5" }}
                  />
                  <p className="text-muted">&nbsp;&nbsp;{profile?.phone}</p>
                </div>

                {/*  another menu if it already exists

                <div className="card-location mb-0 ms-3 d-flex">
                  <img
                    className="me-2"
                    src="/instagram.png"
                    width={`20`}
                    height={`20`}
                  />
                  <p className="text-muted">@Louist91</p>
                </div>
                <div className="card-location mb-0 ms-3 d-flex">
                  <img
                    className="me-2"
                    src="/github.png"
                    width={`20`}
                    height={`20`}
                  />
                  <p className="text-muted">@Louistommo</p>
                </div>
                <div className="card-location mb-0 ms-3 d-flex">
                  <img
                    className="me-2"
                    src="/gitlab.png"
                    width={`20`}
                    height={`20`}
                  />
                  <p className="text-muted">@Louistommo91</p>
                </div>

 */}
              </div>
            </div>
            <div className="col-9">
              <div
                className="card"
                style={{ boxShadow: "0 0 10px 3px rgba(100, 100, 100, 0.7)" }}
              >
                <ul className="nav nav-tabs">
                  <li className="nav-item mb-1">
                    <a className="container fw-medium text-decoration-none text-black ">
                      Pengalaman Kerja
                    </a>
                  </li>
                </ul>

                {profile?.job_history?.length ? (
                  profile.job_history.map((item) => (
                    <ExperienceCard
                      key={item.id}
                      id={item.id}
                      logo={item.logo}
                      position={item.position}
                      company={item.company}
                      date={item.date}
                      description={item.description}
                    />
                  ))
                ) : (
                  <div className="text-center mt-4">
                    <h5 className="text-body-tertiary">
                      Pengalaman kerja tidak ditemukan
                    </h5>
                    <br />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default requireAuth(Profile);
