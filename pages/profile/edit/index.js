import React from "react";
import NavbarTwo from "@/components/navbarTwo";
import Footer from "@/components/footer";
import requireAuth from "@/middlewares/requireAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ExperienceCard from "../experienceCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import id from "date-fns/locale/id";
import { format } from "date-fns";

function Edit() {
  const [profile, setProfile] = useState({
    fullname: "",
    jobDesk: "",
    domicile: "",
    jobPlace: "",
    shortDescription: "",
    job_history: [],
  });
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [profileSkills, setProfileSkills] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // console.log(setSelectedFile);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
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

 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Check if a new file is selected
    if (selectedFile) {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("photo", selectedFile);
  
      try {
        const token = localStorage.getItem("token");
        await axios.patch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/profile/picture`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Set the content type for the file upload
            },
          }
        );
      } catch (error) {
        console.error("Error updating profile picture:", error);
        // Display error message from backend using Swal2
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.messages || "Error updating profile picture. Please try again later.",
          confirmButtonText: "OK",
        });
        console.log( error.response?.data?.messages );
        return; // Stop further execution if there's an error
      }
    }
  
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Display success message
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully!",
        confirmButtonText: "OK",
      }).then(() => {
        router.replace("/profile");
        // Perform any additional actions after the profile update
      });
 
} catch (error) {
  console.error("Error updating profile:", error);
  const messages = error?.response?.data?.messages;
  const errorFields = ["job_title", "description", "company", "domicile", "email", "fullname"];
  let errorMessage = "Error updating profile. Please try again later.";

  for (const field of errorFields) {
    if (messages[field]?.message) {
      errorMessage = messages[field].message;
      break;
    }
  }

  Swal.fire({
    icon: "error",
    title: "Error",
    text: errorMessage,
    confirmButtonText: "OK",
  });
}
  };

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleGoBack = () => {
    Swal.fire({
      icon: "warning",
      title: "Apakah anda yakin?",
      text: "Perubahan Anda tidak akan disimpan.",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        router.back();
      }
    });
  };

  // thhis skill

  const handleSkillChange = (e) => {
    const { value } = e.target;
    setSkills(value.split(",")); // Split the input value by comma and update the skills array
  };

  React.useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,

        {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        }
      )
      .then((response) => setProfileSkills(response?.data?.data?.skills));
  }, []);

  const handleSkillSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if the skill already exists in the profileSkills array
      if (skills.some((skill) => profileSkills.includes(skill))) {
        Swal.fire({
          title: "Skill Sudah Ada",
          text: "Tambahkan Skill Lainnya",
          icon: "error",
        });
        return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/skills`,
        { skills },
        {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        }
      );

      console.log(skills);

      setProfileSkills([...profileSkills, ...skills]);

      setSkills([]); // Clear the input by resetting the skills state to an empty array
      document.getElementById("skills").value = "";
    } catch (error) {
      let errorMessage = "Something went wrong in our app";

      if (error?.response?.data?.messages?.skills?.message) {
        errorMessage = error.response.data.messages.skills.message;
      }

      console.log(error);
    }
  };

  const handleSkillDelete = async (index) => {
    try {
      const updatedSkills = [...profileSkills];
      updatedSkills.splice(index, 1); // Remove the skill at the specified index

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/skills/${index}`,
        {
          data: { skills: [profileSkills[index]] },
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        }
      );

      console.log(response?.data?.data?.skills);

      setProfileSkills(updatedSkills);
    } catch (error) {
      let errorMessage = "Something went wrong in our app";

      if (error?.response?.data?.messages?.skills?.message) {
        errorMessage = error.response?.data?.messages?.skills?.message;
      }

      console.log(error);
    }
  };

  async function handleDeleteExperience(id) {
    try {
      const confirmation = await Swal.fire({
        title: "Hapus Pengalaman",
        text: "Apakah Anda yakin ingin menghapus pengalaman ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (confirmation.isConfirmed) {
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/job/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        });

        console.log("Experience deleted successfully");
        Swal.fire("Berhasil", "Pengalaman berhasil dihapus", "success");
        const updatedJobHistory = profile.job_history.filter(
          (item) => item.id !== id
        );
        setProfile({ ...profile, job_history: updatedJobHistory });
        console.log(updatedJobHistory);
      } else {
        console.log("Penghapusan dibatalkan");
        Swal.fire("Dibatalkan", "Penghapusan pengalaman dibatalkan", "info");
      }
    } catch (error) {
      // Handle error, if any
      console.error("Error deleting experience:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat menghapus pengalaman",
        "error"
      );
    }
  }

  const handleSubmitExperience = async (event) => {
    event.preventDefault();

    const formattedDate = format(selectedDate, "MM-yyyy");

    if (!selectedImage) {
      console.error("Please select an image.");
      return;
    }

    // Show loading alert
    const loadingAlert = Swal.fire({
      title: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const formData = new FormData();
    formData.append("company", event.target.inputCompanyName.value);
    formData.append("date", formattedDate);
    formData.append("description", event.target.inputJobPlace.value);
    formData.append("position", event.target.inputPosition.value);
    formData.append("photo", selectedImage);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/job`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      loadingAlert.close(); // Close the loading alert

      // Show success message to the user
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your experience has been submitted!",
      });

      console.log("Success:", response.data);
      const responseData = response.data.data;
      const latestId = responseData
        .map((data) => data.id)
        .reduce((acc, currentId) => (acc, currentId));

      const newJobExperience = {
        id: latestId,
        company: event.target.inputCompanyName.value,
        date: formattedDate,
        description: event.target.inputJobPlace.value,
        position: event.target.inputPosition.value,
        logo: selectedImage,
      };
      console.log(selectedImage);
      // Update the job_history with the new job experience
      setProfile((prevProfile) => ({
        ...prevProfile,
        job_history: [...prevProfile.job_history, newJobExperience],
      }));
    } catch (error) {
      loadingAlert.close(); // Close the loading alert

      // Show error message to the user
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data : error.message,
      });

      console.log("Error:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(file);
      console.log(file.name);
    }
  };

  const editLabelStyle = {
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    padding: "20px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  };

  return (
    <div id="Edit-page">
      <NavbarTwo />
      <div className="container mt-5 mb-5" style={{ paddingTop: "80px" }}>
        <div className="row">
          <div className="col-12 col-md-3 mb-3">
            <div
              className="card"
              style={{ boxShadow: "0 0 10px 3px rgba(100, 100, 100, 0.7)" }}
            >
              <img
                src={profile.photo}
                className="rounded-circle object-fit-cover mx-auto d-block mt-3"
                width={`100`}
                height={`100`}
                alt="card"
              />
              <label
                htmlFor="photoInput"
                className="photo-input-label"
                style={editLabelStyle}
              >
                <input
                  id="photoInput"
                  type="file"
                  accept="image/*"
                  className="form-control photo-input"
                  onChange={handleFileChange}
                />
              </label>

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
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  className="btn btn-primary mt-2 mb-2 w-100"
                  onClick={handleFormSubmit}
                >
                  Simpan
                </button>
                <button
                  className="btn btn-outline-primary mt-0 mb-2 w-100"
                  onClick={handleGoBack}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-9">
            <div
              className="card"
              style={{ boxShadow: "0 0 10px 3px rgba(100, 100, 100, 0.7)" }}
            >
              <div className="card-body">
                <h4>Data diri</h4>
                <hr />
                <form onSubmit={handleFormSubmit}>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputName" className="form-label">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      name="fullname"
                      value={profile.fullname}
                      onChange={handleInputChange}
                      placeholder="Masukan nama lengkap"
                    />
                  </div>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputJob" className="form-label">
                      Job Desk
                    </label>
                    <input
                      type="job-desk"
                      className="form-control"
                      id="inputJob"
                      name="job_title"
                      value={profile.job_title}
                      onChange={handleInputChange}
                      placeholder="Masukan job desk"
                    />
                  </div>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputDomisili" className="form-label">
                      Domisili
                    </label>
                    <input
                      type="domisili"
                      className="form-control"
                      id="inputDomisili"
                      name="domicile"
                      value={profile.domicile}
                      onChange={handleInputChange}
                      placeholder="Masukan domisili"
                    />
                  </div>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputJodPlace" className="form-label">
                      Tempat kerja
                    </label>
                    <input
                      type="job-place"
                      className="form-control"
                      id="inputJobPlace"
                      name="company"
                      value={profile.company}
                      onChange={handleInputChange}
                      placeholder="Masukan tempat kerja"
                    />
                  </div>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputJodPlace" className="form-label">
                      Deskripsi Singkat
                    </label>
                    <textarea
                      type="text-area"
                      className="form-control"
                      id="inputJobPlace"
                      name="description"
                      value={profile.description}
                      onChange={handleInputChange}
                      placeholder="Tuliskan deskripsi singkat"
                      style={{ height: `15vh` }}
                    />
                  </div>
                </form>
              </div>
            </div>

            <div
              className="card mt-3"
              style={{ boxShadow: "0 0 10px 3px rgba(100, 100, 100, 0.7)" }}
            >
              <div className="card-body">
                <h4>Skill</h4>
                <hr />
                <form onSubmit={handleSkillSubmit}>
                  <div className="d-flex">
                    <div className="col-8 m-3 mt-2 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="skills"
                        placeholder="Masukan skills, contoh: html, PHP, java"
                        onChange={handleSkillChange}
                      />
                      <div className="d-inline">
                        {profileSkills?.map((item, index) => (
                          <span
                            key={index}
                            className="badge bg-warning m-1 p-2"
                          >
                            {item}
                            <button
                              onClick={() => handleSkillDelete(index)}
                              className="ml-2 ms-2 bg-warning"
                              style={{ color: "red", borderColor: "#FBB017" }}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-2">
                      <button type="submit" className="btn btn-warning mt-2 ">
                        Simpan
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div
              className="card mt-3 "
              style={{ boxShadow: "0 0 10px 3px rgba(100, 100, 100, 0.7)" }}
            >
              <div className="card-body">
                <h4>Pengalaman Kerja</h4>
                <hr />
                <form onSubmit={handleSubmitExperience}>
                  <div className="m-5 mt-2 mb-3">
                    <label className="form-label">Posisi</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPosition"
                      aria-describedby="position"
                    />
                  </div>
                  <div className="d-flex">
  <div className="col-6 ms-5 mt-2 mb-3">
    <label className="form-label">Nama Perusahaan</label>
    <input
      type="text"
      className="form-control"
      id="inputCompanyName"
      aria-describedby="position"
    />
  </div>
  <div className="col-4 m-2 mt-2 mb-3">
    <label className="form-label">Bulan/Tahun</label>
    <div className="col-5 col-md-5">
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="MMMM yyyy"
      locale={id}
      className="form-control"
      id="inputMonthYear"
      showMonthYearPicker
      aria-describedby="position"
    />
    </div>
  </div>
</div>


                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputJodPlace" className="form-label">
                      Deskripsi Singkat
                    </label>
                    <textarea
                      type="text-area"
                      className="form-control"
                      id="inputJobPlace"
                      placeholder="Tuliskan deskripsi singkat"
                      style={{ height: `15vh` }}
                    />
                  </div>
                  <div className="m-5 mt-2 mb-3">
                    <label htmlFor="inputLogo" className="form-label">
                      Logo Perusahaan
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="col-12">
                    <hr className="mb-5 mt-5" />
                    <button
                      type="submit"
                      className="btn btn-outline-warning "
                      style={{ width: `100%` }}
                    >
                      Tambah Pengalaman Kerja
                    </button>
                  </div>
                </form>
                <div className="row">
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
                        showDelete={true}
                        onDelete={handleDeleteExperience}
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
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default requireAuth(Edit);
