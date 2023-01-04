<template>
  <div class="app-container">
      <div class="condition-groups">
        <div class="condition-box">
          <div class="condition-title">通行区域名称：</div>
          <div class="condition-val">
            <el-input
              style="width: 80%" v-model="condition.mjxlh" placeholder="请输入通行区域名称"></el-input>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">楼栋：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.ld.value" placeholder="请选择楼栋">
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
          <div class="condition-title">通行科室：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.kqz.value" placeholder="请选择通行科室">
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
          <div class="condition-title">通行区域状态：</div>
          <div class="condition-val">
            <el-select  style="width: 80%" v-model="condition.mjzt.value" placeholder="请选择通行区域状态：" >
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
          <div class="condition-title">访客是否可通行：</div>
          <div class="condition-val">
            <el-select  style="width: 80%" v-model="condition.mjzt.value" placeholder="访客是否可通行：" >
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
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button class="reset" type="primary" icon="el-icon-refresh">重置</el-button>
        </div>
      </div>
      <div class="mj-info">
        <div class="mj-table">
          <div class="mj-btn-groups">
            <el-button type="primary" size="small" @click="openAOrU('add')">新增</el-button>
            <el-button type="primary" size="small" @click="openAOrU('update')">修改</el-button>
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
                prop="xh">
              </el-table-column>
              <el-table-column
                label="通行区域名称"
                prop="ld">
              </el-table-column>
              <el-table-column
                label="通行范围"
                prop="lc">
              </el-table-column>
              <el-table-column
                label="通行科室"
                prop="mjxlh">
              </el-table-column>
              <el-table-column
                label="访客是否可通行"
                prop="mjzt">
              </el-table-column>
              <el-table-column
                prop="txqy"
                label="访客通行数量">
              </el-table-column>
              <el-table-column
                label="通行区域状态">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.kzjc"
                    active-color="#487FFF"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="mjqysj"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="txqy"
                label="操作用户">
              </el-table-column>
              <el-table-column
                width="120"
                label="操作">
                <template>
                  <el-button type="primary" size="small" @click="openAOrU('detail')">详情</el-button>
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
      
      <el-dialog
        :title="addOrUpdate.title"
        :visible.sync="addOrUpdate.show"
        :append-to-body="true"
        :class=" addOrUpdate.type == 'detail'?'hideFooter':''"
        width="680px">
        <div class="tx-top">
          <div class="tx-top-title">通行区域信息</div>
          <el-form size="small" label-width="160px" style="width:50%;margin:20px 0;" :model="addOrUpdate">
            <el-form-item required label="通行区域名称：">
              <el-input :readonly="addOrUpdate.type == 'detail'" v-model="addOrUpdate.name" placeholder="请输入区域名称"></el-input>
            </el-form-item>
            <el-form-item required label="访客是否可通行：">
              <el-radio-group :readonly="addOrUpdate.type == 'detail'" v-model="addOrUpdate.fkktx">
                <el-radio label="是" style="margin-right:20px"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input :readonly="addOrUpdate.type == 'detail'" type="textarea" v-model="addOrUpdate.bz"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="tx-bottom">
          <div class="tb-tabs-box">
            <div class="tabs-item" :class="addOrUpdate.area_data.type == 'fw'?'active':''" @click="fkChange('fw')">通行范围（{{addOrUpdate.area_data.fw_num}}）</div>
            <div class="tabs-item" :class="addOrUpdate.area_data.type == 'ks'?'active':''" @click="fkChange('ks')">通行科室（{{addOrUpdate.area_data.ks_num}}）</div>
          </div>
          <div v-show="addOrUpdate.type != 'detail'" class="area-add" @click="addArea">新增</div>
          <div class="tb-data-box">
            <el-table
              height="300"
              :data="addOrUpdate.area_data.fw_list"
              stripe 
              fit
              v-show="addOrUpdate.area_data.type == 'fw'"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                label="楼栋"
                prop="ld">
              </el-table-column>
              <el-table-column
                label="楼层"
                prop="lc">
              </el-table-column>
              <el-table-column
                label="操作" v-if="addOrUpdate.type != 'detail'">
                <template slot-scope="scope">
                  <span class="del-btn" @click="delArea(scope.row.id,'fw')">删除</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table
              height="300"
              :data="addOrUpdate.area_data.ks_list"
              stripe 
              fit
              v-show="addOrUpdate.area_data.type == 'ks'"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                label="科室"
                prop="ks">
              </el-table-column>
              <el-table-column
                label="管理员名称"
                prop="name">
              </el-table-column>
              <el-table-column
                label="手机号码"
                prop="tel">
              </el-table-column>
              <el-table-column
                label="操作" v-if="addOrUpdate.type != 'detail'">
                <template slot-scope="scope">
                  <span class="del-btn" @click="delArea(scope.row.id,'ks')">删除</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <el-dialog
          width="800px"
          :title="addOrUpdate.area_data.sub_title"
          :visible.sync="addOrUpdate.area_data.showadd"
          append-to-body>
          <div class="add-btns"> 
            <el-form size="small" inline style="margin:20px 0;" :model="addOrUpdate">
              <div style="display:inline-block;width:75%" v-show="addOrUpdate.area_data.type == 'fw'">
                <el-form-item required label="楼栋">
                  <el-select v-model="condition.ld.value" placeholder="请选择楼栋">
                    <el-option
                      v-for="item in condition.ld.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item required label="楼层" style="width:50%">
                  <el-select v-model="condition.ld.value" placeholder="请选择楼层">
                    <el-option
                      v-for="item in condition.ld.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <el-form-item required label="科室"  v-show="addOrUpdate.area_data.type == 'ks'">
                <el-input v-model="addOrUpdate.area_data.sub_data.ks_name" placeholder="请输入科室名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="small" type="primary" icon="el-icon-search">搜索</el-button>
                <el-button size="small" class="reset" type="primary" icon="el-icon-refresh">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="add-tables">
            <el-table
              height="300"
              :data="addOrUpdate.area_data.fw_list"
              stripe 
              fit
              v-show="addOrUpdate.area_data.type == 'fw'"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="序号"
                prop="ld">
              </el-table-column>
              <el-table-column
                label="楼栋"
                prop="ld">
              </el-table-column>
              <el-table-column
                label="楼层"
                prop="lc">
              </el-table-column>
            </el-table>
            <el-table
              height="300"
              :data="addOrUpdate.area_data.ks_list"
              stripe 
              fit
              v-show="addOrUpdate.area_data.type == 'ks'"
              tooltip-effect="dark"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="科室"
                prop="ks">
              </el-table-column>
              <el-table-column
                label="管理员名称"
                prop="name">
              </el-table-column>
              <el-table-column
                label="手机号码"
                prop="tel">
              </el-table-column>
              <el-table-column
                label="部门人数"
                prop="tel">
              </el-table-column>
            </el-table>
          </div>
        </el-dialog>

        <span slot="footer" class="dialog-footer" >
          <el-button @click="addOrUpdate.show = false">取 消</el-button>
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
          <h2>是否删除该通行区域?</h2>
          <el-button @click="delData.show = false">取 消</el-button>
          <el-button type="primary" @click="deleteMj"> 确 定</el-button>
        </div>
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