<template>
  <div class="app-container">
      <div class="condition-groups">
        <div class="condition-box">
          <div class="condition-title">访客名称：</div>
          <div class="condition-val">
            <el-input
              style="width: 80%" v-model="condition.username" placeholder="请输入访客名称"></el-input>
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
          <div class="condition-title">访客类型：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.type.value" placeholder="请选择访客类型">
              <el-option
                v-for="item in condition.type.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">所属科室：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.lc.value" placeholder="请选择所属科室">
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
          <div class="condition-title">访客状态：</div>
          <div class="condition-val">
            <el-select v-model="condition.mjzt.value" placeholder="请选择访客状态">
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
          <div class="condition-title">创建时间：</div>
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
          <div class="condition-title">钥匙有效时间：</div>
          <div class="condition-val">
            <el-time-picker
              is-range
              style="width: 80%"
              v-model="condition.zxsxsj"
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
                width="60"
                prop="ld">
              </el-table-column>
              <el-table-column
                label="楼层"
                width="60"
                prop="lc">
              </el-table-column>
              <el-table-column
                label="门禁序列号"
                prop="mjxlh">
              </el-table-column>
              <el-table-column
                label="门禁状态"
                width="80"
                prop="mjzt">
              </el-table-column>
              <el-table-column
                prop="txqy"
                label="通行区域"
                width="80">
              </el-table-column>
              <el-table-column
                prop="sbxh"
                label="设备型号">
              </el-table-column>
              <el-table-column
                width="100"
                label="低温检测">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.dwjc"
                    active-color="#487FFF"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="mjqysj"
                label="门禁启用时间">
              </el-table-column>
              <el-table-column
                prop="zxsxsj"
                label="最新上线时间">
              </el-table-column>
              <el-table-column
                prop="zxlxsj"
                label="最新离线时间">
              </el-table-column>
              <el-table-column
                width="120"
                label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="exportData(scope.row)">详情</el-button>
                </template>
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
      
  </div>
</template>
<script>
export default {
  data() {
    return {
      condition:{
        username:'',
        tel:'',
        type:{
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
        mjxlh:'',
        mjzt:{
          options:[{
          value: '选项1',
          label: '黄金糕'
        }],
          value:''
        },
        mjqysj:'',
        zxsxsj:'',
        zxlxsj:''
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
      
      currentPage: 4,
      totalPage:1000
      
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
    exportData(){
      alert('导出数据')
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
      width: 24%;
      height: 50%;
      display: flex;
      align-items: center;
      .condition-title{
        width: 40%;
        text-align: right;
        margin-right: 10px;
        flex-shrink: 0;
      }
      .condition-val{
        width: 60%;
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