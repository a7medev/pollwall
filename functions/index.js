const functions = require("firebase-functions")
const admin = require("firebase-admin")

admin.initializeApp()

const db = admin.firestore()

exports.vote = functions
  .region("europe-west3")
  .https.onCall((data, context) => {
    const uid = context.auth.uid
    const { pollId, choice } = data

    return db
      .collection("users") // go to the users collection
      .doc(uid) // go to the user document
      .collection("votes") // go to the votes collection of the user
      .doc(pollId) // go to the poll votes for that user
      .get()
      .then(voteSnap => {
        const vote = voteSnap.data()

        // cancel the vote if user voted twice
        if (voteSnap.exists && vote.choice === choice) {
          return voteSnap.ref
            .delete()
            .then(() => {
              return db
                .collection("polls")
                .doc(pollId)
                .get()
            })
            .then(pollSnap => {
              const { votes } = pollSnap.data()
              votes[choice] = votes[choice] - 1
              return pollSnap.ref.update({ votes })
            })
        }

        return voteSnap.ref
          .set({ choice })
          .then(() => {
            return db
              .collection("polls")
              .doc(pollId)
              .get()
          })
          .then(pollSnap => {
            const { votes } = pollSnap.data()

            if (voteSnap.exists) {
              const choiceToReduce = voteSnap.data().choice
              votes[choiceToReduce] = votes[choiceToReduce] - 1
            }
            votes[choice] = votes[choice] + 1

            return pollSnap.ref.update({ votes })
          })
      })
  })
