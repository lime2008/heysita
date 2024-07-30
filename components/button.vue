<template>
  <button
    :class="buttonClasses"
    @click="handleClick"
    :disabled="props.disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
  import { defineProps, defineEmits, computed } from "vue";

  interface ButtonProps {
    type: "primary" | "plain" | "warning" | "danger" | "info";
    onClick?: () => void;
    disabled?: boolean;
  }

  const props = defineProps<ButtonProps>();
  const emit = defineEmits(["click"]);

  const buttonClasses = computed(() => [
    "el-button",
    `el-button--${props.type}`,
    { "is-disabled": props.disabled },
  ]);

  const handleClick = () => {
    if (props.onClick && !props.disabled) {
      props.onClick();
    }
  };
</script>

<style scoped>
  .el-button {
    display: inline-block;
    padding: 8px 16px;
    font-size: 14px;
    border: 1px solid transparent;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .el-button--primary {
    background-color: #a347ff;
    color: #fff;
  }

  .el-button--plain {
    background-color: #ffffff;
    color: #000000;
  }
  .el-button--plain:hover {
    background-color: #f2f2f2;
  }
  .el-button--primary:hover {
    background-color: #b366ff;
  }

  .el-button--success {
    background-color: #67c23a;
    color: #fff;
  }
  button:focus,
  button:focus-visible {
    outline: none;
  }
  .el-button--success:hover {
    background-color: #85ce61;
  }

  .el-button--warning {
    background-color: #e6a23c;
    color: #fff;
  }

  .el-button--warning:hover {
    background-color: #ebb563;
  }

  .el-button--danger {
    background-color: #f56c6c;
    color: #fff;
  }

  .el-button--danger:hover {
    background-color: #f78989;
  }

  .el-button--info {
    background-color: #909399;
    color: #fff;
  }

  .el-button--info:hover {
    background-color: #a6a9ad;
  }

  .is-disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
