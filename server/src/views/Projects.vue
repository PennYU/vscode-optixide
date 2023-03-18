<template>
  <div>
    <h1>Projects</h1>
    <el-button @click="onCreateProject">Create Project</el-button>
    <div v-for="proj of projects">
      {{ proj.name }}
    </div>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import {postMessage} from '@/utils';
export default {
  data() {
    return {
      id: uuidv4(),
      projects: [],
    }
  },
  mounted () {
    window.addEventListener('message', this.receiveMessage);
    postMessage({
      id: this.id,
      action: 'callFunction', // callFunction, executeCommand
      name: "listProjects",
    })
  },
  beforeDestroy () {
    window.removeEventListener('message', this.receiveMessage);
  },
  methods: {
    onCreateProject() {
      postMessage({
        action: 'callFunction', // callFunction, executeCommand
        name: "sayHello",
        parameters: ['jack'],
      })
    },
    receiveMessage (event: any) {
      console.log('receiveMessage', event.data)
      if (event.data.id === this.id) {
        this.projects = event.data.projects;
      }
    }
  }
}
</script>