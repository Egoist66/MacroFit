<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

/**
 * Призыв к действию на главной: быстрый переход
 * к добавлению нового приёма пищи.
 */
const emit = defineEmits<{
  add: []
}>()
</script>

<template>
  <section class="cta-card">
    <span class="cta-card__art"><AppIcon name="leaf" :size="58" :stroke-width="1.3" /></span>
    <div class="cta-card__text">
      <h3>Добавь свой первый приём пищи</h3>
      <p>Начни отслеживать питание прямо сейчас</p>
    </div>
    <el-button type="primary" circle class="cta-card__button" @click="emit('add')">
      <AppIcon name="arrow-right" :size="18" />
    </el-button>
  </section>
</template>

<style scoped lang="scss">
.cta-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  overflow: hidden;
  padding: 24px;
  border-radius: var(--radius);
  background: linear-gradient(145deg, #eefbf3 0%, #ddf7e8 100%);
}

.cta-card__art {
  position: absolute;
  top: 2px;
  right: 18px;
  color: #86efac;
  opacity: 0.55;
  transform: rotate(-12deg);
}

.cta-card__text {
  position: relative;
  z-index: 1;
  min-width: 0;
}

.cta-card__text h3 {
  max-width: 200px;
  color: #14532d;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.35;
}

.cta-card__text p {
  max-width: 210px;
  margin-top: 6px;
  color: #4b7a5d;
  font-size: 13px;
  line-height: 1.4;
}

.cta-card__button {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  margin-left: auto;
  box-shadow: 0 14px 24px -14px rgba(22, 163, 74, 0.9);
}

@media (max-width: 640px) {
  .cta-card {
    padding: 20px;
  }
}
</style>
