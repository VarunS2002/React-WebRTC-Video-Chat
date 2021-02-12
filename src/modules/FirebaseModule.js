const doLogin = async (username, database, handleUpdate) => {
    await database.ref('/users/' + username).remove()
    database.ref('/users/' + username).on('value', snapshot => {
        try {
            snapshot.exists() && handleUpdate(snapshot.val(), username)
        } catch (exception) {
            console.log(exception)
        }
    })
}

const doOffer = async (to, offer, database, username) => {
    await database.ref('/users/' + to).set({
        type: 'offer',
        from: username,
        offer: JSON.stringify(offer)
    })
}

const doAnswer = async (to, answer, database, username) => {
    await database.ref('/users/' + to).update({
        type: 'answer',
        from: username,
        answer: JSON.stringify(answer)
    })
}

const doCandidate = async (to, candidate, database, username) => {
    // send the new candidate to the peer
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
