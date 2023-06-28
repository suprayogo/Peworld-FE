import Link from "next/link";
import React, { useState, useEffect } from "react";






function Index() {

  const [access, setAccess] = useState(false);

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



  return (<>
  

            <div>
              {access ? (
                <div>
                <Link href="/"    className="text-black fw-medium text-decoration-none"
                style={{marginRight: "620px"}} >
                 
                
                  Home
                </Link>
            
                <Link href="/profile" >
                  <button
                   className="btn btn-primary me-3"
                
                  >Profile</button>
                </Link>
            
            <Link href="#" >
                  <button
                   className="btn btn-primary"
                  onClick={handleLogout}
                  >Keluar</button>
                </Link>

                </div>
              ) : (
                <>
                  <Link href="/login">
                    <button
                      className="btn btn-outline-primary"
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
       




</>)
}

export default Index
