import React, {useState} from "react"
// eslint-disable-next-line
import {ClassNameMap} from '@material-ui/core/styles/withStyles'
import Avatar from "@material-ui/core/Avatar"
import CallEndOutlinedIcon from '@material-ui/icons/CallEndOutlined'
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined'
import VolumeOffOutlinedIcon from '@material-ui/icons/VolumeOffOutlined'
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined'
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined'
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined'
import VideocamOffOutlinedIcon from '@material-ui/icons/VideocamOffOutlined'
import {useStyles} from "./Styles"

/** @type {boolean} */
let isRemoteMuted = false
/** @type {boolean} */
let isSelfMuted = false
/** @type {boolean} */
let isSelfCameraDisabled = false

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
 * Toggles microphone of the current user.
 *
 * @param {MediaStream} localStream
 *
 * @return {void}
 */
const muteSelf = (localStream) => {
    /** @type {MediaStreamTrack} */
    const audioLocalStream = localStream.getTracks()[0]
    if (isSelfMuted) {
        audioLocalStream.enabled = true
        isSelfMuted = false
    } else {
        audioLocalStream.enabled = false
        isSelfMuted = true
    }
}

/**
 * Toggles camera of the current user.
 *
 * @param {MediaStream} localStream
 *
 * @return {void}
 */
const disableCameraSelf = (localStream) => {
    /** @type {MediaStreamTrack} */
    const videoLocalStream = localStream.getTracks()[1]
    if (isSelfCameraDisabled) {
        videoLocalStream.enabled = true
        isSelfCameraDisabled = false
    } else {
        videoLocalStream.enabled = false
        isSelfCameraDisabled = true
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
 * @param {function(): Promise<void>} onEndCallClicked
 * @param {MediaStream} localStream
 *
 * @return {JSX.Element}
 *
 * @constructor
 */
function CallPage({
                      isLoggedIn,
                      username,
                      setLocalVideoRef,
                      connectedUser,
                      setRemoteVideoRef,
                      onEndCallClicked,
                      localStream
                  }) {
    /** @type {ClassNameMap<"button" | "avatar_enabled" | "paper" | "form" | "avatar_disabled" | "avatar" | "avatar_end_call">} */
    const classes = useStyles()
    /** @type {[JSX.Element, Dispatch<SetStateAction<JSX.Element>>]} */
    const [speakerIcon, setSpeakerIcon] = useState(<VolumeUpOutlinedIcon/>)
    /** @type {[JSX.Element, Dispatch<SetStateAction<JSX.Element>>]} */
    const [micIcon, setMicIcon] = useState(<MicNoneOutlinedIcon/>)
    /** @type {[JSX.Element, Dispatch<SetStateAction<JSX.Element>>]} */
    const [cameraIcon, setCameraIcon] = useState(<VideocamOutlinedIcon/>)

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
                        id="your-username-label">{connectedUser ? username + ' (You)' : username}</label>
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
                    className={isRemoteMuted ? classes.avatar_disabled : classes.avatar_enabled}
                    onClick={() => {
                        muteRemote()
                        isRemoteMuted ? setSpeakerIcon(<VolumeOffOutlinedIcon/>) : setSpeakerIcon(
                            <VolumeUpOutlinedIcon/>)
                    }
                    }
                >
                    {speakerIcon}
                </Avatar>
                <Avatar
                    className={isSelfMuted ? classes.avatar_disabled : classes.avatar_enabled}
                    onClick={() => {
                        muteSelf(localStream)
                        isSelfMuted ? setMicIcon(<MicOffOutlinedIcon/>) : setMicIcon(<MicNoneOutlinedIcon/>)
                    }}>
                    {micIcon}
                </Avatar>
                <Avatar
                    className={isSelfCameraDisabled ? classes.avatar_disabled : classes.avatar_enabled}
                    onClick={() => {
                        disableCameraSelf(localStream)
                        isSelfCameraDisabled ? setCameraIcon(<VideocamOffOutlinedIcon/>) : setCameraIcon(
                            <VideocamOutlinedIcon/>)
                    }}>
                    {cameraIcon}
                </Avatar>
            </div>}
        </div>
    )
}

export default CallPage
