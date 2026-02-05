<template>
  <aside class="sidebar">
    <div class="logo">stillhouse</div>

    <div class="menu">
      <div 
        class="item" 
        :class="{ active: currentPage === 'dashboard' }"
        @click="$emit('change-page', 'dashboard')"
      >
        <span class="icon">▦</span>
        <span>Dashboard</span>
      </div>

      <div 
        class="item" 
        :class="{ active: currentPage === 'transactions' }"
        @click="$emit('change-page', 'transactions')"
      >
        <span class="icon">⟳</span>
        <span>Transactions</span>
      </div>

      <div 
        class="item" 
        :class="{ active: currentPage === 'inventory' }"
        @click="$emit('change-page', 'inventory')"
      >
        <span class="icon">📷</span>
        <span>Inventory</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
// Tinatanggap natin kung anong page ang "active" galing sa App.vue
defineProps(['currentPage'])

// Nagse-set tayo ng "emits" para makapag-send ng signal pabalik sa App.vue
defineEmits(['change-page'])
</script>

<style scoped>
/* Siguraduhin na may cursor:pointer ang mga menu items para halatang clickable */
.item {
  cursor: pointer;
  transition: all 0.2s ease;
}
.item:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>