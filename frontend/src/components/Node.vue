<template>
  <div class="node">
    <div class="node-with-line">
      <div v-if="!root" class="line"><hr /></div>
      <div
        @click="onClick($event)"
        class="node-info"
        v-bind:class="{ selected: node.name === selectedNodeName }"
      >
        <p>{{ node.name }}</p>
      </div>
    </div>

    <div v-if="node.children && node.children.length > 0" class="line">
      <hr />
    </div>
    <div v-if="node.children && node.children.length > 0" class="children">
      <Node
        v-for="child in node.children"
        v-bind:node="child"
        v-bind:key="child.name"
        v-on:select-node="select"
        v-bind:selectedNodeName="selectedNodeName"
        v-bind:root="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Node",
  data() {
    return {
      selected: false,
    };
  },
  props: {
    node: Object,
    selectedNodeName: String,
    root: Boolean,
  },
  methods: {
    onClick(event) {
      this.$emit("select-node", this.$props.node);
    },
    select(value) {
      this.$emit("select-node", value);
    },
  },
});
</script>

<style>
.node {
  height: fit-content;
  display: flex;
  flex-direction: row;
  width: fit-content;
}
.children {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  border-left: 2px solid lightgray;
  justify-content: space-between;
}
.node-info {
  margin: 1rem 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  flex-direction: row;
  border: 2px solid lightgray;
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
.selected {
  border: 2px solid orange;
}
.node-with-line {
  margin: auto 0;
  display: flex;
  flex-direction: row;
}
</style>
