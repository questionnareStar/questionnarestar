<template>
<div id="table">
     <el-card shadow="never">
     <el-row >
 <el-col :span="6">
      <el-select v-model="option" filterable placeholder="请选择排序方式">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   </el-col>
    <el-col :span="10">
    <el-input
    placeholder="请输入问卷标题关键词查找"
    prefix-icon="el-icon-search"
    v-model="input">
  </el-input>
 </el-col>
 <el-col :span="8">
    <el-button type="primary"
    @click="Search(input)">
    搜索</el-button>
   </el-col>
   </el-row>
    </el-card>
  <el-table
    :data="tableData"
    :border="true"
    height="1000"
    style="width: 100%">
     <el-table-column
      label="问卷ID"
      width="150">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.ID }}</span>
      </template>
    </el-table-column>
      <el-table-column
      label="问卷标题"
      width="250">
      <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="创建日期"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
      <el-table-column
      label="问卷回收量"
      width="100">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.num }}</span>
      </template>
    </el-table-column>
      <el-table-column
      label="删除日期"
      width="180">
      <template slot-scope="scope">
             <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.dldate }}</span>
      </template>
    </el-table-column>
    <el-table-column 
    label="操作"
     width="280"
    >
      <template slot-scope="scope">
        <el-button
          type="primary"
          size="mini"
          @click="Preview(scope.$index, scope.row)">预览</el-button>
    <el-button
          size="mini"
          type="primary"
          @click="Statistics(scope.$index, scope.row)">问卷统计</el-button>
        <el-button
          size="mini"
          type="success"
          @click="Recover(scope.$index, scope.row)">恢复</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          options:[{
           label:"按问卷ID排序-递增",
          value:"1"
          },
          {
           label:"按问卷ID排序-递减",
          value:"2"
          },
          {
           label:"按创建时间排序-递增",
          value:"3"
          },
          {
           label:"按创建时间排序-递减",
          value:"4"
          },
          {
           label:"按问卷回收量排序-递增",
          value:"5"
          },
          {
           label:"按问卷回收量排序-递减",
          value:"6"
          },
          ],
          option:"",
          input:"",
        tableData: [{
          ID:'1000001',
          date: '2021-8-21',
          title: '原神深渊角色使用情况调查',
          num: '10',
          dldate:"2021-8-21"
        }, {
          ID:'1000002',
          date: '2021-8-21',
          title: '原神玩家2.0版本抽卡计划',
          num: '1000',
          dldate:"2021-8-21"
        }, ]
      }
    },
    methods: {
     Preview(index, row) {
        console.log(index, row);
      },
    Statistics(index, row) {
        console.log(index, row);
      },
       Recover(index, row) {
        console.log(index, row);
      },
         Search(input) {
        console.log(input);
      },
    }
  }
</script>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
