<script setup lang="ts">
import { computed, watch } from 'vue'
import { useMealForm } from '@/domains/nutrition/composables/useMealForm'

/**
 * Диалог добавления приёма пищи. Вся работа с формой и стором
 * вынесена в composable useMealForm.
 */
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const {
  form,
  isSubmitting,
  isKcalCalculated,
  portion,
  reset,
  submit,
} = useMealForm()

const visible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) reset()
  },
)

/** Закрывает диалог только после успешного сохранения. */
async function handleSubmit(): Promise<void> {
  const isSaved = await submit()
  if (isSaved) visible.value = false
}
</script>

<template>
  <el-dialog v-model="visible" title="Добавить приём пищи" width="500px" align-center>
    <el-form label-position="top" @submit.prevent="handleSubmit">
      <el-form-item label="Название блюда">
        <el-input v-model="form.name" placeholder="Например, овсяная каша" size="large" />
      </el-form-item>

      <p class="meal-form__hint">
        Пищевая ценность указывается на 100 г продукта.
      </p>

      <div class="meal-form__grid">
        <el-form-item label="Вес порции, г">
          <el-input-number
            v-model="form.weight"
            class="meal-form__number"
            :min="1"
            :step="10"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="Калории на 100 г">
          <el-input-number
            v-model="form.per100g.kcal"
            class="meal-form__number"
            :min="0"
            :step="0.1"
            :precision="1"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="Белки на 100 г">
          <el-input-number
            v-model="form.per100g.protein"
            class="meal-form__number"
            :min="0"
            :step="0.1"
            :precision="1"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="Жиры на 100 г">
          <el-input-number
            v-model="form.per100g.fat"
            class="meal-form__number"
            :min="0"
            :step="0.1"
            :precision="1"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="Углеводы на 100 г">
          <el-input-number
            v-model="form.per100g.carbs"
            class="meal-form__number"
            :min="0"
            :step="0.1"
            :precision="1"
            controls-position="right"
          />
        </el-form-item>
      </div>

      <div class="meal-form__preview">
        <div class="meal-form__preview-head">
          <span>Порция {{ form.weight || 0 }} г</span>
          <strong>{{ portion.kcal }} ккал</strong>
        </div>
        <div class="meal-form__preview-macros">
          <span>Белки <b>{{ portion.protein }} г</b></span>
          <span>Жиры <b>{{ portion.fat }} г</b></span>
          <span>Углеводы <b>{{ portion.carbs }} г</b></span>
        </div>
        <p v-if="isKcalCalculated" class="meal-form__calculated">
          Калорийность рассчитана по БЖУ: 4/9/4 ккал на грамм.
        </p>
      </div>
    </el-form>

    <template #footer>
      <div class="meal-form__footer">
        <el-button :disabled="isSubmitting" @click="visible = false">Отмена</el-button>
        <el-button type="primary" :loading="isSubmitting" @click="handleSubmit">
          Добавить
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.meal-form__hint {
  margin: -4px 0 14px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
}

.meal-form__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 14px;
}

.meal-form__number {
  width: 100%;
}

.meal-form__number :deep(.el-input__inner) {
  text-align: left;
}

.meal-form__preview {
  padding: 14px 16px;
  border: 1px solid #d9f2e2;
  border-radius: 14px;
  background: #f5fdf8;
}

.meal-form__preview-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  font-size: 14px;
}

.meal-form__preview-head strong {
  font-size: 18px;
  font-weight: 700;
  color: var(--green-700, #15803d);
}

.meal-form__preview-macros {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 16px;
  margin-top: 8px;
  color: var(--muted);
  font-size: 13px;
}

.meal-form__preview-macros b {
  color: var(--text);
  font-weight: 600;
}

.meal-form__calculated {
  margin-top: 8px;
  color: #15803d;
  font-size: 12px;
}

.meal-form__footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 420px) {
  .meal-form__grid {
    grid-template-columns: 1fr;
  }
}
</style>
