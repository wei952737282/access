<template>
  <div class="dashboard-container">
    <div class="home-box">
      <div class="box-head">
        <span class="box-title">用户统计</span>
      </div>
      <div class="box-body">
        <ul class="box-group">
          <li class="box-item" v-for="item in yhtj_list" :key="item.title">
            <div class="box-icon">
              <img :src="item.icon" alt="">
            </div>
            <div class="box-info">
              <div class="box-info-title">{{item.title}}</div>
              <div class="box-info-nums">{{item.nums}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-box">
      <div class="box-head">
        <span class="box-title">门禁统计</span>
      </div>
      <div class="box-body">
        <ul class="box-group">
          <li class="box-item" v-for="item in mjtj_list" :key="item.title">
            <div class="box-icon">
              <img :src="item.icon" alt="">
            </div>
            <div class="box-info">
              <div class="box-info-title">{{item.title}}</div>
              <div class="box-info-nums">{{item.nums}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="home-box charts-box">
      <div class="box-head">
        <div class="time-box">
          访问时间:
          <el-date-picker
            v-model="fw_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="box-left">
          <span class="box-title">统计折线图</span> <br>
          <span class="box-subtitle">
            数量/日期
          </span>
        </div>
        <div class="home-box-tabs">
          <div class="home-tab" :class="{'active':home_tab_i == 0}" @click="changeChart(0)">企业用户通行</div>
          <div class="home-tab" :class="{'active':home_tab_i == 1}" @click="changeChart(1)">访客通行</div>
        </div>
      </div>
      <div class="box-body">
        <v-chart ref="home-charts" id="home-charts" :option="option" />
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getMj } from '@/api/home';

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import * as echarts from "echarts";
console.log(echarts)
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  components:{
    VChart
  },
  data(){
    return {
      yhtj_list:[
        {
          icon:require('@/assets/images/yhzs.png'),
          title:'用户总数',
          nums:0
        },
        {
          icon:require('@/assets/images/qyyh.png'),
          title:'企业用户',
          nums:0
        },
        {
          icon:require('@/assets/images/hzph.png'),
          title:'患者、陪护、探视',
          nums:0
        },
        {
          icon:require('@/assets/images/zdry.png'),
          title:'重点人员',
          nums:0
        },
        {
          icon:require('@/assets/images/txzl.png'),
          title:'员工/访客同行总量',
          nums:0
        }
      ],
      mjtj_list:[
        {
          icon:require('@/assets/images/mjsl.png'),
          title:'门禁数量',
          nums:1
        },
        {
          icon:require('@/assets/images/zxmj.png'),
          title:'在线门禁',
          nums:2
        },
        {
          icon:require('@/assets/images/lxmj.png'),
          title:'离线门禁',
          nums:3
        },
        {
          icon:require('@/assets/images/ldlc.png'),
          title:'楼栋楼层数量',
          nums:4
        }
      ],
      fw_time:'',
      home_tab_i:0,
      option:{
        xAxis: {
          type: 'category',
          data: ['2022-1-1','2022-1-2','2022-1-3','2022-1-4','2022-1-5','2022-1-6','2022-1-7'],
          boundaryGap: true,
          axisLabel:{
              show:true,
              interval:0,
              color:'#000000',
              fontSize: 12
          },
          axisLine:{
              lineStyle:{
                  color:'#B1B7BE'
              }
          }
        },
        yAxis: {
        type: 'value',
        axisLine:{
            lineStyle:{
                show:false,
                width:0,
                color: '#969EA5'
            },
            fontSize: 12
        },
        splitLine:{
            show: true,
            lineStyle: {
                type:'dashed',
                color:'#263039'
            }
        },
        axisTick:{
            show: false
        }
        },
        series: [
        {
          data: [1,2,5,1,6,8,7],
          type: 'line',
          smooth: false, // 折线是否圆滑
          symbol: 'circle',
          itemStyle:{
              color:'rgb(77,130,254)',
              normal:{
                  lineStyle:{
                      color:'none'
                  }
              }
          },
          areaStyle:{
              normal:{
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgb(77,130,254)", // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: "rgba(77,130,254,.5)", // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(77,130,254,.1)", // 100% 处的颜色
                    },
                  ],
                  globalCoord: false, // 缺省为 false
                },
              }
          }
        }
        ],
        grid:{
            left:'0%',
            right:'4%',
            top:'10%',
            bottom:'6%',
            containLabel: true
        }
      }
    }
  },
  created(){
    getMj().then( data => {
      var data = data.data.data;
      console.log(data)
      this.mjtj_list[0].nums = data.gatesCount;
      this.mjtj_list[1].nums = data.onLineCount;
      this.mjtj_list[2].nums = data.offLineCount;
      this.mjtj_list[3].nums = data.buildingsCount;

    })
  },
  methods:{
    changeChart(i){
      this.home_tab_i = i;
      //检测是否已经存在echarts实例，如果不存在，则不再去初始化
      let myChart = echarts.getInstanceByDom(document.getElementById('home-charts'));
      console.log(myChart)
      if (myChart == null) {
        myChart = echarts.init(document.getElementById('home-charts'));
      }
      this.option.series[0].data = [9,8,5,4,1,2,6];
      console.log(this.option)
      myChart.setOption(this.option);
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.home-box{
  width: 95%;
  background: #FFFFFF;
  border-radius: 0.2rem;
  padding: 0.14rem 0.26rem;
  margin-bottom: 16px;
}
.charts-box{
  padding-top: 30px;
}
.box-title{
  font-weight: 700;
}
.box-subtitle{
  font-size: 12px;
  line-height: 24px;
  color: #ccc;
}
.box-group{
  overflow: hidden;
}
.box-item{
  float: left;
  width: 15%;
  min-width: 210px;
  font-weight: 700;
  .box-icon{
    float: left;
    margin-right: 10px;
  }
  .box-info{
    float: left;
    padding-top: 8px;
    .box-info-nums{
      color: rgb(72,127,255);
    }
  }
}
.box-left{
  float: left;
}
.time-box{
  float: right;
}
.home-box-tabs{
  display: flex;
  justify-content: center;
  .home-tab{
    padding: 0 20px;
    font-weight: 700;
    position: relative;
    cursor: pointer;
    &.active{
      color:rgb(72, 127, 255);
      &::after{
        content:'';
        position: absolute;
        width:40%;
        left: 30%;
        height: 4px;
        background: rgb(72, 127, 255);
        bottom: -20px;
      }
    }
  }
}
#home-charts{
  height: 300px;
  margin-top: 20px;
}
</style>
