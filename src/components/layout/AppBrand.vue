<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

/**
 * Фирменный логотип приложения.
 * Используется и в боковой навигации, и в мобильной шапке,
 * чтобы бренд не дублировался в разметке.
 */
const props = withDefaults(
  defineProps<{
    /** Компактный вариант для мобильной шапки. */
    compact?: boolean
  }>(),
  {
    compact: false,
  },
)

const iconSize = computed(() => (props.compact ? 24 : 30))
</script>

<template>
  <RouterLink
    to="/"
    class="app-brand"
    :class="{ 'app-brand--compact': compact }"
    aria-label="MacroFit — на главную"
  >
    <span class="app-brand__icon">
      <AppIcon name="leaf" :size="iconSize" />
    </span>
    <span class="app-brand__text">MacroFit</span>
  </RouterLink>
</template>

<style scoped lang="scss">
.app-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.app-brand__icon {
  display: grid;
  place-items: center;
  color: var(--green);
}

.app-brand__text {
  font-size: 25px;
  font-weight: 700;
  letter-spacing: -0.7px;
}

.app-brand--compact {
  gap: 8px;
}

.app-brand--compact .app-brand__text {
  font-size: 20px;
  letter-spacing: -0.5px;
}
</style>
