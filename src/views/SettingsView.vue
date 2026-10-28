<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'
import { useNutritionSettings } from '@/domains/nutrition/composables/useNutritionSettings'

/**
 * Страница «Настройки»: профиль пользователя, цель питания
 * и переключатели уведомлений.
 */
const {
  profile,
  notifications,
  goalForm,
  isSavingProfile,
  isSavingGoal,
  saveProfile,
  saveGoal,
} = useNutritionSettings()
</script>

<template>
  <div class="settings-view">
    <div class="settings-grid">
      <section class="card profile-card">
        <div class="settings-head">
          <span class="profile-card__avatar">
            <AppIcon name="user" :size="30" />
          </span>
          <div>
            <h2>Профиль</h2>
            <p>Данные используются для расчёта персональной нормы.</p>
          </div>
        </div>

        <el-form label-position="top" @submit.prevent="saveProfile">
          <div class="settings-form-grid">
            <el-form-item label="Имя">
              <el-input v-model="profile.name" placeholder="Ваше имя" size="large" />
            </el-form-item>
            <el-form-item label="E-mail">
              <el-input v-model="profile.email" placeholder="you@example.com" size="large" />
            </el-form-item>
          </div>

          <el-button type="primary" :loading="isSavingProfile" @click="saveProfile">
            Сохранить профиль
          </el-button>
        </el-form>
      </section>

      <section class="card goal-settings-card">
        <div class="settings-head">
          <span class="icon-badge icon-badge--green">
            <AppIcon name="target" :size="21" />
          </span>
          <div>
            <h2>Цель питания</h2>
            <p>Норма калорий и суточный баланс БЖУ.</p>
          </div>
        </div>

        <el-form label-position="top" @submit.prevent="saveGoal">
          <el-form-item label="Название цели">
            <el-input v-model="goalForm.title" placeholder="Например, поддержание веса" size="large" />
          </el-form-item>

          <div class="settings-form-grid">
            <el-form-item label="Калории, ккал">
              <el-input-number
                v-model="goalForm.kcal"
                class="settings-number"
                :min="0"
                :step="100"
                controls-position="right"
              />
            </el-form-item>
            <el-form-item label="Белки, г">
              <el-input-number
                v-model="goalForm.protein"
                class="settings-number"
                :min="0"
                :step="5"
                controls-position="right"
              />
            </el-form-item>
            <el-form-item label="Жиры, г">
              <el-input-number
                v-model="goalForm.fat"
                class="settings-number"
                :min="0"
                :step="5"
                controls-position="right"
              />
            </el-form-item>
            <el-form-item label="Углеводы, г">
              <el-input-number
                v-model="goalForm.carbs"
                class="settings-number"
                :min="0"
                :step="5"
                controls-position="right"
              />
            </el-form-item>
          </div>

          <el-button type="primary" :loading="isSavingGoal" @click="saveGoal">
            Сохранить цель
          </el-button>
        </el-form>
      </section>

      <section class="card notifications-card">
        <div class="settings-head">
          <span class="icon-badge icon-badge--green">
            <AppIcon name="bell" :size="21" />
          </span>
          <div>
            <h2>Уведомления</h2>
            <p>Выберите, о чём напоминать.</p>
          </div>
        </div>

        <div class="notification-row">
          <div>
            <h3>Напоминания о приёмах пищи</h3>
            <p>Мягкие напоминания в течение дня.</p>
          </div>
          <el-switch v-model="notifications.reminders" />
        </div>

        <div class="notification-row">
          <div>
            <h3>Недельный отчёт</h3>
            <p>Краткая статистика каждое воскресенье.</p>
          </div>
          <el-switch v-model="notifications.reports" />
        </div>

        <div class="notification-row">
          <div>
            <h3>Советы по питанию</h3>
            <p>Полезные материалы и идеи для рациона.</p>
          </div>
          <el-switch v-model="notifications.tips" />
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 22px;
}

.profile-card,
.goal-settings-card,
.notifications-card {
  padding: 26px;
}

.notifications-card {
  grid-column: 1 / -1;
}

.settings-head {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 22px;
}

.settings-head h2 {
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.2px;
}

.settings-head p {
  margin-top: 3px;
  color: var(--muted);
  font-size: 13px;
}

.profile-card__avatar {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #eef2f7;
  color: #64748b;
  flex-shrink: 0;
}

.settings-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 14px;
}

.settings-number {
  width: 100%;
}

.settings-number :deep(.el-input__inner) {
  text-align: left;
}

.notification-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 16px 0;
  border-bottom: 1px solid var(--line);
}

.notification-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.notification-row h3 {
  font-size: 15px;
  font-weight: 500;
}

.notification-row p {
  margin-top: 3px;
  color: var(--muted);
  font-size: 13px;
}

@media (max-width: 980px) {
  .settings-grid {
    grid-template-columns: 1fr;
  }

  .notifications-card {
    grid-column: auto;
  }
}

@media (max-width: 640px) {
  .profile-card,
  .goal-settings-card,
  .notifications-card {
    padding: 20px;
  }

  .settings-form-grid {
    grid-template-columns: 1fr;
  }

  .settings-head h2 {
    font-size: 17px;
  }

  .notification-row p {
    font-size: 12px;
  }
}
</style>
