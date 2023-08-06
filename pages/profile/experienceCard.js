import React from "react";
import swal from 'sweetalert';

function ExperienceCard(props) {
  const { logo, position, company, date, description, showDelete, id, onDelete } = props;

  const handleDeleteClick = () => {
    onDelete(id); 
  };


  return (
    <div className="tab-content">
      <div id="pengalaman-kerja">
        <div className="row mt-4 ms-4 me-4">
          <div className="col col-md-2">
            <img
              src={logo}
              style={{ width: "100%",  objectFit: "cover" }}
              alt="Company Logo"
            />
          </div>
          <div className="col col-md-10">
            <h5 className="mb-0">{position}</h5>
            <p className="mb-0">{company}</p>
            <div className="d-flex align-items-center">
              <p className="text-secondary">{date}</p>
            </div>
            <p>{description}</p>
            {showDelete && (
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            )}
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceCard;
