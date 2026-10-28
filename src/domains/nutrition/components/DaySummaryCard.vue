<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

/**
 * Сводка дня на странице питания: количество приёмов пищи,
 * суммарные калории и кнопка добавления.
 */
defineProps<{
  mealsCount: number
  kcal: number
}>()

const emit = defineEmits<{
  add: []
}>()
</script>

<template>
  <section class="card day-summary">
    <div class="day-summary__main">
      <span class="icon-badge icon-badge--green day-summary__icon">
        <AppIcon name="meal" :size="22" />
      </span>
      <div>
        <h2>Дневной рацион</h2>
        <p>{{ mealsCount }} приёма пищи · {{ kcal }} ккал</p>
      </div>
    </div>

    <el-button type="primary" class="day-summary__add" @click="emit('add')">
      <AppIcon name="plus" :size="17" />
      Добавить
    </el-button>
  </section>
</template>

<style scoped lang="scss">
.day-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 22px 26px;
}

.day-summary__main {
  display: flex;
  align-items: center;
  gap: 14px;
}

.day-summary__icon {
  width: 44px;
  height: 44px;
}

.day-summary__main h2 {
  font-size: 18px;
  font-weight: 700;
}

.day-summary__main p {
  margin-top: 3px;
  color: var(--muted);
  font-size: 14px;
}

.day-summary__add {
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
}

.day-summary__add :deep(.app-icon) {
  margin-right: 7px;
}

@media (max-width: 640px) {
  .day-summary {
    padding: 18px;
  }

  .day-summary__main h2 {
    font-size: 16px;
  }

  .day-summary__main p {
    font-size: 13px;
  }

  .day-summary__add {
    height: 40px;
    padding: 0 14px;
    font-size: 13px;
  }
}

@media (max-width: 460px) {
  .day-summary {
    flex-direction: column;
    align-items: stretch;
  }

  .day-summary__add {
    width: 100%;
  }
}
</style>
