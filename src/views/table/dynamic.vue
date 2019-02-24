<template>
<div>
  <br>
  <el-form :inline="true">
          <el-form-item label="主题">
<el-input v-model="searchMap.theme" placeholder="主题"></el-input></el-form-item>
          <el-form-item label="类容">
<el-input v-model="searchMap.content" placeholder="类容"></el-input></el-form-item>
          <!-- <el-form-item label="发布日期">
<el-input v-model="searchMap.createtime" placeholder="发布日期"></el-input></el-form-item> -->
          <!-- <el-form-item label="修改日期">
<el-input v-model="searchMap.updatetime" placeholder="修改日期"></el-input></el-form-item> -->
          <el-form-item label="是否置顶">
<el-input v-model="searchMap.istop" placeholder="1：置顶，2：不置顶"></el-input></el-form-item>
          <el-form-item label="状态">
<el-input v-model="searchMap.state" placeholder="状态，1：未开始、2：正在进行、3：已结束"></el-input></el-form-item>
         
    <el-button type="primary" @click="fetchData()">查询</el-button>
    <el-button type="primary" @click="handleEdit('')">新增</el-button>
  </el-form>
  <el-table
    :data="list"
    border
    style="width: 100%">
          <el-table-column prop="theme" label="主题" width="80"></el-table-column>
          <el-table-column prop="content" label="类容" width="80"></el-table-column>
          <!-- <el-table-column prop="images" label="图片" width="80"></el-table-column> -->
          <el-table-column prop="createtime" label="发布日期" width="80"></el-table-column>
          <el-table-column prop="updatetime" label="修改日期" width="80"></el-table-column>
          <el-table-column prop="istop" label="是否置顶" width="80"></el-table-column>
          <el-table-column prop="state" label="状态" width="80"></el-table-column>
          <el-table-column prop="visits" label="访问量" width="80"></el-table-column>
          <el-table-column prop="thumbup" label="点赞数" width="80"></el-table-column>
          <el-table-column prop="comment" label="评论数" width="80"></el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleEdit(scope.row.id)" type="text" size="small">修改</el-button>
        <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page="currentPage"
      :page-sizes="[5,10,20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>  
  <el-dialog title="编辑" :visible.sync="dialogFormVisible">
    <el-form label-width="80px">
        <el-form-item label="主题"><el-input v-model="pojo.theme"></el-input></el-form-item>
        <el-form-item label="类容"><el-input v-model="pojo.content"></el-input></el-form-item>
        <el-form-item label="图片"><el-input v-model="pojo.images"></el-input></el-form-item>
        <el-form-item label="是否置顶"><el-input placeholder="1：置顶，2：不置顶" v-model="pojo.istop"></el-input></el-form-item>
        <!-- <el-form-item label="状态，1：未开始、2：正在进行、3：已结束"><el-input v-model="pojo.state"></el-input></el-form-item> -->
        

        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button @click="dialogFormVisible = false" >关闭</el-button>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import dynamicApi from '@/api/dynamic'
export default {
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      currentPage: 1, // 当前页
      pageSize: 10, // 每页大小
      searchMap: {}, // 查询条件
      dialogFormVisible: false, // 编辑窗口是否可见
      pojo: {}, // 编辑表单绑定的实体对象
      id: '' // 当前用户修改的ID
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      dynamicApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    handleSave() {
      dynamicApi.update(this.id, this.pojo).then(response => {
        this.$message({
          message: response.message,
          type: (response.flag ? 'success' : 'error')
        })
        if (response.flag) { // 如果成功
          this.fetchData() // 刷新列表
        }
      })
      this.dialogFormVisible = false // 关闭窗口
    },
    handleEdit(id) {
      this.id = id
      this.dialogFormVisible = true // 打开窗口
      if (id !== '') { // 修改
        dynamicApi.findById(id).then(response => {
          if (response.flag) {
            this.pojo = response.data
          }
        })
      } else {
        this.pojo = {} // 清空数据
      }
    },
    handleDelete(id) {
      this.$confirm('确定要删除此纪录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        dynamicApi.deleteById(id).then(response => {
          this.$message({ message: response.message, type: (response.flag ? 'success' : 'error') })
          if (response.flag) {
            this.fetchData() // 刷新数据
          }
        })
      })
    }
  }
}
</script>
