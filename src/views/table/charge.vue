<template>
<div>
  <br>
  <el-form :inline="true">         
          <el-form-item label="门牌号">
<el-input v-model="searchMap.housenumber" placeholder="门牌号"></el-input></el-form-item>
          <el-form-item label="产生时间">
<el-input v-model="searchMap.generationtime" placeholder="产生时间"></el-input></el-form-item>
          <el-form-item label="支付时间">
<el-input v-model="searchMap.paytime" placeholder="支付时间"></el-input></el-form-item>          
          <el-form-item label="支付人姓名">
<el-input v-model="searchMap.username" placeholder="支付人姓名"></el-input></el-form-item>
          <el-form-item label="电话号码">
<el-input v-model="searchMap.mobile" placeholder="电话号码"></el-input></el-form-item>
          <el-form-item label="状态">
<el-input v-model="searchMap.state" placeholder="状态，1：未支付、3.已支付、2.正在支付"></el-input></el-form-item>

    <el-button type="primary" @click="fetchData()">查询</el-button>
    <el-button type="primary" @click="handleEdit('')">新增</el-button>
  </el-form>
  <el-table
    :data="list"
    border
    style="width: 100%">
          <el-table-column prop="housenumber" label="门牌号" width="80"></el-table-column>
          <el-table-column prop="watercharge" label="水费" width="80"></el-table-column>
          <el-table-column prop="energycharge" label="电费" width="80"></el-table-column>
          <el-table-column prop="gascharge" label="气费" width="80"></el-table-column>
          <el-table-column prop="estatecharge" label="物业费" width="80"></el-table-column>
          <el-table-column prop="totalcharge" label="总费用" width="80"></el-table-column>
          <el-table-column prop="generationtime" label="产生时间" width="80"></el-table-column>
          <el-table-column prop="paytime" label="支付时间" width="80"></el-table-column>
          <el-table-column prop="username" label="支付人姓名" width="80"></el-table-column>
          <el-table-column prop="mobile" label="电话号码" width="80"></el-table-column>
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
        <el-form-item label="门牌号"><el-input v-model="pojo.housenumber"></el-input></el-form-item>
        <el-form-item label="水费"><el-input v-model="pojo.watercharge"></el-input></el-form-item>
        <el-form-item label="电费"><el-input v-model="pojo.energycharge"></el-input></el-form-item>
        <el-form-item label="气费"><el-input v-model="pojo.gascharge"></el-input></el-form-item>
        <el-form-item label="物业费"><el-input v-model="pojo.estatecharge"></el-input></el-form-item>
        

        <el-button type="primary" @click="handleSave()">保存</el-button>
        <el-button @click="dialogFormVisible = false" >关闭</el-button>
    </el-form>
  </el-dialog>
</div>
</template>
<script>
import chargeApi from '@/api/charge'
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
      chargeApi.search(this.currentPage, this.pageSize, this.searchMap).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    handleSave() {
      chargeApi.update(this.id, this.pojo).then(response => {
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
        chargeApi.findById(id).then(response => {
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
        chargeApi.deleteById(id).then(response => {
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
