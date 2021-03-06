<template>
  <div id="app">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="content" v-if="trees.length > 0">
      <div class="trees">
        <Node
          v-for="(tree, index) in trees"
          v-bind:key="index"
          v-bind:node="tree"
          v-on:select-node="selectNode"
          v-bind:selectedNodeName="selectedNode ? selectedNode.name : null"
          v-bind:root="true"
        />
      </div>
      <Description
        v-if="selectedNode"
        v-bind:node="selectedNode"
        v-on:select-node="selectNode"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Node from "./components/Node.vue";
import Description from "./components/Description.vue";
import url from "./url";
import { NodeType } from "./types";

export default Vue.extend({
  name: "App",
  components: {
    Node,
    Description,
  },
  data() {
    return {
      loading: false,
      trees: [] as NodeType[],
      error: null as null | string,
      selectedNode: null as null | NodeType,
    };
  },
  created() {
    this.error = null;
    this.trees = [];
    this.loading = true;
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(url);
        this.loading = false;
        const body = await response.json();
        if (!response.ok) {
          this.error = body.toString();
        } else {
          this.trees = body;
        }
      } catch (error) {
        this.error = error;
      }
    },
    selectNode(node: NodeType) {
      this.selectedNode = node;
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.content {
  margin-left: 100px;
  display: flex;
  flex-flow: row wrap;
}
.trees {
  display: flex;
  flex-direction: column;
}
</style>
