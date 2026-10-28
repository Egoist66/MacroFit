<script setup lang="ts">
import CalorieRing from '@/domains/nutrition/components/CalorieRing.vue'
import type {
  MacroCalorieShares,
  MacroSummary,
} from '@/domains/nutrition/types/nutrition.types'

/**
 * Верхняя карточка главного экрана: кольцо калорий
 * и прогресс по белкам, жирам и углеводам.
 */
defineProps<{
  consumed: number
  target: number
  macros: MacroSummary[]
  macroShares: MacroCalorieShares
}>()
</script>

<template>
  <section class="card summary">
    <CalorieRing
      :consumed="consumed"
      :target="target"
      :macro-shares="macroShares"
    />

    <div class="summary__macros">
      <div v-for="macro in macros" :key="macro.label" class="macro">
        <span class="macro__dot" :style="{ background: macro.color }" />
        <span class="macro__name">{{ macro.label }}</span>
        <span class="macro__value"><b>{{ macro.value }}</b> г</span>
        <span class="macro__target">из {{ macro.target }} г</span>
        <div class="macro__bar">
          <span
            :style="{
              width: macro.percentage + '%',
              background: macro.color,
            }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.summary {
  display: flex;
  align-items: center;
  gap: 44px;
  padding: 28px 32px;
}

.summary__macros {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
}

.macro {
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr) auto auto;
  grid-template-areas:
    'dot name value target'
    '. bar bar bar';
  align-items: center;
  column-gap: 10px;
  row-gap: 9px;
}

.macro__dot {
  grid-area: dot;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.macro__name {
  grid-area: name;
  font-size: 15px;
  font-weight: 500;
}

.macro__value {
  grid-area: value;
  font-size: 15px;
  color: var(--muted);
  white-space: nowrap;
}

.macro__value b {
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
}

.macro__target {
  grid-area: target;
  margin-left: 14px;
  min-width: 74px;
  font-size: 13px;
  color: var(--muted);
  text-align: right;
  white-space: nowrap;
}

.macro__bar {
  grid-area: bar;
  height: 8px;
  border-radius: 999px;
  background: #eef1f6;
  overflow: hidden;
}

.macro__bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  transition: width 0.45s ease;
}

@media (max-width: 1240px) {
  .summary {
    gap: 28px;
    padding: 24px;
  }
}

@media (max-width: 760px) {
  .summary {
    flex-direction: column;
    gap: 26px;
    padding: 24px 20px;
  }

  .summary__macros {
    width: 100%;
  }
}

@media (max-width: 420px) {
  .macro {
    grid-template-columns: 10px minmax(0, 1fr) auto;
    grid-template-areas:
      'dot name value'
      '. bar bar'
      '. target target';
    row-gap: 7px;
  }

  .macro__target {
    margin-left: 0;
    text-align: left;
    font-size: 12px;
  }
}
</style>
