import './Home.css'
import ShelfImg from '../images/shelf_img.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Camera from './Camera';
import Upload from './Upload';
import { Unchangeable } from './CallApi';

function Home() {
    const navigate = useNavigate();
    const [toggleCamera, setToggleCamera] = useState(false);
    const [toggleUpload, setToggleUpload] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [apiResult, setApiResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUploaded = async (images) => {
        setUploadedImages(images);
        setApiResult(null);
        setLoading(true);

        // start API call
        const apiPromise = Unchangeable(images[0].data_url, images[0].name)
            .then(res => ({ ok: true, res }))
            .catch(err => ({ ok: false, err }));

        // random delay between 2000ms and 8000ms
        const delayMs = Math.floor(Math.random() * 6000) + 2000;
        await new Promise(r => setTimeout(r, delayMs));

        // wait for apiPromise to finish (it may have finished already)
        const apiResultObj = await apiPromise;
        if (apiResultObj && apiResultObj.ok) {
            console.log("Uploaded Response:", apiResultObj.res);
            setApiResult(apiResultObj.res);
        } else {
            console.log("Uploaded Failed:", apiResultObj && apiResultObj.err);
            setApiResult({ error: true, msg: 'Upload failed' });
        }

        setLoading(false);
        setToggleUpload(false);
    };

    return (
        <div className="Home w-[100vw] h-[91vh]">
            <div className='landing w-full h-full flex'>
                <div className="left w-[50%] h-full flex flex-col justify-center">
                    <div className='text-white text-center text-4xl'>
                        Computer Vision for Retail Shelf Monitoring:
                    </div>
                    <div className='text-white text-center text-4xl'>
                        Optimizing On-Shelf Availability
                    </div>

                    <div className='btn flex justify-around mt-20'>
                        <button
                            className='text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hero-btn-1'
                            onClick={() => setToggleCamera(true)}
                        >
                            Open Camera
                        </button>

                        <button
                            onClick={() => setToggleUpload(true)}
                            className='text-green-600 border-2 border-green-600 hover:bg-green-600 hover:text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hero-btn-1'
                        >
                            Upload Image
                        </button>
                    </div>
                </div>

                <div className="right w-[50%] h-full flex flex-col justify-center items-center">
                    {toggleCamera ? (
                        <div>
                            <Camera />

                            <div className="text-center mt-5">
                                <button
                                    className="text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hero-btn-1"
                                    onClick={() => setToggleCamera(false)}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {uploadedImages.length > 0 ? (
                                <div>
                                    <img
                                        src={uploadedImages[0].data_url}
                                        alt="Uploaded preview"
                                        width={500}
                                        height={500}
                                        className='rounded-2xl'
                                    />
                                </div>
                            ) : (
                                <img
                                    src={ShelfImg}
                                    alt="Shelf"
                                    className='w-[80%] h-[50%] rounded-4xl'
                                />
                            )}
                        </>
                    )}

                    {toggleUpload && (

                        <Upload
                            autoOpen={true}
                            onClose={() => setToggleUpload(false)}
                            onUploaded={handleUploaded}
                        />

                    )}

                            {loading ? (
                                <div className="mt-6 p-6 bg-black/50 rounded-lg flex flex-col items-center justify-center w-[80%]">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white/80 mb-4" />
                                    <div className="text-white">Analyzing image, please wait...</div>
                                </div>
                            ) : (
                                apiResult && (
                                    <div className="mt-6 p-4 bg-white/10 rounded-lg text-left w-[80%]">
                                        {apiResult.error ? (
                                            <div className="text-red-400">{apiResult.msg}</div>
                                        ) : (
                                            <>
                                                {apiResult.result && <div className="text-xl font-semibold text-white">{apiResult.result}</div>}
                                                
                                            </>
                                        )}
                                    </div>
                                )
                            )}
                </div>
            </div>
        </div>
    );
}

export default Home;



//other thing working properly Also add a loading spinner of 2-8 second random then show the result 