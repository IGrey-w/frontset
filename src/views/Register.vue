<template>
  <div class="register-container">
    <div class="register-card">
      <h2>用户注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <input
              type="text"
              v-model="registerForm.username"
              placeholder="请输入用户名"
              required
              minlength="3"
              maxlength="16"
          />
        </div>
        <div class="form-group">
          <input
              type="password"
              v-model="registerForm.password"
              placeholder="请输入密码"
              required
              minlength="6"
              maxlength="20"
          />
        </div>
        <div class="form-group">
          <input
              type="password"
              v-model="registerForm.confirmPassword"
              placeholder="请再次确认密码"
              required
          />
        </div>

        <!-- 错误提示信息 -->
        <div v-if="errorMessage" class="error-msg">{{ errorMessage }}</div>

        <button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? '注册中...' : '注册' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const isSubmitting = ref(false) // 防止重复点击提交
const errorMessage = ref('')

// 定义表单数据
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: ''
})

// 注册处理逻辑
const handleRegister = async () => {
  // 1. 前端基础校验
  errorMessage.value = ''
  if (registerForm.password !== registerForm.confirmPassword) {
    errorMessage.value = '两次输入的密码不一致！'
    return
  }

  isSubmitting.value = true
  try {
    // 2. 向后端发起注册请求 (假设后端接口为 /api/auth/register)
    const res = await axios.post('/api/auth/register', {
      username: registerForm.username,
      password: registerForm.password
    })

    if (res.data.code === 200) {
      alert('注册成功，请登录！')
      // 3. 注册成功后跳转到登录页
      router.push('/login')
    } else {
      errorMessage.value = res.data.msg || '注册失败，请重试'
    }
  } catch (error: any) {
    console.error(error)
    errorMessage.value = error.response?.data?.msg || '网络异常，请稍后重试'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.register-card {
  width: 400px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #409eff;
}

.error-msg {
  color: #f56c6c;
  font-size: 13px;
  margin-bottom: 15px;
  text-align: left;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #66b1ff;
}

button:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}
</style>