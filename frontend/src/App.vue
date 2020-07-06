<template>
  <div id="app">
    <Node
      v-bind:node="tree"
      v-on:select-node="selectNode"
      v-bind:selectedNodeName="selectedNode ? selectedNode.name : null"
      v-bind:root="true"
    />
    <Description
      v-if="selectedNode"
      v-bind:node="selectedNode"
      v-on:select-node="selectNode"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Node from "./components/Node.vue";
import Description from "./components/Description.vue";
import url from "./url";

export default Vue.extend({
  name: "App",
  components: {
    Node,
    Description,
  },
  data() {
    return {
      loading: false,
      nodes: [],
      error: null as null | string,
      tree: {
        name: "A",
        description: "This is a description of A",
        children: [
          {
            name: "B",
            description: "This is a description of B",
            children: [
              {
                name: "B-1",
                description: "This is a description of B-1",
                children: [],
              },
              {
                name: "B-2",
                description: "This is a description of B-2",
                children: [],
              },
              {
                name: "B-3",
                description: "This is a description of B-3",
                children: [],
              },
            ],
          },
          {
            name: "C",
            description: "This is a description of C",
            children: [],
          },
          {
            name: "D",
            description: "This is a description of D",
            children: [],
          },
        ],
      },
      selectedNode: null,
    };
  },
  created() {
    this.error = null;
    this.nodes = [];
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
          this.nodes = body;
        }
      } catch (error) {
        this.error = error;
      }
    },
    selectNode(node) {
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
  margin-top: 60px;
  margin-left: 100px;
  display: flex;
  flex-flow: row wrap;
}
</style>
