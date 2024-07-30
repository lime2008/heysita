<template>
  <div class="el-input">
    <component
      :is="isTextarea ? 'textarea' : 'input'"
      v-bind="$attrs"
      :value="inputValue"
      :class="['el-input__inner', {'is-disabled': disabled}]"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxChars"
      :rows="isTextarea ? rows : undefined"
      @input="handleInput"
    ></component>
    <div v-if="showCharCounter && maxChars" class="char-counter" :class="{'input_counter' : !isTextarea , 'textarea_counter' : isTextarea}">{{ inputValue.toString().length }} / {{ maxChars }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  name: 'MyInput',
  props: {
    modelValue: { type: [String, Number], default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false },
    maxChars: { type: Number, default: 100 }, // Max character limit
    isTextarea: { type: Boolean, default: false }, // 是否使用 textarea
    rows: { type: Number, default: 4 }, // Textarea rows
    showCharCounter: { type: Boolean, default: true }, // 是否展示字数统计
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);

    // Watch for changes in props.modelValue and update inputValue accordingly
    watch(() => props.modelValue, (newValue) => {
      if (newValue !== inputValue.value) {
        inputValue.value = newValue;
      }
    });

    // Handle input event to enforce max character limit
    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (props.maxChars > 0 && target.value.length > props.maxChars) {
        target.value = target.value.substring(0, props.maxChars);
        inputValue.value = target.value;
      } else {
        inputValue.value = target.value;
      }
      emit('update:modelValue', inputValue.value);
    };

    return {
      inputValue,
      handleInput,
    };
  },
});
</script>

<style scoped>
.el-input {
  display: inline-block;
  position: relative;
  font-size: 14px;
  width: 100%;
}
.el-input__inner {
  box-sizing: border-box;
  width: 100%;
  padding: 6px 12px;
  position: relative;
  line-height: 22px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  resize: none; /* 禁止用户拖拽调整大小 */
}
.el-input__inner:focus {
  outline: 0;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}
.el-input__inner.is-disabled {
  background-color: #f5f7fa;
  border-color: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
.char-counter {
  position: absolute;
  padding:2.5px;
  background-color: #ffffff;
  border-radius: 5px;
  display: inline-block;
  font-size: 12px;
  color: #909399;
  margin-left: 8px;

}
.input_counter {
  top:50%;
  transform: translate(0, -50%);
  right:10px;
}
.textarea_counter {
  bottom:10%;
  transform: translate(0, -10%);
  right:10px;
}
</style>
