<template>
  <div class="app-container">
      <div class="condition-groups">
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
          <div class="condition-title">门禁序列号：</div>
          <div class="condition-val">
            <el-input
              style="width: 80%" v-model="condition.gateGuid" placeholder="请输入序列号"></el-input>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">门禁状态：</div>
          <div class="condition-val">
            <el-select v-model="condition.mjzt.value" placeholder="请选择门禁状态">
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
          <div class="condition-title">门禁启用时间：</div>
          <div class="condition-val">
            <el-time-picker
              is-range
              style="width: 80%"
              v-model="condition.enableTimeStart"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">最新上线时间：</div>
          <div class="condition-val">
            <el-time-picker
              is-range
              style="width: 80%"
              v-model="condition.gateLastLogin"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围">
            </el-time-picker>
          </div>
        </div>
        <div class="condition-box">
          <div class="condition-title">最新离线时间：</div>
          <div class="condition-val">
            <el-time-picker
              is-range
              style="width: 80%"
              v-model="condition.gateLastLogout"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
              @change="dateChange"
              >
            </el-time-picker>
          </div>
        </div>
        <div class="condition-box">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button class="reset" type="primary" icon="el-icon-refresh">重置</el-button>
        </div>
      </div>
      <div class="mj-info">
        <div class="info-box">
          <div class="info-item"  v-for="item in mj_info" :key="item.title">
            <span class="info-value">{{ item.value }}</span>
            <span class="info-title">{{ item.title }}</span>
          </div>
        </div>
        <div class="mj-table">
          <div class="mj-btn-groups">
            <el-button type="primary" size="small" @click="openAOrU('add')">新增</el-button>
            <el-button type="primary" size="small" @click="openAOrU('update')">修改</el-button>
            <el-button type="primary" size="small" @click="openDelete">删除</el-button>
            <el-button type="primary" size="small" @click="openMulti">批量设置</el-button>
            <el-button type="primary" size="small" @click="exportData">导出</el-button>
          </div>
          <div class="mj-table-box">
            <el-table
              ref="multipleTable"
              height="300"
              :data="mj_list"
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
                label="楼栋"
                width="60"
                prop="buildingsName">
              </el-table-column>
              <el-table-column
                label="楼层"
                width="60"
                prop="buildingsStoreyName">
              </el-table-column>
              <el-table-column
                label="门禁序列号"
                prop="gateGuid">
              </el-table-column>
              <el-table-column
                label="门禁状态">
                <template slot-scope="scope">
                  {{ scope.row.status == 0?'正常':'离线' }}
                </template>
              </el-table-column>
              <el-table-column
                prop="txqy"
                label="通行区域"
                width="80">
              </el-table-column>
              <el-table-column
                prop="gateModel"
                label="设备型号">
              </el-table-column>
              <el-table-column
                width="100"
                label="口罩检测">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.mask"
                    active-color="#487FFF"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0"
                    @change="mjStatusChange(scope.row)"
                    @click.native="stopUp"
                    >
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                width="100"
                label="体温检测">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.twCheck"
                    active-color="#487FFF"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0"
                    @change="mjStatusChange(scope.row)"
                    @click.native="stopUp">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                width="100"
                label="低温检测">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.dwCheck"
                    active-color="#487FFF"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0"
                    @change="mjStatusChange(scope.row)"
                    @click.native="stopUp">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="enableTimeStart"
                label="门禁启用时间">
              </el-table-column>
              <el-table-column
                prop="gateLastLogin"
                label="最新上线时间">
              </el-table-column>
              <el-table-column
                prop="gateLastLogout"
                label="最新离线时间">
              </el-table-column>
              <el-table-column
                width="120"
                label="操作">
                <template slot-scope="scope">
                  <el-dropdown trigger="click">
                    <el-button type="primary" size="small">
                      更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="openMore(scope.row.id,1,scope.row,'远程操作')">远程操作</el-dropdown-item>
                      <el-dropdown-item @click.native="openMore(scope.row.id,2,scope.row,'详情')">详情</el-dropdown-item>
                      <el-dropdown-item @click.native="openMore(scope.row.id,3,scope.row,'更换设备')">更换设备</el-dropdown-item>
                      <el-dropdown-item @click.native="openMore(scope.row.id,4,scope.row,'网络配置')">网络配置</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
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
              <el-input v-model="moreDiaData.xq.gateGuid" disabled></el-input>
            </el-form-item>
            <el-form-item required label="型号："  style="width:48%">
              <el-input v-model="moreDiaData.xq.xh" disabled></el-input>
            </el-form-item>
            <el-form-item required label="类型："  style="width:48%">
              <el-radio-group v-model="moreDiaData.xq.gateType">
                <el-radio label="1">单元机</el-radio>
                <!-- <el-radio label="2">围墙机</el-radio>
                <el-radio label="3">共享机</el-radio> -->
              </el-radio-group>
            </el-form-item>
            <el-form-item required label="门禁通行方向："  style="width:48%">
              <el-radio-group v-model="moreDiaData.xq.direction">
                <el-radio label="1" :disabled="moreDiaData.xq.direction!=1">正面</el-radio>
                <el-radio label="2" :disabled="moreDiaData.xq.direction!=2">反面</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item required label="门禁后台密码：" style="width:100%">
              <el-input v-model="moreDiaData.xq.gateAdminPwd" disabled></el-input>
            </el-form-item>
            <div class="xq-tag">位置配置</div>
            <el-form-item required label="楼栋：">
              <el-input v-model="moreDiaData.xq.buildingsName" disabled></el-input>
            </el-form-item>
            <el-form-item required label="楼层：">
              <el-input v-model="moreDiaData.xq.buildingsStoreyName" disabled></el-input>
            </el-form-item>
            <el-form-item  label="选择坐标：">
              <el-input v-model="moreDiaData.xq.gateGps" disabled></el-input>
            </el-form-item>
            <div class="xq-tag">网关配置</div>
            <el-form-item  label="VPN服务器：">
              <el-input v-model="moreDiaData.xq.cfgVpnIp" disabled></el-input>
            </el-form-item>
            <el-form-item  label="VPN账号：">
              <el-input v-model="moreDiaData.xq.cfgVpnAccount" disabled></el-input>
            </el-form-item>
            <el-form-item  label="VPN密码：">
              <el-input v-model="moreDiaData.xq.cfgVpnPwd" disabled></el-input>
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
              <el-input v-model="moreDiaData.wlpz.cfgVpnIp" ></el-input>
            </el-form-item>
            <el-form-item  label="VPN账号：">
              <el-input v-model="moreDiaData.wlpz.cfgVpnAccount" ></el-input>
            </el-form-item>
            <el-form-item  label="VPN密码：">
              <el-input v-model="moreDiaData.wlpz.cfgVpnPwd" ></el-input>
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
        @close="clearaddData"
        width="680px">
          <el-form inline size="small" label-width="120px" :model="addOrUpdate">
            <div class="xq-tag">基本信息</div>
            <el-form-item required label="门禁序列号："  style="width:48%">
              <el-input v-model="addOrUpdate.gateGuid"></el-input>
            </el-form-item>
            <el-form-item required label="型号："  style="width:48%">
              <el-select style="width:180px" v-model="addOrUpdate.gateModel.value" placeholder="请选择型号">
                <el-option
                  v-for="item in addOrUpdate.gateModel.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="类型："  style="width:48%">
              <el-radio-group v-model="addOrUpdate.gateType">
                <el-radio :label="1">单元机</el-radio>
                <!-- <el-radio label="2">围墙机</el-radio>
                <el-radio label="3">共享机</el-radio> -->
              </el-radio-group>
            </el-form-item>
            <el-form-item required label="门禁通行方向："  style="width:48%">
              <el-radio-group v-model="addOrUpdate.direction">
                <el-radio :label="1">正面</el-radio>
                <el-radio :label="2">反面</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item required label="门禁后台密码：" style="width:100%">
              <el-input v-model="addOrUpdate.gateAdminPwd" ></el-input>
            </el-form-item>
            <div class="xq-tag">位置配置</div>
            <el-form-item required label="楼栋：">
              <el-select style="width:180px" v-model="addOrUpdate.ld.value" placeholder="请选择楼栋">
                <el-option
                  v-for="item in addOrUpdate.ld.options"
                  :key="item.value"
                  :label="item.buildingsName"
                  :value="item.buildingsId" @click.native="addOrUpdate.ld.label = item.buildingsName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="楼层：">
              <el-select style="width:180px" v-model="addOrUpdate.lc.value"  placeholder="请选择楼层">
                <el-option
                  v-for="item in addOrUpdate.lc.options"
                  :key="item.value"
                  :label="item.buildingsStoreyName"
                  :value="item.buildingsStoreyId" @click.native="addOrUpdate.lc.label = item.buildingsStoreyName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="选择坐标：" style="width:96%;" class="position">
              <el-input v-model="addOrUpdate.gateGps">
                <el-button slot="append" style="color:#409EFF">选择坐标</el-button>
              </el-input>
            </el-form-item>
            <div class="xq-tag">网关配置</div>
            <el-form-item  label="VPN服务器：">
              <el-input v-model="addOrUpdate.cfgVpnIp" ></el-input>
            </el-form-item>
            <el-form-item  label="VPN账号：">
              <el-input v-model="addOrUpdate.cfgVpnAccount" ></el-input>
            </el-form-item>
            <el-form-item  label="VPN密码：">
              <el-input v-model="addOrUpdate.cfgVpnPwd" ></el-input>
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
          <el-button type="primary" @click="delMj"> 确 定</el-button>
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
          <div class="multi-step2-box" v-if="multiData.type != 'enableTimeStart'">
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
              v-model="multiData.enableTimeStart"
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

import { getLdList,getLdInfo} from '@/api/building';
import {createMj,updateMj,deleteMj,getMjList} from '@/api/access'
export default {
  data() {
    return {
      currRowId:0,
      currRow:null,
      condition:{
        ld:{
          options:[{
          value: 1,
          label: '111'
        }],
          value:''
        },
        lc:{
          options:[{
          value: 1,
          label: '111'
        }],
          value:''
        },
        gateGuid:'',
        mjzt:{
          options:[{
          value: 1,
          label: '111'
        }],
          value:''
        },
        enableTimeStart:'',
        gateLastLogin:'',
        gateLastLogout:''
      },
      mj_info:[{
        title:'门禁总数',
        value:0
      },{
        title:'当前在线',
        value:0
      },{
        title:'门禁在线率',
        value:0
      },{
        title:'当前离线',
        value:0
      },{
        title:'离线超过24小时',
        value:0
      }],
      mj_list: [{
        "id":1,
        "gateGuid":1,
        "gateModel":1,
        "gateType": 1,
        "direction":1,
        "buildingsId":1,
        "buildingsName":"楼栋1号",
        "buildingsStoreyId":1,
        "buildingsStoreyName":"楼层1号",
        "cfgVpnAccount":'11111',
        "cfgVpnIp":'111.111.111',
        "cfgVpnPwd":'123456',
        "gateGps":'12345.789,98765.321',
        "mask":0,
        "status":0,
        "twCheck":0,
        "dwCheck":0,
        "gateOnline":0,
        "gateName":"显示名称1",
      },{
        "id":2,
        "gateGuid":2,
        "gateModel":1,
        "gateType": 1,
        "direction":1,
        "buildingsId":1,
        "buildingsName":"楼栋1号",
        "buildingsStoreyId":1,
        "buildingsStoreyName":"楼层1号",
        "cfgVpnAccount":'11111',
        "cfgVpnIp":'111.111.111',
        "cfgVpnPwd":'123456',
        "gateGps":'12345.789,98765.321',
        "mask":0,
        "status":0,
        "twCheck":0,
        "dwCheck":0,
        "gateOnline":0,
        "gateName":"显示名称2",
      }],
      multipleSelection: [],
      dialogVisible:false,
      diaType:1,
      moreDiaData:{
        yccz:{
        },
        xq:{
          gateGuid:'11111',
          gateModel:'11111',
          gateType:1,
          direction:1,
          gateAdminPwd:'111',
          buildingsName:'111',
          buildingsStoreyName:'111',
          gateGps:'11111',
          cfgVpnIp:'111',
          cfgVpnAccount:'1111',
          cfgVpnPwd:'111'
        },
        ghsb:{
          old_xlh:'123456',
          new_xlh:'',
          reason:''
        },
        wlpz:{
          cfgVpnIp:'',
          cfgVpnAccount:'',
          cfgVpnPwd:'',
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
        gateGuid:'',
        gateModel:{
          value:1,
          options:[{
            value: 1,
            label: '型号1'
          }],
        },
        gateType:1,
        direction:1,
        gateAdminPwd:'',
        ld:{
          value:1,
          label:'',
          options:[{
            buildingsId: 1,
            buildingsName: '楼栋1号'
          }],
        },
        lc:{
          value:1,
          label:'',
          options:[{
            buildingsStoreyId: 1,
            buildingsStoreyName	: '1层'
          }],
        },
        gateGps:'',
        cfgVpnIp:'',
        cfgVpnAccount:'',
        cfgVpnPwd:''
      },
      delData:{
        show:false,
        id:0
      },
      multiData:{
        show:false,
        step:1,
        title:{
          mask:'口罩检测',
          twCheck:'体温检测',
          dwCheck:'低温检测',
          enableTimeStart:'门禁启用时间'
        },
        type:'',
        mask:0,
        twCheck:0,
        dwCheck:0,
        enableTimeStart:'',
      }
    }
  },
  created() {
    this.initMjList()
  },
  methods: {
    handleSelectionChange(val){
      if(this.currRowId == val.id){
        this.currRowId = 0;
        this.currRow = '';
      }else{
        this.currRowId = val.id;
        this.currRow = val;
      }
    },
    initMjList(){
      getMjList({
        pageNo:1,
        pageSize:10
      }).then(data =>{
        console.log(data)
      })
    },
    dateChange(){
      console.log(this.condition.gateLastLogout)
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
      if(this.addOrUpdate.gateGuid===""){
        this.$message('门禁序列号不能为空')
        return
      }
      if(this.addOrUpdate.gateAdminPwd===""){
        this.$message('门禁后台密码不能为空')
        return
      }
      var data = this.addOrUpdate
      if(this.addOrUpdate.type == 'add'){
        createMj({
          "gateGuid":data.gateGuid,
          "gateModel":data.gateModel,
          "gateType": data.gateType,
          "direction":data.direction,
          "buildingsId":data.ld.buildingsId,
          "buildingsName":data.ld.buildingsName,
          "buildingsStoreyId":data.lc.buildingsStoreyId,
          "buildingsStoreyName":data.lc.buildingsStoreyName,
          "cfgVpnAccount":data.cfgVpnAccount,
          "cfgVpnIp":data.cfgVpnIp,
          "cfgVpnPwd":data.cfgVpnPwd,
          "gateGps":data.gateGps,
          "mask":0,
          "status":0,
          "twCheck":0,
          "dwCheck":0,
          "gateOnline":0,
          "gateName":"显示名称",
          "isPush":"N",
          "gateAppVer":0
        }).then(data =>{
          console.log(data)
          this.$message('添加成功')
        })
      }else{
        updateMj({
          "id": this.currRowId,
          "gateGuid":data.gateGuid,
          "gateModel":data.gateModel,
          "gateType": data.gateType,
          "direction":data.direction,
          "buildingsId":data.ld.buildingsId,
          "buildingsName":data.ld.buildingsName,
          "buildingsStoreyId":data.lc.buildingsStoreyId,
          "buildingsStoreyName":data.lc.buildingsStoreyName,
          "cfgVpnAccount":data.cfgVpnAccount,
          "cfgVpnIp":data.cfgVpnIp,
          "cfgVpnPwd":data.cfgVpnPwd,
          "gateGps":data.gateGps,
          "mask":0,
          "status":0,
          "twCheck":1,
          "dwCheck":0,
          "gateOnline":0,
          "gateName":"显示名称",
          "isPush":"N",
          "gateAppVer":0
        }).then(data =>{
          console.log(data.data)
          this.$message('修改成功')
        })
        this.addOrUpdate.show = false
      }
    },
    clearaddData(){
      this.addOrUpdate.gateGuid = '';
      this.addOrUpdate.gateModel.value = 1;
      this.addOrUpdate.gateType = 1;
      this.addOrUpdate.direction = 1;
      this.addOrUpdate.gateAdminPwd = '';
      this.addOrUpdate.ld.value = 1;
      this.addOrUpdate.lc.value = 1;
      this.addOrUpdate.gateGps = '';
      this.addOrUpdate.cfgVpnIp = '';
      this.addOrUpdate.cfgVpnAccount = '';
      this.addOrUpdate.cfgVpnPwd = '';
    },
    openAOrU(type){
      this.addOrUpdate.type == type;
      if(type == 'add'){
        this.addOrUpdate.title = '新增';
      }else{
        this.addOrUpdate.title = '修改';
        if(this.currRowId == 0){
          this.$message('请先选择门禁')
          return;
        }
        var row = this.currRow;
        this.addOrUpdate.gateGuid = row.gateGuid;
        this.addOrUpdate.gateModel.value = row.gateModel;
        this.addOrUpdate.gateType = row.gateType;
        this.addOrUpdate.direction = row.direction;
        this.addOrUpdate.gateAdminPwd = row.gateAdminPwd;
        this.addOrUpdate.ld.value = row.buildingsId;
        this.addOrUpdate.lc.value = row.buildingsStoreyId;
        this.addOrUpdate.gateGps = row.gateGps;
        this.addOrUpdate.cfgVpnIp = row.cfgVpnIp;
        this.addOrUpdate.cfgVpnAccount = row.cfgVpnAccount;
        this.addOrUpdate.cfgVpnPwd = row.cfgVpnPwd;
      }
      this.addOrUpdate.show = true;
    },
    openDelete(){
      if(this.currRowId == 0){
        this.$message('请先选择门禁');
        return
      }
      this.delData.show = true;
    },
    delMj(){
      deleteMj({
        id:this.currRowId
      }).then(data =>{
        console.log(data);
        this.initMjList();
      })
      this.delData.show = false;
    },
    openMulti(){
      this.multiData.show = true;
    },
    exportData(){
      alert('导出数据')
    },
    multiChange(){

    },
    mjStatusChange(row){ // 各种检测状态改变
      console.log(row)
      console.log(row.mask)
    },
    stopUp(e){
      var e = e|| window.event;
      e.stopPropagation()
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