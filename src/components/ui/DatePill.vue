<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import dayjs from 'dayjs'
import AppIcon from '@/components/ui/AppIcon.vue'

const model = defineModel<Date>({ default: () => new Date() })
const open = ref(false)

const label = computed(() => {
  const date = dayjs(model.value)
  const today = dayjs()
  let prefix = ''

  if (date.isSame(today, 'day')) prefix = 'Сегодня, '
  else if (date.isSame(today.subtract(1, 'day'), 'day')) prefix = 'Вчера, '

  return prefix + date.format('D MMMM')
})

watch(model, () => {
  open.value = false
})
</script>

<template>
  <el-popover
    v-model:visible="open"
    placement="bottom-end"
    :width="318"
    trigger="click"
    popper-class="date-popover"
  >
    <template #reference>
      <button class="date-pill" type="button">
        <AppIcon name="calendar" :size="19" />
        <span>{{ label }}</span>
        <AppIcon name="chevron-down" :size="16" class="date-pill__chevron" />
      </button>
    </template>

    <el-calendar v-model="model" />
  </el-popover>
</template>

<style scoped lang="scss">
.date-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 16px;
  border: 1px solid transparent;
  border-radius: 14px;
  background: #fff;
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 12px 30px -24px rgba(15, 23, 42, 0.45);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: #dcfce7;
    box-shadow: 0 16px 34px -24px rgba(22, 163, 74, 0.45);
  }
}

.date-pill__chevron {
  color: var(--muted);
  margin-left: 2px;
}

@media (max-width: 640px) {
  .date-pill {
    height: 42px;
    font-size: 13px;
    padding: 0 13px;
    border-radius: 12px;
  }
}
</style>
