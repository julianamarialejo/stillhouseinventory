<template>
  <div class="app">
    <Sidebar :currentPage="activePage" @change-page="activePage = $event" />

    <main class="content">
      <Dashboard v-if="activePage === 'dashboard'" />
      <TransactionPage v-if="activePage === 'transactions'" />
      <InventoryView v-if="activePage === 'inventory'" />
    </main>

    <EquipmentModal
      v-if="modalUnit"
      :unitData="modalUnit"
      @close="modalUnit = null"
      @assign="assignFromModal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Dashboard from './components/Dashboard.vue' 
import TransactionPage from './components/TransactionPage.vue' 
import InventoryView from './components/InventoryView.vue'
import EquipmentModal from './components/EquipmentModal.vue'

// 4. State para malaman kung anong page ang naka-display
const activePage = ref('dashboard') 
const modalUnit = ref(null)

window.__openUnitModal = (unit) => {
  modalUnit.value = unit
}

function assignFromModal(unitData) {
  unitData.status = 'Unavailable'
  modalUnit.value = { ...unitData }
  alert(`Assigned ${unitData.unit} (demo). Status updated to Unavailable.`)
}
</script>