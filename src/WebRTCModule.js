export const createOffer = async (connection, localStream, userToCall, doOffer, database, username) => {
    try {
        connection.addStream(localStream)

        const offer = await connection.createOffer()
        await connection.setLocalDescription(offer)

        doOffer(userToCall, offer, database, username)
    } catch (exception) {
        console.error(exception)
    }
}

export const initiateLocalStream = async () => {
    try {
        return await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
    } catch (exception) {
        console.error(exception)
    }
}
export const initiateConnection = async () => {
    try {
        // create a connection
        // using Google public stun server
        const configuration = {iceServers: [{urls: 'stun:stun2.1.google.com:19302'}]}
        return new RTCPeerConnection(configuration)
    } catch (exception) {
        console.error(exception)
    }
}

export const listenToConnectionEvents = (conn, username, remoteUsername, database, remoteVideoRef, doCandidate) => {
    // listen for ice candidates
    conn.onicecandidate = function (event) {
        if (event.candidate) {
            doCandidate(remoteUsername, event.candidate, database, username)
        }
    }

    // when a remote user adds stream to the peer connection, we display it
    conn.ontrack = function (e) {
        if (remoteVideoRef.srcObject !== e.streams[0]) {
            remoteVideoRef.srcObject = e.streams[0]
        }
    }
}

export const sendAnswer = async (conn, localStream, notif, doAnswer, database, username) => {
    try {
        // add the local stream to the connection
        conn.addStream(localStream)
        // set the remote and local descriptions and create an answer
        conn.setRemoteDescription(JSON.parse(notif.offer))
        // create an answer to an offer
        const answer = await conn.createAnswer()
        conn.setLocalDescription(answer)
        // send answer to the other peer
        doAnswer(notif.from, answer, database, username)
    } catch (exception) {
        console.error(exception)
    }
}

export const startCall = (yourConn, notif) => {
    // it should be called when we
    // received an answer from other peer to start the call
    // and set remote the description
    yourConn.setRemoteDescription(JSON.parse(notif.answer))
}

export const addCandidate = (yourConn, notif) => {
    // apply the new received candidate to the connection
    yourConn.addIceCandidate(new RTCIceCandidate(JSON.parse(notif.candidate)))
}
