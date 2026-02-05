<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content equipment-details">
      <div class="modal-header-simple">
        <h3>Equipment Information</h3>
        <button class="close-x" @click="$emit('close')">✕</button>
      </div>

      <div class="info-grid">
        <div class="info-group">
          <label>Unit No.</label>
          <div class="unit-id">{{ unitData.unit }}</div>
        </div>
        <div class="info-group">
          <label>Brand</label>
          <div class="val">{{ unitData.brand }}</div>
        </div>
        <div class="info-group">
          <label>Model</label>
          <div class="val">{{ unitData.model }}</div>
        </div>
        <div class="info-group">
          <label>Type</label>
          <div class="val">{{ unitData.type }}</div>
        </div>
        <div class="info-group">
          <label>Status</label>
          <div :class="['status-tag', unitData.status.toLowerCase()]">
            {{ unitData.status }}
          </div>
        </div>
      </div>
      </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  unitData: { type: Object, required: true }
});
const emit = defineEmits(['close','assign']);

const statusStyle = computed(() => {
  return {
    display: 'inline-block',
    padding: '6px 10px',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.06)',
    background: props.unitData.status === 'Available' ? 'rgba(70,200,120,0.12)' : '#fff0f0',
    color: props.unitData.status === 'Available' ? '#2b8b3a' : '#cc3740'
  };
});

function onAssign() {
  emit('assign', props.unitData);
}
</script>

<style scoped>
.equipment-details {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  width: 600px; /* Mas malapad para kumasya ang 5 columns */
  position: relative;
}

.modal-header-simple {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.modal-header-simple h3 {
  font-weight: 800;
  font-size: 1.25rem;
  margin: 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Hahatiin sa 5 columns */
  gap: 15px;
  align-items: start;
  margin-bottom: 2rem;
}

.info-group label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.unit-id {
  background: #f1f5f9;
  padding: 8px;
  border-radius: 8px;
  font-weight: 800;
  text-align: center;
}

.val {
  font-weight: 700;
  font-size: 14px;
  padding-top: 8px;
}

.status-tag {
  /* Binawasan ang padding para mas maliit ang box */
  padding: 4px 10px; 
  border-radius: 6px;
  font-size: 11px; /* Mas maliit na font para mag-fit sa maliit na box */
  font-weight: 700;
  text-align: center;
  display: inline-block; /* Para hindi kainin yung buong width */
  min-width: 80px; /* Para pantay pa rin kahit maikli yung word */
}

/* Kulay ng boxes */
.status-tag.available { 
  background: #dcfce7; 
  color: #166534; 
}

.status-tag.unavailable { 
  background: #fee2e2; 
  color: #991b1b; 
}
.btn-assign-wide {
  width: 100%;
  padding: 12px;
  background: #71717a;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 700;
  cursor: pointer;
}

.close-x {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #64748b;
}
</style>