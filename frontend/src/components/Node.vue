<template>
  <div class="node">
    <div class="node-with-line" v-bind:class="level">
      <div v-if="!root" class="line"></div>
      <div @click="onClick($event)" class="node-info">
        <div class="name">
          <p v-bind:class="{ selected: node.name === selectedNodeName }">
            {{ node.name }}
          </p>
        </div>
      </div>
      <div v-if="node.child_of && node.child_of.length > 0" class="line"></div>
    </div>

    <div v-if="node.child_of && node.child_of.length > 0" class="children">
      <Node
        v-for="(child, index) in node.child_of"
        v-bind:node="child"
        v-bind:key="child.name"
        v-on:select-node="select"
        v-bind:selectedNodeName="selectedNodeName"
        v-bind:root="false"
        v-bind:level="
        node.child_of.length > 1 ?
          (index === 0
            ? 'top'
            : index === node.child_of.length - 1
            ? 'bottom'
            : 'middle') : ''
        "
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { NodeType } from "../types";

export default Vue.extend({
  name: "Node",
  data() {
    return {
      selected: false,
    };
  },
  props: {
    /**@type NodeType */
    node: Object,
    selectedNodeName: String,
    root: Boolean,
    level: String,
  },
  methods: {
    onClick() {
      this.$emit("select-node", this.$props.node);
    },
    select(value: NodeType) {
      this.$emit("select-node", value);
    },
  },
});
</script>

<style scoped>
.node {
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: 100%;
}
.children {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  justify-content: space-between;
}
.node-info {
  display: flex;
  flex-direction: row;
  height: 100%;
}
hr {
  min-width: 2rem;
}
.line {
  margin: auto;
  height: 100%;
  background: linear-gradient(#ddd, #ddd);
  background-size: 100% 2px;
  background-position: left;
  background-repeat: no-repeat;
  border: none;
  width: 2rem;
  min-height: 2rem;
}
.name {
  height: 100%;
  margin: auto;
  display: flex;
}
.selected {
  border: 2px solid orange;
}
.node-with-line {
  margin: auto 0;
  display: flex;
  flex-direction: row;
  border: none;
  padding: 1rem 0;
  height: 100%;
  border: none;
}
.top {
  background: linear-gradient(#ddd, #ddd);
  background-size: 2px 50%;
  background-position: bottom left;
  background-repeat: no-repeat;
}
.middle {
  background: linear-gradient(#ddd, #ddd);
  background-size: 2px 100%;
  background-position: left;
  background-repeat: no-repeat;
}
.bottom {
  background: linear-gradient(#ddd, #ddd);
  background-size: 2px 50%;
  background-position: top left;
  background-repeat: no-repeat;
}
p {
  margin: auto;
  width: 2rem;
  height: 2rem;
  border: 2px solid lightgray;
  vertical-align: middle;
  line-height: 2rem;
  cursor: pointer;
}
</style>
