<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import DatePill from '@/components/ui/DatePill.vue'
import { useAppLayout } from './composables/useAppLayout'

/**
 * Общий каркас приложения на Element Plus layout:
 * боковая навигация на десктопе, нижняя панель на мобильных,
 * единая шапка страницы и контент маршрута.
 *
 * Заголовок и действия шапки задаются в meta маршрута,
 * поэтому ни один view не дублирует header.
 */
const { pageHeader, isDatePickerVisible, selectedDate } = useAppLayout()
</script>

<template>
  <el-container class="shell">
    <el-aside class="shell__aside" width="auto">
      <AppSidebar />
    </el-aside>

    <el-container class="shell__body" direction="vertical">
      <AppTopbar />

      <el-main class="shell__main">
        <PageHeader v-if="pageHeader" v-bind="pageHeader">
          <DatePill v-if="isDatePickerVisible" v-model="selectedDate" />
        </PageHeader>

        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.shell {
  min-height: 100vh;
  background: var(--bg);
}

.shell__aside {
  overflow: visible;
}

.shell__body {
  min-width: 0;
}

.shell__main {
  --el-main-padding: 0;
  width: 100%;
  max-width: 1620px;
  margin: 0 auto;
  padding: 32px 40px 48px;
  overflow: visible;
}

@media (max-width: 1100px) {
  .shell__main {
    padding: 26px 24px 40px;
  }
}

@media (max-width: 860px) {
  .shell__main {
    padding: 18px 16px calc(92px + env(safe-area-inset-bottom));
  }
}

@media (max-width: 400px) {
  .shell__main {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
