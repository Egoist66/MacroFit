import { NUTRITION_STORAGE_KEY } from '@/domains/nutrition/constants/nutrition.constants'
import type {
  Goal,
  Meal,
  NutritionSnapshot,
} from '@/domains/nutrition/types/nutrition.types'
import { normalizeNutritionPer100g } from '@/domains/nutrition/utils/nutrition-calculations'

/** Формат записи до перехода на хранение пищевой ценности на 100 г. */
interface LegacyMeal {
  id: number
  name: string
  weight: number
  kcal: number
  protein: number
  fat: number
  carbs: number
  emoji: string
  tint: string
}

/** Любой поддерживаемый формат записи в localStorage. */
type StoredMeal = Meal | LegacyMeal

/** Проверяет, что значение является конечным числом. */
function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

/** Проверяет цель питания из localStorage. */
function isGoal(value: unknown): value is Goal {
  if (!value || typeof value !== 'object') return false

  const goal = value as Record<string, unknown>
  return (
    typeof goal.title === 'string' &&
    isFiniteNumber(goal.kcal) &&
    isFiniteNumber(goal.protein) &&
    isFiniteNumber(goal.fat) &&
    isFiniteNumber(goal.carbs)
  )
}

/** Проверяет запись приёма пищи в текущем или старом формате. */
function isStoredMeal(value: unknown): value is StoredMeal {
  if (!value || typeof value !== 'object') return false

  const meal = value as Record<string, unknown>
  const hasBaseFields =
    isFiniteNumber(meal.id) &&
    typeof meal.name === 'string' &&
    isFiniteNumber(meal.weight) &&
    typeof meal.emoji === 'string' &&
    typeof meal.tint === 'string'

  if (!hasBaseFields) return false

  if ('per100g' in meal) {
    const per100g = meal.per100g
    if (!per100g || typeof per100g !== 'object') return false

    const values = per100g as Record<string, unknown>
    return (
      isFiniteNumber(values.kcal) &&
      isFiniteNumber(values.protein) &&
      isFiniteNumber(values.fat) &&
      isFiniteNumber(values.carbs)
    )
  }

  return (
    isFiniteNumber(meal.kcal) &&
    isFiniteNumber(meal.protein) &&
    isFiniteNumber(meal.fat) &&
    isFiniteNumber(meal.carbs)
  )
}

/**
 * Приводит старую запись с ценностью порции к новому формату «на 100 г».
 * Так сохранённые данные не теряются после обновления приложения.
 */
function migrateStoredMeal(meal: StoredMeal): Meal {
  if ('per100g' in meal) {
    return {
      id: meal.id,
      name: meal.name,
      weight: meal.weight,
      per100g: normalizeNutritionPer100g(meal.per100g),
      emoji: meal.emoji,
      tint: meal.tint,
    }
  }

  const weight = meal.weight > 0 ? meal.weight : 100
  const per100gCoefficient = 100 / weight

  return {
    id: meal.id,
    name: meal.name,
    weight: meal.weight,
    per100g: normalizeNutritionPer100g({
      kcal: meal.kcal * per100gCoefficient,
      protein: meal.protein * per100gCoefficient,
      fat: meal.fat * per100gCoefficient,
      carbs: meal.carbs * per100gCoefficient,
    }),
    emoji: meal.emoji,
    tint: meal.tint,
  }
}

/**
 * Сервис хранения состояния питания.
 * Инкапсулирует сериализацию и работу с localStorage, чтобы стор
 * и компоненты не зависели от деталей хранилища.
 */
export class NutritionStorageService {
  /** Читает сохранённый снимок питания и мигрирует старый формат. */
  load(): NutritionSnapshot | null {
    try {
      const rawSnapshot = localStorage.getItem(NUTRITION_STORAGE_KEY)
      if (!rawSnapshot) return null

      const snapshot = JSON.parse(rawSnapshot) as {
        meals?: unknown
        goal?: unknown
      }

      if (!Array.isArray(snapshot.meals) || !isGoal(snapshot.goal)) {
        return null
      }

      return {
        meals: snapshot.meals.filter(isStoredMeal).map(migrateStoredMeal),
        goal: snapshot.goal,
      }
    } catch {
      return null
    }
  }

  /** Сохраняет снимок питания. */
  save(snapshot: NutritionSnapshot): void {
    try {
      localStorage.setItem(NUTRITION_STORAGE_KEY, JSON.stringify(snapshot))
    } catch {
      // В приватном режиме браузера хранилище может быть недоступно.
    }
  }
}
