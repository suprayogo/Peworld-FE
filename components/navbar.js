import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
function Navbar() {
  const [navActive, setNavActive] = useState(null);

  const [access, setAccess] = useState(false);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
      router.push("/job");
    } else {
      try {
        setIsLoading(true);
        await Swal.fire({
          title: "Anda belum login",
          text: "Silahkan login terlebih dahulu",
          icon: "warning",
          confirmButtonText: "OK",
        });
        setIsLoading(false);
        router.push("/login");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setAccess(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setAccess(false);

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <div id="navbar-page" style={{ zIndex: 2 }}>
        <div className="Navigation fixed-top bg-white p-4">
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
                  <Link
                    href="/"
                    className="text-black fw-medium text-decoration-none "
                    style={{ marginRight: "45rem", marginLeft: "12px" }}
                    onClick={handleButtonClick}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Home"}
                  </Link>

                  <Link href="/profile">
                    <button className="btn btn-primary me-3 mb-2 mt-2">
                      Profile
                    </button>
                  </Link>

                  {/* button logout */}
                  {/*                       
      <Link href="#" >
            <button
             className="btn btn-primary"
            onClick={handleLogout}
            >Keluar</button>
          </Link> */}
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
                      <Link
                        href="/"
                        className="text-black fw-medium text-decoration-none "
                        style={{ marginRight: "620px", marginLeft: "12px" }}
                        onClick={handleButtonClick}
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading..." : "Home"}
                      </Link>

                      <Link href="/profile">
                        <button className="btn btn-primary me-3 mb-2 mt-4">
                          Profile
                        </button>
                      </Link>

                      {/* button logout */}
                      {/* 
      <Link href="#" >
            <button
             className="btn btn-primary"
            onClick={handleLogout}
            >Keluar</button>
          </Link>
 */}
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

export default Navbar;
