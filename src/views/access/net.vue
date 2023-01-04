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
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
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
              :data="tableData"
              stripe 
              fit
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="序号"
                width="60"
                prop="xh">
              </el-table-column>
              <el-table-column
                label="楼栋"
                prop="ld">
              </el-table-column>
              <el-table-column
                label="楼层"
                width="60"
                prop="lc">
              </el-table-column>
              <el-table-column
                label="配置名称"
                prop="pzmc">
              </el-table-column>
              <el-table-column
                label="网关"
                prop="wg">
              </el-table-column>
              <el-table-column
                prop="zwym"
                label="子网掩码">
              </el-table-column>
              <el-table-column
                prop="dns"
                label="DNS">
              </el-table-column>
              <el-table-column
                prop="mjip"
                label="门禁ip">
              </el-table-column>
              <el-table-column
                prop="mwip"
                label="门外摄像头ip">
              </el-table-column>
              <el-table-column
                prop="mnip"
                label="门内摄像头ip">
              </el-table-column>
            </el-table>
          </div>
        </div>pzmc
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="100"
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
              <el-input v-model="addData.pzmc" placeholder="请输入配置名称"></el-input>
            </el-form-item>
            <el-form-item required label="子网掩码："  style="width:48%">
              <el-input v-model="addData.zwym"  placeholder="请输入子网掩码"></el-input>
            </el-form-item>
            <el-form-item required label="网关："  style="width:48%">
              <el-input v-model="addData.wg"  placeholder="请输入网关"></el-input>
            </el-form-item>
            <el-form-item required label="门禁ip：" style="width:48%">
              <el-input v-model="addData.mjip" placeholder="请输入门禁ip"></el-input>
            </el-form-item>
            <el-form-item required label="DNS：" style="width:48%">
              <el-input v-model="addData.dns" placeholder="请输入DNS"></el-input>
            </el-form-item>
            <el-form-item label="门外摄像头ip：" style="width:48%;">
              <el-input v-model="addData.mwip" placeholder="请输入门外摄像头ip"></el-input>
            </el-form-item>
            <el-form-item label="门内摄像头ip：" style="width:48%;">
              <el-input v-model="addData.mnip" placeholder="请输入门内摄像头ip"></el-input>
            </el-form-item>
            <el-form-item  label="门禁：">

            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer" >
          <el-button @click="addData.show = false">取 消</el-button>
          <el-button type="primary" > 确 定</el-button>
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
          <h2>是否删除该门禁?</h2>
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
        wg:''
      },
      tableData: [{
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
        },{
          id:2,
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
        },{
          id:3,
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
      multipleSelection: [],
      currentPage: 4,
      totalPage:1000,
      addData:{
        show:false,
        title:'新增',
        pzmc:'',
        zwym:'',
        wg:'',
        dns:'',
        mjip:'',
        mwip:'',
        mnip:'',
        mjList:[]
      },
      delData:{
        show:false,
        id:0
      },
    }
  },
  created() {
    // createIp({
    //     "buildingsId":"8",
    //     "buildingsName":"楼栋8号",
    //     "cfgNetmask":"111.111",
    //     "cfgGateway":"111.11.11.111",
    //     "cfgGateIp":"111.11.11.111",
    //     "cfgName":"配置1",
    //     "cfgNetmask":"111.111.111",
    //     "zonesNetworkStoreyCreateReqVOList":[
    //       {
    //         "buildingsId":"8",
    //         "buildingsName":"楼栋8号",
    //         "buildingsStoreyId":"1",
    //         "buildingsStoreyName":"1层",
    //       }
    //     ]
    // }).then(data =>{
    //   console.log(data)
    // })
    // updateIp({
    //     "id":6,
    //     "buildingsId":"8",
    //     "buildingsName":"楼栋8号",
    //     "cfgNetmask":"111.111",
    //     "cfgGateway":"111.11.11.111",
    //     "cfgGateIp":"111.11.11.111",
    //     "cfgName":"配置1-改",
    //     "cfgNetmask":"111.111.111",
    //     "zonesNetworkStoreyUpdateReqVOList":[
    //       {
    //         "id":6,
    //         "buildingsId":"8",
    //         "buildingsName":"楼栋8号",
    //         "buildingsStoreyId":"1",
    //         "buildingsStoreyName":"1层"
    //       }
    //     ]
    // }).then(data =>{
    //   console.log(data)
    // })
    
    
    delIp({
      id:1
    }).then(data =>{
      console.log(data)
    })
    getIpList({
      pageNo:1,
      pageSize:10
    }).then(data =>{
      console.log(data)
    })
  },
  methods: {
    dateChange(){
      console.log(this.condition.zxlxsj)
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    openDatail(id){
      this.detailData.show = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    openAdd(){
      this.addData.show = true
    },
    openDelete(){
      this.delData.show = true;
    },
    deleteMj(){
      this.delData.show = false;
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