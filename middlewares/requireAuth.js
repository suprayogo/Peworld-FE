import { useRouter } from "next/router";
import { useEffect } from "react";

const requireAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const isLoggedIn = localStorage.getItem("token");
      if (!isLoggedIn) {
        router.replace("/login");
      }
      
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default requireAuth;
