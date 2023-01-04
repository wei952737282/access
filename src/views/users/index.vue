<template>
  <div class="app-container">
      <div class="condition-groups">
        <div class="condition-box">
          <div class="condition-title">部门名称：</div>
          <div class="condition-val">
            <el-input style="width: 100%" v-model="condition.name" placeholder="请输入部门名称"></el-input>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">部门状态：</div>
          <div class="condition-val">
            <el-select
              style="width: 100%" v-model="condition.status.value" placeholder="请选择部门状态">
              <el-option
                v-for="item in condition.status.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        
        <div class="condition-box">
          <div class="condition-title"></div>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button class="reset" type="primary" icon="el-icon-refresh">重置</el-button>
        </div>
      </div>
      <div class="mj-info">
        <div class="mj-table">
          <div class="mj-btn-groups">
            <el-button type="primary" size="small" @click="openAdd('add')">新增</el-button>
            <!-- <el-button type="primary" size="small" >修改</el-button>
            <el-button type="primary" size="small">删除</el-button> -->
            <el-button type="primary" size="small" @click="view_type = 1 - view_type;initDept()">切换到部门{{ view_type == 1?'结构':'列表' }}视图</el-button>
          </div>
          <div class="mj-table-box">
            <el-table
              :data="me_list"
              stripe 
              fit
              tooltip-effect="dark"
              style="width: 100%" v-show="view_type==1">
              <el-table-column
                width="55">
                <template slot-scope="scope">
                  <el-checkbox :value="scope.row.id == currRowId" disabled></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                label="序号"
                width="60"
                prop="id">
              </el-table-column>
              <el-table-column
                label="部门"
                prop="name">
              </el-table-column>
              <el-table-column
                label="科室名称"
                prop="lc">
              </el-table-column>
              <el-table-column
                label="联系电话"
                prop="phone">
              </el-table-column>
              <el-table-column
                label="呼叫转移电话"
                prop="forwardCall">
              </el-table-column>
              <el-table-column
                prop="zwym"
                label="通行区域">
              </el-table-column>
              <el-table-column
                label="部门状态">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.status"
                    active-color="#487FFF"
                    inactive-color="#ff4949"
                    @click.native="stopUp"
                    @change="changeStatus(scope.row)"
                    :active-value="0"
                    :inactive-value="1">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间">
              </el-table-column>
            </el-table>
          </div>
          <div class="mj-table-box">
            <el-table
              :data="bm_list"
              stripe 
              fit
              tooltip-effect="dark"
              style="width: 50%" v-show="view_type==0">
              <el-table-column
                label="机构"
                prop="name">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  
                  <el-button type="primary" size="small" @click="openAdd('add', scope.row)">新增</el-button>
                  <el-button type="primary" size="small" @click="openDel(scope.row.id)">删除</el-button>
                  <el-button type="primary" size="small" @click="openAdd('update',scope.row)">修改</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </div>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next"
          :total="totalPage"
          v-show="view_type == 1">
        </el-pagination>
      </div>
      管理员
      <el-dialog
        :title="addData.title"
        :visible.sync="addData.show"
        :append-to-body="true" 
        @closed="clearData"
        width="480px">
          <el-form size="small" label-width="120px" :model="addData">
            <el-form-item required label="科室名称：" >
              <el-input v-model="addData.name" placeholder="请输入科室名称"></el-input>
            </el-form-item>
            <el-form-item label="管理员：" >
              <el-select style="width:100%" v-model="addData.leaderUserId.value" placeholder="请选择管理员">
                <el-option
                  v-for="item in addData.leaderUserId.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="联系电话：">
              <el-input v-model="addData.phone"  placeholder="请输入联系电话"></el-input>
            </el-form-item>
            <el-form-item label="呼叫转移：">
              <el-input v-model="addData.forwardCallL" placeholder="请输入呼叫转移"></el-input>
            </el-form-item>
            <el-form-item label="部门状态：" >
              <el-select style="width:100%" v-model="addData.status.value" placeholder="请选择管理员">
                <el-option
                  v-for="item in addData.status.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer" >
          <el-button @click="addData.show = false">取 消</el-button>
          <el-button type="primary" @click="aOrU"> 确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        :visible.sync="delData.show"
        :append-to-body="true"
        :show-close="false"
        width="300px"
        class="hideHeader"
        @closed="clearDelData"
        >
        <div style="text-align:center;">
          <h2>是否删除该部门?</h2>
          <el-button @click="delData.show = false">取 消</el-button>
          <el-button type="primary" @click="delBm"> 确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>

import { getDept,getDeptByPage,createDept,updateDept,deleteDept } from '@/api/user';
export default {
  data() {
    return {
      view_type:1,// 视图类型 1 列表视图 ， 0 结构视图
      currRowId:0,
      condition:{
        name:'',
        status:{
          options:[{
          value: '1',
          label: '全部'
        },{
          value: '2',
          label: '启用'
        },{
          value: '3',
          label: '禁用'
        }],
          value:''
        },
      },
      me_list: [{
          id:1,
          xh: '111',
          ld: '111',
          lc: '111',
          pzmc:'1111',
          wg:'894561313',
          zwym:'111.111.111.111',
          dns:'111.111.111.111',
          mjip:'111.111.111.111',
          mwip:'111.111.111.111',
          mnip:'111.111.111.111',
        }],
      bm_list:[{
        forwardCallL:'',//	呼叫转移
        leaderUserId:'',//	负责人		false	integer(int64)
        name:'',//	部门名称		true	 string
        parentId:'',//	父部门id		false	integer(int64)
        phone:'',//	联系电话		false	string
        sort:'',//	显示顺序		false	integer(int32)
        status:'',//部门状态（0正常 1停用）		true	integer(int32)
      }],
      pageNo: 1,
      pageSize:10,
      totalPage:1,
      addData:{
        show:false,
        title:'新增',
        type:'add', // 数据类型，add 新增， update修改
        forwardCallL:'',//	呼叫转移
        id:0,
        leaderUserId:{
          options:[
            {
              value: 0,
              label: '无负责人'
            },
            {
              value:1,
              label:'测试负责人'
            }
          ],
          value:0
        },//	负责人		false	integer(int64)
        name:'',//	部门名称		true	 string
        parentId:'',//	父部门id		false	integer(int64)
        phone:'',//	联系电话		false	string
        sort:'',//	显示顺序		false	integer(int32)
        status:{
          options:[
            {
              value: 0,
              label: '正常'
            },
            {
              value:1,
              label:'停用'
            }
          ],
          value:0
        },//部门状态（0正常 1停用）		true	integer(int32)
      },
      delData:{
        show:false,
        id:0
      },
    }
  },
  created() {
    this.initDept()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    openAdd(type,row){
      this.addData.type = type
      if(type == 'add'){
        this.addData.title = '新增';
          this.addData.id = 0;
          if(row){
            this.addData.parentId = row.id;
          }
      }else{
        this.addData.title = '修改';
          console.log(row);
          this.addData.forwardCall = row.forwardCall;
          this.addData.id = row.id;
          this.addData.leaderUserId.value = row.leaderUserId;
          this.addData.name = row.name;
          this.addData.parentId = row.parentId;
          this.addData.phone = row.phone;
          this.addData.sort = row.sort;
          this.addData.status.value = row.status;
      }
      this.addData.show = true
    },
    aOrU(){
      var addData = this.addData
      var data = {
        id: addData.id,
        forwardCallL: addData.forwardCallL,//	呼叫转移
        leaderUserId: addData.leaderUserId.value,//	负责人		false	integer(int64)
        name: addData.name,//	部门名称		true	 string
        parentId: addData.parentId,//	父部门id		false	integer(int64)
        phone: addData.phone,//	联系电话		false	string
        sort: addData.sort,//	显示顺序		false	integer(int32)
        status: addData.status.value,//部门状态（0正常 1停用）		true	integer(int32)
      }
      if(this.addData.type == 'add'){
        createDept(data).then( data =>{
          this.initDept()
        })
      }else{
        updateDept(data).then( data =>{
          this.initDept()
        })
      }
      this.addData.show = false;
    },
    openDel(id){
      this.delData = {
        show:true,
        id:id
      }
    },
    clearDelData(){
      this.delData.id = '';
    },
    delBm(){
      deleteDept({
        id:this.delData.id
      }).then( data => {
        console.log(data);
        this.initDept();
        this.delData.show = false;
      })
    },
    clearData(){
      this.addData = {
        show:false,
        title:'新增',
        type:'add', // 数据类型，add 新增， update修改
        id:0,
        forwardCallL:'',//	呼叫转移
        leaderUserId:{
          options:[
            {
              value: 0,
              label: '无负责人'
            },
            {
              value:1,
              label:'测试负责人'
            }
          ],
          value:0
        },//	负责人		false	integer(int64)
        name:'',//	部门名称		true	 string
        parentId:'',//	父部门id		false	integer(int64)
        phone:'',//	联系电话		false	string
        sort:'',//	显示顺序		false	integer(int32)
        status:{
          options:[
            {
              value: 0,
              label: '正常'
            },
            {
              value:1,
              label:'停用'
            }
          ],
          value:0
        }//部门状态（0正常 1停用）		true	integer(int32)
      }
    },
    changeStatus(row){
      console.log(row)
      updateDept({
        id:row.id,
        name:row.name,
        status:row.status
      }).then( data => {
        console.log(data)
      })
    },
    stopUp(e){
      var e = e || window.event;
      e.stopPropagation()
    },
    initDept(){
      if(this.view_type){
        getDeptByPage({
          pageNo:this.pageNo,
          pageSize:this.pageSize
        }).then( data =>{
          var data = data.data.data;
          this.totalPage = data.total;
          this.me_list = data.list
        })
      }else{
        getDept().then( data =>{
          this.bm_list = data.data.data
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .condition-groups{
    height: 1rem;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    .condition-box{
      width: 20%;
      display: flex;
      align-items: center;
      .condition-title{
        width: 80px;
        text-align: right;
        margin-right: 10px;
        flex-shrink: 0;
      }
      .condition-val{
        width: 60%;
      }
    }
    .reset{
      color: #409EFF;
      border: 1px solid #409EFF;
      background: #fff;
    }
  }
  .mj-info{
    background: #fff;
    position: absolute;
    top: 1.4rem;
    bottom: 0;
    left: 20px;
    right: 20px;
    min-height: 580px;
    padding: 20px;
  }
  .mj-btn-groups{
    margin-bottom: 12px;
  }
  .pagination{
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }
  .upload-btn{
    color: #999;
    border: 1px solid #DCDFE6;
    background: #fff;
  }
  .upload-btn:hover{
    color: #409EFF;
    border-color: #409EFF;
  }
</style>