<script setup lang="ts">
import { h } from "vue";
import InDetailPanel from "../index";
import { DetailPanel } from "../src/types";

const detailData: DetailPanel[] = [
  {
    label: "用户名",
    content: "张三",
    labelIcon: "User",
    labelSlotName: "mytest",
  },
  {
    label: "密码",
    content: "888888",
    labelIcon: "DocumentAdd",
    type: "password",
  },
  { label: "联系方式", content: "1810000000", labelIcon: "Document" },
  { label: "出生日期", content: "2000 00:00", labelIcon: "Postcard" },
  { label: "毕业学校", content: "清华大学", labelIcon: "School" },
  { label: "状态", content: "活着", labelIcon: "SwitchButton", type: "status" },
  { label: "成绩", content: "优秀", labelIcon: "Timer", type: "tag" },
  { label: "住址", content: "中国", labelIcon: "Location" },
  {
    label: "网址",
    content: "who am I",
    labelIcon: "Link",
    hrefLink: "https://element-plus.org",
    type: "link",
  },
  { label: "工作进度", content: "80", type: "progress" },
  // { label: '描述状态', content: '英俊的张三', labelIcon: 'Comment', renderLabel: () => {
  //   return h('span', null, '这是render出来的label')
  // }, renderContent: (item: DetailPanel) => {
  //   console.log(item)
  //   return h('span', null, '支持传参，参数：' + item.content)
  // }},
];
</script>

<template>
  <div class="box">
    <in-detail-panel :data="detailData" title="详情展示"> </in-detail-panel>

    <in-detail-panel :data="detailData" title="详情展示" direction="vertical">
    </in-detail-panel>

    <!-- <DetailPanel1 :data="detailData" direction="vertical" title="详情展示">
      <template v-slot:mytest=""></template>
    </DetailPanel1> -->
  </div>
</template>

<style type="less" scoped>
.box {
  width: 1200px;
}
</style>
