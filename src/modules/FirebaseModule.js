/**
 * Logs in into Firebase after clearing old entries and sets an event listener for changes in the field of your username.
 *
 * @param {string} username
 * @param {firebase.database.Database} database
 * @param {function({type: string, from: string, candidate: string | undefined, answer: string | undefined, offer: string | undefined} ,string): void} handleUpdate - VideoChatContainer.handleUpdate
 *
 * @return {Promise<void>}
 */
const doLogin = async (username, database, handleUpdate) => {
    // Reference representing the location of the username in the database
    /** @type {firebase.database.Reference} */
    const dbCurrentUserReference = database.ref('/users/' + username)
    // Clears the old entries of the current user
    await dbCurrentUserReference.remove()
    // Set the event listener
    dbCurrentUserReference.on('value', snapshot => {
        // This event will trigger once with the initial data stored at this location
        // and then trigger again each time the data changes
        try {
            // Check if data for the username exists
            if (snapshot.exists()) {
                handleUpdate(snapshot.val(), username)
            }
        } catch (exception) {
            console.log(exception)
        }
    })
}

/**
 * Clears firebase entries of both users effectively logging them out.
 * Called when a call ends.
 *
 * @param {string} username
 * @param {string} remoteUsername
 * @param {firebase.database.Database} database
 *
 * @return {Promise<void>}
 */
const doLogout = async (username, remoteUsername, database) => {
    // Clears the entries of the current user logging you out
    await database.ref('/users/' + username).remove()
    // Clears the entries of the remote user logging that user out
    await database.ref('/users/' + remoteUsername).remove()
}

/**
 * Sends an offer object for the user to call by updating the database field of the remote user.
 *
 * @param {string} to
 * @param {RTCSessionDescriptionInit} offer
 * @param {firebase.database.Database} database
 * @param {string} username
 *
 * @return {Promise<void>}
 */
const doOffer = async (to, offer, database, username) => {
    await database.ref('/users/' + to).set({
        type: 'offer',
        from: username,
        offer: JSON.stringify(offer)
    })
}

/**
 * Sends an answer object for the user to call by updating the database field of the remote user.
 *
 * @param {string} to
 * @param {RTCSessionDescriptionInit} answer
 * @param {firebase.database.Database} database
 * @param {string} username
 *
 * @return {Promise<void>}
 */
const doAnswer = async (to, answer, database, username) => {
    await database.ref('/users/' + to).update({
        type: 'answer',
        from: username,
        answer: JSON.stringify(answer)
    })
}

/**
 * Sends the new ICE Candidate to the peer by updating the database field of the remote user.
 *
 * @param {string} to
 * @param {RTCIceCandidate} candidate
 * @param {firebase.database.Database} database
 * @param {string} username
 *
 * @return {Promise<void>}
 */
const doCandidate = async (to, candidate, database, username) => {
    await database.ref('/users/' + to).update({
        type: 'candidate',
        from: username,
        candidate: JSON.stringify(candidate)
    })
}

export {
    doLogin,
    doOffer,
    doAnswer,
    doCandidate
}
