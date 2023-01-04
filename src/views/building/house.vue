<template>
  <div class="app-container">
      <ul class="ld-list">
        <li class="ld-item" :class="ld_index == index?'active':''" v-for="(item,index) in ld_list" :key="item.id" @click="ldChange(item.id,index)">
          <span class="ld-name">{{ item.buildingName }}</span>
          <span class="ld-num">({{ item.storeyCount }})</span>
        </li>
      </ul>
      <div class="condition-groups">
        <div class="condition-box">
          <div class="condition-title">楼层：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.lc.value" placeholder="请选择楼层">
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
          <div class="condition-title">绑锁状态：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.kqz.value" placeholder="请选择绑锁状态">
              <el-option
                v-for="item in condition.kqz.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">状态：</div>
          <div class="condition-val">
            <el-select  style="width: 80%" v-model="condition.mjzt.value" placeholder="请选择状态：" >
              <el-option
                v-for="item in condition.mjzt.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
  
        <div class="condition-box">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button class="reset" type="primary" icon="el-icon-refresh">重置</el-button>
        </div>
      </div>
      <div class="mj-info">
        <div class="mj-table">
          <div class="mj-btn-groups">
            <el-button type="primary" size="small" @click="openAdd()">新增</el-button>
            <el-button type="primary" size="small" @click="openUpdate()">修改</el-button>
            <el-button type="primary" size="small" @click="openDelete">删除</el-button>
            <el-button type="primary" size="small" @click="exportData">导出</el-button>
          </div>
          <div class="mj-table-box">
            <el-table
              ref="multipleTable"
              height="300"
              :data="lc_list"
              stripe 
              fit
              highlight-current-row
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
                prop="id">
              </el-table-column>
              <el-table-column
                label="楼层"
                prop="floorName">
              </el-table-column>
              <el-table-column
                label="绑锁状态">
                <template slot-scope="scope">
                  {{ scope.row.bindingStatus == 1? '已绑锁' : '未绑锁' }}
                </template>
              </el-table-column>
              <el-table-column
                label="门禁序列号"
                prop="mjxlh">
              </el-table-column>
              <el-table-column
                label="状态">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.status"
                    active-color="#487FFF"
                    inactive-color="#ff4949"
                    @click.native="clickStatus"
                    @change="changeStatus"
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
        </div>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNo"
          :page-sizes="[5, 10, 20, 50, 100]"
          :page-size="100"
          layout="total, sizes, prev, pager, next"
          :total="totalPage">
        </el-pagination>
      </div>
      
      <el-dialog
        title="新增"
        :visible.sync="addData.show"
        :append-to-body="true"
        width="380px">
        <el-form size="small" label-width="100px" style="width:80%;margin:20px auto;" :model="addData">
          <el-form-item required label="新增类型：">
            <el-radio-group v-model="addData.type">
              <el-radio label="ld" style="margin-right:20px">楼栋</el-radio>
              <el-radio label="lc">楼层</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item required label="楼栋名称：" v-show="addData.type == 'ld'">
            <el-input  v-model="addData.buildingName" placeholder="请输入楼栋名称"></el-input>
          </el-form-item>
          <el-form-item required label="所属楼栋：" v-show="addData.type == 'lc'">
            <el-select style="width:100%;" v-model="addData.lc.value" placeholder="请选择所属楼栋">
              <el-option
                v-for="item in addData.lc.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item required label="楼层名称：" v-show="addData.type == 'lc'">
            <el-input  v-model="addData.floorName" placeholder="请输入楼层名称"></el-input>
          </el-form-item>
          <el-form-item required label="楼层数量：" v-show="addData.type == 'lc'">
            <el-input  v-model="addData.floorNumber" placeholder="请输入楼层数量"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" >
          <el-button @click="canceladd">取 消</el-button>
          <el-button type="primary" @click="addLd"> 确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改"
        :visible.sync="updateData.show"
        :append-to-body="true"
        width="380px">
        <el-form size="small" label-width="100px" style="width:80%;margin:20px auto;" :model="updateData">
          <el-form-item required label="新增类型：">
            <el-radio-group v-model="updateData.type" @input="updateTypeChange">
              <el-radio label="ld" style="margin-right:20px">楼栋</el-radio>
              <el-radio label="lc">楼层</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item required label="楼栋名称：" v-show="updateData.type == 'ld'">
            <el-input  v-model="updateData.buildingName" placeholder="请输入楼栋名称"></el-input>
          </el-form-item>
          <el-form-item required label="所属楼栋：" v-show="updateData.type == 'lc'">
            <el-select style="width:100%;" v-model="updateData.lc.value" placeholder="请选择所属楼栋">
              <el-option
                v-for="item in updateData.lc.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item required label="楼层名称：" v-show="updateData.type == 'lc'">
            <el-input  v-model="updateData.floorName" placeholder="请输入楼层名称"></el-input>
          </el-form-item>
          <el-form-item required label="楼层数量：" v-show="updateData.type == 'lc'">
            <el-input  v-model="updateData.floorNumber" placeholder="请输入楼层数量"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" >
          <el-button @click="cancelUpdate">取 消</el-button>
          <el-button type="primary" @click="update"> 确 定</el-button>
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
          <h2>是否删除{{delData.name}}?</h2>
          <el-button @click="delData={show:false,name:'',id:0}">取 消</el-button>
          <el-button type="primary" @click="deleteMj"> 确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>
<script>
import { createLd,updateLd,deleteLd,createLc,updateLc,deleteLc,getLdList,getLcList } from '@/api/building'
export default {
  data() {
    return {
      ld_index:0,
      curr_ld_id:0,
      currRow:'',
      currRowId:0,
      currRowName: '',
      ld_list:[],
      condition:{
        ld:{
          options:[{
          value: '选项1',
          label: '黄金糕'
        }],
          value:''
        },
        tel:'',
        lc:{
          options:[{
          value: '1',
          label: '全部'
        },{
          value: '2',
          label: '门禁卡'
        },{
          value: '3',
          label: '刷脸'
        },{
          value: '4',
          label: '无权限'
        }],
          value:''
        },
        mjxlh:'',
        mjzt:{
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
        mjqysj:'',
        zxsxsj:'',
        zxlxsj:'',
        kqz:{
          options:[{
          value: '1',
          label: 'A考勤组'
        },{
          value: '2',
          label: 'B考勤组'
        },{
          value: '3',
          label: 'C考勤组'
        },{
          value: '4',
          label: 'D考勤组'
        }],
          value:''
        },
      },
      lc_list: [{
          id:1,
          xh: '111',
          ld: '111',
          lc: '111',
          mjxlh:'1111',
          mjzt:'在线',
          txqy:5,
          sbxh:'AA001',
          kzjc:0,
          twjc:1,
          dwjc:1,
          mjkqsj:'',
          zxsxsj:'',
          zxlxsj:'',
        }],
      multipleSelection: [],
      pageNo: 1,
      totalPage:0,
      delData:{
        show:false,
        name:'',
        id:0
      },
      addData:{
        show:false,
        type:'ld',
        buildingName:'',
        lc:{
          options:[{
          value: '1',
          label: '全部'
        }],
          value:''
        },
        floorName:'',
        floorNumber:''
      },
      updateData:{
        show:false,
        type:'ld',
        buildingName:'',
        lc:{
          options:[{
          value: '1',
          label: '全部'
        }],
          value:''
        },
        floorName:'',
        floorNumber:''
      }
    }
  },
  async created() {
    await this.initLdList();
    this.initLcList();
  },
  methods: {
    handleSelectionChange(val){
      if(this.currRowId == val.id){
        this.currRowId = 0;
        this.currRowName = '';
        this.currRow = '';
      }else{
        this.currRowId = val.id;
        this.currRowName = val.floorName;
        this.currRow = val;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    openDelete(){
      if(this.currRowId>0){
        this.delData.id = this.currRowId;
        this.delData.name = '楼层' + this.currRowName;
      }else{
        this.delData.id = this.curr_ld_id;
        this.delData.name = this.ld_list[this.ld_index].buildingName;
      }
      this.delData.show = true;
    },
    exportData(){
      alert('导出数据')
    },
    openAdd(){
      this.addData.show = true
    },
    canceladd(){
      this.addData.lc.value = '';
      this.addData.type = 'ld';
      this.addData.floorName = '';
      this.addData.floorNumber = '';
      this.addData.show = false;
    },
    openUpdate(){
      this.updateData.show = true
      this.updateData.type = 'ld'
    },
    cancelUpdate(){
      this.updateData.type = 'ld';
      this.updateData.lc.value = '';
      this.updateData.floorName = '';
      this.updateData.floorNumber = '';
      this.updateData.show = false;
    },
    ldChange(id,index){
      this.ld_index = index;
      this.curr_ld_id = id;
      this.pageNo = 1;
      this.initLcList()
    },
     addLd(){
      if(this.addData.type == 'ld'){
        createLd({
          buildingName:this.addData.buildingName
        }).then(data =>{
          if(data.data.data){
            this.addData.show = false;
            this.initLdList()
          }
        })
      }else{
        createLc({
          "buildingId":this.addData.lc.value + '',
          "floorName":this.addData.floorName,
          "floorNumber": parseInt(this.addData.floorNumber)
        }).then( async data =>{
            this.addData.show = false;
            await this.initLdList();
            this.initLcList();
            
        })
      }
    },
    update(){
      if(this.updateData.type == 'ld'){
        updateLd({
          id:this.curr_ld_id,
          buildingName:this.addData.buildingName
        }).then(data =>{
          console.log(data)
          if(data.data.data){
            this.updateData.show = false;
            this.initLdList()
          }
        })
      }else{
        updateLc({
          id:1,
          "buildingId":this.updateData.lc.value + '',
          "floorName":this.updateData.floorName,
          "floorNumber": parseInt(this.updateData.floorNumber)
        }).then(data =>{
          console.log(data)
          if(data.data.data){
            this.updateData.show = false
            getLcList({
              pageNo:1,
              pageSize:10,
              buildingId:this.curr_ld_id
            }).then(data =>{
              console.log(data)
            })
          }
        })
      }
    },
    updateTypeChange(val){
      if(val == 'lc'){
        if(this.currRowId == 0){
          this.$message('请先选择楼层');
          this.updateData.show = false;
        }else{
          this.updateData.lc.value = parseInt(this.currRow.buildingId);
          this.updateData.floorName = this.currRowName;
          this.updateData.floorNumber = this.currRow.floorNumber;
        }
      }
    },
    deleteMj(){
      if(this.currRowId>0){
        deleteLc({
          id:this.currRowId
        }).then(data =>{
          if(data.data.data){
            this.initLcList();
          }
        })
      }else{
        deleteLd({
          id:this.curr_ld_id
        }).then(data =>{
          if(data.data.data){
            this.initLdList();
          }
        })
      }
      this.currRowId = 0;
      this.currRowName = '';
      this.currRow = '';
      this.delData={show:false,name:'',id:0}
    },
    clickStatus(e){
      var e = e || window.event;
      e.stopPropagation(); 
    },
    changeStatus(val){
      console.log(val)
    },
    initLdList(){
      return getLdList({}).then(data =>{
        this.ld_list = data.data.data;
        var arr = [];
        this.ld_list.forEach((item,index) =>{
          arr.push({
            label:item.buildingName,
            value:item.id
          })
        })
        this.addData.lc.options = arr;
        this.updateData.lc.options = arr;
        if(this.curr_ld_id == 0){
          this.curr_ld_id = this.ld_list[0].id;
        }
      })
    },
    initLcList(){
      getLcList({
        "buildingId":this.curr_ld_id + '',
        "pageNo":this.pageNo,
        "pageSize": 10
      }).then(data =>{
        var obj = data.data.data;
        this.totalPage = obj.total;
        this.lc_list = data.data.data.list
      })
    }

  }
}
</script>
<style lang="scss" scoped>
  .ld-list{
    width: 200px;
    position: absolute;
    background: #fff;
    top: 6px;
    bottom: 0;
    overflow-y: auto;
    padding: 0;
    .ld-item{
      height: 40px;
      line-height: 40px;
      padding-left: 30px;
      padding-right: 4px;
      cursor: pointer;
      .ld-name{
        float: left;
      }
      .ld-num{
        float: right;
      }
    }
    .ld-item.active{
      background: rgb(218, 229, 255);
      color: #222;
    }
  }
  .condition-groups{
    height: 1.5rem;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    
    width: calc(100% - 210px);
    margin-left: 210px;
    .condition-box{
      width: 24%;
      height: 50%;
      display: flex;
      align-items: center;
      .condition-title{
        width: 30%;
        text-align: right;
        margin-right: 10px;
        flex-shrink: 0;
      }
      .condition-val{
        width: 70%;
      }
    }
    .condition-box:nth-child(4) .condition-title{
      width: auto;
      text-align: left;
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
    top: 1.8rem;
    bottom: 14px;
    left: 230px;
    right: 20px;
    min-height: 580px;
    padding: 20px;
    .info-box{
      display: flex;
      margin-bottom: 0.2rem;
      .info-item{
        width: 1.8rem;
        height: 0.8rem;
        border-radius: 10px;
        text-align: center;
        margin-right: 0.2rem;
        background: url(../../assets/images/mjgl-bg.png) center center no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #fff;
        .info-value{
          font-size: 16px;
          line-height: 24px;
        }
      }
    }
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
  .tx-top-title{
    margin-left: 36px;
    padding-left: 8px;
    border-left: 4px solid #409EFF;
  }
  .tb-tabs-box{
    margin-bottom: 12px;
  }
  .tabs-item{
    display: inline-block;
    vertical-align: bottom;
    padding: 0 10px;
    height: 26px;
    line-height: 26px;
    background: #F7F7F7;
    color: #666;
    border-radius: 4px 4px 0px 0px;
    text-align: center;
    cursor: pointer;
    margin-right: 4px;
  }
  .active{
    height: 32px;
    line-height: 32px;
    background: #487FFF;
    color: #fff;
    font-size: 14px;
  }
  .area-add{
    width: 62px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    color: #fff;
    background: #487FFF;
    margin: 10px 0;
    cursor: pointer;
  }
  .del-btn{
    color: red;
    cursor: pointer;
  }
</style>