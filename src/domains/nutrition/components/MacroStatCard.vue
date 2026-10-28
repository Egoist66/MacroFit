<script setup lang="ts">
import type { MacroCard } from '@/domains/nutrition/types/nutrition.types'

/**
 * Компактная карточка макронутриента с текущим значением,
 * нормой и полосой прогресса.
 */
defineProps<{
  macro: MacroCard
}>()
</script>

<template>
  <article class="card macro-card">
    <div class="macro-card__top">
      <span class="macro-card__dot" :style="{ background: macro.color }" />
      <span class="macro-card__label">{{ macro.label }}</span>
      <span class="macro-card__percent">{{ macro.percentage }}%</span>
    </div>

    <div class="macro-card__values">
      <b>{{ macro.value }}</b>
      <span>из {{ macro.target }} г</span>
    </div>

    <el-progress
      :percentage="macro.percentage"
      :stroke-width="8"
      :show-text="false"
      :color="macro.color"
    />
  </article>
</template>

<style scoped lang="scss">
.macro-card {
  padding: 20px 22px;
}

.macro-card__top {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 12px;
}

.macro-card__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.macro-card__label {
  font-size: 14px;
  font-weight: 500;
  color: #475569;
}

.macro-card__percent {
  margin-left: auto;
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
}

.macro-card__values {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 12px;
}

.macro-card__values b {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.macro-card__values span {
  color: var(--muted);
  font-size: 13px;
}

.macro-card :deep(.el-progress-bar__outer),
.macro-card :deep(.el-progress-bar__inner) {
  border-radius: 999px;
}

@media (max-width: 900px) {
  .macro-card {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 6px 16px;
    padding: 18px 20px;
  }

  .macro-card__top {
    margin-bottom: 0;
  }

  .macro-card__values {
    grid-column: 2;
    grid-row: 1;
    margin-bottom: 0;
  }

  .macro-card__values b {
    font-size: 22px;
  }

  .macro-card :deep(.el-progress) {
    grid-column: 1 / -1;
  }
}
</style>
