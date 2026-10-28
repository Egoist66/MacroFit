<script setup lang="ts">
import { computed, watch } from 'vue'
import { useGoalForm } from '@/domains/nutrition/composables/useGoalForm'

/**
 * Диалог изменения цели питания. Логика формы и сохранения
 * находится в composable useGoalForm.
 */
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { form, isSubmitting, fill, submit } = useGoalForm()

const visible = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) fill()
  },
)

/** Закрывает диалог только после успешного сохранения. */
async function handleSubmit(): Promise<void> {
  const isSaved = await submit()
  if (isSaved) visible.value = false
}
</script>

<template>
  <el-dialog v-model="visible" title="Изменить цель" width="470px" align-center>
    <el-form label-position="top" @submit.prevent="handleSubmit">
      <el-form-item label="Название цели">
        <el-input
          v-model="form.title"
          placeholder="Название цели"
          size="large"
        />
      </el-form-item>

      <div class="goal-form__grid">
        <el-form-item label="Калории, ккал">
          <el-input-number
            v-model="form.kcal"
            class="goal-form__number"
            :min="0"
            :step="100"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="Белки, г">
          <el-input-number
            v-model="form.protein"
            class="goal-form__number"
            :min="0"
            :step="5"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="Жиры, г">
          <el-input-number
            v-model="form.fat"
            class="goal-form__number"
            :min="0"
            :step="5"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="Углеводы, г">
          <el-input-number
            v-model="form.carbs"
            class="goal-form__number"
            :min="0"
            :step="5"
            controls-position="right"
          />
        </el-form-item>
      </div>
    </el-form>

    <template #footer>
      <div class="goal-form__footer">
        <el-button :disabled="isSubmitting" @click="visible = false">Отмена</el-button>
        <el-button type="primary" :loading="isSubmitting" @click="handleSubmit">
          Сохранить
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.goal-form__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 14px;
}

.goal-form__number {
  width: 100%;
}

.goal-form__number :deep(.el-input__inner) {
  text-align: left;
}

.goal-form__footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

@media (max-width: 420px) {
  .goal-form__grid {
    grid-template-columns: 1fr;
  }
}
</style>
