<template>
  <v-container>
    <AddPoll />

    <!-- Latest Polls -->
    <h1 class="grey--text text--darken-3 mb-3">Latest Polls</h1>
    <p
      v-if="!$store.state.polls.length"
      class="display-1 text-center text-uppercase grey--text"
    >
      There are no polls right now...
    </p>
    <Poll v-for="poll in $store.state.polls" :key="poll.id" :poll="poll" />
  </v-container>
</template>

<script>
import Poll from "@/components/Poll"
import AddPoll from "@/components/AddPoll"

export default {
  name: "Home",
  components: { Poll, AddPoll },
  mounted() {
    this.$store.dispatch("bindPolls")
    this.$store.dispatch("bindVotes")
  }
}
</script>
