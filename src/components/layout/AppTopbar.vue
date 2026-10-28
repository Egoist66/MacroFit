<script setup lang="ts">
import AppBrand from './AppBrand.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

/**
 * Мобильная шапка приложения с логотипом и аватаром.
 * На десктопе скрыта: там навигацию берёт на себя сайдбар.
 */
</script>

<template>
  <el-header class="topbar" height="auto">
    <AppBrand compact />

    <span class="topbar__avatar">
      <AppIcon name="user" :size="18" />
    </span>
  </el-header>
</template>

<style scoped lang="scss">
.topbar {
  display: none;
}

.topbar__avatar {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #eef2f7;
  color: #64748b;
}

@media (max-width: 860px) {
  .topbar {
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 18px;
    background: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid var(--line);
    backdrop-filter: blur(14px);
  }
}
</style>
