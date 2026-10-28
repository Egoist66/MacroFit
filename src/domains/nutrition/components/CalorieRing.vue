<script setup lang="ts">
import { computed } from 'vue'
import type { MacroCalorieShares } from '@/domains/nutrition/types/nutrition.types'

/**
 * Кольцевая диаграмма калорий: цветные сегменты по фактическим
 * долям макронутриентов и центральное значение «съедено из нормы».
 */
const props = defineProps<{
  consumed: number
  target: number
  macroShares: MacroCalorieShares
}>()

const radius = 78
const circumference = 2 * Math.PI * radius

/** Сегменты кольца с рассчитанными длинами и смещениями. */
const segments = computed(() => {
  const items = [
    { value: props.macroShares.protein, color: '#3b82f6' },
    { value: props.macroShares.fat, color: '#fbbf24' },
    { value: props.macroShares.carbs, color: '#fb7185' },
  ]

  let offset = 0

  return items
    .filter((item) => item.value > 0)
    .map((item) => {
      const length = (item.value / 100) * circumference
      const segment = {
        color: item.color,
        length: Math.max(length - 10, 0),
        offset,
      }
      offset += length
      return segment
    })
})

/** Процент выполнения суточной нормы калорий. */
const progress = computed(() =>
  Math.min(Math.round((props.consumed / Math.max(props.target, 1)) * 100), 100),
)
</script>

<template>
  <div class="ring" role="img" :aria-label="`${consumed} из ${target} килокалорий`">
    <svg viewBox="0 0 200 200" class="ring__svg">
      <circle cx="100" cy="100" :r="radius" fill="none" stroke="#f1f5f9" stroke-width="17" />
      <circle
        v-for="(segment, index) in segments"
        :key="index"
        cx="100"
        cy="100"
        :r="radius"
        fill="none"
        :stroke="segment.color"
        stroke-width="17"
        stroke-linecap="round"
        :stroke-dasharray="`${segment.length} ${circumference - segment.length}`"
        :stroke-dashoffset="-segment.offset"
        transform="rotate(-90 100 100)"
      />
    </svg>

    <div class="ring__center">
      <span class="ring__label">Калории</span>
      <strong class="ring__value">{{ consumed }}</strong>
      <span v-if="target > 0" class="ring__target">из {{ target }}</span>
      <span v-else class="ring__target">цель не задана</span>
      <span v-if="target > 0" class="ring__progress">{{ progress }}%</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ring {
  position: relative;
  width: 206px;
  height: 206px;
  flex-shrink: 0;
}

.ring__svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.ring__center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.ring__label {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 2px;
}

.ring__value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -1px;
}

.ring__target {
  font-size: 13px;
  color: var(--muted);
  margin-top: 2px;
}

.ring__progress {
  margin-top: 6px;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--green-soft);
  color: var(--green-dark);
  font-size: 11px;
  font-weight: 600;
}

@media (max-width: 520px) {
  .ring {
    width: 178px;
    height: 178px;
  }

  .ring__value {
    font-size: 28px;
  }
}
</style>
