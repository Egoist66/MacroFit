<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppBrand from './AppBrand.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const route = useRoute()

const nav = [
  { to: '/', label: 'Главная', icon: 'home' },
  { to: '/nutrition', label: 'Питание', icon: 'meal' },
  { to: '/stats', label: 'Статистика', icon: 'stats' },
  { to: '/settings', label: 'Настройки', icon: 'settings' },
]

function isActive(to: string) {
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}
</script>

<template>
  <aside class="sidebar">
    <AppBrand class="sidebar__brand" />

    <nav class="sidebar__nav" aria-label="Основная навигация">
      <RouterLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="sidebar__link"
        :class="{ 'is-active': isActive(item.to) }"
      >
        <AppIcon :name="item.icon" :size="21" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="sidebar__promo">
      <span class="sidebar__promo-icon"><AppIcon name="leaf" :size="42" :stroke-width="1.4" /></span>
      <p>Маленькие<br />шаги ведут<br />к большим<br />результатам!</p>
      <span class="sidebar__promo-smile">:)</span>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.sidebar {
  position: sticky;
  top: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  width: 268px;
  height: 100vh;
  padding: 28px 20px;
  background: var(--surface);
  border-right: 1px solid var(--line);
  overflow-y: auto;
}

.sidebar__brand {
  padding: 2px 10px;
  margin-bottom: 32px;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 52px;
  padding: 0 16px;
  border-radius: 14px;
  color: #64748b;
  font-size: 15px;
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #f5f8fb;
    color: var(--text);
  }

  &.is-active {
    background: var(--green-soft);
    color: var(--green-dark);
    font-weight: 600;
  }
}

.sidebar__promo {
  margin-top: auto;
  padding: 24px 22px;
  border-radius: 22px;
  background: linear-gradient(160deg, #eefbf3 0%, #e4f8ec 100%);
  color: #14532d;
}

.sidebar__promo-icon {
  display: inline-block;
  color: #4ade80;
  margin-bottom: 18px;
}

.sidebar__promo p {
  font-size: 17px;
  font-weight: 600;
  line-height: 1.42;
  letter-spacing: -0.2px;
}

.sidebar__promo-smile {
  display: inline-block;
  margin-top: 10px;
  font-size: 17px;
  font-weight: 500;
  color: #16a34a;
}

@media (max-width: 1100px) {
  .sidebar {
    width: 228px;
    padding: 24px 14px;
  }

  .sidebar__promo {
    padding: 20px 18px;
  }

  .sidebar__promo p {
    font-size: 15px;
  }
}

@media (max-width: 860px) {
  .sidebar {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 60;
    width: 100%;
    height: auto;
    padding: 8px 10px calc(8px + env(safe-area-inset-bottom));
    border-right: 0;
    border-top: 1px solid var(--line);
    overflow: visible;
  }

  .sidebar__brand,
  .sidebar__promo {
    display: none;
  }

  .sidebar__nav {
    flex-direction: row;
    gap: 2px;
  }

  .sidebar__link {
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 3px;
    height: 54px;
    padding: 0 2px;
    border-radius: 12px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1px;
  }

  .sidebar__link.is-active {
    background: transparent;
    color: var(--green-dark);
  }
}
</style>
