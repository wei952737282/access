<template>
  <div class="app-container">
      <div class="condition-groups">
        <div class="condition-box">
          <div class="condition-title">用户账号：</div>
          <div class="condition-val">
            <el-input
              style="width: 80%" v-model="condition.mjxlh" placeholder="请输入用户账号"></el-input>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">登录时间：</div>
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
              style="width: 100%">
              <el-table-column
                label="序号"
                prop="xh">
              </el-table-column>
              <el-table-column
                label="用户账号"
                prop="mjxlh">
              </el-table-column>
              <el-table-column
                label="登录地址"
                prop="mjzt">
              </el-table-column>
              <el-table-column
                prop="txqy"
                label="浏览器">
              </el-table-column>
              <el-table-column
                prop="txqy"
                label="操作用户">
              </el-table-column>
              <el-table-column
                prop="mjqysj"
                label="登录时间">
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
        }],
      multipleSelection: [],
      currentPage: 4,
      totalPage:1000,
      addOrUpdate:{
        title:'新增',
        show:false,
        type:'add',
        mjxlh:'',
        name:'',
        fkktx:'',
        bz:'',
        area_data:{
          type:'fw',
          fw_num:0,
          ks_num:0,
          showadd:false,
          fw_list:[{
            id:0,
            ld:'A',
            lc:'1' 
          },{
            id:0,
            ld:'A',
            lc:'1' 
          }],
          ks_list:[{
            id:0,
            ks:'A',
            name:'tom',
            tel:'1111' 
          }],
          sub_title:'',
          sub_data:{
            fw_list:[{
              id:0,
              ld:'A',
              lc:'1' 
            },{
              id:0,
              ld:'A',
              lc:'1' 
            }],
            ks_list:[{
              id:0,
              ks:'A',
              name:'tom',
              tel:'1111' 
            }],
          }
        }
      },
      delData:{
        show:false,
        id:0
      }
    }
  },
  created() {
  },
  methods: {
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    aOrU(){
      this.addOrUpdate.show = false;
    },
    openAOrU(type){
      this.addOrUpdate.type = type;
      if(type == 'add'){
        this.addOrUpdate.title = '新增通行区域';
      }else if(type == 'update'){
        this.addOrUpdate.title = '修改通行区域';
      }else{
        this.addOrUpdate.title = '通行区域详情';
      }
      this.addOrUpdate.show = true;
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
    fkChange(type){
      this.addOrUpdate.area_data.type = type;
    },
    addArea(){
      this.addOrUpdate.area_data.showadd = true;
      this.addOrUpdate.area_data.sub_title = this.addOrUpdate.area_data.type == 'fw'?'新增通行范围':'新增通行科室'
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