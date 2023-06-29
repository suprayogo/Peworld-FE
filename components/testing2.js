import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const endYear = currentYear;

  const handleWhatsAppClick = () => {
    const phoneNumber = "123456789";
    const message = "Hello! I have a question.";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink);
  };
  return (
    <>
      <section id="footer-page">
        <footer style={{ minHeight: "20rem", backgroundColor: " #5e50a1" }}>
          <div className="container pt-5">
            <img src="/logo-white.png" alt="logo" />

            <p className="text-white mt-3 mb-5">
              Lorem ipsum dolor sit amet, consectetur <br /> adipiscing elit. In
              euismod ipsum
              <br /> et dui rhoncus auctor.
            </p>
            <br />

            <hr style={{ borderBottom: "2px solid white" }} />

            <div className="row justify-content-between align-items-center">
              <div className="col-md-5 col-lg-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center order-2 order-md-1">
                <p className="d-block mb-3 mt-3 text-white">
                  &copy; {startYear}-{endYear} All rights reserved
                </p>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12 col-xs-12 order-3 order-md-2 ">
                <button
                  className="whatsapp-button mb-3"
                  onClick={handleWhatsAppClick}
                >
                  <FontAwesomeIcon
                    icon={faWhatsapp}
                    className="whatsapp-icon me-2"
                  />
                  Chat via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Footer;
