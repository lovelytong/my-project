<template>
  <div id="app">
    <el-row>
      <el-col :span="24">
        <el-card>
          <h3>欢迎进入管理系统 </h3>
          <el-menu mode="horizontal" :router="true" :default-active="defaultActive">
            <el-menu-item index="/character">角色列表</el-menu-item>
            <el-menu-item index="/organization">组织列表</el-menu-item>
          </el-menu>

        </el-card>
      </el-col>
    </el-row>

    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        defaultActive: "/helloworld"
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  h3 {
    color: #3791ff;
    text-align: left;
    margin-left: 30px;
    font-weight: lighter;
  }

  .router-link-active{
    text-decoration: none;
  }

  a {
    text-decoraction: none;
  }
</style>
