import { useRef, useState } from "react";
import PropTypes from 'prop-types';

import { IoPlayCircleOutline } from "react-icons/io5";

const CustomVideo = ({videoSrc, videoDimension, videoButton}) => {
    const [videoState, setVideoState] = useState(false)
    const videoRef = useRef();

    const handlePlay = () => {
        videoRef.current.play();
        setVideoState(true)
    };
    const handleEnded = () => {
        setVideoState(false)
    }

    return (
        <>
            <div className="relative">
                <video muted ref={videoRef} onEnded={handleEnded} className={`absolute ${videoDimension} object-cover -z-30 `} >
                    <source src={videoSrc} />
                </video>
                <div className={` text-white ${videoButton}`}>      {/* flex items-center justify-center text-6xl */}
                {/* To adjust video BELOW*/}
                {/* <div className={`opacity-40 bg-slate-700 text-white ${dimension} flex items-center justify-center ${buttonSize}`}>*/}   
                {!videoState &&
                        <button onClick={handlePlay}>
                            <IoPlayCircleOutline />
                        </button>
                }
                </div>
            </div>
        </>
    );
};

CustomVideo.propTypes = {
    videoSrc: PropTypes.string.isRequired,
    videoDimension: PropTypes.string,
    videoButton: PropTypes.string
};

export default CustomVideo;



{/* <CustomVideo videoDimension={"h-[100vh] w-[98.9vw] bg-[#a8abac]"} videoButton={"flex items-end pb-10 justify-center text-9xl h-[100vh] w-[98.9vw] "}
            videoSrc={"https://download-video.akamaized.net/v3-1/playback/2eedaa5a-0304-459b-91ee-44226882912b/456ba3e7-db73988f?__token__=st=1714939532~exp=1714953932~acl=%2Fv3-1%2Fplayback%2F2eedaa5a-0304-459b-91ee-44226882912b%2F456ba3e7-db73988f%2A~hmac=f341c6aeaca79871154f384f1a6786508f3cbec217d61caeb2deca7208ce8553&r=dXMtZWFzdDE%3D"} /> */}


{/* <CustomVideo videoDimension={"h-[400px] w-[500px]"} videoButton={"flex items-center justify-center text-6xl"} 
    videoSrc={"https://download-video.akamaized.net/v3-1/playback/05a6ff4f-74e7-4a83-8703-bc02346881bf/3fb4ac23-c9f4a737?__token__=st=1714938279~exp=1714952679~acl=%2Fv3-1%2Fplayback%2F05a6ff4f-74e7-4a83-8703-bc02346881bf%2F3fb4ac23-c9f4a737%2A~hmac=23090415c8f9197eac83805876d0ee21b416686a5c4bab4331a754f962af6d33&r=dXMtd2VzdDE%3D"} /> */}