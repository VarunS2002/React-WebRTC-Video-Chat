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
    sendAnswer, startCall
} from "../modules/WebRTCModule";
import {doAnswer, doCandidate, doLogin, doOffer} from "../modules/FirebaseModule";

class VideoChatContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            database: '',
            connectedUser: '',
            localStream: '',
            localConnection: ''
        }
        this.localVideoRef = React.createRef()
        this.remoteVideoRef = React.createRef()
    }

    componentDidMount = async () => {
        // initialize firebase
        firebase.initializeApp(config)
        this.setState({
            database: firebase.database()
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // prevent rerender if not necessary
        if (this.state.database !== nextState.database) {
            return false
        } else if (this.state.localStream !== nextState.localStream) {
            return false
        } else if (this.state.localConnection !== nextState.localConnection) {
            return false
        }
        return true
    }

    startCall = async (username, userToCall) => {
        // listen to the events first
        const {database, localStream, localConnection} = this.state
        listenToConnectionEvents(localConnection, username, userToCall, database, this.remoteVideoRef, doCandidate)
        // create an offer
        await createOffer(localConnection, localStream, userToCall, doOffer, database, username).catch((error) => {
            console.log(error + "(startCall)")
        })

    }

    onLogin = async (username) => {
        // getting local video stream
        const localStream = await initiateLocalStream()
        // setting constraints for audio and video
        const audioLocalStream = localStream.getTracks()[0]
        const videoLocalStream = localStream.getTracks()[1]
        await audioLocalStream.applyConstraints({echoCancellation: true, noiseSuppression: true})
        await videoLocalStream.applyConstraints({frameRate: 60})

        this.localVideoRef.srcObject = localStream
        // create the local connection
        const localConnection = await initiateConnection()
        // set values in state
        this.setState({
            localStream: localStream,
            localConnection: localConnection
        })
        // do the login phase
        await doLogin(username, this.state.database, this.handleUpdate)
    }

    setLocalVideoRef = ref => {
        this.localVideoRef = ref
    }

    setRemoteVideoRef = ref => {
        this.remoteVideoRef = ref
    }

    handleUpdate = (remoteUserDetails, username) => {
        const {database, localStream, localConnection} = this.state
        // read the received remoteUserDetails and apply it
        if (remoteUserDetails) {
            switch (remoteUserDetails.type) {
                case 'offer':
                    this.setState({
                        connectedUser: remoteUserDetails.from
                    })
                    // listen to the connection events
                    listenToConnectionEvents(localConnection, username, remoteUserDetails.from, database, this.remoteVideoRef, doCandidate)
                    // send an answer
                    // noinspection JSIgnoredPromiseFromCall
                    sendAnswer(localConnection, localStream, remoteUserDetails, doAnswer, database, username)
                    break;
                case 'answer':
                    this.setState({
                        connectedUser: remoteUserDetails.from
                    })
                    // start the call
                    startCall(localConnection, remoteUserDetails)
                    break;
                case 'candidate':
                    // add candidate to the connection
                    addCandidate(localConnection, remoteUserDetails)
                    break;
                default:
                    break;
            }
        }
    }

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
