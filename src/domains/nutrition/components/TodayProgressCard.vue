<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import type { TodayProgressItem } from '@/domains/nutrition/types/nutrition.types'

/**
 * Карточка «Сегодня»: компактный прогресс по калориям и макронутриентам.
 */
defineProps<{
  rows: TodayProgressItem[]
}>()
</script>

<template>
  <section class="card today-card">
    <div class="card__head">
      <span class="icon-badge icon-badge--green">
        <AppIcon name="chart" :size="21" />
      </span>
      <h2>Сегодня</h2>
    </div>

    <div v-for="row in rows" :key="row.label" class="today-row">
      <div class="today-row__top">
        <span v-if="row.icon === 'flame'" class="today-row__flame">
          <AppIcon name="flame" :size="17" />
        </span>
        <span v-else class="today-row__dot" :style="{ background: row.color }" />
        <span class="today-row__label">{{ row.label }}</span>
        <span class="today-row__values">
          <b>{{ row.value }}</b> / {{ row.target }} {{ row.unit }}
        </span>
      </div>
      <el-progress
        :percentage="row.percentage"
        :stroke-width="8"
        :show-text="false"
        :color="row.color"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.today-card {
  padding: 26px;
}

.today-row + .today-row {
  margin-top: 18px;
}

.today-row__top {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 9px;
  font-size: 14px;
}

.today-row__flame {
  display: grid;
  place-items: center;
  color: #f59e0b;
}

.today-row__dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.today-row__label {
  font-weight: 500;
}

.today-row__values {
  margin-left: auto;
  color: var(--muted);
  font-size: 13px;
  white-space: nowrap;
}

.today-row__values b {
  color: var(--text);
  font-weight: 600;
}

.today-card :deep(.el-progress-bar__outer),
.today-card :deep(.el-progress-bar__inner) {
  border-radius: 999px;
}

@media (max-width: 640px) {
  .today-card {
    padding: 20px;
  }
}
</style>
