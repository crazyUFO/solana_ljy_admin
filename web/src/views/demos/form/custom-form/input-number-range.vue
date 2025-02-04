<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { Form } from 'ant-design-vue';

  defineOptions({ inheritAttrs: false });
  const formItemContext = Form.useInjectFormItemContext();

  const minimum = ref();
  const maximum = ref();
  const modelValue = defineModel<string[]>('value', { type: Array });

  watch([minimum, maximum], (value) => {
    modelValue.value = value;
    formItemContext.onFieldChange();
  });

  // 监听 modelValue 的变化，将值分别赋给 minimum 和 maximum
  watch(modelValue, (value) => {
    if (Array.isArray(value) && value.length === 2) {
      minimum.value = value[0];
      maximum.value = value[1];
    } else {
      minimum.value = maximum.value = '';
    }
  });
</script>

<template>
  <a-form-item-rest>
    <a-input-group compact>
      <a-input-number
        v-model:value="minimum"
        style="width: 70px; text-align: center"
        placeholder="Min"
      />
      <div class="!align-sub px-1"> 至 </div>
      <a-input-number
        v-model:value="maximum"
        class="site-input-right"
        style="width: 70px; text-align: center"
        placeholder="Max"
      />
    </a-input-group>
  </a-form-item-rest>
</template>
