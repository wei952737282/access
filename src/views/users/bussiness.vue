<template>
  <div class="app-container">
      <div class="condition-groups">
        <div class="condition-box">
          <div class="condition-title">所属部门：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.ld.value" placeholder="请选择所属部门">
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
          <div class="condition-title">开门权限：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.lc.value" placeholder="请选择开门权限">
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
          <div class="condition-title">所属考勤组：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.kqz.value" placeholder="所属考勤组">
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
          <div class="condition-title">员工状态：</div>
          <div class="condition-val">
            <el-select  style="width: 80%" v-model="condition.mjzt.value" placeholder="请选择员工状态：" >
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
            <el-button type="primary" size="small" @click="openAOrU('add')">新增</el-button>
            <el-button type="primary" size="small" @click="openAOrU('update')">修改</el-button>
            <el-button type="primary" size="small" @click="importData">导入</el-button>
            <el-button type="primary" size="small" @click="exportData">导出</el-button>
          </div>
          <div class="mj-table-box">
            <el-table
              ref="multipleTable"
              height="300"
              :data="user_list"
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
                prop="id">
              </el-table-column>
              <el-table-column
                label="用户头像">
                <template slot-scope="scope">
                  <img :src="scope.row.avatar" alt="">
                </template>
              </el-table-column>
              <el-table-column
                label="编号"
                prop="memberId">
              </el-table-column>
              <el-table-column
                label="员工名称"
                prop="nickname">
              </el-table-column>
              <el-table-column
                label="手机号"
                width="80"
                prop="mobile">
              </el-table-column>
              <el-table-column
                prop="dept.name"
                label="所属部门"
                width="80">
              </el-table-column>
              <el-table-column
                prop="accessCardNum"
                label="门禁卡号">
              </el-table-column>
              <el-table-column
                prop="mjqysj"
                label="通行区域"
                width="80">
              </el-table-column>
              <el-table-column
                prop="zxsxsj"
                label="考勤组">
              </el-table-column>
              <el-table-column
                width="100"
                label="员工状态">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.status"
                    active-color="#487FFF"
                    inactive-color="#ff4949"
                    :active-value="0"
                    :inactive-value="1">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="exportData(scope.row)">详情</el-button>
                  <el-button type="primary" size="small" @click="exportData(scope.row)">删除</el-button>
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
        :title="moreDiaData.title"
        :visible.sync="dialogVisible"
        :append-to-body="true"
        @closed="diaClose"
        width="680px">
        <div class="yccz-dialog" v-if="diaType == 1">
          <ul class="yccz-groups">
            <li class="yccz-item" :class="ycType == 'yckm'? 'active' :''" @click="selectYccz('yckm')">远程开门</li>
            <li class="yccz-item" :class="ycType == 'rlkm'? 'active' :''" @click="selectYccz('rlkm')">人脸开门</li>
            <li class="yccz-item" :class="ycType == 'cqrj'? 'active' :''" @click="selectYccz('cqrj')">重启软件</li>
            <li class="yccz-item" :class="ycType == 'tbsy'? 'active' :''" @click="selectYccz('tbsy')">同步所有门卡</li>
            <li class="yccz-item" :class="ycType == 'tbmm'? 'active' :'' " @click="selectYccz('tbmm')">同步密码</li>
            <li class="yccz-item" :class="ycType == 'tbrl'? 'active' :'' " @click="selectYccz('tbrl')">同步人脸特征</li>
            <li class="yccz-item" :class="ycType == 'tbgg'? 'active' :'' " @click="selectYccz('tbgg')">同步广告</li>
            <li class="yccz-item" :class="ycType == 'scsb'? 'active' :'' " @click="selectYccz('scsb')">上传设备信息</li>
          </ul>
        </div>
        <div class="yccz-dialog" v-else-if="diaType == 2">
          <el-form inline size="small" label-width="120px" :model="moreDiaData.xq">
            <div class="xq-tag">基本信息</div>
            <el-form-item required label="门禁序列号："  style="width:48%">
              <el-input v-model="moreDiaData.xq.mjxlh" disabled></el-input>
            </el-form-item>
            <el-form-item required label="型号："  style="width:48%">
              <el-input v-model="moreDiaData.xq.xh" disabled></el-input>
            </el-form-item>
            <el-form-item required label="类型："  style="width:48%">
              <el-radio-group v-model="moreDiaData.xq.lx">
                <el-radio label="单元机"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item required label="门禁通行方向："  style="width:48%">
              <el-radio-group v-model="moreDiaData.xq.mjtxfx">
                <el-radio label="正面" :disabled="moreDiaData.xq.mjtxfx!='正面'"></el-radio>
                <el-radio label="反面" :disabled="moreDiaData.xq.mjtxfx!='反面'"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item required label="门禁后台密码：" style="width:100%">
              <el-input v-model="moreDiaData.xq.mjhtmm" disabled></el-input>
            </el-form-item>
            <div class="xq-tag">位置配置</div>
            <el-form-item required label="楼栋：">
              <el-input v-model="moreDiaData.xq.ld" disabled></el-input>
            </el-form-item>
            <el-form-item required label="楼层：">
              <el-input v-model="moreDiaData.xq.lc" disabled></el-input>
            </el-form-item>
            <el-form-item  label="选择坐标：">
              <el-input v-model="moreDiaData.xq.xzzb" disabled></el-input>
            </el-form-item>
            <div class="xq-tag">网关配置</div>
            <el-form-item  label="VPN服务器：">
              <el-input v-model="moreDiaData.xq.VPNfwq" disabled></el-input>
            </el-form-item>
            <el-form-item  label="VPN账号：">
              <el-input v-model="moreDiaData.xq.VPNzh" disabled></el-input>
            </el-form-item>
            <el-form-item  label="VPN密码：">
              <el-input v-model="moreDiaData.xq.VPNmm" disabled></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="yccz-dialog" v-else-if="diaType == 3">
          <el-form label-width="30%" :model="moreDiaData.yccz">
            <el-form-item label="旧门禁序列号：">
              <el-input v-model="moreDiaData.yccz.old_xlh" disabled></el-input>
            </el-form-item>
            <el-form-item label="新门禁序列号：">
              <el-input v-model="moreDiaData.yccz.new_xlh"></el-input>
            </el-form-item>
            <el-form-item label="更换原因：">
              <el-input type="textarea" v-model="moreDiaData.yccz.reason"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="yccz-dialog" v-else-if="diaType == 4">
          <el-form inline size="small" label-width="100px" :model="moreDiaData.yccz">
            <el-form-item  label="VPN服务器：">
              <el-input v-model="moreDiaData.wlpz.vpnfwq" ></el-input>
            </el-form-item>
            <el-form-item  label="VPN账号：">
              <el-input v-model="moreDiaData.wlpz.vpnzh" ></el-input>
            </el-form-item>
            <el-form-item  label="VPN密码：">
              <el-input v-model="moreDiaData.wlpz.vpnmm" ></el-input>
            </el-form-item>
            <el-form-item  label=" "> </el-form-item>
            <el-form-item  label="网关：">
              <el-input v-model="moreDiaData.wlpz.wg" disabled></el-input>
            </el-form-item>
            <el-form-item  label="门禁ip地址：">
              <el-input v-model="moreDiaData.wlpz.mjip" disabled></el-input>
            </el-form-item>
            <el-form-item  label="DNS：">
              <el-input v-model="moreDiaData.wlpz.dns" disabled></el-input>
            </el-form-item>
            <el-form-item  label="子网掩码：">
              <el-input v-model="moreDiaData.wlpz.zwym" disabled></el-input>
            </el-form-item>
            <el-form-item  label="门外摄像头：">
              <el-input v-model="moreDiaData.wlpz.mwsxt" disabled></el-input>
            </el-form-item>
            <el-form-item  label="门内摄像头：">
              <el-input v-model="moreDiaData.wlpz.mnsxt" disabled></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="yccz-dialog" v-else>弹窗出错，请刷新重试</div>
        <span slot="footer" class="dialog-footer" v-if="diaType != 2">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"> {{ diaType == 3 || diaType == 4 ? "确 定" :'下一步'}} </el-button>
        </span>
      </el-dialog>
      
      <el-dialog
        :title="addOrUpdate.title"
        :visible.sync="addOrUpdate.show"
        :append-to-body="true"
        width="680px">
          <el-form inline size="small" label-width="120px" :model="addOrUpdate">
            <div class="xq-tag">基本信息</div>
            <el-form-item required label="门禁序列号："  style="width:48%">
              <el-input v-model="addOrUpdate.mjxlh"></el-input>
            </el-form-item>
            <el-form-item required label="型号："  style="width:48%">
              <el-select style="width:180px" v-model="addOrUpdate.xh.value" placeholder="请选择楼栋">
                <el-option
                  v-for="item in addOrUpdate.xh.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="类型："  style="width:48%">
              <el-radio-group v-model="addOrUpdate.lx">
                <el-radio label="单元机"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item required label="门禁通行方向："  style="width:48%">
              <el-radio-group v-model="addOrUpdate.mjtxfx">
                <el-radio label="正面" ></el-radio>
                <el-radio label="反面" ></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item required label="门禁后台密码：" style="width:100%">
              <el-input v-model="addOrUpdate.mjhtmm" ></el-input>
            </el-form-item>
            <div class="xq-tag">位置配置</div>
            <el-form-item required label="楼栋：">
              <el-select style="width:180px" v-model="addOrUpdate.ld.value" placeholder="请选择楼栋">
                <el-option
                  v-for="item in addOrUpdate.ld.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="楼层：">
              <el-select style="width:180px" v-model="addOrUpdate.lc.value" placeholder="请选择楼栋">
                <el-option
                  v-for="item in addOrUpdate.lc.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="选择坐标：" style="width:96%;" class="position">
              <el-input v-model="addOrUpdate.xzzb">
                <el-button slot="append" style="color:#409EFF">选择坐标</el-button>
              </el-input>
            </el-form-item>
            <div class="xq-tag">网关配置</div>
            <el-form-item  label="VPN服务器：">
              <el-input v-model="addOrUpdate.VPNfwq" ></el-input>
            </el-form-item>
            <el-form-item  label="VPN账号：">
              <el-input v-model="addOrUpdate.VPNzh" ></el-input>
            </el-form-item>
            <el-form-item  label="VPN密码：">
              <el-input v-model="addOrUpdate.VPNmm" ></el-input>
            </el-form-item>
          </el-form>
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
          <h2>是否删除该门禁?</h2>
          <el-button @click="delData.show = false">取 消</el-button>
          <el-button type="primary" @click="deleteMj"> 确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :title="'批量设置' + (multiData.step == 2?'('+ multiData.title[multiData.type] +')':'' )"
        :visible.sync="multiData.show"
        :append-to-body="true"
        :show-close="false"
        width="550px"
        >
        <div class="multi-step1" v-show="multiData.step == 1">
          <ul class="multi-groups">
            <li class="multi-item" :class="multiData.type == index?'active':''" v-for=" (item ,index) in multiData.title" :key="index" @click="multiData.type = index">{{ item }}</li>
          </ul>
        </div>
        <div class="multi-step2" v-show="multiData.step == 2">
          <div class="multi-step2-box" v-if="multiData.type != 'mjqysj'">
            <span>{{ multiData.title[multiData.type] }}状态</span>
            <el-switch
              v-model="multiData[multiData.type]"
              active-color="#487FFF"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0">
            </el-switch>
          </div>
          <div class="multi-step2-box" v-else>
            <span>门禁启用时间：</span>
            <el-time-picker
              is-range
              style="width: 60%"
              v-model="multiData.mjqysj"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <blockquote v-if="multiData.step == 1">
            <el-button @click="multiData.show = false;multiData.type = '';">取 消</el-button>
            <el-button type="primary" @click="multiData.step = 2"> 下一步</el-button>
          </blockquote>
          <blockquote v-else>
            <el-button @click="multiData.step = 1;multiData[multiData.type] = 0;">取 消</el-button>
            <el-button type="primary" @click="multiChange"> 确 定</el-button>
          </blockquote>
        </span>
        
      </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currRowId: 0,
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
      user_list: [{
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
      dialogVisible:false,
      diaType:1,
      moreDiaData:{
        yccz:{
        },
        xq:{
          mjxlh:'11111',
          xh:'11111',
          lx:'单元机',
          mjtxfx:'正面',
          mjhtmm:'111',
          ld:'111',
          lc:'111',
          xzzb:'11111',
          VPNfwq:'111',
          VPNzh:'1111',
          VPNmm:'111'
        },
        ghsb:{
          old_xlh:'123456',
          new_xlh:'',
          reason:''
        },
        wlpz:{
          vpnfwq:'',
          vpnzh:'',
          vpnmm:'',
          wg:'192.168.100.1',
          mjip:'192.168.100.1',
          dns:'192.168.100.1',
          zwym:'192.168.100.1',
          mwsxt:'192.168.100.1',
          mnsxt:'192.168.100.1'
        }
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
          }, {
            value: '2',
            label: '双皮奶'
          }, {
            value: '3',
            label: '蚵仔煎'
          }, {
            value: '4',
            label: '龙须面'
          }, {
            value: '5',
            label: '北京烤鸭'
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
    
    handleSelectionChange(val){
      if(this.currRowId == val.id){
        this.currRowId = 0;
      }else{
        this.currRowId = val.id;
      }
    },
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
        width: 25%;
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