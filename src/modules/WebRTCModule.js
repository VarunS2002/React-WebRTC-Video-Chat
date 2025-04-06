import {stunServer} from "../config"
import {doLogout} from "./FirebaseModule"

/**
 * It first adds localStream to the localConnection. It then creates and sets the offer.
 * Finally, it calls doOffer to send the created offer.
 *
 * @param {RTCPeerConnection} connection
 * @param {MediaStream} localStream
 * @param {string} userToCall
 * @param {function(string, RTCSessionDescriptionInit, firebase.database.Database, string): Promise<void>} doOffer - FirebaseModule.doOffer
 * @param {firebase.database.Database} database
 * @param {string} username
 *
 * @return {Promise<void>}
 */
const createOffer = async (connection, localStream, userToCall, doOffer, database, username) => {
    try {
        // Add local audio/video stream to the localConnection
        localStream.getTracks().forEach((track) => {
            connection.addTrack(track, localStream);
        });
        // Create offer and set it
        /** @type {RTCSessionDescriptionInit} */
        const offer = await connection.createOffer()
        await connection.setLocalDescription(offer)
        // Send the offer
        await doOffer(userToCall, offer, database, username)
    } catch (exception) {
        console.error(exception)
    }
}

/**
 * Initiates and returns the local audio and video stream.
 *
 * @return {Promise<MediaStream>}
 */
const initiateLocalStream = async () => {
    try {
        return await navigator.mediaDevices.getUserMedia({video: true, audio: true})
    } catch (exception) {
        console.error(exception)
    }
}

/**
 * Initiates and returns the local RTCPeerConnection.
 *
 * @return {Promise<RTCPeerConnection>}
 */
const initiateConnection = async () => {
    try {
        // Create a connection by using Google public STUN server
        const configuration = {iceServers: [{urls: stunServer}]}
        return new RTCPeerConnection(configuration)
    } catch (exception) {
        console.error(exception)
    }
}

/**
 * Listens for ICE candidates and then calls doCandidate for sending the candidates to the peer if it exists.
 * Displays the video stream when the remote user adds the stream to the peer connection.
 *
 * @param {RTCPeerConnection} localConnection
 * @param {string} username
 * @param {string} remoteUsername
 * @param {firebase.database.Database} database
 * @param {React.RefObject<HTMLVideoElement>} remoteVideoRef
 * @param {function(string, RTCIceCandidate, firebase.database.Database, string): Promise<void>} doCandidate - FirebaseModule.doCandidate
 *
 * @return {void}
 */
const listenToConnectionEvents = (localConnection, username, remoteUsername, database, remoteVideoRef, doCandidate) => {
    // Listen for ICE candidates
    localConnection.onicecandidate = function (event) {
        // Send the ICE Candidate to the peer if it exists
        if (event.candidate) {
            // noinspection JSIgnoredPromiseFromCall
            doCandidate(remoteUsername, event.candidate, database, username)
        }
    }
    // Display the video stream when the remote user adds the stream to the peer connection
    localConnection.ontrack = function (e) {
        if (remoteVideoRef.srcObject !== e.streams[0]) {
            remoteVideoRef.srcObject = e.streams[0]
        }
    }
}

/**
 * Adds the local audio/video stream to the localConnection.
 * Sets the local and remote description.
 * Creates an answer object and then calls doAnswer to send the answer.
 * Called when you receive a call request from the other peer.
 *
 * @param {RTCPeerConnection} localConnection
 * @param {MediaStream} localStream
 * @param {{type: string, from: string, offer: string}} remoteUserDetails
 * @param {function(string, RTCSessionDescriptionInit, firebase.database.Database, string): Promise<void>} doAnswer - FirebaseModule.doAnswer
 * @param {firebase.database.Database} database
 * @param {string} username
 *
 * @return {Promise<void>}
 */
const sendAnswer = async (localConnection, localStream, remoteUserDetails, doAnswer, database, username) => {
    try {
        // Add the local audio/video stream to the connection
        localStream.getTracks().forEach((track) => {
            localConnection.addTrack(track, localStream);
        });
        // Set the remote description
        await localConnection.setRemoteDescription(JSON.parse(remoteUserDetails.offer))
        // Create an answer to an offer
        /** @type {RTCSessionDescriptionInit} */
        const answer = await localConnection.createAnswer()
        // Set the local description
        await localConnection.setLocalDescription(answer)
        // Send answer to the other peer
        await doAnswer(remoteUserDetails.from, answer, database, username)
    } catch (exception) {
        console.error(exception)
    }
}

/**
 * Sets the remoteDescription.
 * Called when we receive an answer from other peer to start the call.
 *
 * @param {RTCPeerConnection} yourConnection
 * @param {{type: string, from: string, answer: string}} remoteUserDetails
 *
 * @return {void}
 */
const startCall = (yourConnection, remoteUserDetails) => {
    yourConnection.setRemoteDescription(JSON.parse(remoteUserDetails.answer)).catch((exception) => {
        console.log(exception + " (startCall)")
    })
}

/**
 * Called when a call disconnects or you end the call.
 * Logs out both the users by calling doLogout.
 * If the call gets disconnected by the other user or by any issue then the name of the other user is passed.
 * An alert is displayed with the remote user's name.
 * It then reloads the page back to the login page.
 * If you end the call it directly reloads the page back to the login page.
 *
 * @param {boolean} hasRemoteDisconnected
 * @param {string} remoteUsername
 * @param {string} username
 * @param database {firebase.database.Database}
 *
 * @return {Promise<void>}
 */
const endCall = async (hasRemoteDisconnected, remoteUsername, username, database) => {
    // Log out both the users
    await doLogout(username, remoteUsername, database)
    // Display alert if you have not ended the call
    if (hasRemoteDisconnected) {
        alert(`Connection lost.\n${remoteUsername} has disconnected.\nReturning to login screen.`)
    }
    // Reload the page back to the login page
    window.location.reload()
}

/**
 * Applies the new received ICE Candidate to the connection.
 *
 * @param {RTCPeerConnection} yourConnection
 * @param {{type: string, from: string, candidate: string, offer: string | undefined, answer: string | undefined}} remoteUserDetails
 *
 * @return {void}
 */
const addCandidate = (yourConnection, remoteUserDetails) => {
    // noinspection JSIgnoredPromiseFromCall
    yourConnection.addIceCandidate(new RTCIceCandidate(JSON.parse(remoteUserDetails.candidate)))
}

export {
    createOffer,
    initiateLocalStream,
    initiateConnection,
    listenToConnectionEvents,
    sendAnswer,
    startCall,
    endCall,
    addCandidate
}
