<template>
  <main>
    <el-container>
      <el-aside class="navbar">
        <el-menu
          style="--el-menu-level:-1; width: 64px; margin: 0; padding: 0;"
            class="el-menu-vertical-demo"
            default-active="/home"
            @select="onSelect"
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
import NavbarItem from '@/components/NavbarItem.vue';
export default {
  components: {NavbarItem},
  mounted() {
    window.onmessage = function(e) {
      console.log('works', e);
    };
    console.log("theme", this.$route, this.$route.query, this.$route.query.theme)
  },
  methods: {
    onSelect(index: string) {
      if (index === this.$route.path) {
        return;
      }
      this.$router.push({path: index, query: this.$route.query});
    },
    isDark() {
      return this.$route.query.theme === 'dark'
    }
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
