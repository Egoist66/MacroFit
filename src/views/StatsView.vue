<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import { useNutritionStats } from '@/domains/nutrition/composables/useNutritionStats'

/**
 * Страница «Статистика»: недельный график калорий,
 * краткие метрики и баланс макронутриентов.
 */
const { goal, weekDays, metrics, macroBalance } = useNutritionStats()
</script>

<template>
  <div class="stats-view">
    <div class="metrics">
      <article v-for="metric in metrics" :key="metric.label" class="card metric">
        <span class="icon-badge" :class="`icon-badge--${metric.tone}`">
          <AppIcon :name="metric.icon" :size="20" />
        </span>
        <div class="metric__body">
          <p>{{ metric.label }}</p>
          <div class="metric__value">
            <b>{{ metric.value }}</b>
            <span>{{ metric.unit }}</span>
          </div>
        </div>
      </article>
    </div>

    <div class="stats-grid">
      <section class="card chart-card">
        <div class="card__head chart-card__head">
          <span class="icon-badge icon-badge--green">
            <AppIcon name="chart" :size="21" />
          </span>
          <h2>Калории за неделю</h2>
          <span class="chart-card__hint">
            {{ goal.kcal > 0 ? `норма ${goal.kcal} ккал` : 'норма не задана' }}
          </span>
        </div>

        <div class="week-chart">
          <div v-for="day in weekDays" :key="day.day" class="week-bar">
            <span class="week-bar__value">{{ day.value }}</span>
            <div class="week-bar__track">
              <span
                v-if="day.value > 0"
                class="week-bar__fill"
                :class="{ 'is-over': day.isOverGoal }"
                :style="{ height: day.height }"
              />
            </div>
            <span class="week-bar__day">{{ day.day }}</span>
          </div>
        </div>

        <div class="chart-legend">
          <span><i class="chart-legend__dot chart-legend__dot--green" /> в пределах нормы</span>
          <span><i class="chart-legend__dot chart-legend__dot--amber" /> выше нормы</span>
        </div>
      </section>

      <section class="card balance-card">
        <div class="card__head">
          <span class="icon-badge icon-badge--green">
            <AppIcon name="target" :size="21" />
          </span>
          <h2>Баланс БЖУ</h2>
        </div>

        <div v-for="macro in macroBalance" :key="macro.label" class="balance-row">
          <div class="balance-row__top">
            <span class="balance-row__dot" :style="{ background: macro.color }" />
            <span class="balance-row__label">{{ macro.label }}</span>
            <span class="balance-row__values">
              <b>{{ macro.value }}</b> / {{ macro.target }} г
            </span>
          </div>
          <el-progress
            :percentage="macro.percentage"
            :stroke-width="8"
            :show-text="false"
            :color="macro.color"
          />
        </div>

        <div class="balance-card__note">
          <AppIcon name="leaf" :size="20" />
          <p>Старайтесь распределять белки, жиры и углеводы равномерно в течение дня.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stats-view {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.metric {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 22px;
}

.icon-badge--amber {
  color: #d97706;
  background: #fff7ed;
}

.icon-badge--blue {
  color: #2563eb;
  background: #eff6ff;
}

.metric__body p {
  color: var(--muted);
  font-size: 13px;
}

.metric__value {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: 4px;
}

.metric__value b {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.metric__value span {
  color: var(--muted);
  font-size: 12px;
}

.stats-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  align-items: start;
  gap: 22px;
}

.chart-card {
  padding: 26px;
}

.chart-card__head {
  margin-bottom: 26px;
}

.chart-card__hint {
  margin-left: auto;
  padding: 5px 10px;
  border-radius: 999px;
  background: #f8fafc;
  color: var(--muted);
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}

.week-chart {
  display: flex;
  align-items: flex-end;
  gap: clamp(8px, 2.2vw, 26px);
  height: 240px;
  padding: 0 4px;
}

.week-bar {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  height: 100%;
}

.week-bar__value {
  color: var(--muted);
  font-size: 11px;
  font-weight: 600;
}

.week-bar__track {
  display: flex;
  align-items: flex-end;
  width: 100%;
  max-width: 46px;
  height: 178px;
  border-radius: 12px;
  background: #f4f7fb;
  overflow: hidden;
}

.week-bar__fill {
  width: 100%;
  min-height: 6px;
  border-radius: 12px;
  background: linear-gradient(180deg, #4ade80 0%, #22c55e 100%);
  transition: height 0.45s ease;
}

.week-bar__fill.is-over {
  background: linear-gradient(180deg, #fcd34d 0%, #f59e0b 100%);
}

.week-bar__day {
  color: var(--muted);
  font-size: 12px;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 22px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 12px;
}

.chart-legend span {
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.chart-legend__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.chart-legend__dot--green {
  background: var(--green);
}

.chart-legend__dot--amber {
  background: var(--amber);
}

.balance-card {
  padding: 26px;
}

.balance-row + .balance-row {
  margin-top: 20px;
}

.balance-row__top {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 9px;
}

.balance-row__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.balance-row__label {
  font-size: 14px;
  font-weight: 500;
}

.balance-row__values {
  margin-left: auto;
  color: var(--muted);
  font-size: 13px;
}

.balance-row__values b {
  color: var(--text);
  font-weight: 600;
}

.balance-card :deep(.el-progress-bar__outer),
.balance-card :deep(.el-progress-bar__inner) {
  border-radius: 999px;
}

.balance-card__note {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 26px;
  padding: 16px;
  border-radius: 16px;
  background: var(--green-soft);
  color: var(--green-dark);
}

.balance-card__note p {
  color: #3f6b52;
  font-size: 12.5px;
  line-height: 1.45;
}

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .metrics {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .metric {
    padding: 16px 18px;
  }
}

@media (max-width: 640px) {
  .chart-card,
  .balance-card {
    padding: 20px;
  }

  .week-chart {
    gap: 7px;
    height: 200px;
  }

  .week-bar__track {
    height: 142px;
    border-radius: 9px;
  }

  .week-bar__value {
    font-size: 10px;
  }

  .chart-card__head {
    flex-wrap: wrap;
  }

  .chart-card__hint {
    margin-left: 0;
  }
}
</style>
