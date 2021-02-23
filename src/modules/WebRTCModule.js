const createOffer = async (connection, localStream, userToCall, doOffer, database, username) => {
    try {
        // noinspection JSUnresolvedFunction
        connection.addStream(localStream)
        const offer = await connection.createOffer()
        await connection.setLocalDescription(offer)
        doOffer(userToCall, offer, database, username)
    } catch (exception) {
        console.error(exception)
    }
}

const initiateLocalStream = async () => {
    try {
        return await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
    } catch (exception) {
        console.error(exception)
    }
}

const initiateConnection = async () => {
    try {
        // create a connection
        // using Google public stun server
        const configuration = {iceServers: [{urls: 'stun:stun2.1.google.com:19302'}]}
        return new RTCPeerConnection(configuration)
    } catch (exception) {
        console.error(exception)
    }
}

const listenToConnectionEvents = (connection, username, remoteUsername, database, remoteVideoRef, doCandidate) => {
    // listen for ice candidates
    connection.onicecandidate = function (event) {
        if (event.candidate) {
            doCandidate(remoteUsername, event.candidate, database, username)
        }
    }
    // when a remote user adds stream to the peer connection, we display it
    connection.ontrack = function (e) {
        if (remoteVideoRef.srcObject !== e.streams[0]) {
            remoteVideoRef.srcObject = e.streams[0]
        }
    }
}

const sendAnswer = async (connection, localStream, remoteUserDetails, doAnswer, database, username) => {
    try {
        // add the local stream to the connection
        // noinspection JSUnresolvedFunction
        connection.addStream(localStream)
        // set the remote and local descriptions and create an answer
        await connection.setRemoteDescription(JSON.parse(remoteUserDetails.offer))
        // create an answer to an offer
        const answer = await connection.createAnswer()
        await connection.setLocalDescription(answer)
        // send answer to the other peer
        doAnswer(remoteUserDetails.from, answer, database, username)
    } catch (exception) {
        console.error(exception)
    }
}

const startCall = (yourConnection, remoteUserDetails) => {
    // it should be called when we
    // received an answer from other peer to start the call
    // and set remote the description
    yourConnection.setRemoteDescription(JSON.parse(remoteUserDetails.answer)).catch((error) => {
        console.log(error + " (startCall)")
    })
}

const endCall = (remoteDisconnectedUserName = '') => {
    if (remoteDisconnectedUserName !== '') {
        alert(`Connection lost.\n${remoteDisconnectedUserName} has disconnected.`)
    }
    window.location.reload()
}

const addCandidate = (yourConnection, remoteUserDetails) => {
    // apply the new received candidate to the connection
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
