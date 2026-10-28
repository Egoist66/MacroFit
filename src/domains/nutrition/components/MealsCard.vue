<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import MealRow from '@/domains/nutrition/components/MealRow.vue'
import type { Meal } from '@/domains/nutrition/types/nutrition.types'

/**
 * Карточка списка приёмов пищи. Используется и на главной,
 * и на странице питания; умеет показывать счётчик и пустое состояние.
 */
withDefaults(
  defineProps<{
    title: string
    meals: Meal[]
    showAdd?: boolean
    showCount?: boolean
    emptyText?: string
  }>(),
  {
    showAdd: true,
    showCount: false,
    emptyText: 'Пока нет приёмов пищи',
  },
)

const emit = defineEmits<{
  add: []
  remove: [id: number]
}>()
</script>

<template>
  <section class="card meals-card">
    <div class="meals-card__head">
      <div class="meals-card__title">
        <h2>{{ title }}</h2>
        <span v-if="showCount" class="meals-card__count">{{ meals.length }}</span>
      </div>
      <el-button v-if="showAdd" type="primary" class="meals-card__add" @click="emit('add')">
        <AppIcon name="plus" :size="17" />
        Добавить
      </el-button>
    </div>

    <template v-if="meals.length">
      <MealRow
        v-for="meal in meals"
        :key="meal.id"
        :meal="meal"
        @remove="emit('remove', $event)"
      />
    </template>

    <el-empty v-else :description="emptyText" :image-size="110">
      <el-button v-if="showAdd" type="primary" @click="emit('add')">
        Добавить приём пищи
      </el-button>
    </el-empty>
  </section>
</template>

<style scoped lang="scss">
.meals-card {
  padding: 24px 26px;
}

.meals-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.meals-card__title {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.meals-card__title h2 {
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.meals-card__count {
  display: grid;
  place-items: center;
  min-width: 26px;
  height: 26px;
  padding: 0 8px;
  border-radius: 999px;
  background: var(--green-soft);
  color: var(--green-dark);
  font-size: 12px;
  font-weight: 600;
}

.meals-card__add {
  height: 44px;
  padding: 0 18px;
  border-radius: 12px;
  box-shadow: 0 12px 24px -14px rgba(34, 197, 94, 0.9);
}

.meals-card__add :deep(.app-icon) {
  margin-right: 7px;
}

@media (max-width: 640px) {
  .meals-card {
    padding: 18px;
  }

  .meals-card__title h2 {
    font-size: 17px;
  }

  .meals-card__add {
    height: 40px;
    padding: 0 14px;
    font-size: 13px;
  }
}

@media (max-width: 420px) {
  .meals-card__head {
    align-items: flex-start;
  }

  .meals-card__add {
    flex-shrink: 0;
  }
}
</style>
