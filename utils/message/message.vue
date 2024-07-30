<template>
    <transition name="message-fade">
      <div v-if="visible" :class="['el-message', typeClass]" @mouseenter="clearTimer" @mouseleave="startTimer">
       <!-- <i :class="iconClass"></i> -->
        <p>{{ message }}</p>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const props = defineProps({
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info'
    },
    duration: {
      type: Number,
      default: 3000
    }
  })
  
  const visible = ref(false);
  let timer = null;

  const startTimer = () => {
    if (props.duration > 0) {
      timer = setTimeout(() => {
        visible.value = false;
      }, props.duration);
    }
  };

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
  };

  onMounted(() => {
    visible.value = true;
    startTimer();
  });

  onBeforeUnmount(() => {
    clearTimer();
  });

  const typeClass = computed(() => `el-message--${props.type}`);
  const iconClass = computed(() => {
    switch (props.type) {
      case 'success':
        return 'el-icon-success';
      case 'warning':
        return 'el-icon-warning';
      case 'error':
        return 'el-icon-error';
      default:
        return 'el-icon-info';
    }
  });
  
  </script>
  
  <style>
  .el-message {
    
    align-items: center;
    padding: 7.5px 15px;
    z-index:9999;
    margin:0 auto;
    border-radius: 8px;
    margin-bottom: 15px;
    background-color: #f0f0f0;
    transition: opacity 0.3s;
  }
  
  .el-message--info {
    background-color: #909399;
    color: white;
  }
  
  .el-message--success {
    background-color: #67c23a;
    color: white;
  }
  
  .el-message--warning {
    background-color: #e6a23c;
    color: white;
  }
  
  .el-message--error {
    background-color: #f56c6c;
    color: white;
  }
  
  .el-message i {
    margin-right: 10px;
  }
  
  .message-fade-enter-active, .message-fade-leave-active {
    transition: opacity 0.15s;
  }
  
  
  .message-fade-enter-from, .message-fade-leave-to {
    opacity: 0;
  }
  
  </style>
