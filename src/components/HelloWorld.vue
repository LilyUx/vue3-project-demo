<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
defineProps<{ msg: string }>();

const count = ref(0);

const state = reactive({
  name: "test",
});

const changeName = () => {
  state.name = "testtesttesttesttesttesttest";
};

onMounted(() => {
  console.log(11);
});
</script>

<template>
  <div class="detail-panel"></div>
</template>

<style lang="less" scoped>
.read-the-docs {
  color: #f70808;
  div {
    color: red;
  }
}
</style>
