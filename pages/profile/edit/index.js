import React from "react";
import NavbarTwo from "@/components/navbarTwo";
import Footer from "@/components/footer";
import requireAuth from "@/middlewares/requireAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function Edit() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  console.log(setSelectedFile);

  const [profile, setProfile] = useState({
    fullname: "",
    jobDesk: "",
    domicile: "",
    jobPlace: "",
    shortDescription: "",
  });

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
      }
    }

    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

const [skillInput, setSkillInput] = useState('');

const handleSkillInputChange = (e) => {
  setSkillInput(e.target.value);
};

const addSkill = () => {
  if (skillInput.trim() !== '') {
    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: [...prevProfile.skills, skillInput.trim()]
    }));
    setSkillInput('');
  }
};




  return (
    <div id="Edit-page">
      <NavbarTwo />
      <div className="container mt-5 mb-5" style={{ paddingTop: "80px" }}>
        <div className="row">
          <div className="col-3">
            <div className="card">
              <img
                src={profile.photo}
                className="rounded-circle  object-fit-cover mx-auto d-block mt-3"
                width={`100`}
                height={`100`}
                alt="card"
              />
              <label htmlFor="photoInput" className="photo-input-label">
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
                  {" "}
                  {profile?.fullname
                    ?.toLowerCase()
                    .replace(/(?<= )[^\s]|^./g, (a) => a.toUpperCase())}
                </h5>
                <p className="card-text">
                  {" "}
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
                    {" "}
                    {profile?.domicile
                      ?.toLowerCase()
                      .replace(/(?<= )[^\s]|^./g, (a) => a.toUpperCase())}
                  </p>
                </div>

                <p className="text-muted mb-2">
                  {" "}
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

          <div className="col-9">
            <div className="card">
              <div className="card-body">
                <h4>Data diri</h4>
                <hr />
                <form onSubmit={handleFormSubmit}>
                  <div class="m-5 mt-2 mb-3">
                    <label for="inputName" class="form-label">
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
                  <div class="m-5 mt-2 mb-3">
                    <label for="inputJob" class="form-label">
                      Job Desk
                    </label>
                    <input
                      type="job-desk"
                      class="form-control"
                      id="inputJob"
                      name="job_title"
                      value={profile.job_title}
                      onChange={handleInputChange}
                      placeholder="Masukan job desk"
                    />
                  </div>
                  <div class="m-5 mt-2 mb-3">
                    <label for="inputDomisili" class="form-label">
                      Domisili
                    </label>
                    <input
                      type="domisili"
                      class="form-control"
                      id="inputDomisili"
                      name="domicile"
                      value={profile.domicile}
                      onChange={handleInputChange}
                      placeholder="Masukan domisili"
                    />
                  </div>
                  <div class="m-5 mt-2 mb-3">
                    <label for="inputJodPlace" class="form-label">
                      Tempat kerja
                    </label>
                    <input
                      type="job-place"
                      class="form-control"
                      id="inputJobPlace"
                      name="company"
                      value={profile.company}
                      onChange={handleInputChange}
                      placeholder="Masukan tempat kerja"
                    />
                  </div>

                  <div class="m-5 mt-2 mb-3">
                    <label for="inputJodPlace" class="form-label">
                      Deskripsi Singkat
                    </label>
                    <textarea
                      type="text-area"
                      class="form-control"
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

        
<div className="card mt-3">
  <div className="card-body">
    <h4>Skill</h4>
    <hr />
    <div className="d-flex">
      <div className="col-8 m-5 mt-2 mb-3">
        <input
          type="text"
          className="form-control"
          id="skills"
          aria-describedby="skills"
          placeholder="Masukan skills"
          value={skillInput}
          onChange={handleSkillInputChange}
        />
        <div className="d-inline">
          {profile?.skills?.map((item, key) => (
            <span key={key} className="badge bg-warning m-1 p-2">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="col-2">
        <button className="btn btn-warning mt-2 mb-2 w-100" onClick={addSkill}>
          Simpan
        </button>
      </div>
    </div>
  </div>
</div>

            <div className="card mt-3">
              <div className="card-body">
                <h4>Pengalaman Kerja</h4>
                <hr />
                <form>
                  <div class="m-5 mt-2 mb-3">
                    <label for="inputPosition" class="form-label">
                      Posisi
                    </label>
                    <input
                      type="position"
                      class="form-control"
                      id="inputPosition"
                      aria-describedby="position"
                      placeholder="Web Developer"
                    />
                  </div>
                  <div className="d-flex">
                    <div class="col-5 ms-5 me-2 mt-2 mb-3">
                      <label for="inputPosition" class="form-label">
                        Nama Perusahaan
                      </label>
                      <input
                        type="position"
                        class="form-control"
                        id="inputPosition"
                        aria-describedby="position"
                        placeholder="Web Developer"
                      />
                    </div>
                    <div class="col-5 m-5 mt-2 mb-3">
                      <label for="inputPosition" class="form-label">
                        Bulan/Tahun
                      </label>
                      <input
                        type="position"
                        class="form-control"
                        id="inputPosition"
                        aria-describedby="position"
                        placeholder="Web Developer"
                      />
                    </div>
                  </div>
                  <div class="m-5 mt-2 mb-3">
                    <label for="inputJodPlace" class="form-label">
                      Deskripsi Singkat
                    </label>
                    <textarea
                      type="text-area"
                      class="form-control"
                      id="inputJobPlace"
                      placeholder="Tuliskan deskripsi singkat"
                      style={{ height: `15vh` }}
                    />
                    <hr className="mb-5 mt-5" />
                  </div>
                </form>
                <div className="row">
                  <div className="col-10">
                    <button
                      type="button"
                      class="btn btn-outline-warning ms-5"
                      style={{ width: `108%` }}
                    >
                      Tambah Pengalaman Kerja
                    </button>
                  </div>
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
