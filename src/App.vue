<template>
  <div id="app">
    <h1>电子商务网站</h1>
    <!-- 这是一个导航栏，点击可以跳转 -->
    <nav>
      <router-link to="/login" style="margin-right: 15px;">登录</router-link>
      <router-link to="/register" style="margin-right: 15px;">注册</router-link>
      <router-link to="/product-list">查看商品列表</router-link>
    </nav>
    <hr />

    <!-- 👇 这一行是核心！它负责把登录、注册、商品列表的内容显示在这里 -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
h1 { color: #333; }
nav { margin-bottom: 20px; }
a { text-decoration: none; color: #42b983; }
</style>