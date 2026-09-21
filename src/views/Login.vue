<template>
  <div class="login-container">
    <div class="login-card">
      <h2>用户登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>用户名</label>
          <input
              type="text"
              v-model="form.username"
              placeholder="请输入用户名"
              required
          />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
              required
          />
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
        <button type="button" class="register-btn" @click="$router.push('/register')">
          去注册
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios' // 改用 axios 发送请求

const router = useRouter()
const loading = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  try {
    // 发送登录请求到后端，路径根据你之前的配置拼接
    const res = await axios.post('/api/auth/login', form)

    // 后端返回的标准格式是 Result<T>，包含 code, data, message
    if (res.data.code === 200) {
      // 登录成功后，通常需要将 Token 存入 localStorage
      const { token, username } = res.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', username);

      // 跳转到商品列表
      router.push('/products');
    } else {
      alert(res.data.message || '登录失败，请检查用户名或密码');
    }
  } catch (error) {
    console.error('登录请求异常:', error);
    alert('网络异常，请稍后重试');
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f5f7fa;
}

.login-card {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #606266;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #409eff;
}

.login-btn, .register-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.login-btn {
  background-color: #409eff;
  color: white;
  margin-bottom: 10px;
}

.login-btn:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.register-btn {
  background-color: #f4f4f5;
  color: #606266;
}

.register-btn:hover {
  background-color: #e9e9eb;
}
</style>