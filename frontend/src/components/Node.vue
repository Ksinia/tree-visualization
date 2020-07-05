<template>
  <div class="node">
    <div class="line"><hr /></div>
    <div class="node-info">
      <p>{{ node.name }}</p>
    </div>

    <div v-if="node.children && node.children.length > 0" class="line">
      <hr />
    </div>
    <div v-if="node.children && node.children.length > 0" class="children">
      <Node
        v-for="child in node.children"
        v-bind:node="child"
        v-bind:key="child.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Node",
  props: { node: Object },
});
</script>

<style>
.node {
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: row;
  /* height: fit-content; */
  width: fit-content;
}
.children {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  height: fit-content;
  width: fit-content;
  border-left: 1px solid lightgray;
}
.node-info {
  /* margin: auto; */
  margin: 1rem 0;

  min-width: 7rem;
  display: flex;
  flex-direction: row;
  border: 1px solid lightgray;
}
hr {
  min-width: 2rem;
}
.line {
  margin: auto;
}
p {
  margin: auto;
}
</style>
