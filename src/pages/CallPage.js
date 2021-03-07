import React from "react";
// eslint-disable-next-line
import {ClassNameMap} from '@material-ui/core/styles/withStyles';
import Avatar from "@material-ui/core/Avatar";
import CallEndOutlinedIcon from '@material-ui/icons/CallEndOutlined';
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@material-ui/icons/VolumeOffOutlined';
import {useStyles} from "./Styles";

/** @type {boolean} */
let isRemoteMuted = false

/**
 * Toggles audio of the remote user.
 *
 * @return {void}
 */
const muteRemote = () => {
    if (document.getElementById('remote-video').muted) {
        document.getElementById('remote-video').muted = false
        isRemoteMuted = false
    } else {
        document.getElementById('remote-video').muted = true
        isRemoteMuted = true
    }
}

/**
 * Call Page functional component.
 * Displays the video streams in frames.
 * When you log in, it displays your own video stream.
 * It displays the video streams of both the users when a call is active.
 * It also displays the option buttons when a call is active.
 *
 * @param {boolean} isLoggedIn
 * @param {string} username
 * @param {function(React.RefObject<HTMLVideoElement>): void} setLocalVideoRef
 * @param {string} connectedUser
 * @param {function(React.RefObject<HTMLVideoElement>): void} setRemoteVideoRef
 * @param {function(): void} onEndCallClicked
 *
 * @return {JSX.Element}
 *
 * @constructor
 */
function CallPage({isLoggedIn, username, setLocalVideoRef, connectedUser, setRemoteVideoRef, onEndCallClicked}) {
    /** @type {ClassNameMap<"button" | "paper" | "form" | "avatar" | "avatar_end_call" | "avatar_mute_remote">} */
    const classes = useStyles();
    /** @type {string} */
    let yourUsernameLabel = connectedUser ? 'You' : username

    return (
        <div className="call-page">
            {/*Hide the video tag until user has logged in*/}
            <div className={isLoggedIn ? 'videos active' : 'videos'}>
                {/*Displays your video stream*/}
                <div id="local-video-frame" className="div-video-frames">
                    <video ref={setLocalVideoRef} autoPlay playsInline muted="muted" id="local-video"
                           className={isLoggedIn ? (connectedUser ? 'connected-video' : 'logged-in-local-video') : null}/>
                    <label
                        className={connectedUser ? "name-labels connected-labels" : "name-labels not-connected-labels"}
                        id="your-username-label">{yourUsernameLabel}</label>
                </div>
                {/*Displays the other person's video stream*/}
                <div id="remote-video-frame" className="div-video-frames">
                    <video ref={setRemoteVideoRef} autoPlay playsInline id="remote-video"
                           className={isLoggedIn ? (connectedUser ? 'connected-video' : 'logged-in-remote-video') : null}/>
                    <label className="name-labels connected-labels" id="remote-username-label">{connectedUser}</label>
                </div>
            </div>
            {/*Creates the Option buttons if a call is active*/}
            {connectedUser && <div className="options">
                <Avatar
                    className={classes.avatar_end_call}
                    onClick={onEndCallClicked}
                    id="end-call-btn"
                >
                    <CallEndOutlinedIcon/>
                </Avatar>
                <Avatar
                    className={isRemoteMuted ? classes.avatar_end_call : classes.avatar_mute_remote}
                    onClick={muteRemote}
                >
                    {/*TODO: Fix icon not changing*/}
                    {isRemoteMuted ? <VolumeOffOutlinedIcon/> : <VolumeUpOutlinedIcon/>}
                </Avatar>
            </div>}
        </div>
    )
}

export default CallPage
