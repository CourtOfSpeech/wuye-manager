<template>
<div>
  <br>
  <el-form :inline="true">
          <el-form-item label="类型">
<el-input v-model="searchMap.type" placeholder="类型，1：私有、2：公有"></el-input></el-form-item>
          <el-form-item label="内容">
<el-input v-model="searchMap.content" placeholder="内容"></el-input></el-form-item>        
          <el-form-item label="报修时间">
<el-input v-model="searchMap.repairtime" placeholder="报修时间"></el-input></el-form-item>
          <el-form-item label="处理时间">
<el-input v-model="searchMap.handletime" placeholder="处理时间"></el-input></el-form-item>
          <el-form-item label="用户姓名">
<el-input v-model="searchMap.username" placeholder="用户姓名"></el-input></el-form-item>
          <el-form-item label="手机号">
<el-input v-model="searchMap.mobile" placeholder="手机号"></el-input></el-form-item>
          <el-form-item label="状态">
<el-input v-model="searchMap.state" placeholder="状态，1：未处理、2：已处理、3：正在处理"></el-input></el-form-item>

    <el-button type="primary" @click="fetchData()">查询</el-button>
    <el-button type="primary" @click="handleEdit('')">新增</el-button>
  </el-form>
  <el-table
    :data="list"
    border
    style="width: 100%">
          <el-table-column prop="type" label="类型" width="80"></el-table-column>
          <el-table-column prop="content" label="内容" width="80"></el-table-column>
          <el-table-column prop="images" label="图片" width="80"></el-table-column>
          <el-table-column prop="repairtime" label="报修时间" width="80"></el-table-column>
          <el-table-column prop="handletime" label="处理时间" width="80"></el-table-column>
          <el-table-column prop="username" label="用户姓名" width="80"></el-table-column>
          <el-table-column prop="mobile" label="手机号" width="80"></el-table-column>
          <el-table-column prop="state" label="状态" width="80"></el-table-column>

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
        <el-form-item label="类型"><el-input placeholder="类型，1：私有、2：公有" v-model="pojo.type"></el-input></el-form-item>
        <el-form-item label="内容"><el-input v-model="pojo.content"></el-input></el-form-item>
        <el-form-item label="图片"><el-input v-model="pojo.images"></el-input></el-form-item>

        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button @click="dialogFormVisible = false" >关闭</el-button>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import repairApi from '@/api/repair'
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
      repairApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    handleSave() {
      repairApi.update(this.id, this.pojo).then(response => {
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
        repairApi.findById(id).then(response => {
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
        repairApi.deleteById(id).then(response => {
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
