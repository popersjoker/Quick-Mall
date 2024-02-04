
import type { setBlockTracking } from 'vue';

import type { setBlockTracking } from 'vue';

import type { setBlockTracking } from 'vue';
<template>
  <div class="mar">
  <h2>流量分析</h2>
  <el-text class="mx-1" size="default">
    <div class="text">
    是指在获得网站访问量基本数据的情况下对有关数据进行统计、分析，从中发现用户访问网站的规律，并将这些规律与网络营销策略
    等相结合，从而发现目前网络营销活动中可能存在的问题， 并为进一步修正 或重新制定网络营销策略提供依据。当然这样的定义是站
    在网络营销管理的角度来考虑的
    </div>
    <el-row class="bor">

      <el-col :span="3"></el-col>
      <el-col :span="6">

        <el-statistic title="购买数量" :value="count">

          <template #prefix>
            <el-icon :size="size" @click="plus">
              <Plus />
            </el-icon>

          </template>
          <template #suffix>
            <el-icon :size="size" @click="minus">
              <Minus />
            </el-icon>
          </template>
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <Types :types="types"/>
      </el-col>
      <el-col :span="9">
        <div class="el-statistic__head">质保时间</div>
        <Timer :times="times"/>
      </el-col>
    </el-row>

  </el-text>
  <h2>产品说明</h2>
  <el-text class="mx-1" size="default">
    <div class="text">
    网站访问统计分析报告的基础数据源于网站流量统计信息，但其价值远高于原始数据资料。专业的网站访问统计分析报告对网络营销
    的价值。正如专业的财务分析报告对企业经营策略的价值。
    用户行为指标
    用户行为指标主要反映用户是如何来到网站的、在网站上停留了多长时间、访问了哪些页面等，主要的统计指标包括:
    用户在网站的停留时间:
    用户来源网站(也叫“引导网站”) ;
    用户所使用的搜索引擎及其关键词:
    在不同时段的用户访问量情况等。
  </div>
  <h2>产品设计</h2>
  <el-text size="default" class="mx-1">
    <div class="text">
      产品设计是一个涵盖了多个领域和技能的过程，它旨在创造满足特定需求的解决方案，并创造出实用、美观和有吸引力的产品。设计师在产品开发过程中起着至关重要的作用，他们通过深入理解用户需求、市场趋势和技术可行性，将想法转化为实际的产品。

设计师需要具备创新思维、解决问题的能力、对细节的关注和良好的沟通技巧。他们不仅需要了解产品的功能和外观，还需要了解如何将设计理念转化为实际的产品，并确保产品在生产过程中能够实现。

在产品设计的早期阶段，设计师会进行研究和概念设计，以确定产品的方向和特点。随后，他们将进行详细设计，包括外观、结构和功能等方面，并与其他团队成员合作，以确保产品的可行性和可生产性。

产品设计是一个多学科交叉的过程，需要设计师具备广泛的知识和技能。随着技术的发展和市场的变化，设计师需要不断更新自己的知识和技能，以应对不断变化的市场需求和用户期望。
    </div>
  </el-text>
  </el-text>
</div>
</template>
<script>
import { ref } from 'vue'
import Types from "@/components/HomePage/types.vue"
import Timer from "@/components/HomePage/timer.vue"
export default {
  components: {
    Types, Timer
  },
  setup() {
    const count = ref(0);
    return {
      count,
      size: ref(13),
      minus: () => {
        if (count.value == 0) return;
        count.value--;
      }
      , plus: () => {
        if (count.value > 100) return;
        count.value++;
      },
      times: [
        {
          time: '一个月',
          id: 1
        }, {
          time: '一年',
          id: 2
        }, {
          time: '一辈子',
          id: 3
        }
      ],
           types:[
               {
                   type:'经典型',
                   id:1
               },{
                   type:'豪华型',
                   id:2
               },{
                   type:'至尊豪华型',
                   id:3
               }
           ]
    }
  }
}
</script>
<style >
.el-statistic__content {
    padding-left: 2%;
}
.text{
  padding: 10px 20px 10px 20px;
  text-indent: 2em;
  text-align: left;
}
.mar{
  margin:0 auto 0 50px;
}

</style>