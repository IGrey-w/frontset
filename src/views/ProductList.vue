<template>
  <div class="container">
    <h2>商品列表</h2>

    <!-- 加载状态 -->
    <div v-if="loading" style="padding: 40px; text-align: center; color: #888;">
      正在加载商品...
    </div>

    <!-- 无数据状态 -->
    <div v-else-if="products.length === 0" style="padding: 40px; text-align: center; color: red;">
      暂无商品数据
    </div>

    <!-- 商品卡片列表 -->
    <div v-else class="product-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <!-- 商品图片（如果没有图片则显示占位符） -->
        <div class="image-box">
          <img :src="product.imageUrl || '/default-product.jpg'" :alt="product.name" />
        </div>

        <!-- 商品信息 -->
        <div class="info">
          <div class="category">{{ product.category }}</div>
          <h3 class="title">{{ product.name }}</h3>
          <p class="desc">{{ product.description }}</p>

          <div class="bottom-row">
            <div class="price">¥<span>{{ product.price }}</span></div>
            <div class="stock">库存: {{ product.stock }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

// 定义商品的 TypeScript 类型
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  stock: number;
}

const products = ref<Product[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await axios.get('/api/products', {
      params: {
        page: 0,
        size: 100
      }
    })

    if (res.status === 200 && res.data.code === 200) {
      const pageResult = res.data.data;
      if (pageResult && Array.isArray(pageResult.content)) {
        products.value = pageResult.content;
      }
    }
  } catch (error: any) {
    console.error('请求失败:', error)
    alert('获取商品失败，请检查后端状态！')
  } finally {
    loading.value = false;
  }
})
</script>

<style scoped>
.container {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 网格布局：自适应卡片排列 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* 卡片样式 */
.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: transform 0.2s;
  background: #fff;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* 图片区域 */
.image-box {
  height: 200px;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 信息区域 */
.info {
  padding: 15px;
}

.category {
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
}

.title {
  font-size: 16px;
  margin: 0 0 5px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.desc {
  font-size: 13px;
  color: #666;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

/* 底部价格与库存 */
.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.price {
  color: #e4393c;
  font-size: 14px;
}

.price span {
  font-size: 20px;
  font-weight: bold;
}

.stock {
  font-size: 12px;
  color: #999;
}
</style>