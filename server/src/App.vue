<template>
  <main>
    <el-container style="height: 100vh;">
      <el-aside width="64px">
        <navbar-item to="home" label="Home" />


        <el-row>
          <router-link to="home">
            <el-icon><location /></el-icon>
            <div>Home</div> 
          </router-link>
        </el-row>
        <el-row>
          <router-link to="projects">
            <el-icon><location /></el-icon>
            <div>Project</div> 
          </router-link>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </main>
</template>
<script lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import NavbarItem from '@/components/NavbarItem.vue';
export default {
  components: {NavbarItem},
  mounted() {
    window.onmessage = function(e) {
      console.log('works', e);
    };
  },
  created() {
    console.log("theme", this.$route, this.$route.query, this.$route.query.theme)
    const isDark = useDark()
    const toggleDark = useToggle(isDark)
    toggleDark();
    console.log('useDark')
  }
}
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  color: greenyellow
}

main > * {
  margin: 1rem 0;
}

.no-margin {
  margin: 0
}
</style>
