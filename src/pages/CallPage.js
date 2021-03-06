import React from "react";

/**
 * Call Page functional component.
 * Displays the video streams in frames.
 * When you log in, it displays your own video stream.
 * It displays the video streams of both the users when a call is active.
 *
 * @param {boolean} isLoggedIn
 * @param {string} username
 * @param {function(React.RefObject<HTMLVideoElement>): void} setLocalVideoRef
 * @param {string} connectedUser
 * @param {function(React.RefObject<HTMLVideoElement>): void} setRemoteVideoRef
 *
 * @return {JSX.Element}
 *
 * @constructor
 */
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
