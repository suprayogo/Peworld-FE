import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const endYear = currentYear;

const handleGithubClick = () => {
    const githubLink = `https://github.com/suprayogo`;
    window.open(githubLink);
}

const handleLinkedinClick = () => {
    const linkedinLink = `https://linkedin.com/in/rizki-suprayogo`;
    window.open(linkedinLink);
}

const handleInstagramClick = () => {
    const instagramLink = `https://www.instagram.com/rizky_sy`;
    window.open(instagramLink);
}

  const handleWhatsAppClick = () => {
    const phoneNumber = "+6282279685971";
    const message = "Hello! Saya mau bertanya, ";
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

            <p className="text-white mt-3 mb-1">
            Website developed by :
            <br/>
              <FontAwesomeIcon 
              icon={faGithub} 
              className="icon me-3" 
              size="2x" 
              onClick={handleGithubClick}
              />

              <FontAwesomeIcon 
              icon={faLinkedin} className="icon me-3"
               size="2x"
               onClick={handleLinkedinClick}
               />

              <FontAwesomeIcon
              icon={faInstagram} className="icon me-3"
               size="2x"
               onClick={handleInstagramClick}
               />
            </p>
            <br />

            <hr style={{ borderBottom: "2px solid white" }} />

            <div className="container">
              <div className="row justify-content-between align-items-center">
                <div className="col-md-5 col-lg-6 col-sm-12 col-xs-12 d-flex flex-column justify-content-center order-2 order-md-1">
                  <p className="d-block text-white">
                    &copy; {startYear}-{endYear} All rights reserved
                  </p>
                  <p className="d-block"></p>
                </div>
                <div className="col-md-5 col-lg-3 col-sm-12 col-xs-12 order-1 order-md-2 ">
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
          </div>
        </footer>
      </section>
    </>
  );
}

export default Footer;
