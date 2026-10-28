/**
 * Типы предметной области «Питание».
 * Здесь описаны все сущности, которыми оперируют стор, composables и компоненты.
 */

/** Пищевая ценность продукта: калории и макронутриенты. */
export interface NutritionValues {
  /** Калорийность, ккал. */
  kcal: number
  /** Белки, г. */
  protein: number
  /** Жиры, г. */
  fat: number
  /** Углеводы, г. */
  carbs: number
}

/** Пищевая ценность на 100 г продукта. */
export interface NutritionPer100g extends NutritionValues {}

/** Пищевая ценность фактической порции. */
export interface PortionNutrition extends NutritionValues {}

/** Приём пищи, добавленный пользователем в дневник. */
export interface Meal {
  /** Уникальный идентификатор записи. */
  id: number
  /** Название блюда или продукта. */
  name: string
  /** Вес порции в граммах. */
  weight: number
  /** Пищевая ценность продукта на 100 г. */
  per100g: NutritionPer100g
  /** Эмодзи-иллюстрация для карточки приёма пищи. */
  emoji: string
  /** Фоновый оттенок иллюстрации. */
  tint: string
}

/** Новая запись приёма пищи до присвоения служебных полей. */
export type NewMeal = Omit<Meal, 'id' | 'emoji' | 'tint'> & {
  /** Необязательная эмодзи-иллюстрация, выбирается автоматически. */
  emoji?: string
}

/** Цель пользователя по калорийности и макронутриентам. */
export interface Goal {
  /** Название режима или цели питания. */
  title: string
  /** Суточная норма калорий. */
  kcal: number
  /** Суточная норма белков в граммах. */
  protein: number
  /** Суточная норма жиров в граммах. */
  fat: number
  /** Суточная норма углеводов в граммах. */
  carbs: number
}

/** Суммарные показатели питания за день. */
export interface NutritionTotals extends NutritionValues {}

/** Доли калорий из белков, жиров и углеводов, %. */
export interface MacroCalorieShares {
  protein: number
  fat: number
  carbs: number
}

/** Строка прогресса по макронутриенту в общей сводке. */
export interface MacroSummary {
  /** Название макронутриента. */
  label: string
  /** Текущее значение. */
  value: number
  /** Целевое значение. */
  target: number
  /** Фирменный цвет индикатора. */
  color: string
  /** Процент выполнения цели, ограниченный 100. */
  percentage: number
}

/** Строка прогресса в карточке «Сегодня». */
export interface TodayProgressItem {
  label: string
  value: number
  target: number
  /** Единица измерения: ккал или г. */
  unit: string
  color: string
  /** Тип иконки: пламя для калорий, точка для макронутриентов. */
  icon: 'flame' | 'dot'
  /** Процент выполнения цели, ограниченный 100. */
  percentage: number
}

/** Карточка макронутриента на странице питания и статистики. */
export interface MacroCard extends MacroSummary {}

/** День недели на графике статистики. */
export interface WeekDay {
  /** Короткое название дня. */
  day: string
  /** Значение калорий за день. */
  value: number
  /** Высота столбца в процентах. */
  height: string
  /** Превышена ли суточная норма. */
  isOverGoal: boolean
}

/** Краткая метрика на странице статистики. */
export interface StatsMetric {
  label: string
  value: number
  unit: string
  icon: string
  /** Цветовой тон иконки. */
  tone: 'green' | 'amber' | 'blue'
}

/** Значения формы добавления приёма пищи. */
export interface MealFormValues {
  name: string
  weight: number
  /** Пищевая ценность введённого продукта на 100 г. */
  per100g: NutritionPer100g
}

/** Значения формы редактирования цели. */
export interface GoalFormValues {
  title: string
  kcal: number
  protein: number
  fat: number
  carbs: number
}

/** Данные профиля пользователя на странице настроек. */
export interface UserProfile {
  name: string
  email: string
}

/** Пользовательские настройки уведомлений. */
export interface NotificationSettings {
  reminders: boolean
  reports: boolean
  tips: boolean
}

/** Снимок состояния питания для сохранения в локальное хранилище. */
export interface NutritionSnapshot {
  meals: Meal[]
  goal: Goal
}
