<script setup lang="ts">
import NutritionSummaryCard from '@/domains/nutrition/components/NutritionSummaryCard.vue'
import MealsCard from '@/domains/nutrition/components/MealsCard.vue'
import GoalCard from '@/domains/nutrition/components/GoalCard.vue'
import TodayProgressCard from '@/domains/nutrition/components/TodayProgressCard.vue'
import NutritionCtaCard from '@/domains/nutrition/components/NutritionCtaCard.vue'
import MealDialog from '@/domains/nutrition/components/MealDialog.vue'
import GoalDialog from '@/domains/nutrition/components/GoalDialog.vue'
import { useNutritionOverview } from '@/domains/nutrition/composables/useNutritionOverview'

/**
 * Главный экран: приветствие, сводка калорий и БЖУ,
 * последние приёмы пищи, цель и быстрые действия.
 */
const {
  isMealDialogOpen,
  isGoalDialogOpen,
  recentMeals,
  goal,
  totals,
  macroCalorieShares,
  macroRows,
  todayRows,
  removeMeal,
} = useNutritionOverview()
</script>

<template>
  <div class="home">
    <div class="home__grid">
      <div class="home__column">
        <NutritionSummaryCard
          :consumed="totals.kcal"
          :target="goal.kcal"
          :macros="macroRows"
          :macro-shares="macroCalorieShares"
        />

        <MealsCard
          title="Последние приёмы пищи"
          :meals="recentMeals"
          @add="isMealDialogOpen = true"
          @remove="removeMeal"
        />
      </div>

      <aside class="home__side">
        <GoalCard :goal="goal" @edit="isGoalDialogOpen = true" />
        <TodayProgressCard :rows="todayRows" />
        <NutritionCtaCard @add="isMealDialogOpen = true" />
      </aside>
    </div>

    <MealDialog v-model="isMealDialogOpen" />
    <GoalDialog v-model="isGoalDialogOpen" />
  </div>
</template>

<style scoped lang="scss">
.home__grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 348px;
  align-items: start;
  gap: 24px;
}

.home__column,
.home__side {
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
}

@media (max-width: 1240px) {
  .home__grid {
    grid-template-columns: minmax(0, 1fr) 320px;
    gap: 20px;
  }

  .home__column,
  .home__side {
    gap: 20px;
  }
}

@media (max-width: 1050px) {
  .home__grid {
    grid-template-columns: 1fr;
  }

  .home__side {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }

  .home__side > :last-child {
    grid-column: 1 / -1;
  }
}

@media (max-width: 640px) {
  .home__side {
    display: flex;
  }
}
</style>
