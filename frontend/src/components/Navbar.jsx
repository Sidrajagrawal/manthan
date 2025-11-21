import { useNavigate } from "react-router-dom";
function Navbar(){
    const navigate = useNavigate();
    return(
        <div className="w-[100vw] h-[9vh] bg-black">
            <div className="left text-white text-2xl w-[50%] h-full flex flex-col justify-center px-20 cursor-pointer" onClick={()=>navigate('/')}>UltraVision</div>
            <div className="right"></div>
        </div>
    );
}
export default Navbar;