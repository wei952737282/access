<template>
  <div class="app-container">
      <div class="condition-groups">
        <div class="condition-box">
          <div class="condition-title">楼栋：</div>
          <div class="condition-val">
            <el-select
              style="width: 100%" v-model="condition.ld.value" placeholder="请选择型号">
              <el-option
                v-for="item in condition.ld.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">楼层：</div>
          <div class="condition-val">
            <el-select
              style="width: 100%" v-model="condition.lc.value" placeholder="请选择型号">
              <el-option
                v-for="item in condition.lc.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">网关：</div>
          <div class="condition-val">
            <el-input style="width: 100%" v-model="condition.xlh" placeholder="请输入序列号"></el-input>
          </div>
        </div>
        
        <div class="condition-box">
          <div class="condition-title"></div>
          <el-button type="primary" icon="el-icon-search" @click="init_iplist">搜索</el-button>
          <el-button class="reset" type="primary" icon="el-icon-refresh">重置</el-button>
        </div>
      </div>
      <div class="mj-info">
        <div class="mj-table">
          <div class="mj-btn-groups">
            <el-button type="primary" size="small" @click="openAdd('add')">新增</el-button>
            <el-button type="primary" size="small" @click="openAdd('update')">修改</el-button>
            <el-button type="primary" size="small" @click="openDelete">删除</el-button>
            <el-button type="primary" size="small" @click="exportData">导出</el-button>
          </div>
          <div class="mj-table-box">
            <el-table
              ref="multipleTable"
              height="300"
              :data="ip_list"
              stripe 
              fit
              tooltip-effect="dark"
              style="width: 100%"
              @row-click="handleSelectionChange">
              <el-table-column
                width="55">
                <template slot-scope="scope">
                  <el-checkbox :value="scope.row.id == currRowId" disabled></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column
                label="序号"
                width="60"
                type="index">
              </el-table-column>
              <el-table-column
                label="楼栋"
                prop="buildingsName">
              </el-table-column>
              <el-table-column
                label="楼层"
                width="60"
                prop="buildingsStoreyName">
              </el-table-column>
              <el-table-column
                label="配置名称"
                prop="cfgName">
              </el-table-column>
              <el-table-column
                label="网关"
                prop="cfgGateway">
              </el-table-column>
              <el-table-column
                prop="cfgNetmask"
                label="子网掩码">
              </el-table-column>
              <el-table-column
                prop="cfgDns"
                label="DNS">
              </el-table-column>
              <el-table-column
                prop="cfgGateIp"
                label="门禁ip">
              </el-table-column>
              <el-table-column
                prop="cfgIpc1Ip"
                label="门外摄像头ip">
              </el-table-column>
              <el-table-column
                prop="cfgIpc2Ip"
                label="门内摄像头ip">
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
          :total="totalPage">
        </el-pagination>
      </div>
      
      <el-dialog
        :title="addData.title"
        :visible.sync="addData.show"
        :append-to-body="true"
        width="680px">
          <el-form inline size="small" label-width="120px" :model="addData">
            <el-form-item required label="支持扩展名："  style="width:48%">
              <el-radio-group v-model="addData.kzm">
                <el-radio label="楼栋" style="margin-right:20px"></el-radio>
                <el-radio label="公共"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item required label="配置名称："  style="width:48%">
              <el-input v-model="addData.cfgName" placeholder="请输入配置名称"></el-input>
            </el-form-item>
            <el-form-item required label="子网掩码："  style="width:48%">
              <el-input v-model="addData.cfgNetmask"  placeholder="请输入子网掩码"></el-input>
            </el-form-item>
            <el-form-item required label="网关："  style="width:48%">
              <el-input v-model="addData.cfgGateway"  placeholder="请输入网关"></el-input>
            </el-form-item>
            <el-form-item required label="门禁ip：" style="width:48%">
              <el-input v-model="addData.cfgGateIp" placeholder="请输入门禁ip"></el-input>
            </el-form-item>
            <el-form-item required label="DNS：" style="width:48%">
              <el-input v-model="addData.cfgDns" placeholder="请输入DNS"></el-input>
            </el-form-item>
            <el-form-item label="门外摄像头ip：" style="width:48%;">
              <el-input v-model="addData.cfgIpc1Ip" placeholder="请输入门外摄像头ip"></el-input>
            </el-form-item>
            <el-form-item label="门内摄像头ip：" style="width:48%;">
              <el-input v-model="addData.cfgIpc2Ip" placeholder="请输入门内摄像头ip"></el-input>
            </el-form-item>
            <el-form-item  label="门禁：">

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
        >
        <div style="text-align:center;">
          <h2>是否删除该ip?</h2>
          <el-button @click="delData.show = false">取 消</el-button>
          <el-button type="primary" @click="deleteMj"> 确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import {createIp,updateIp,delIp,getIpList} from "@/api/access";
export default {
  data() {
    return {
      currRowId:0,
      currRow:{},
      condition:{
        ld:{
          options:[{
          value: '选项1',
          label: '黄金糕'
        }],
          value:''
        },
        lc:{
          options:[{
          value: '选项1',
          label: '黄金糕'
        }],
          value:''
        },
        cfgGateway:''
      },
      ip_list: [],
      pageNo: 1,
      pageSize:10,
      totalPage:1,
      addData:{
        "show":false,
        "type":'add',
        "title":'新增',
        "buildingsId":"8",
        "buildingsName":"楼栋8号",
        "cfgDns":"",//	dns		false	string
        "cfgVpnAccount":"",//	VPN账号		false	
        "cfgVpnIp":"",//	VPN服务器地址		false	
        "cfgVpnPwd":"",//	VPN密码
        "cfgNetmask":"",
        "cfgGateway":"",
        "cfgGateIp":"",
        "cfgName":"",
        "cfgIpc1Ip":"",
        "cfgIpc2Ip":"",	//楼内摄像头IP			
        "zonesNetworkStoreyUpdateReqVOList":[
          {
            "buildingsId":"8",
            "buildingsName":"楼栋8号",
            "buildingsStoreyId":"1",
            "buildingsStoreyName":"1层"
          }
        ]
      },
      delData:{
        show:false,
        id:0
      },
    }
  },
  created() {
    this.init_iplist()
  },
  methods: {
    dateChange(){
      console.log(this.condition.zxlxsj)
    },
    handleSelectionChange(val){
      if(this.currRowId == val.id){
        this.currRowId = 0;
        this.currRow = '';
      }else{
        this.currRowId = val.id;
        this.currRow = val;
      }
    },
    init_iplist(){
      getIpList({
        pageNo:this.pageNo,
        pageSize:this.pageSize
      }).then(data =>{
        console.log(data)
        if(data.data.data){
          this.ip_list = data.data.data.list;
          this.totalPage = data.data.data.total;
        }else{
          this.$message(data.data.msg)
        }
      })
    },
    openDatail(id){
      this.detailData.show = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.init_iplist();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.init_iplist()
    },
    openAdd(type){
      this.addData.type = type;
      
      if(type == 'add'){
        this.addData.title = '新增';
        this.addData.cfgDns = '';
        this.addData.cfgVpnAccount = '';
        this.addData.cfgVpnIp = '';
        this.addData.cfgVpnPwd = '';
        this.addData.cfgNetmask = '';
        this.addData.cfgGateway = '';
        this.addData.cfgGateIp = '';
        this.addData.cfgName = '';
        this.addData.cfgIpc1Ip = '';
        this.addData.cfgIpc2Ip = '';	
      }else{
        if(this.currRowId == 0){
          this.$message('请先选择要修改的ip')
          return
        }
        this.addData.title = '修改';
        
        var row = this.currRow;
        this.addData.cfgDns = row.cfgDns;
        this.addData.cfgVpnAccount = row.cfgVpnAccount;
        this.addData.cfgVpnIp = row.cfgVpnIp;
        this.addData.cfgVpnPwd = row.cfgVpnPwd;
        this.addData.cfgNetmask = row.cfgNetmask;
        this.addData.cfgGateway = row.cfgGateway;
        this.addData.cfgGateIp = row.cfgGateIp;
        this.addData.cfgName = row.cfgName;
        this.addData.cfgIpc1Ip = row.cfgIpc1Ip;
        this.addData.cfgIpc2Ip = row.cfgIpc2Ip;	
      }
      this.addData.show = true
    },
    aOrU(){
      var data = this.addData;
      var postData = {
        "cfgDns":data.cfgDns,
        "cfgVpnAccount":data.cfgVpnAccount,
        "cfgVpnIp":data.cfgVpnIp,
        "cfgVpnPwd":data.cfgVpnPwd,
        "cfgNetmask":data.cfgNetmask,
        "cfgGateway":data.cfgGateway,
        "cfgGateIp":data.cfgGateIp,
        "cfgName":data.cfgName,
        "cfgIpc1Ip":data.cfgIpc1Ip,
        "cfgIpc2Ip":data.cfgIpc2Ip,	//楼内摄像头IP		
      }
      if(data.type == 'add'){
        createIp({
          "buildingsId":"8",
          "buildingsName":"楼栋8号",
          "zonesNetworkStoreyCreateReqVOList":[
            {
              "buildingsId":"8",
              "buildingsName":"楼栋8号",
              "buildingsStoreyId":"1",
              "buildingsStoreyName":"1层",
            }
          ],
          ...postData
        }).then(data =>{
          console.log(data)
          if(data.data.data){
            this.$message('添加成功');
            this.init_iplist()
            this.addData.show = false;
          }else{
            this.$message(data.data.msg)
          }
        })
      }else{
        updateIp({
          "id":this.currRowId,
          "zonesNetworkStoreyCreateReqVOList":{
            id:this.currRowId
          },
          ...postData
        }).then(data =>{
          console.log(data)
          if(data.data.data){
            this.$message('修改成功');
            this.init_iplist()
            this.addData.show = false;
          }else{
            this.$message(data.data.msg)
          }
        })
      }
    },
    openDelete(){
      if(this.currRowId == 0){
          this.$message('请先选择要删除的ip')
          return
      }
      this.delData.show = true;
    },
    deleteMj(){
      delIp({
        id:this.currRowId
      }).then(data =>{
        if(data.data.data){
          this.$message('删除成功');
          this.init_iplist()
          this.delData.show = false;
        }else{
          this.$message(data.data.msg)
        }
      })
    },
    exportData(){
      alert('导出数据')
    },
    openHd(id){
      this.hdData.show = true;
      this.hdData.id = id;
    },
    hdConfim(){
      this.hdData.show = false;
    },
    handleChange(value) {
      console.log(value);
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