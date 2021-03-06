import React from "react";


function CallPage({isLoggedIn, username, setLocalVideoRef, connectedUser, setRemoteVideoRef}) {

    return (
        // Hide the video tag until user has logged in
        <div className={isLoggedIn ? 'videos active' : 'videos'}>
            {/*Displays your video stream*/}
            <div>
                <label>{username}</label>
                <video ref={setLocalVideoRef} autoPlay playsInline muted="muted"/>
            </div>
            {/*Displays the other person's video stream*/}
            <div>
                <label>{connectedUser}</label>
                <video ref={setRemoteVideoRef} autoPlay playsInline/>
            </div>
        </div>
    )
}

export default CallPage
