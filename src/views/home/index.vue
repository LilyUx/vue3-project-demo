<template>
  <div>
    <div class="header">
      <router-link
        v-for="nav in Navs"
        :key="nav.path"
        :to="nav.path"
        class="nav-link"
      >
        {{ nav.meta.title }}
      </router-link>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navs } from "../../router/index";
</script>

<style lang="less" scoped>
.header {
  .nav-link {
    margin: 0 10px;
  }
}
</style>
