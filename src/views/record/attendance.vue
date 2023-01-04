<template>
  <div class="app-container">
      <div class="condition-groups">
        <div class="condition-box">
          <div class="condition-title">科室：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.kqz.value" placeholder="请选择科室">
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
          <div class="condition-title">员工名称：</div>
          <div class="condition-val">
            <el-input
              style="width: 80%" v-model="condition.mjxlh" placeholder="请输入员工名称"></el-input>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">手机号码：</div>
          <div class="condition-val">
            <el-input
              style="width: 80%" v-model="condition.tel" placeholder="请输入手机号码"></el-input>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">打卡位置：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.ld.value" placeholder="请选择打卡位置">
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
          <div class="condition-title"></div>
          <div class="condition-val">
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">考勤组：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.fk_type.value" placeholder="请选择考勤组">
              <el-option
                v-for="item in condition.fk_type.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">打卡方式：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.lc.value" placeholder="请选择打卡方式">
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
          <div class="condition-title">打卡状态：</div>
          <div class="condition-val">
            <el-select  style="width: 80%" v-model="condition.mjzt.value" placeholder="请选择打卡状态：" >
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
          <div class="condition-title">打卡时间：</div>
          <div class="condition-val">
            <el-time-picker
              is-range
              style="width: 80%"
              v-model="condition.mjqysj"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
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
                label="序号"
                prop="xh">
              </el-table-column>
              <el-table-column
                label="科室"
                prop="ld">
              </el-table-column>
              <el-table-column
                label="员工名称"
                prop="lc">
              </el-table-column>
              <el-table-column
                label="手机号码"
                prop="mjzt">
              </el-table-column>
              <el-table-column
                label="打卡位置"
                prop="mjxlh">
              </el-table-column>
              <el-table-column
                prop="txqy"
                label="考勤组">
              </el-table-column>
              <el-table-column
                prop="sbxh"
                label="打卡方式">
              </el-table-column>
              
              <el-table-column
                prop="kzjc"
                label="打卡状态">
              </el-table-column>
              
              <el-table-column
                prop="mjqysj"
                label="迟到时间（分钟）">
              </el-table-column>
              <el-table-column
                prop="zxsxsj"
                label="打卡时间">
              </el-table-column>
            </el-table>
          </div>
        </div>
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
        title="导出"
        :visible.sync="dialogVisible"
        :append-to-body="true"
        @closed="diaClose"
        width="680px">
          <el-form label-width="30%" :model="export_data">
            <el-form-item label="部门：">
              <el-select  style="width: 80%" v-model="export_data.bm.value" placeholder="请选择部门：" >
                <el-option
                  v-for="item in export_data.bm.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间范围：">
              <el-time-picker
              is-range
              style="width: 80%"
              v-model="export_data.time"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false"> 导出报表 </el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
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
        fk_type:{
          options:[{
          value: '选项1',
          label: '黄金糕'
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
      tableData: [{
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
        },{
          id:1,
          xh: '111',
          ld: '111',
          lc: '111',
          mjxlh:'1111',
          mjzt:'在线',
          txqy:5,
          sbxh:'AA001',
          kzjc:1,
          twjc:0,
          dwjc:1,
          mjkqsj:'',
          zxsxsj:'',
          zxlxsj:'',
        },{
          id:3,
          xh: '111',
          ld: '111',
          lc: '111',
          mjxlh:'1111',
          mjzt:'在线',
          txqy:5,
          sbxh:'AA001',
          kzjc:1,
          twjc:1,
          dwjc:0,
          mjkqsj:'111',
          zxsxsj:'11',
          zxlxsj:'111',
        }],
      multipleSelection: [],
      dialogVisible:false,
      diaType:1,
      export_data:{
        bm:{
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
        time:''
      },
      ycType:'',
      currentPage: 4,
      totalPage:1000,
      addOrUpdate:{
        title:'新增',
        show:false,
        type:'add',
        mjxlh:'',
        xh:{
          value:'1',
          options:[{
            value: '1',
            label: '黄金糕'
          }],
        },
        lx:'单元机',
        mjtxfx:'正面',
        mjhtmm:'',
        ld:{
          value:'1',
          options:[{
            value: '1',
            label: '黄金糕'
          }],
        },
        lc:{
          value:'1',
          options:[{
            value: '1',
            label: '黄金糕'
          }],
        },
        xzzb:'',
        VPNfwq:'',
        VPNzh:'',
        VPNmm:''
      },
      delData:{
        show:false,
        id:0
      },
      multiData:{
        show:false,
        step:1,
        title:{
          kzjc:'口罩检测',
          twjc:'体温检测',
          dwjc:'低温检测',
          mjqysj:'门禁启用时间'
        },
        type:'',
        kzjc:0,
        twjc:0,
        dwjc:0,
        mjqysj:'',
      }
    }
  },
  created() {
  },
  methods: {
    dateChange(){
      console.log(this.condition.zxlxsj)
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    openMore(id,diaType,rowData,title){
      this.dialogVisible = true;
      this.diaType = diaType;
      this.moreDiaData.title = title
      console.log(rowData)
    },
    selectYccz(type){
      this.ycType = type;
    },
    diaClose(){
      this.ycType = ''
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    aOrU(){
      this.addOrUpdate.show = false;
      if(this.addOrUpdate.mjxlh===""){
        alert('门禁序列号不能为空')
        return
      }else if(this.addOrUpdate.mjhtmm){
        alert('门禁后台密码不能为空')
        return
      }

    },
    openAOrU(type){
      this.addOrUpdate.type == type;
      if(type == 'add'){
        this.addOrUpdate.title = '新增';
      }else{
        this.addOrUpdate.title = '修改';
      }
      this.addOrUpdate.show = true;
    },
    openDelete(){
      this.delData.show = true;
    },
    deleteMj(){
      this.delData.show = false;
    },
    openMulti(){
      this.multiData.show = true;
    },
    importData(){
      alert('导入数据')
    },
    exportData(){
      this.dialogVisible = true
    },
    multiChange(){

    }

  }
}
</script>
<style lang="scss" scoped>
  .condition-groups{
    height: 1.5rem;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    .condition-box{
      width: 20%;
      height: 50%;
      display: flex;
      align-items: center;
      .condition-title{
        width: 26%;
        text-align: right;
        margin-right: 10px;
        flex-shrink: 0;
      }
      .condition-val{
        width: 70%;
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
    top: 1.8rem;
    bottom: 0;
    left: 20px;
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
  .yccz-groups{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .yccz-item{
      width: 48%;
      height: 36px;
      margin: 10px auto;
      line-height: 36px;
      text-align: center;
      color: #999;
      box-shadow: 0 2px 5px 1px rgba(0,0,0,.3);
      cursor: pointer;
    }
    .yccz-item.active,.yccz-item:hover{
      background: rgb(235,241,255);
      color: #409EFF;
    }
  }
  .xq-tag{
    height: 16px;
    line-height: 16px;
    border-left: 4px solid #409EFF;
    width: 100%;
    display: inline-block;
    padding-left: 10px;
    margin: 10px auto;
  }
  .pagination{
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
  }
  .multi-groups{
    display: flex;
    flex-wrap: wrap;
    align-content: center;
  }
  .multi-item{
    width: 45%;
    margin: 10px auto;
    height: 36px;
    margin: 10px auto;
    line-height: 36px;
    text-align: center;
    color: #999;
    -webkit-box-shadow: 0 2px 5px 1px rgba(0,0,0,0.3);
    box-shadow: 0 2px 5px 1px rgba(0,0,0,0.3);
    cursor: pointer;
  }
  .multi-item:hover, .multi-item.active{
    background: #ebf1ff;
    color: #409EFF;
  }
  .multi-step2-box{
    padding: 20px 0;
    text-align: center;
  }
</style>