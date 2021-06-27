import Vue from "vue"
import Vuex from "vuex"
import { vuexfireMutations, firestoreAction } from "vuexfire"
import { db } from "@/firebase"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    votes: [],
    polls: []
  },
  mutations: {
    ...vuexfireMutations,

    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    setUser: context => {
      let user = localStorage.getItem("user")
      user = JSON.parse(user)
      context.commit("setUser", user)
    },
    bindPolls: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef(
        "polls",
        db.collection("polls").orderBy("createdAt", "desc")
      )
    }),
    bindVotes: firestoreAction(({ state, bindFirestoreRef }) => {
      return bindFirestoreRef(
        "votes",
        db
          .collection("users")
          .doc(state.user.uid)
          .collection("votes")
      )
    })
  },
  modules: {}
})
