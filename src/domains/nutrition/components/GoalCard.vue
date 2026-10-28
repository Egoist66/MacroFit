<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import type { Goal } from '@/domains/nutrition/types/nutrition.types'

/**
 * Карточка текущей цели питания с возможностью перейти к её изменению.
 */
const props = defineProps<{
  goal: Goal
}>()

const emit = defineEmits<{
  edit: []
}>()

/** Задана ли пользователем цель по калорийности. */
const hasGoal = computed(() => props.goal.kcal > 0)
</script>

<template>
  <section class="card goal-card">
    <div class="card__head">
      <span class="icon-badge icon-badge--green">
        <AppIcon name="target" :size="21" />
      </span>
      <h2>Твоя цель</h2>
    </div>

    <p class="goal-card__title">
      {{ hasGoal ? goal.title || 'Моя цель' : 'Цель пока не задана' }}
    </p>

    <div v-if="hasGoal" class="goal-card__kcal">
      <span class="goal-card__flame"><AppIcon name="flame" :size="18" /></span>
      <span><b>{{ goal.kcal }}</b> ккал</span>
    </div>

    <el-button class="goal-card__edit" @click="emit('edit')">
      {{ hasGoal ? 'Изменить цель' : 'Задать цель' }}
    </el-button>
  </section>
</template>

<style scoped lang="scss">
.goal-card {
  padding: 26px;
}

.goal-card__title {
  margin-bottom: 18px;
  color: #475569;
  font-size: 15px;
  line-height: 1.45;
}

.goal-card__kcal {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 22px;
  color: var(--muted);
  font-size: 15px;
}

.goal-card__kcal b {
  color: var(--text);
  font-size: 17px;
  font-weight: 600;
}

.goal-card__flame {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 11px;
  background: #fff7ed;
  color: #f59e0b;
}

.goal-card__edit {
  width: 100%;
  height: 44px;
  border-color: #e6ebf2;
  color: var(--text);
}

.goal-card__edit:hover {
  border-color: #bbf7d0;
  background: #f7fdf9;
  color: var(--green-dark);
}

@media (max-width: 640px) {
  .goal-card {
    padding: 20px;
  }
}
</style>
