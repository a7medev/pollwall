<template>
  <button @click="$emit('vote')">
    <v-row dense>
      <v-col cols="8" sm="9" md="10" lg="11">
        <slot />
      </v-col>
      <v-col cols="4" sm="3" md="2" lg="1">
        <animated-number :value="percent" :duration="700" :round="true" />%
      </v-col>
    </v-row>
  </button>
</template>

<script>
import AnimatedNumber from "animated-number-vue"

export default {
  name: "Choice",
  components: { AnimatedNumber },
  props: ["percent"]
}
</script>

<style lang="scss" scoped>
button {
  background: #e5e5e5;
  color: #333;
  border: 2px solid #aaa;
  padding: 0.4rem 0;
  margin: 0.25rem 0;
  width: 100%;
  border-radius: 0.25rem;
  outline: none;
  transition: 0.25s ease-in-out;

  &:hover {
    background: #ccc;
  }

  &.active {
    border: 2px solid #e91e63;
    color: #e91e63;
  }
}
</style>
