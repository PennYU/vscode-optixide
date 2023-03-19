<template>
  <main>
    <el-container>
      <el-aside class="navbar">
        <el-menu
          style="--el-menu-level:-1; width: 64px; margin: 0; padding: 0;"
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="/home"
            text-color="#fff"
            router="true"
          >
          <el-menu-item index="/home" class="navbar-menu-item">
            <div class="navbar-item-box">
              <el-icon><location /></el-icon>
              <div>Home</div> 
            </div>
          </el-menu-item>
          <el-menu-item index="/projects" class="navbar-menu-item">
            <div class="navbar-item-box">
              <el-icon><document /></el-icon>
              <div>Project</div> 
            </div>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
        <el-footer>
          <div class="footer">
            <h3>by xxxx</h3>
          </div>
        </el-footer>
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
    // toggleDark();
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

main > * {
  margin: 0;
  width: 100%;
}

.navbar {
  width: 64px;
  height: 100vh;
  background-color: antiquewhite;
}
.footer {
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  align-items:center; 
}
.navbar-item-box {
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  align-items:center; 
  height: 64px;
  width: 64px;
}

.navbar-menu-item {
  margin: 0;
  padding: 0;
}

</style>
