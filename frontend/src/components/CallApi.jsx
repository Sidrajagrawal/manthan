import axios from "axios";

// Read backend base URL from Vite env var. Set VITE_API_BASE in the deployment environment.
// Example value: https://manthanbackend-j3g6vcsvk-sidrajagrawals-projects.vercel.app
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';
const BASE_API = `${API_BASE.replace(/\/+$/,'')}/api/output`;
// const BASE_API = 'http://localhost:8080/api/output';

export const Unchangeable = async (imageUrl, imageName) => {
    try {
        const payload = { imageUrl };
        if (imageName) payload.imageName = imageName;
        console.log("imageName");
        
        const res = await axios.post(`${BASE_API}/unchangeable`, payload);
        console.log(res);
        
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

 