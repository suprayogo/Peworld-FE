import React from "react";

function ExperienceCard(props) {
  const {logo, position, company, date, description, id} = props;


  return (
    
    <div className="tab-content">
      <div id="pengalaman-kerja">

        <div className="row mt-4 ms-4 me-4">
          <div className="col col-md-2">
            <img src={logo} style={{ width: "100%" }} />
          </div>
          <div className="col col-md-10">
            <h5 className="mb-0">{position}</h5>
            <p className="mb-0">{company}</p>
            <div className="d-flex align-items-center">
              <p className="text-secondary">{date}</p>
              {/* <p className="text-secondary ms-5">6 months</p> */}
            </div>
            <p>
            {description}
            </p>

            <hr />
          </div>
        </div>




        
      </div>
    </div>
  );
}

export default ExperienceCard;
