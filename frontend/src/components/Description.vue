<template>
  <div class="description">
    <div class="x" @click="onClick"></div>
    <h2>{{ node.name }}</h2>
    <p>{{ node.description }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Description",
  props: { node: Object },
  methods: {
    onClick() {
      this.$emit("select-node", null);
    },
  },
});
</script>

<style scoped>
.description {
  border: 1px solid rgb(10, 71, 71);
  margin: auto;
  position: relative;
  padding: 1rem;
}
.x {
  position: absolute;
  top: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  border: 1px solid rgb(10, 71, 71);
  color: orange;
  vertical-align: middle;
  background: linear-gradient(
      to top left,
      transparent calc(50% - 2px),
      rgb(10, 71, 71) calc(50% - 2px),
      rgb(10, 71, 71) calc(50% + 2px),
      transparent calc(50% + 2px)
    ),
    linear-gradient(
      to top right,
      transparent calc(50% - 2px),
      rgb(10, 71, 71) calc(50% - 2px),
      rgb(10, 71, 71) calc(50% + 2px),
      transparent calc(50% + 2px)
    );
  cursor: pointer;
}
</style>
