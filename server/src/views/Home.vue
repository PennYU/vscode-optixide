<template>
  <div>
    <h1>欢迎使用</h1>
    <el-row>
      <el-col :span="16">
        <div>
        <img
          style="width: 100%; height: 200px;"
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"/>
        </div>
      </el-col>
      <el-col :span="8">
        <el-row>
          <el-button class="button">Create Project</el-button>
        </el-row>
        <el-row>
          <el-button class="button">Open Project</el-button>
        </el-row>
        <el-row>
          <el-button class="button">Create Terminal</el-button>
        </el-row>
        <el-row>
          <el-button class="button">Open Terminal</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-divider>Recent Projects</el-divider>
      <el-table :data="projects" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </el-row>
    <el-row>
      <el-divider>Quick Start</el-divider>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="card">
          <el-card>
            <img
          style="width: 100%; height: 50px;"
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"/>
            <h3>step 1</h3>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <el-card>
            <img
          style="width: 100%; height: 50px;"
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"/>
            <h3>step 2</h3>
          </el-card>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="card">
          <el-card>
            <img
          style="width: 100%; height: 50px;"
          src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"/>
            <h3>step 3</h3>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import PopupModal from '../components/PopupModal.vue'

export default {
    name: 'Home',

    components: { PopupModal },

    data: () => ({
      showDialog: false,
      projects: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]
    }),

    methods: {
        show() {
          this.showDialog = true;
        },
    },
}
</script>

<style>
.button {
  width: 250px;
  height: 40px;
  margin-bottom: 10px;
}
.card {
  margin: 20px;
}
</style>
