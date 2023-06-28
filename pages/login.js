import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useRouter } from 'next/router';
import { loginSuccess } from '@/store/actions';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        { email: email,
          password: password }
      );

      Swal.fire({
        title: 'Login Success',
        text: 'Login Success, Redirecting In App',
        icon: 'success',
      }).then(() => {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('token', response?.data?.token);

        // Dispatch the login success action
        dispatch(loginSuccess(response.data.token));

        router.replace('/');
      });
    } catch (error) {
      let errorMessage = 'Something went wrong in our app';

      if (error?.response?.data?.messages) {
        errorMessage = error.response.data.messages;
      }

      Swal.fire({
        title: 'Login Failed',
        text: errorMessage,
        icon: 'error',
      });
      console.log(error);
    }
  };
    
    return (
      <div id="login-page">

    <main className="container">
      <div className="row align-items-center mt-3">
        <div className="col col-md-6">
          <div style={{ position: "relative" }}>
            <div
              className=" content-to-center hide-style"
              style={{
                height: "95vh",
                width: "100%",
                position: "absolute",
                top: 0,
                opacity: 0.8,
                padding: "20px",
                backgroundColor: "#5e50a1",
              }}
            >
              <h1 className="text-white">
                Temukan developer berbakat & terbaik di berbagai bidang keahlian
              </h1>
            </div>
          </div>

          <img src="/auth.png" width="100%" style={{ height: "95vh" }} className="object-fit-cover" />
        </div>
        <div className="col-md-6 p-4">
          <h2>Halo, Peworld</h2>
          <p>
      Silahkan login menggunakan akun yang telah terdaftar!
          </p>

          <form onSubmit={handleSubmit} >
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control form-control-lg"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Masukan alamat email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class="mb-5">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control form-control-lg"
                id="exampleInputPassword1"
                placeholder="Masukan kata sandi"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid mb-4">
              <button type="submit" class="btn btn-warning btn-lg mb-4">
                Masuk
              </button>
            </div>

            {/* <div className="d-grid ">
              <button type="submit" class="btn btn-primary btn-lg">
                Counter : {state.counterSlice.value}
              </button>
            </div> */}

            <p className="text-center mt-3">
              Anda belum punya akun?{" "}
              <Link
                href="/register"
                className="text-decoration-none text-warning"
              >
                Daftar disini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>

    </div>
  );
}

export async function getServerSideProps() {


  return{
    props: {

    },
  };
}


export default Login;
