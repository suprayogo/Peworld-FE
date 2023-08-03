import React, { useEffect } from "react";
import NavbarTwo from "@/components/navbarTwo";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faGitlab,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faBuilding,
  faSuitcaseRolling,
  faNoteSticky,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function Hire() {
  const { query } = useRouter();
  const id = parseInt(query?.id);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state?.hire?.data);
  const auth = useSelector((state) => state?.auth);
  const token =  localStorage?.token
  const [isLoading, setIsLoading] = useState(false);




  const handleSendMessage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contact/${user?.id}`,
        {
          subject,
          description: message,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        router.replace(`/job/${user?.id}`);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }
  return (
    <>
      <NavbarTwo />
      <div style={{marginTop: "20vh"}}>
      <div className="container mt-5 mb-5" >
        <div className="row">
          <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12">
            <div className="card"          style={{ boxShadow: "0 0 10px 3px rgba(100, 100, 100, 0.7)" }}>
              <img
                src={user?.photo}
                className="rounded-circle mx-auto d-block mt-3 object-fit-cover"
                width={`100`}
                height={`100`}
                alt="card"
              />
              <div className="card-body">
                <h5 className="card-title">{user?.fullname}</h5>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faBuilding} />
                  <p className="card-text ms-2 mb-0">
                    {user?.company && user?.company !== "-"
                      ? capitalizeWords(user?.company)
                      : "Company tidak tersedia"}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <p className="card-text ms-2 mb-0">
                    {user?.domicile && user?.domicile !== "-"
                      ? capitalizeWords(user?.domicile)
                      : "Domisili tidak tersedia"}
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon icon={faSuitcaseRolling} />
                  <p className="card-text ms-2 mb-0">
                    {user?.job_tittle && user?.job_tittle !== "-"
                      ? capitalizeWords(user?.job_tittle)
                      : "Title tidak tersedia"}
                  </p>
                </div>
                <div className="d-flex align-items-start">
                  <FontAwesomeIcon icon={faNoteSticky} className="mt-1" />{" "}
                  <p className="text-muted ms-2 mb-0 mt-0">
                    {user?.description && user?.description !== "-"
                      ? user?.description
                      : "Description tidak tersedia"}
                  </p>
                </div>
              </div>

              <h5 className="card-title ms-3 mt-5">Skills</h5>
              <div className="card-skills ms-2 ">
                <div className="d-inline ">
                  {user?.skills.map((item, key) => (
                    <span key={key} className="badge bg-warning m-1 p-2">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="d-flex align-items-center ms-3 mt-3 mb-5">
                <FontAwesomeIcon icon={faEnvelope} />
                <p className="text-muted ms-2 mb-0">{user?.email}</p>
              </div>
            </div>
          </div>
          <div className="col-md-9 col-lg-9 col-xs-12 col-sm-12"          style={{ boxShadow: "0 0 10px 3px rgba(100, 100, 100, 0.7)" }}>
            <div className="ms-5" >
              <h4>Hubungi {user?.fullname}</h4>
            </div>

            <hr />
            <form onSubmit={handleSendMessage}>
              <div className="m-5 mt-2 mb-3">
                <label htmlFor="inputJob" className="form-label">
                  Tujuan pesan ini
                </label>
                <input
                  type="job-desk"
                  className="form-control"
                  id="inputJob"
                  placeholder="Masukan job desk"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />

                <label htmlFor="inputJodPlace" className="form-label">
                  Deskripsi Singkat
                </label>
                <textarea
                  type="text-area"
                  className="form-control"
                  id="inputJobPlace"
                  placeholder="Tuliskan deskripsi singkat"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ height: `15vh` }}
                />
                <button type="submit" className="btn btn-warning w-100 mt-4">
                  {isLoading ? "Loading..." : "Hire"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Hire;
