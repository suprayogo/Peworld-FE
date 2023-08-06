import React from "react";
import NavbarTwo from "@/components/navbarTwo";
import Footer from "@/components/footer";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { dispatch } from "react";
import { sendHireTo } from "../../store/reducers/hireSlice";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBuildingUser,
  faSuitcase,
  faClipboard,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function Profile({ profile }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pengalaman-kerja");
  const { query } = router;
  const id = parseInt(query?.id);
  const dispatch = useDispatch();

  console.log(profile);
  if (!profile) {
    return <div>No profile found</div>;
  }

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }

  const hireHandle = (profile) => {
    dispatch(sendHireTo(profile));
    router.replace("/hire");
  };

  return (
    <div style={{ marginTop: "20vh" }}>
      <NavbarTwo />
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12">
            <div
              className="card"
              style={{ boxShadow: "0 0 10px 3px rgba(100, 100, 100, 0.7)" }}
            >
              <img
                src={profile?.photo || "/default_photo.jpg"}
                className="rounded-circle mx-auto d-block mt-3 object-fit-cover"
                width={`100`}
                height={`100`}
                alt="card"
              />
              <div className="card-body">
                <h5 className="card-title">{profile?.fullname}</h5>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faBuildingUser} />
                  <p className="card-text ms-2 mb-0">
                    {profile?.company && profile?.company !== "-"
                      ? capitalizeWords(profile?.company)
                      : "Company tidak tersedia"}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p className="card-text ms-2 mb-0">
                    {profile?.domicile && profile?.domicile !== "-"
                      ? capitalizeWords(profile?.domicile)
                      : "Domisili tidak tersedia"}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faSuitcase} />
                  <p className="card-text ms-2 mb-0">
                    {profile?.job_title && profile?.job_title !== "-"
                      ? capitalizeWords(profile?.job_title)
                      : "Title tidak tersedia"}
                  </p>
                </div>
                <div className="d-flex align-items-start">
                  <FontAwesomeIcon icon={faClipboard} className="mt-1" />{" "}
                  <p className="text-muted ms-2 mb-0 mt-0">
                    {profile?.description && profile?.description !== "-"
                      ? profile?.description
                      : "Description tidak tersedia"}
                  </p>
                </div>
              </div>
              <div className="d-grid gap-2 col">
                <div className="w-100">
                  <Link href={"/hire"}>
                    <button
                      className="btn btn-primary mx-3"
                      style={{ width: "calc(100% - 2rem)" }}
                      onClick={() => hireHandle(profile)}
                    >
                      Hire
                    </button>
                  </Link>
                </div>
              </div>

              <h5 className="card-title ms-3 mt-5">Skills</h5>
              <div className="card-skills ms-2 ">
                <div className="d-inline ">
                  {profile?.skills.map((item, key) => (
                    <span key={key} className="badge bg-warning m-1 p-2">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="card-location mb-0 ms-3 mt-5 d-flex">
                <img
                  className="me-2"
                  src="/mail.png"
                  width={`20`}
                  height={`20`}
                />
                <p className="text-muted">{profile?.email}</p>
              </div>
            </div>
          </div>
          <div className="col-md-9 col-lg-9 col-xs-12 col-sm-12 ">
            <div
              className="card"
              style={{ boxShadow: "0 0 10px 3px rgba(100, 100, 100, 0.7)" }}
            >
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "pengalaman-kerja" ? "active" : ""
                    }`}
                    style={
                      activeTab === "pengalaman-kerja"
                        ? { borderBottom: "2px solid #5e50a1" }
                        : {}
                    }
                    onClick={() => setActiveTab("pengalaman-kerja")}
                  >
                    Pengalaman Kerja
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div
                  id="portofolio"
                  className={`tab-pane fade ${
                    activeTab === "portofolio" ? "show active" : ""
                  }`}
                >
                  <div className="row mt-3"></div>
                </div>
                <div
                  id="pengalaman-kerja"
                  className={`tab-pane fade ${
                    activeTab === "pengalaman-kerja" ? "show active" : ""
                  }`}
                >
                  {profile?.job_history && profile?.job_history?.length > 0 ? (
                    profile?.job_history?.map((item, key) => (
                      <div className="row mt-4 ms-4 me-4" key={key}>
                        <div className="col-md-2 col-lg-2 col-xs-2 col-sm-2">
                          <img src={item.logo} style={{ width: `10vh` }} />
                        </div>
                        <div className="col col-md-10 col-lg-10 col-xs-8 col-sm-8">
                          <h5 className="mb-0">
                            {item?.position ? item?.position : "No position"}
                          </h5>
                          <p className="mb-0">
                            {item?.company ? item?.company : "No company"}
                          </p>
                          <div className="d-flex align-items-center">
                            <p className="text-secondary">{item?.date}</p>
                          </div>
                          <p>
                            {" "}
                            {item?.description
                              ? item?.description
                              : "No company"}
                          </p>

                          {key === item?.job_history?.length - 1 ? null : (
                            <hr />
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <h5 className="text-center text-secondary m-5">
                       Pengalaman kerja tidak ditemukan
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  // Fetch all profiles from your API
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/job/all`);
  const profiles = res.data?.data;

  // Generate the paths for the static pages
  const paths = profiles.map((profile) => ({
    params: { id: profile.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Fetch all profiles again
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/job/all`);
  const profiles = res.data?.data;

  // Find the specific profile data using the ID
  const profileData = profiles.find(
    (profile) => profile.id.toString() === params.id
  );

  if (!profileData) {
    return {
      props: {
        profile: null,
      },
      revalidate: 10,
    };
  }

  return {
    props: { profile: profileData },
    revalidate: 10,
  };
}



export default Profile;
