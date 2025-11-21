import React, { useEffect } from "react";
import Webcam from "react-webcam";
// import { useRef, useState } from "react";

function Camera() {
    // const webcamRef = useRef(null);
    // const [imgSrc, setImgSrc] = useState(null);

    // const capture = useCallback(() => {
    //     const imageSrc = webcamRef.current.getScreenshot();
    //     setImgSrc(imageSrc);
    //     console.log(imageSrc);
    // }, [webcamRef]);

    return (
        <div>
            <div className="container">
                <Webcam height={550} width={550} className="rounded-4xl" />

            </div>
        </div>
    );
}
export default Camera;



//https://blog.logrocket.com/using-react-webcam-capture-display-images/