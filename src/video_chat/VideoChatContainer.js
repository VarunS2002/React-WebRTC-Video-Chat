import React from 'react'
import firebase from "firebase/app"
import 'firebase/database'
import 'webrtc-adapter'
import config from "../config"
import VideoChat from './VideoChat'
import {
    addCandidate,
    createOffer,
    initiateConnection,
    initiateLocalStream,
    listenToConnectionEvents,
    sendAnswer, startCall, endCall
} from "../modules/WebRTCModule";
import {doAnswer, doCandidate, doLogin, doOffer} from "../modules/FirebaseModule";

class VideoChatContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            /** @type {firebase.database.Database | undefined} */
            database: undefined,
            /** @type {string} */
            connectedUser: '',
            /** @type {MediaStream | undefined}*/
            localStream: undefined,
            /** @type {RTCPeerConnection | undefined}*/
            localConnection: undefined,
            /** @type {boolean} */
            youDisconnected: false
        }
        /** @type {React.RefObject<HTMLVideoElement>} */
        this.localVideoRef = React.createRef()
        /** @type {React.RefObject<HTMLVideoElement>} */
        this.remoteVideoRef = React.createRef()
    }

    /**
     * Initializes firebase database.
     * It is called when the component is rendered
     *
     * @return {void}
     */
    componentDidMount() {
        firebase.initializeApp(config)
        this.setState({
            database: firebase.database()
        })
    }

    /**
     * Prevent re-render if not necessary
     *
     * @param nextProps
     * @param nextState
     *
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.database !== nextState.database) {
            return false
        } else if (this.state.localStream !== nextState.localStream) {
            return false
        } else if (this.state.localConnection !== nextState.localConnection) {
            return false
        }
        return true
    }

    /**
     * Starts listening to connection events and creates a call offer.
     *
     * @param {string} username
     * @param {string} userToCall
     *
     * @return {Promise<void>}
     */
    startCall = async (username, userToCall) => {
        const {database, localStream, localConnection} = this.state
        // Listen to the events first
        listenToConnectionEvents(localConnection, username, userToCall, database, this.remoteVideoRef, doCandidate)
        // Create an offer
        await createOffer(localConnection, localStream, userToCall, doOffer, database, username).catch((error) => {
            console.log(error + "(startCall)")
        })

    }

    /**
     * Initiates the localStream and localConnection and then calls doLogin.
     *
     * @param {string} username
     *
     * @return {Promise<void>}
     */
    onLogin = async (username) => {
        // Getting local video stream
        /** @type {MediaStream | undefined} */
        const localStream = await initiateLocalStream()
        // Setting constraints for audio and video
        /** @type {MediaStreamTrack | undefined} */
        const audioLocalStream = localStream.getTracks()[0]
        /** @type {MediaStreamTrack | undefined} */
        const videoLocalStream = localStream.getTracks()[1]
        await audioLocalStream.applyConstraints({echoCancellation: true, noiseSuppression: true})
        await videoLocalStream.applyConstraints({frameRate: 60})
        // Setting the Reference
        this.localVideoRef.srcObject = localStream
        // Create the local connection
        /** @type {RTCPeerConnection | undefined} */
        const localConnection = await initiateConnection()

        this.setState({
            localStream: localStream,
            localConnection: localConnection
        })
        // Perform Login
        await doLogin(username, this.state.database, this.handleUpdate)
    }

    /**
     * Setting the <video> reference for the local video stream.
     *
     * @param {React.RefObject<HTMLVideoElement>} ref
     *
     * @return {void}
     */
    setLocalVideoRef = (ref) => {
        this.localVideoRef = ref
    }

    /**
     * Setting the <video> reference for the remote video stream.
     *
     * @param {React.RefObject<HTMLVideoElement>} ref
     *
     * @return {void}
     */
    setRemoteVideoRef = (ref) => {
        this.remoteVideoRef = ref
    }

    /**
     * Determines who disconnected from the call.
     * Returns true if the remote user disconnected without any interference by the local user.
     *
     * @return {boolean}
     */
    hasRemoteDisconnected() {
        return (this.state.localConnection.iceConnectionState === "failed" ||
            this.state.localConnection.iceConnectionState === "disconnected" ||
            this.state.localConnection.iceConnectionState === "closed") && !this.state.youDisconnected;

    }

    /**
     * Handles various situations like answering, making calls or connecting users
     *
     * @param {object | null} remoteUserDetails
     * @param {string} username
     *
     * @return {void}
     */
    handleUpdate = (remoteUserDetails, username) => {
        const {database, localStream, localConnection} = this.state
        // Read the received remoteUserDetails and apply it
        if (remoteUserDetails) {
            switch (remoteUserDetails.type) {
                // Situation where you receive a call
                case 'offer':
                    this.setState({
                        connectedUser: remoteUserDetails.from
                    })
                    // Set Event Listener for possible call termination
                    // eslint-disable-next-line react/no-direct-mutation-state
                    this.state.localConnection.oniceconnectionstatechange = () => {
                        if (this.hasRemoteDisconnected()) {
                            endCall(this.state.connectedUser)
                        }
                    }
                    // Listen to the connection events
                    listenToConnectionEvents(localConnection, username, remoteUserDetails.from, database, this.remoteVideoRef, doCandidate)
                    // Send an answer
                    // noinspection JSIgnoredPromiseFromCall
                    sendAnswer(localConnection, localStream, remoteUserDetails, doAnswer, database, username)
                    break;
                // Situation where you make a call
                case 'answer':
                    this.setState({
                        connectedUser: remoteUserDetails.from
                    })
                    // Start the call
                    startCall(localConnection, remoteUserDetails)
                    // Set Event Listener for possible call termination
                    // eslint-disable-next-line react/no-direct-mutation-state
                    this.state.localConnection.oniceconnectionstatechange = () => {
                        if (this.hasRemoteDisconnected()) {
                            endCall(this.state.connectedUser)
                        }
                    }
                    break;
                // Add the candidate to the connection
                case 'candidate':
                    addCandidate(localConnection, remoteUserDetails)
                    break;
                default:
                    break;
            }
        }
    }

    /**
     * Renders the VideoChat class which is the entry point of the website and passes the required properties.
     *
     * @return {JSX.Element}
     */
    render() {
        return <VideoChat
            startCall={this.startCall}
            onLogin={this.onLogin}
            setLocalVideoRef={this.setLocalVideoRef}
            setRemoteVideoRef={this.setRemoteVideoRef}
            connectedUser={this.state.connectedUser}
        />
    }
}

export default VideoChatContainer;
