<template>
  <scroll-bar>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="pathList"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {
      pathList: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    // routes() {
    //   // console.log(this.$router.options.routes)

    //   return this.$router.options.routes
    // },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  //生命周期函数，实例刚刚创建完毕
  created: function () {
   this.getsideBar();
  },
  methods: {
    //获取侧边栏信息
    getsideBar() {
      let matched = this.$router.options.routes
      for(var i = 0;i<matched.length;i++){
        if(!(matched[i].path==="/login"||matched[i].path==="/404"||matched[i].path==="/"||matched[i].path==="*")){
          this.pathList = this.pathList.concat((matched[i]));
        }
        
      }
     console.log(matched)
      // this.pathList = matched
      console.log(this.pathList )
    }
  }
}
</script>
