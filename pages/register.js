import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("undefined");
  const [job_title, setJob_title] = useState("undefined");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      // Password and confirmPassword do not match
      Swal.fire({
        title: "Register Failed",
        text: "Password dan Konfirmasi Password tidak cocok",
        icon: "error",
      });
      return;
    }
  
    // Show loading state while waiting for the response
    Swal.fire({
      title: "Registering...",
      text: "Please wait while we process your registration",
      icon: "info",
      allowOutsideClick: false, // Prevents closing the loading state by clicking outside the modal
      showConfirmButton: false, // Hide the 'OK' button in the loading state
      onBeforeOpen: () => {
        Swal.showLoading(); // Show the loading animation
      },
    });
  
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`,
        {
          fullname: fullname,
          email: email,
          phone: phone,
          password: password,
          company: company,
          job_title: job_title,
        }
      );
  
      // Handle success response
      console.log(response);
  
      // Close the loading state and show success message
      Swal.fire({
        title: "Register Success",
        text: "Register Success, Redirecting to Login Page",
        icon: "success",
      }).then(() => {
        router.replace("/login");
      });
    } catch (error) {
      let errorMessage = "Something went wrong in our app";
  
      if (error?.response?.data?.messages) {
        errorMessage = error.response.data.messages;
      }
  
      if (error?.response?.data?.messages) {
        const { password } = error.response.data.messages;
        errorMessage = password?.message || errorMessage;
      }
  
      // Close the loading state and show error message
      Swal.fire({
        title: "Register Failed",
        text: errorMessage,
        icon: "error",
      });
    }
  };

  return (
    <div id="register-page">
    <main className="container">
      <div className="row align-items-center mt-3 d-flex"> {/* Add 'd-flex' class */}
        <div className="col col-md-6">
          <div style={{ position: "relative" }}>
            <div
              className="content-to-center hide-style"
              style={{
                height: "95vh",
                width: "100%",
                position: "absolute",
                top: 0,
                opacity: 0.8,
                padding: "10px",
                backgroundColor: "#5e50a1",
              }}
            >
              <h1 className="text-white">
                Temukan developer berbakat & terbaik di berbagai bidang
                keahlian
              </h1>
            </div>
          </div>
          <img src="/auth.png" width="100%" style={{ height: "95vh" }} />
        </div>
        <div className="col-md-6 p-4">
          <h2>Halo, Peworld</h2>
          <p>Silahkan registrasi akun anda, jika anda tidak memiliki akun!</p>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label" style={{ fontSize: '14px' }}> 
                Nama
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="fullname"
                placeholder="Masukkan nama panjang"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                required
                style={{ fontSize: '14px' }} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label" style={{ fontSize: '14px' }}> 
                Email
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
                id="exampleInputEmail1"
                placeholder="Masukkan alamat email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ fontSize: '14px' }} 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label" style={{ fontSize: '14px' }}> 
                No handphone
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
                id="phone"
                placeholder="Masukkan no handphone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{ fontSize: '14px' }} 
              />
            </div>
            <div>
              <div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label" style={{ fontSize: '14px' }}> 
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control form-control-lg"
                      id="password"
                      placeholder="Masukkan kata sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ fontSize: '14px' }} 
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="mb-5">
                  <label htmlFor="confirmPassword" className="form-label" style={{ fontSize: '14px' }}> 
                    Konfirmasi Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control form-control-lg"
                    id="confirmPassword"
                    placeholder="Konfirmasi kata sandi"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{ fontSize: '14px' }} 
                  />
                </div>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-warning btn-lg mb-4">
                Daftar
              </button>
            </div>
            <p className="text-center mt-3">
              Anda sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-decoration-none text-warning"
              >
                Masuk disini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  </div>
  );
}

export default Register;
