<script setup lang="ts">
import type { PageHeaderMeta } from '@/components/ui/page-header.types'

defineProps<PageHeaderMeta>()
</script>

<template>
  <header class="page-header">
    <div class="page-header__text">
      <h1 class="page-header__title">
        {{ title }}
        <span v-if="emoji" class="page-header__emoji">{{ emoji }}</span>
      </h1>
      <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.default" class="page-header__actions">
      <slot />
    </div>
  </header>
</template>

<style scoped lang="scss">
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 26px;
}

.page-header__title {
  font-size: 34px;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.8px;
}

.page-header__emoji {
  display: inline-block;
  margin-left: 4px;
  font-size: 0.9em;
  transform: translateY(2px);
}

.page-header__subtitle {
  margin-top: 8px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.5;
}

.page-header__actions {
  flex-shrink: 0;
  padding-top: 4px;
}

@media (max-width: 640px) {
  .page-header {
    flex-direction: column;
    gap: 14px;
    margin-bottom: 18px;
  }

  .page-header__title {
    font-size: 27px;
    letter-spacing: -0.5px;
  }

  .page-header__subtitle {
    font-size: 14px;
    margin-top: 6px;
  }

  .page-header__actions {
    width: 100%;
    padding-top: 0;
  }
}
</style>
