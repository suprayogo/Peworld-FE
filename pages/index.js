import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import Swal from "sweetalert2";
import Footer from "@/components/footer";

function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  const handleButtonClick = async () => {
    const isLoggedIn = localStorage.getItem("token");
    if (isLoggedIn) {
      router.push("/job");
    } else {
      try {
        setIsLoading(true);
        const result = await Swal.fire({
          title: "Anda belum login",
          text: "Silahkan login terlebih dahulu",
          icon: "warning",
          showCancelButton: true, // Tampilkan tombol "Cancel"
          confirmButtonText: "OK",
          cancelButtonText: "Cancel", // Teks pada tombol "Cancel"
        });
  
        setIsLoading(false);
  
        if (result.isConfirmed) {

          router.push("/login");
        } else {
        
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div id="landing-page">
        <header>
          <div className="container content-to-center mt-5">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-5 col-lg-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center order-2 order-md-1">
                <h1 className="d-block mb-3 mt-3">
                  Talenta terbaik negeri untuk perubahan revolusi 4.0
                </h1>
                <p className="d-block mb-3"></p>
                <div class="button-container">
                  <Link href="#">
                    <button
                      class="btn btn-primary btn-lg"
                      onClick={handleButtonClick}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Mulai Dari Sekarang"}
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col-md-5 col-lg-5 col-sm-12 col-xs-12 order-1 order-md-2 mt-1">
                <div className="box-gray"></div>
                <img
                  src="/home-img-1.png"
                  alt="Home Picture"
                  className="responsive-image"
                />
              </div>
            </div>
          </div>
        </header>

        {/* ------TALLENT of START-------- */}
        <section id="page-1">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12 ">
                <div className="box-gray-2"></div>

                <div>
                  <img
                    src="/home-img-2.png"
                    alt="Home Picture"
                    className="responsive-image-2"
                  />
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <h2 className="mb-4 mt-4">
                  Kenapa harus mencari tallent di peworld
                </h2>

                <div className="row ">
                  <div className="col-md-6">
                    {[
                      "Cognitive flexibility",
                      "Berpikir kritis",
                      "Service orientation",
                      "Kecerdasan emosional",
                    ].map((item, key) => (
                      <div className="d-flex align-items-center mb-4" key={key}>
                        <img
                          src="/checklist-purple.svg"
                          style={{ marginRight: "20px" }}
                        />
                        <p className="mb-0">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-6">
                    {[
                      "People Management",
                      "Kreativitas",
                      "Kemampuan beradaptasi",
                      "Smart",
                    ].map((item, key) => (
                      <div className="d-flex align-items-center mb-4" key={key}>
                        <img
                          src="/checklist-purple.svg"
                          style={{ marginRight: "20px" }}
                        />
                        <p className="mb-0">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ------TALLENT of END-------- */}

        {/*----------Skill Tallent (START)--------- */}

        <section id="page-2">
          <section className="container" style={{ marginBottom: "200px" }}>
            <div className="row justify-content-between align-items-center">
              <div className="col-md-5 col-lg-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center order-2 order-md-1">
                <h2 className="d-block mt-3 mb-4">
                  Skill tallent progammer terbaik di peworld
                </h2>

                <div className="row ">
                  <div className="col-md-6">
                    {["Java", "Kotlin", "PHP", "Javascript"].map(
                      (item, key) => (
                        <div
                          className="d-flex align-items-center mb-4"
                          key={key}
                        >
                          <img
                            src="/checklist-orange.svg"
                            style={{ marginRight: "20px" }}
                          />
                          <p className="mb-0">{item}</p>
                        </div>
                      )
                    )}
                  </div>
                  <div className="col-md-6">
                    {["Golang", "C++", "Ruby", "10+ Bahasa lainnya"].map(
                      (item, key) => (
                        <div
                          className="d-flex align-items-center mb-4"
                          key={key}
                        >
                          <img
                            src="/checklist-orange.svg"
                            style={{ marginRight: "20px" }}
                          />
                          <p className="mb-0">{item}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-lg-5 col-sm-12 col-xs-12 order-1 order-md-2 mt-1">
                <div className="box-gray-3"></div>
                <img
                  src="/home-img-3.png"
                  alt="Home Picture"
                  className="responsive-image-3"
                />
              </div>
            </div>
          </section>
        </section>

        {/*------------ Skill Tallent (END) -------------------*/}
      </div>

      <Footer />
    </>
  );
}

export default Index;
