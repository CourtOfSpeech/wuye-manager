<template>
<!-- 这是登录进来的初始页面 -->
  <div class="dashboard-container">
    <div class="dashboard-text">管理员{{name}}，您好</div>
    <!-- <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex' //导入状态管理，并获取里面的值

export default {
  name: 'dashboard',
  
  computed: {
    //在这里获取名称和权限
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
