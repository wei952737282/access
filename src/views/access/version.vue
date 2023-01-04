<template>
  <div class="app-container">
      <div class="condition-groups">
        <div class="condition-box">
          <div class="condition-title">型号：</div>
          <div class="condition-val">
            <el-select
              style="width: 80%" v-model="condition.gateModel.value" placeholder="请选择型号">
              <el-option
                v-for="item in condition.gateModel.options"
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
                prop="gateModel">
              </el-table-column>
              <el-table-column
                label="版本名称"
                prop="editionName">
              </el-table-column>
              <el-table-column
                label="版本号"
                width="60"
                prop="editionRev">
              </el-table-column>
              <el-table-column
                label="型号"
                prop="xh2">
              </el-table-column>
              <el-table-column
                label="下载地址"
                prop="xzdz">
              </el-table-column>
              <el-table-column
                width="100"
                label="状态">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.status"
                    active-color="#487FFF"
                    inactive-color="#ff4949"
                    :active-value="1"
                    :inactive-value="0">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column
                prop="bbms"
                label="版本描述">
              </el-table-column>
              <el-table-column
                prop="cjsj"
                label="创建时间">
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="openDatail(scope.row.id)">详情</el-button>
                  <el-button type="primary" size="small" @click="openHd(scope.row.id)">灰度</el-button>
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
        title="新增"
        :visible.sync="addData.show"
        :append-to-body="true"
        width="680px">
          <el-form inline size="small" label-width="120px" :model="addData">
            <el-form-item required label="版本名称："  style="width:48%">
              <el-input v-model="addData.editionName"></el-input>
            </el-form-item>
            <el-form-item required label="版本号："  style="width:48%">
              <el-input v-model="addData.editionRev" ></el-input>
            </el-form-item>
            <el-form-item required label="型号："  style="width:48%">
              <el-select style="width:184px" v-model="addData.gateModel.value" placeholder="请选择型号">
                <el-option
                  v-for="item in addData.gateModel.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="文件大小：" style="width:48%">
              <el-input v-model="addData.fileSize"  placeholder="请输入文件大小"></el-input>
            </el-form-item>
            <el-form-item required label="MD5：" style="width:48%">
              <el-input v-model="addData.fileMd5" ></el-input>
            </el-form-item>
            <el-form-item required label="上传文件：" class="position60" style="width:48%;">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="addData.gatesFileCreateReqVO.fileList"
                :multiple="false"
                :limit="1"
                >
                <el-button class="upload-btn" size="small" type="primary"><i class="el-icon-upload"></i> 上传文件</el-button>
              </el-upload>
              <div style="position:absolute;top:100%;right:0;width: 134%;">
                支持扩展名: 
                <el-radio-group v-model="addData.gatesFileCreateReqVO.fileType">
                  <el-radio label=".apk" style="margin-right:20px"></el-radio>
                  <el-radio label="二进制文件"></el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item  label="版本说明：">
              <el-input type="textarea" :autosize="{minRows:4}" v-model="addData.gatesFileCreateReqVO.remark" ></el-input>
            </el-form-item>
          </el-form>
        <span slot="footer" class="dialog-footer" >
          <el-button @click="addData.show = false">取 消</el-button>
          <el-button type="primary"  @click="addEdition"> 确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="详情"
        :visible.sync="detailData.show"
        :append-to-body="true"
        width="680px">
          <el-form inline size="small" label-width="120px" :model="detailData">
            <el-form-item required label="版本名称："  style="width:48%">
              <el-input v-model="detailData.editionName" disabled></el-input>
            </el-form-item>
            <el-form-item required label="版本号："  style="width:48%">
              <el-input v-model="detailData.editionRev" disabled></el-input>
            </el-form-item>
            <el-form-item required label="型号："  style="width:48%">
              <el-input v-model="detailData.gateModel" disabled></el-input>
            </el-form-item>
            <el-form-item required label="文件大小：" style="width:48%">
              <el-input v-model="detailData.size" disabled></el-input>
            </el-form-item>
            <el-form-item required=""  label="MD5：" style="width:48%">
              <el-input v-model="detailData.fileMd5" disabled></el-input>
            </el-form-item>
            <el-form-item required  label="下载地址：" style="width:48%;">
              <el-input v-model="detailData.link" disabled></el-input>
            </el-form-item>
            <el-form-item  label="版本说明：">
              <el-input type="textarea" :autosize="{minRows:4}" v-model="detailData.bbsm" disabled></el-input>
            </el-form-item>
          </el-form>
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
          <el-button type="primary" @click="delEdition"> 确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        :visible.sync="hdData.show"
        :append-to-body="true"
        :show-close="false"
        width="512px"
        >
        <el-form style="height:200px;">
          <el-form-item required label="门禁：" label-width="30%">
            <el-cascader
              v-model="hdData.value"
              :options="hdData.data"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" >
          <el-button @click="hdData.show = false">取 消</el-button>
          <el-button type="primary" @click="hdConfim"> 确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import {createEdtion,updateEdtion,getEdtionList,delEdtion,detailEdition,getEdtionDetail} from "@/api/access";
export default {
  data() {
    return {
      currRowId:0,
      currRow:null,
      condition:{
        gateModel:{
          options:[{
          value: '选项1',
          label: '黄金糕'
        }],
          value:''
        }
      },
      tableData: [{
          id:1,
          gateModel: '111',
          editionName: '111',
          editionRev: '111',
          xh2:'1111',
          mjzt:'在线',
          xzdz:5,
          status:0,
          bbms:'',
          cjsj:''
        },{
          id:2,
          gateModel: '111',
          editionName: '111',
          editionRev: '111',
          xh2:'1111',
          mjzt:'在线',
          xzdz:5,
          status:0,
          bbms:'',
          cjsj:''
        },{
          id:3,
          gateModel: '111',
          editionName: '111',
          editionRev: '111',
          xh2:'1111',
          mjzt:'在线',
          xzdz:5,
          status:0,
          bbms:'',
          cjsj:''
        }],
      multipleSelection: [],
      currentPage: 4,
      totalPage:1000,
      addData:{
        show:false,
        editionName:'',
        editionRev:'',
        gateModel:{
          value:'',
          options:[{
            value: 1,
            label: '型号1'
          }],
        },
        gatesFileCreateReqVO:{
          remark:'',
          fileType:'.apk',
          fileOriginalName:'1111',
          filePath:'',
          fileSize:'',
          fileList:[]
        },
        size:'',
        fileMd5:'',
        bbsm:''
      },
      detailData:{
        show:false,
        editionName:'111',
        editionRev:'111',
        gateModel:'111',
        link:'http://baidu.com',
        size:'54kb',
        fileMd5:'1111',
        bbsm:'1111'
      },
      delData:{
        show:false,
        id:0
      },
      hdData:{
        show:false,
        id:1,
        data:[{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则'
          }, {
            value: 'daohang',
            label: '导航'
          }]
        }],
        value:[]
      }
    }
  },
  created() {
    // delEdtion({
    //   id:2
    // }).then(data =>{
    //   console.log(data)
    // })
    getEdtionDetail({
      id:1
    }).then(data =>{
      console.log(data)
    })
    getEdtionList({
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
      if(this.currRowId == val.id){
        this.currRowId = 0;
        this.currRow = '';
      }else{
        this.currRowId = val.id;
        this.currRow = val;
      }
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
    delEdition(){
      this.delData.show = false;
    },
    addEdition(){
      var data = this.addData;

      if(data.editionName === ''){
        this.$message('版本名称不能为空')
        return 
      }
      if(data.editionRev === ''){
        this.$message('版本号不能为空')
        return 
      }
      if(data.gateModel.value === ''){
        this.$message('请选择型号')
        return 
      }
      if(data.fileSize === ''){
        this.$message('文件大小不能为空')
        return 
      }
      if(data.fileMd5 === ''){
        this.$message('Md5不能为空')
        return 
      }
      if(data.gatesFileCreateReqVO.fileList.length === 0){
        this.$message('请选择文件上传')
        return 
      }
      createEdtion({
        "editionName":data.editionName,
        "editionRev":data.editionRev,
        "gateModel":data.gateModel.value,
        "fileSize": data.fileSize,
        "fileMd5": data.fileMd5,
        "fileName":data.gatesFileCreateReqVO.fileList[0].url
      }).then(data =>{
        console.log(data)
      })
    },
    exportData(){
      alert('导出数据')
    },
    openHd(id){
      this.hdData.show = true;
      this.hdData.id = id;
    },
    openDatail(id){
      this.detailData.show = true;
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
      width: 24%;
      display: flex;
      align-items: center;
      .condition-title{
        width: 100px;
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