import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBell } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function NavbarTwo() {
  const [navActive, setNavActive] = useState(null);
  const [access, setAccess] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const [photo, setPhoto] = React.useState([]);
  
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPhoto(response?.data?.data);
       
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setAccess(!!token);
  }, []);
  
  const handleLogout = () => {
    localStorage.clear();
    setAccess(false);
  
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  };
  
  return (
    <>
      <div id="navbarTwo-page">
        <div className=" Shadow fixed-top bg-white p-4">
          <div className="container ">
            <div className="d-flex justify-content-between align-items-center">
              <div className="brand-logo col-auto">
                <Link className="link" href="/">
                  <img id="logo" src="/logo.png" alt="Logo" />
                </Link>
              </div>

              {/* (START) FOR DEKSTOP */}
              {access ? (
                <div className="desktop-content">
                  <Link href="">
                    <FontAwesomeIcon
                      icon={faBell}
                      size="xl"
                      style={{ cursor: "pointer", color: "#9EA0A5" }}
                      className=" me-5 "
                    />
                  </Link>

                  <Link href="">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      size="xl"
                      style={{ cursor: "pointer", color: "#9EA0A5" }}
                      className=" me-5 "
                    />
                  </Link>

                  <Link href="">
                    <img
                      className="img-profile rounded-circle  me-3 mb-2 mt-2"
                      src={photo?.photo}
                      alt="Profile"
                      onClick={toggleDropdown}
                    />
                  </Link>
                  {dropdownOpen && (
                    <div
                      className="row dropdown-menu show  text-center"
                      style={{ right: "10vh" }}
                    >
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <Link
                            className="text-black text-decoration-none mb-3 fw-medium"
                            href="/edit-profile"
                          >
                            Edit profile
                          </Link>
                        </li>
                        <li className="list-group-item">
                          <Link
                            className="text-black text-decoration-none mb-3 fw-medium"
                            href=""
                            onClick={handleLogout}
                            style={{zIndex:"100"}}
                          >
                            Keluar
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="row align-items-center">
                    <div className="btn-login col-auto">
                      <Link href="/login">
                        <button
                          type="button"
                          className="btn btn-outline-primary border-2"
                        >
                          Masuk
                        </button>
                      </Link>
                    </div>

                    <div className="btn-regis col-auto">
                      <Link href="/register">
                        <button
                          type="button"
                          className="btn btn-primary border-2"
                        >
                          Daftar
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
              {/* (END) FOR DEKSTOP */}

              {/* (START) FOR MOBILE */}

              <div
                onClick={() => setNavActive(!navActive)}
                className={`nav__menu-bar`}
              >
                <div></div>
                <div></div>
                <div></div>
              </div>

              <div className={`${navActive ? "active" : ""} nav__menu-list`}>
                <div>
                  {access ? (
                    <div>
                      <Link href="/edit-profile">
                        <img
                          className="img-profile  me-3 mb-1 mt-2"
                          src={photo?.photo}
                          alt="Profile"
                          style={{ marginRight: "10px", marginLeft: "-1em" }}
                        />
                      </Link>

                      <Link href="/edit-profile">
                        <button className="btn btn-primary me-3 mb-5 mt-1">
                          Setting
                        </button>
                      </Link>

                      <Link href="">
                        <FontAwesomeIcon
                          icon={faBell}
                          size="3x"
                          style={{
                            cursor: "pointer",
                            color: "#9EA0A5",
                            width: "10vh",
                          }}
                          className="align-item-center mb-3 mt-1"
                        />
                      </Link>

                      <Link href="">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          size="3x"
                          style={{
                            cursor: "pointer",
                            color: "#9EA0A5",
                            width: "10vh",
                          }}
                          className="align-item-center mb-5"
                        />
                      </Link>

                      <Link href="" onClick={handleLogout}>
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          size="3x"
                          style={{
                            cursor: "pointer",
                            color: "#b3001b",
                            width: "10vh",
                          }}
                          className="align-item-center mt-5"
                        />
                      </Link>
                    </div>
                  ) : (
                    <>
                      <Link href="/login">
                        <button
                          className="btn btn-outline-primary mb-3"
                          style={{ marginRight: "10px" }}
                        >
                          Masuk
                        </button>
                      </Link>

                      <Link href="/register">
                        <button className="btn btn-primary">Daftar</button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              {/* (END) FOR MOBILE */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarTwo;
