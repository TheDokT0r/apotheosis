import { useEffect } from "react";
import { useCharacter } from "@/stores/characterStore";
import axios from "axios";
import { BACKEND_URL } from "@/helper/consts";
import { getAllCharacterData } from "@/helper/character";
import { useNavigate } from "react-router-dom";

export default function DataFetcher() {
    const { setCharacterData } = useCharacter();
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetch = async () => {
        const token = localStorage.getItem("token");
        const response = await axios
          .get(`${BACKEND_URL}/usr/check-login`, {
            headers: { Authorization: `Bearer ${token}` },
          })
  
        if (!response || response.status !== 200) {
          navigate('/login');
          return;
        }
  
        const newCharData = await getAllCharacterData();
        if (!newCharData) {
            navigate('/login');
            return;
        }
  
        setCharacterData(newCharData);
      };
      fetch();
    }, [navigate, setCharacterData]);

  return null;
}
