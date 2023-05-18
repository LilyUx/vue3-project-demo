<script setup lang="ts">
import { onMounted } from "vue";
defineProps<{ msg: string }>();

onMounted(() => {
  console.log(11);
});
</script>

<template>
  <div class="detail-panel" />
</template>

<style lang="less" scoped>
.read-the-docs {
  color: #f70808;
  div {
    color: red;
  }
}
</style>
