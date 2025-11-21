import axios from "axios";

const BASE_API = 'https://manthanbackend.vercel.app/api';


export const Unchangeable = async (imageUrl, imageName) => {
    try {
        const payload = { imageUrl };
        if (imageName) payload.imageName = imageName;

        const res = await axios.post(`${BASE_API}/unchangeable`, payload);
        console.log(res);
        
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

 