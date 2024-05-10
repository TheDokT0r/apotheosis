import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/helper/firebase";
import { useNavigate } from "react-router-dom";
import LoadingPage from "@/components/LoadingPage/LoadingPage";

export default function Home() {
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const auth = getAuth(firebaseApp);
    if (!auth.currentUser) {
        navigate('/login');
    }

    setLoading(false);
  }, [navigate]);

  if(loading) return <LoadingPage />

  return (
    <div>
        <h1>Temp for Home page</h1>
    </div>
  );
}
