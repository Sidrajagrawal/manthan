import axios from "axios";

const BASE_API = 'http://localhost:8080/api/output';

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

//from here i get the response now display the result in frontend 
//data->result