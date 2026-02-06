<template>
  <div>
    <div class="row">
      <div class="left-col">
        <div class="card profile">
          <div style="display:flex; gap:12px; align-items:center">
            <div class="avatar">U</div>
            <div>
              <!-- username is bold via .profile .username -->
              <div class="username">User 1</div>
              <div style="color:var(--muted); font-size:13px">Staff</div>
            </div>
          </div>
          <div>
            <button class="logout-btn">Log Out</button>
          </div>
        </div>

        <div class="card">
          <!-- Inventory Overview heading -->
          <div class="card-title" style="margin-bottom:8px">
            Inventory Overview
          </div>
          <div class="inventory-rows">
            <div class="inv-row">
              <div class="inv-left">112</div>
              <div class="inv-right">Rentals Completed</div>
            </div>
            <div class="inv-row">
              <div class="inv-left">5</div>
              <div class="inv-right">No. of Camera Units</div>
            </div>
            <div class="inv-row">
              <div class="inv-left">13</div>
              <div class="inv-right">No. of Accessories</div>
            </div>
          </div>
        </div>

        <div class="card">
          <!-- Active Orders heading -->
          <div class="card-title" style="margin-bottom:8px">
            Active Orders
          </div>
          <div style="display:flex; flex-direction:column; gap:12px">
            <div style="display:flex; justify-content:space-between; align-items:center">
              <div>M50 Mark II</div>
              <div class="badge-unavail">Unavailable</div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center">
              <div>Instax Link</div>
              <div class="badge-unavail">Unavailable</div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-col" style="flex:1">
        <div class="card">
          <div
            style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px"
          >
            <!-- Equipment Availability heading -->
            <div class="card-title" style="margin-bottom:0">Equipment Availability
            </div>
          </div>

          <div class="avail-controls">
            <div class="select">
              <select v-model="selectedUnit">
                <option v-for="(eq, i) in equipmentList" :key="i" :value="eq">
                  {{ eq }}
                </option>
              </select>
            </div>

            <div class="date">
              <input type="date" v-model="selectedDate" />
            </div>

            <div>
              <button class="btn" @click="onCheck">Check</button>
            </div>
          </div>

          <div v-if="msg" style="margin-top:12px; color:#444">
            {{ msg }}
          </div>

          <div v-if="availabilityResults.length > 0" class="avail-results">
            <div
              v-for="u in availabilityResults"
              :key="u.unit"
              class="avail-item"
            >
              <div style="display:flex; gap:12px; align-items:center">
                <div class="unit-pill">{{ u.unit }}</div>
                <div>
                  <div style="font-weight:700">
                    {{ u.brand }} {{ u.model }}
                  </div>
                  <div style="color:var(--muted); font-size:13px">
                    {{ u.type }}
                  </div>
                </div>
              </div>
              <div style="display:flex; gap:12px; align-items:center">
                <div :style="statusUI(u.status)">{{ u.status }}</div>
                <button class="details-btn" @click="openDetails(u)">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div
            style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px"
          >
            <!-- Recent Rentals heading -->
            <div class="card-title" style="margin-bottom:0">
              Recent Rentals
            </div>
          </div>
          <div class="rentals">
            <div v-for="(r, idx) in rentals" :key="idx" class="rental-row">
              <div style="display:flex; align-items:center; flex:1">
                <div class="unit-pill">{{ r.unit }}</div>
                <div style="width:160px">{{ r.model }}</div>
                <div style="flex:1">{{ r.renter }}</div>
                <div class="status">
                  <div class="status-dot"></div>{{ r.status }}
                </div>
                <div style="width:70px; text-align:right">
                  {{ r.balance }}
                </div>
              </div>
              <div>
                <button class="details-btn" @click="openDetailsByUnit(r.unit)">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div
            style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px"
          >
            <!-- Recent Transactions heading -->
            <div class="card-title" style="margin-bottom:0">
              Recent Transactions
            </div>
          </div>

          <div class="txns">
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Camera Model</th>
                  <th>Add-Ons</th>
                  <th>Daily Rental Fee</th>
                  <th>Total Cost</th>
                  <th>Number of Days</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(t, i) in transactions" :key="i">
                  <td>{{ t.date }}</td>
                  <td>{{ t.name }}</td>
                  <td>{{ t.model }}</td>
                  <td>{{ t.addOns }}</td>
                  <td>{{ t.daily }}</td>
                  <td>{{ t.total }}</td>
                  <td>{{ t.days }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'; // Nag-import tayo ng onMounted
import {
  EQUIPMENT_LIST,
  UNITS,
  RECENT_RENTALS,
  RECENT_TRANSACTIONS
} from '../data';

const equipmentList = EQUIPMENT_LIST;
const selectedUnit = ref(equipmentList[0]);
const selectedDate = ref(new Date().toISOString().slice(0, 10));
const availabilityResults = ref([]);
const msg = ref('');
const rentals = ref(RECENT_RENTALS);

// Gawin nating dynamic itong transactions
const transactions = ref([]);

onMounted(() => {
  // 1. Kuhanin ang data mula sa localStorage
  const savedTxns = localStorage.getItem('transactions');
  
  if (savedTxns) {
    const parsed = JSON.parse(savedTxns);
    // 2. I-sort para sigurado na pinakabagong date ang nasa taas
    // 3. Kuhanin lang ang TOP 5 (slice)
    transactions.value = parsed.slice(0, 5);
  } else {
    // Kung wala pa, gamitin ang default na nasa data.js
    transactions.value = RECENT_TRANSACTIONS.slice(0, 5);
  }
});

function onCheck() {
  const sel = selectedUnit.value.toLowerCase();
  const found = UNITS.filter((u) => {
    const model = (u.model || '').toLowerCase();
    return (
      model &&
      (sel.includes(model) ||
        model.includes(sel) ||
        sel.includes(u.brand.toLowerCase()))
    );
  });
  if (found.length === 0) {
    availabilityResults.value = [];
    msg.value = `No unit records found for "${selectedUnit.value}" on ${selectedDate.value}.`;
    return;
  }
  availabilityResults.value = found;
  msg.value = `Found ${found.length} unit(s) for "${selectedUnit.value}" on ${selectedDate.value}.`;
}

function openDetails(u) {
  if (window.__openUnitModal) window.__openUnitModal(u);
  else alert('Open modal not available');
}

function openDetailsByUnit(unitId) {
  const found = UNITS.find((x) => x.unit === unitId);
  if (found) openDetails(found);
  else alert('Unit not found');
}

function statusUI(status) {
  return {
    padding: '6px 10px',
    borderRadius: '8px',
    background:
      status === 'Available' ? 'rgba(70,200,120,0.12)' : '#fff0f0',
    color: status === 'Available' ? '#2b8b3a' : '#cc3740',
    border: '1px solid rgba(0,0,0,0.04)'
  };
}
</script>