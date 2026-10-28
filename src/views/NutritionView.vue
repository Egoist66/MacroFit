<script setup lang="ts">
import DaySummaryCard from '@/domains/nutrition/components/DaySummaryCard.vue'
import MacroStatCard from '@/domains/nutrition/components/MacroStatCard.vue'
import MealsCard from '@/domains/nutrition/components/MealsCard.vue'
import MealDialog from '@/domains/nutrition/components/MealDialog.vue'
import { useNutritionDay } from '@/domains/nutrition/composables/useNutritionDay'

/**
 * Страница «Питание»: дневная сводка, карточки БЖУ
 * и полный список приёмов пищи.
 */
const {
  isMealDialogOpen,
  meals,
  totals,
  mealsCount,
  macroCards,
  removeMeal,
} = useNutritionDay()
</script>

<template>
  <div class="nutrition-view">
    <DaySummaryCard
      :meals-count="mealsCount"
      :kcal="totals.kcal"
      @add="isMealDialogOpen = true"
    />

    <div class="macro-cards">
      <MacroStatCard
        v-for="macro in macroCards"
        :key="macro.label"
        :macro="macro"
      />
    </div>

    <MealsCard
      title="Все приёмы пищи"
      :meals="meals"
      :show-add="false"
      show-count
      empty-text="Пока нет приёмов пищи"
      @remove="removeMeal"
    />

    <MealDialog v-model="isMealDialogOpen" />
  </div>
</template>

<style scoped lang="scss">
.nutrition-view {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.macro-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

@media (max-width: 900px) {
  .macro-cards {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}

@media (max-width: 640px) {
  .nutrition-view {
    gap: 16px;
  }
}
</style>
