<script setup lang="ts">
import type { Meal } from '@/domains/nutrition/types/nutrition.types'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useMealPortion } from '@/domains/nutrition/composables/useMealPortion'

/**
 * Строка приёма пищи: иллюстрация, название, вес,
 * калории и БЖУ, а также меню действий.
 */
const props = defineProps<{
  meal: Meal
}>()

const emit = defineEmits<{
  remove: [id: number]
}>()

/** Пищевая ценность порции, пересчитанная с 100 г на фактический вес. */
const portion = useMealPortion(() => props.meal)
</script>

<template>
  <article class="meal-row">
    <div class="meal-row__thumb" :style="{ background: meal.tint }">
      <span>{{ meal.emoji }}</span>
    </div>

    <div class="meal-row__info">
      <h3>{{ meal.name }}</h3>
      <p>{{ meal.weight }} г</p>
    </div>

    <div class="meal-row__stats">
      <div class="meal-stat">
        <b>{{ portion.kcal }}</b>
        <span>ккал</span>
      </div>
      <div class="meal-stat">
        <b>{{ portion.protein }} г</b>
        <span>белки</span>
      </div>
      <div class="meal-stat">
        <b>{{ portion.fat }} г</b>
        <span>жиры</span>
      </div>
      <div class="meal-stat">
        <b>{{ portion.carbs }} г</b>
        <span>углеводы</span>
      </div>
    </div>

    <div class="meal-row__actions">
      <el-dropdown trigger="click" placement="bottom-end" @command="emit('remove', meal.id)">
        <button class="meal-row__more" type="button" aria-label="Действия с приёмом пищи">
          <AppIcon name="dots" :size="20" />
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="remove">
              <AppIcon name="trash" :size="16" />
              Удалить
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </article>
</template>

<style scoped lang="scss">
.meal-row {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto 30px;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--line);
}

.meal-row:last-child {
  border-bottom: 0;
  padding-bottom: 2px;
}

.meal-row__thumb {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  font-size: 30px;
  box-shadow: inset 0 0 0 1px rgba(15, 23, 42, 0.04);
}

.meal-row__info {
  min-width: 0;
}

.meal-row__info h3 {
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meal-row__info p {
  margin-top: 3px;
  color: var(--muted);
  font-size: 13px;
}

.meal-row__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(56px, 68px));
  gap: 6px;
}

.meal-stat {
  text-align: left;
}

.meal-stat b {
  display: block;
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
}

.meal-stat span {
  display: block;
  margin-top: 2px;
  color: var(--muted);
  font-size: 12px;
}

.meal-row__more {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #b0b9c7;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.meal-row__actions {
  display: flex;
  justify-content: flex-end;
}

.meal-row__more:hover {
  background: #f1f5f9;
  color: var(--text);
}

@media (max-width: 1000px) {
  .meal-row {
    grid-template-columns: 56px minmax(0, 1fr) auto 30px;
    gap: 12px;
  }

  .meal-row__thumb {
    width: 56px;
    height: 56px;
    font-size: 26px;
    border-radius: 14px;
  }

  .meal-row__stats {
    grid-template-columns: repeat(4, minmax(48px, 60px));
  }
}

@media (max-width: 640px) {
  .meal-row {
    grid-template-columns: 54px minmax(0, 1fr) 28px;
    grid-template-areas:
      'thumb info actions'
      'stats stats stats';
    align-items: center;
    row-gap: 12px;
    padding: 14px 0;
  }

  .meal-row__thumb {
    grid-area: thumb;
    width: 54px;
    height: 54px;
    font-size: 25px;
  }

  .meal-row__info {
    grid-area: info;
  }

  .meal-row__stats {
    grid-area: stats;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
    padding: 10px 12px;
    border-radius: 14px;
    background: #f8fafc;
  }

  .meal-row__actions {
    grid-area: actions;
    align-self: start;
  }

  .meal-stat {
    text-align: center;
  }

  .meal-stat b {
    font-size: 14px;
  }

  .meal-stat span {
    font-size: 11px;
  }
}
</style>
