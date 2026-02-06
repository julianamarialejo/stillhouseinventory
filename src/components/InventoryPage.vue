<<<<<<< HEAD
<!-- src/components/InventoryPage.vue -->
<template>
  <div class="view-items-page">
    <div class="grid">
      <!-- LEFT -->
      <section class="left-panel">
        <div class="left-card">
          <div class="left-head">
            <div class="left-head-row">
              <!-- ✅ TITLE (NO DROPDOWN) -->
              <div class="cat-title">{{ categoryLabel }}</div>

              <!-- menu -->
              <div class="menu-wrap" @click.stop>
                <button class="menu-btn" type="button" @click="menuOpen = !menuOpen">▾</button>

                <div class="menu" :class="{ hidden: !menuOpen }">
                  <button class="menu-item" type="button" @click="menuOpen=false; openAddItem()">
                    <span class="mi-ic">＋</span>
                    <span>Add New Item</span>
                  </button>

                  <button
                    class="menu-item"
                    type="button"
                    :disabled="!activeItem"
                    @click="menuOpen=false; openEditItem()"
                  >
                    <span class="mi-ic">✎</span>
                    <span>Edit Item</span>
=======
<template>
  <div class="view-items-page inv-page">
    <div class="grid inv-grid">
      <!-- LEFT -->
      <section class="left-panel inv-left">
        <div class="left-card inv-left-card">
          <div class="left-head inv-left-head">
            <div class="left-head-row">
              <!-- Category dropdown like screenshot -->
              <select class="cat-select inv-cat-select" v-model="selectedCategory">
                <option v-for="c in categories" :key="c.key" :value="c.key">
                  {{ c.label }}
                </option>
              </select>

              <!-- menu -->
              <div class="menu-wrap inv-menu-wrap" @click.stop>
                <button class="menu-btn inv-menu-btn" type="button" @click="menuOpen = !menuOpen">▾</button>

                <div class="menu" :class="{ hidden: !menuOpen }">
                  <button class="menu-item" type="button" @click="menuOpen=false; openAddItem()">
                    ＋ Add New Item
                  </button>

                  <button class="menu-item" type="button" :disabled="!activeItem" @click="menuOpen=false; openEditItem()">
                    ✎ Edit Item
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
                  </button>

                  <div class="menu-sep"></div>

<<<<<<< HEAD
                  <button
                    class="menu-item danger"
                    type="button"
                    :disabled="!activeItem"
                    @click="menuOpen=false; openDeleteItem()"
                  >
                    <span class="mi-ic">🗑</span>
                    <span>Delete Item</span>
=======
                  <button class="menu-item danger" type="button" :disabled="!activeItem" @click="menuOpen=false; openDeleteItem()">
                    🗑 Delete Item
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
                  </button>
                </div>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <div class="item-list">
            <div
              v-for="it in items"
              :key="it.id"
              class="item-row"
=======
          <div class="item-list inv-item-list">
            <div
              v-for="it in items"
              :key="it.id"
              class="item-row inv-item-row"
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
              :class="{ active: it.id === activeId }"
              @click="select(it.id)"
            >
              <div class="item-left">
                <div class="thumb"><img :src="it.icon || fallbackIcon" alt="" /></div>
                <div class="it-text">
                  <p class="it-name">{{ it.name }}</p>
                  <p class="it-sub">{{ it.sub }}</p>
                </div>
              </div>

              <span class="badge" :class="badgeClass(it.status)">
                {{ it.status || 'Available' }}
              </span>
            </div>

<<<<<<< HEAD
            <div v-if="!items.length" class="inv-empty">No items yet.</div>
=======
            <div v-if="!items.length" class="inv-empty">
              No items yet.
            </div>
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
          </div>
        </div>
      </section>

      <!-- RIGHT -->
<<<<<<< HEAD
      <section class="right-panel">
        <div class="card big">
          <div class="card-title">Equipment Information</div>

          <div class="info-grid">
=======
      <section class="right-panel inv-right">
        <div class="card big inv-card-big">
          <div class="card-title">Equipment Information</div>

          <div class="info-grid inv-info-grid">
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
            <div class="info-col">
              <div><div class="k">Unit No.</div><div class="v">{{ activeItem?.info?.unitNo || '' }}</div></div>
              <div><div class="k">Brand</div><div class="v">{{ activeItem?.info?.brand || '' }}</div></div>
              <div><div class="k">Model</div><div class="v">{{ activeItem?.info?.model || '' }}</div></div>
              <div><div class="k">Type</div><div class="v">{{ activeItem?.info?.type || '' }}</div></div>
            </div>

            <div class="status-wrap">
              <div class="k">Status</div>
              <div class="status-pill" :class="statusPillClass(activeItem?.status)">
                {{ activeItem?.status || '' }}
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="stats-grid">
            <div><div class="k">Date Purchased</div><div class="v">{{ activeItem?.info?.purchased || '' }}</div></div>
            <div><div class="k">Rentals Completed</div><div class="v">{{ rentalsCompleted }}</div></div>
            <div><div class="k">Total Days Rented</div><div class="v">{{ totalDaysRented }}</div></div>
            <div><div class="k">Rental Price</div><div class="v">{{ activeItem?.info?.price || '' }}</div></div>
          </div>
        </div>

<<<<<<< HEAD
        <div class="bottom-row">
=======
        <div class="bottom-row inv-bottom">
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
          <!-- history -->
          <div class="card">
            <div class="card-title">Rental History</div>

            <div class="table">
              <div class="thead">
                <div>Days</div><div>Rental Details</div><div>Status</div>
              </div>

              <div class="tbody">
                <div class="tr" v-for="(h, idx) in filteredHistory" :key="idx">
                  <div class="rh-days">{{ h.days }}</div>
                  <div>
                    <div class="detail-top">{{ h.code }}</div>
                    <div class="detail-sub">{{ h.date }}</div>
                  </div>
                  <div class="small-pill" :class="smallPillClass(h.status)">{{ h.status }}</div>
                </div>

                <div v-if="!filteredHistory.length" class="inv-empty">
                  No rentals for this day.
                </div>
              </div>
            </div>
          </div>

          <!-- calendar -->
          <div class="card">
            <div class="cal-head">
              <button class="cal-nav" type="button" @click="prevMonth">‹</button>
              <div class="cal-title">{{ calTitle }}</div>
              <button class="cal-nav" type="button" @click="nextMonth">›</button>
            </div>

            <div class="cal-dow">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>

            <div class="cal-days">
              <div
                v-for="(d, i) in calendarDays"
                :key="i"
                class="cal-day"
<<<<<<< HEAD
                :class="{ muted: d.muted, selected: d.selected, 'has-order': d.hasOrder }"
=======
                :class="{ muted: d.muted, selected: d.selected, 'has-order': d.hasOrder, today: d.today }"
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
                @click="selectDay(d)"
              >
                {{ d.label }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

<<<<<<< HEAD
    <!-- ADD -->
    <div class="inv-modal" :class="{ hidden: !itemModal.open || itemModal.mode !== 'add' }">
      <div class="inv-modal-overlay" @click="closeItemModal"></div>

      <div class="inv-modal-card" role="dialog" aria-modal="true">
=======
    <!-- ADD MODAL -->
    <div class="modal" :class="{ hidden: !itemModal.open || itemModal.mode !== 'add' }">
      <div class="modal-overlay" @click="closeItemModal"></div>

      <div class="modal-card" role="dialog" aria-modal="true">
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
        <div class="modal-head">
          <h3>Add New {{ labelSingular }}</h3>
          <button class="modal-x" type="button" @click="closeItemModal">✕</button>
        </div>

        <form class="modal-body" @submit.prevent="saveItem">
<<<<<<< HEAD
          <!-- ✅ photo LEFT, fields RIGHT -->
          <div class="modal-layout">
            <!-- LEFT PHOTO PANEL -->
            <div class="photo-pane">
              <div class="photo-label">Photo</div>

              <div class="photo-box">
                <div v-if="!form.icon" class="photo-empty">No photo</div>
                <img v-else :src="form.icon" alt="" />
              </div>

              <div class="photo-actions">
                <input class="file-input" type="file" accept="image/*" @change="onPhoto" onclick="this.value=null" />
                <button type="button" class="btn ghost" @click="form.icon=''">Remove</button>
                <small class="photo-hint">PNG/JPG recommended</small>
              </div>
            </div>

            <!-- RIGHT FIELDS -->
            <div class="fields-pane">
              <div class="modal-grid">
                <div class="field">
                  <label>Unit No.</label>
                  <input v-model.trim="form.unitNo" placeholder="e.g. A-3006" required />
                </div>

                <div class="field">
                  <label>Brand</label>
                  <input v-model.trim="form.brand" placeholder="e.g. DJI" required />
                </div>

                <div class="field">
                  <label>Name (List Title)</label>
                  <input v-model.trim="form.name" placeholder="e.g. Rode Wireless GO" required />
                </div>

                <div class="field">
                  <label>Subtitle (List Sub)</label>
                  <input v-model.trim="form.sub" placeholder="e.g. Wireless microphone" required />
                </div>

                <div class="field">
                  <label>Type</label>
                  <input v-model.trim="form.type" placeholder="e.g. Wireless Microphone" required />
                </div>

                <div class="field">
                  <label>Status</label>
                  <select v-model="form.status" required>
                    <option value="">Select status</option>
                    <option>Available</option>
                    <option>Unavailable</option>
                    <option>Maintenance</option>
                  </select>
                </div>

                <div class="field">
                  <label>Date Purchased (text)</label>
                  <input v-model.trim="form.purchased" placeholder="e.g. October, 2025" required />
                </div>

                <div class="field">
                  <label>Rental Price (₱ / day)</label>
                  <input
                    v-model.number="form.pricePerDay"
                    placeholder="e.g. 150"
                    type="number"
                    min="0"
                    step="1"
                    required
                  />
                </div>
              </div>

              <p class="modal-error">{{ itemModal.error }}</p>

              <div class="modal-actions">
                <button type="button" class="btn ghost" @click="closeItemModal">Cancel</button>
                <button type="submit" class="btn primary">Save Item</button>
              </div>
            </div>
=======
          <div class="modal-grid">
            <div class="field" style="grid-column:1/-1;">
              <label>Photo</label>
              <div class="photo-row">
                <div class="photo-preview">
                  <span v-if="!form.icon" class="photo-placeholder">No photo</span>
                  <img v-else :src="form.icon" alt="" />
                </div>
                <div class="photo-actions">
                  <input type="file" accept="image/*" @change="onPhoto" />
                  <button type="button" class="btn ghost" @click="form.icon=''">Remove</button>
                  <small class="photo-hint">PNG/JPG recommended</small>
                </div>
              </div>
            </div>

            <div class="field"><label>Unit No.</label><input v-model.trim="form.unitNo" required /></div>
            <div class="field"><label>Brand</label><input v-model.trim="form.brand" required /></div>
            <div class="field"><label>Name (List Title)</label><input v-model.trim="form.name" required /></div>
            <div class="field"><label>Subtitle (List Sub)</label><input v-model.trim="form.sub" required /></div>
            <div class="field"><label>Model</label><input v-model.trim="form.model" required /></div>
            <div class="field"><label>Type</label><input v-model.trim="form.type" required /></div>

            <div class="field">
              <label>Status</label>
              <select v-model="form.status" required>
                <option value="">Select status</option>
                <option>Available</option>
                <option>Unavailable</option>
                <option>Maintenance</option>
              </select>
            </div>

            <div class="field"><label>Date Purchased</label><input v-model.trim="form.purchased" required /></div>
            <div class="field"><label>Rental Price (₱ / day)</label><input v-model.number="form.pricePerDay" type="number" min="0" step="1" required /></div>
          </div>

          <p class="modal-error">{{ itemModal.error }}</p>

          <div class="modal-actions">
            <button type="button" class="btn ghost" @click="closeItemModal">Cancel</button>
            <button type="submit" class="btn primary">Save Item</button>
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
          </div>
        </form>
      </div>
    </div>

<<<<<<< HEAD
    <!-- EDIT -->
    <div class="inv-modal" :class="{ hidden: !itemModal.open || itemModal.mode !== 'edit' }">
      <div class="inv-modal-overlay" @click="closeItemModal"></div>

      <div class="inv-modal-card" role="dialog" aria-modal="true">
=======
    <!-- EDIT MODAL -->
    <div class="modal" :class="{ hidden: !itemModal.open || itemModal.mode !== 'edit' }">
      <div class="modal-overlay" @click="closeItemModal"></div>

      <div class="modal-card" role="dialog" aria-modal="true">
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
        <div class="modal-head">
          <h3>Edit {{ labelSingular }}</h3>
          <button class="modal-x" type="button" @click="closeItemModal">✕</button>
        </div>

        <form class="modal-body" @submit.prevent="saveItem">
<<<<<<< HEAD
          <!-- ✅ photo LEFT, fields RIGHT -->
          <div class="modal-layout">
            <!-- LEFT PHOTO PANEL -->
            <div class="photo-pane">
              <div class="photo-label">Photo</div>

              <div class="photo-box">
                <div v-if="!form.icon" class="photo-empty">No photo</div>
                <img v-else :src="form.icon" alt="" />
              </div>

              <div class="photo-actions">
                <input class="file-input" type="file" accept="image/*" @change="onPhoto" onclick="this.value=null" />
                <button type="button" class="btn ghost" @click="form.icon=''">Remove</button>
                <small class="photo-hint">PNG/JPG recommended</small>
              </div>
            </div>

            <!-- RIGHT FIELDS -->
            <div class="fields-pane">
              <div class="modal-grid">
                <div class="field">
                  <label>Unit No.</label>
                  <input v-model.trim="form.unitNo" placeholder="e.g. A-3006" required />
                </div>

                <div class="field">
                  <label>Brand</label>
                  <input v-model.trim="form.brand" placeholder="e.g. DJI" required />
                </div>

                <div class="field">
                  <label>Name (List Title)</label>
                  <input v-model.trim="form.name" placeholder="e.g. Rode Wireless GO" required />
                </div>

                <div class="field">
                  <label>Subtitle (List Sub)</label>
                  <input v-model.trim="form.sub" placeholder="e.g. Wireless microphone" required />
                </div>

                <div class="field">
                  <label>Type</label>
                  <input v-model.trim="form.type" placeholder="e.g. Wireless Microphone" required />
                </div>

                <div class="field">
                  <label>Status</label>
                  <select v-model="form.status" required>
                    <option value="">Select status</option>
                    <option>Available</option>
                    <option>Unavailable</option>
                    <option>Maintenance</option>
                  </select>
                </div>

                <div class="field">
                  <label>Date Purchased (text)</label>
                  <input v-model.trim="form.purchased" placeholder="e.g. October, 2025" required />
                </div>

                <div class="field">
                  <label>Rental Price (₱ / day)</label>
                  <input
                    v-model.number="form.pricePerDay"
                    placeholder="e.g. 150"
                    type="number"
                    min="0"
                    step="1"
                    required
                  />
                </div>
              </div>

              <p class="modal-error">{{ itemModal.error }}</p>

              <div class="modal-actions">
                <button type="button" class="btn ghost" @click="closeItemModal">Cancel</button>
                <button type="submit" class="btn primary">Save Changes</button>
              </div>
            </div>
=======
          <div class="modal-grid">
            <div class="field" style="grid-column:1/-1;">
              <label>Photo</label>
              <div class="photo-row">
                <div class="photo-preview">
                  <span v-if="!form.icon" class="photo-placeholder">No photo</span>
                  <img v-else :src="form.icon" alt="" />
                </div>
                <div class="photo-actions">
                  <input type="file" accept="image/*" @change="onPhoto" />
                  <button type="button" class="btn ghost" @click="form.icon=''">Remove</button>
                  <small class="photo-hint">PNG/JPG recommended</small>
                </div>
              </div>
            </div>

            <div class="field"><label>Unit No.</label><input v-model.trim="form.unitNo" required /></div>
            <div class="field"><label>Brand</label><input v-model.trim="form.brand" required /></div>
            <div class="field"><label>Name (List Title)</label><input v-model.trim="form.name" required /></div>
            <div class="field"><label>Subtitle (List Sub)</label><input v-model.trim="form.sub" required /></div>
            <div class="field"><label>Model</label><input v-model.trim="form.model" required /></div>
            <div class="field"><label>Type</label><input v-model.trim="form.type" required /></div>

            <div class="field">
              <label>Status</label>
              <select v-model="form.status" required>
                <option value="">Select status</option>
                <option>Available</option>
                <option>Unavailable</option>
                <option>Maintenance</option>
              </select>
            </div>

            <div class="field"><label>Date Purchased</label><input v-model.trim="form.purchased" required /></div>
            <div class="field"><label>Rental Price (₱ / day)</label><input v-model.number="form.pricePerDay" type="number" min="0" step="1" required /></div>
          </div>

          <p class="modal-error">{{ itemModal.error }}</p>

          <div class="modal-actions">
            <button type="button" class="btn ghost" @click="closeItemModal">Cancel</button>
            <button type="submit" class="btn primary">Save Changes</button>
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
          </div>
        </form>
      </div>
    </div>

<<<<<<< HEAD
    <!-- DELETE -->
    <div class="inv-modal" :class="{ hidden: !deleteOpen }">
      <div class="inv-modal-overlay" @click="closeDelete"></div>

      <!-- ✅ smaller delete modal -->
      <div class="inv-modal-card inv-modal-card-sm" role="dialog" aria-modal="true">
=======
    <!-- DELETE MODAL -->
    <div class="modal" :class="{ hidden: !deleteOpen }">
      <div class="modal-overlay" @click="closeDelete"></div>

      <div class="modal-card" role="dialog" aria-modal="true">
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
        <div class="modal-head">
          <h3>Delete {{ labelSingular }}</h3>
          <button class="modal-x" type="button" @click="closeDelete">✕</button>
        </div>

        <div class="modal-body">
          <div class="field">
            <label>Select item to delete</label>
            <select v-model="deleteId">
              <option value="">Select item</option>
              <option v-for="it in items" :key="it.id" :value="it.id">{{ it.name }}</option>
            </select>
          </div>

          <p class="modal-error">{{ deleteError }}</p>

          <div class="modal-actions">
            <button type="button" class="btn ghost" @click="closeDelete">Cancel</button>
            <button type="button" class="btn danger" @click="confirmDelete">Delete</button>
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD

=======
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
<<<<<<< HEAD
import { addInventoryItem, deleteInventoryItem, getItems, seedIfEmpty, updateInventoryItem } from '../lib/inventoryStore'

const props = defineProps({
  category: { type: String, default: 'cameras' },
  categories: { type: Array, default: null },
})

=======
import {
  addInventoryItem,
  deleteInventoryItem,
  getItems,
  seedIfEmpty,
  updateInventoryItem,
} from '../lib/inventoryStore'

const props = defineProps({
  // passed from InventoryView
  category: { type: String, default: 'cameras' },
  // optional: if you want to pass a categories list from InventoryView later
  categories: { type: Array, default: null },
})

/* categories used by dropdown */
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
const categories = computed(() => {
  if (Array.isArray(props.categories) && props.categories.length) return props.categories
  return [
    { key: 'cameras', label: 'Cameras' },
    { key: 'lenses', label: 'Lenses' },
    { key: 'tripods', label: 'Tripods' },
    { key: 'printer', label: 'Printers' },
    { key: 'accessories', label: 'Accessories' },
  ]
})

<<<<<<< HEAD
/** ✅ Use selectedCategory (NOT props.category) so title updates if you switch categories later */
const LABEL = { cameras:'Cameras', lenses:'Lenses', tripods:'Tripods', printer:'Printers', accessories:'Accessories' }
const selectedCategory = ref(props.category)
watch(() => props.category, (v) => { selectedCategory.value = v })

const categoryLabel = computed(() => LABEL[selectedCategory.value] || 'Items')

const SINGULAR = { cameras: 'Camera', lenses: 'Lens', tripods: 'Tripod', printer: 'Printer', accessories: 'Accessory' }
=======
/* category selection */
const selectedCategory = ref(props.category)
watch(() => props.category, (v) => { selectedCategory.value = v })

/* labels */
const LABEL = { cameras: 'Cameras', lenses: 'Lenses', tripods: 'Tripods', printer: 'Printers', accessories: 'Accessories' }
const SINGULAR = { cameras: 'Camera', lenses: 'Lens', tripods: 'Tripod', printer: 'Printer', accessories: 'Accessory' }
const label = computed(() => LABEL[selectedCategory.value] || selectedCategory.value)
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
const labelSingular = computed(() => SINGULAR[selectedCategory.value] || 'Item')

const fallbackIcon = '/vite.svg'

<<<<<<< HEAD
=======
/* items */
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
const items = computed(() => getItems(selectedCategory.value))
const activeId = ref(null)
const activeItem = computed(() => items.value.find(x => x.id === activeId.value) || null)

watch(items, () => {
  if (!activeId.value && items.value.length) activeId.value = items.value[0].id
}, { immediate: true })

<<<<<<< HEAD
function select(id){
=======
watch(selectedCategory, () => {
  activeId.value = getItems(selectedCategory.value)[0]?.id || null
  selectedDate.value = '2025-10-21'
  calYear.value = 2025
  calMonth.value = 9
})

function select(id) {
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
  activeId.value = id
  selectedDate.value = null
}

/* menu */
const menuOpen = ref(false)
onMounted(() => document.addEventListener('click', () => { menuOpen.value = false }))

<<<<<<< HEAD
=======
/* pills */
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
function badgeClass(status) {
  const s = (status || '').toLowerCase()
  if (s.includes('unavailable')) return 'bad'
  if (s.includes('maintenance')) return 'warn'
  return 'good'
}
function statusPillClass(status) {
  const s = (status || '').toLowerCase()
  if (s.includes('unavailable')) return 'bad'
  if (s.includes('maintenance')) return 'warn'
  return ''
}
function smallPillClass(status) {
  const s = (status || '').toLowerCase()
  if (s.includes('cancel')) return 'red'
  return 'blue'
}

<<<<<<< HEAD
const rentalsCompleted = computed(() =>
  (activeItem.value?.history || []).filter(h => (h.status || '').toLowerCase() === 'completed').length
)
const totalDaysRented = computed(() =>
  (activeItem.value?.history || []).reduce((sum, h) => sum + Number(h.days || 0), 0)
)
=======
const rentalsCompleted = computed(() => (activeItem.value?.history || []).filter(h => (h.status || '').toLowerCase() === 'completed').length)
const totalDaysRented = computed(() => (activeItem.value?.history || []).reduce((sum, h) => sum + Number(h.days || 0), 0))
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694

/* seed sample */
onMounted(() => {
  seedIfEmpty('cameras', [
    {
      id: 'canon-80d',
      icon: '/icons/80d.png',
      name: '80d',
      sub: 'Canon camera',
      status: 'Available',
      info: { unitNo: '00823', brand: 'Canon', model: '80d', type: 'DSLR', purchased: 'June, 2024', price: '₱500 / day' },
      history: [
<<<<<<< HEAD
        { days:'04', code:'#CR01018', date:'Oct 1 - Oct 18', status:'Completed', start:'2025-10-01', end:'2025-10-18' },
        { days:'03', code:'#CR01007', date:'Oct 1 - Oct 3', status:'Cancelled', start:'2025-10-01', end:'2025-10-03' },
        { days:'05', code:'#CR00932', date:'Sept 1 - Sept 2', status:'Completed', start:'2025-09-01', end:'2025-09-02' },
=======
        { days:'04', code:'#CR01018', date:'Oct 18 - Oct 19', status:'Completed', start:'2025-10-18', end:'2025-10-19' },
        { days:'03', code:'#CR01007', date:'Oct 8 - Oct 11', status:'Cancelled', start:'2025-10-08', end:'2025-10-11' },
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
      ],
    },
  ])
})

/* calendar */
<<<<<<< HEAD
const selectedDate = ref(null)
const calYear = ref(2025)
const calMonth = ref(9) // October (0-based)

function pad2(n){ return String(n).padStart(2,'0') }
=======
const selectedDate = ref('2025-10-21')
const calYear = ref(2025)
const calMonth = ref(9)

function pad2(n){ return String(n).padStart(2,"0") }
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
function toISO(y,m,d){ return `${y}-${pad2(m+1)}-${pad2(d)}` }

const calTitle = computed(() => {
  const names = ["January","February","March","April","May","June","July","August","September","October","November","December"]
  return `${names[calMonth.value]} ${calYear.value}`
})

function dayHasOrder(dateISO){
  const it = activeItem.value
  if(!it) return false
  return (it.history || []).some(h => h.start && h.end && dateISO >= h.start && dateISO <= h.end)
}

const calendarDays = computed(() => {
  const y = calYear.value
  const m = calMonth.value

  const first = new Date(y, m, 1)
  const start = first.getDay()
  const count = new Date(y, m + 1, 0).getDate()
  const prevCount = new Date(y, m, 0).getDate()

<<<<<<< HEAD
  const out = []
  for(let i=0;i<start;i++){
    out.push({ label:String(prevCount - start + 1 + i), muted:true, selected:false, hasOrder:false, iso:null })
  }
  for(let d=1; d<=count; d++){
    const iso = toISO(y, m, d)
    out.push({ label:String(d), muted:false, selected:selectedDate.value===iso, hasOrder:dayHasOrder(iso), iso })
=======
  const today = new Date()
  const todayISO = toISO(today.getFullYear(), today.getMonth(), today.getDate())

  const out = []
  for(let i=0;i<start;i++){
    out.push({ label:String(prevCount - start + 1 + i), muted:true, selected:false, hasOrder:false, today:false, iso:null })
  }
  for(let d=1; d<=count; d++){
    const iso = toISO(y, m, d)
    out.push({ label:String(d), muted:false, selected:selectedDate.value===iso, hasOrder:dayHasOrder(iso), today: iso===todayISO, iso })
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
  }
  const total = start + count
  const remain = (7 - (total % 7)) % 7
  for(let i=1;i<=remain;i++){
<<<<<<< HEAD
    out.push({ label:String(i), muted:true, selected:false, hasOrder:false, iso:null })
=======
    out.push({ label:String(i), muted:true, selected:false, hasOrder:false, today:false, iso:null })
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
  }
  return out
})

function prevMonth(){
  calMonth.value--
  if(calMonth.value < 0){ calMonth.value = 11; calYear.value-- }
  selectedDate.value = null
}
function nextMonth(){
  calMonth.value++
  if(calMonth.value > 11){ calMonth.value = 0; calYear.value++ }
  selectedDate.value = null
}
function selectDay(d){
  if(d.muted || !d.iso) return
  selectedDate.value = d.iso
}

const filteredHistory = computed(() => {
  const it = activeItem.value
  if(!it) return []
  const rows = it.history || []
  const iso = selectedDate.value
  if(!iso) return rows
  return rows.filter(h => h.start && h.end && iso >= h.start && iso <= h.end)
})

<<<<<<< HEAD
/* add/edit */
const itemModal = reactive({ open:false, mode:'add', editId:null, error:'' })
const form = reactive({
  icon:'', unitNo:'', brand:'', model:'', name:'', sub:'', type:'', status:'', purchased:'', pricePerDay: null,
})

function resetForm(){
  Object.assign(form, { icon:'', unitNo:'', brand:'', model:'', name:'', sub:'', type:'', status:'', purchased:'', pricePerDay: null })
}
=======
/* modals */
const itemModal = reactive({ open:false, mode:'add', editId:null, error:'' })
const form = reactive({
  icon:'', unitNo:'', brand:'', model:'', name:'', sub:'', type:'', status:'', purchased:'', pricePerDay: 0,
})

function resetForm(){
  Object.assign(form, { icon:'', unitNo:'', brand:'', model:'', name:'', sub:'', type:'', status:'', purchased:'', pricePerDay: 0 })
}

>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
function openAddItem(){
  itemModal.open = true
  itemModal.mode = 'add'
  itemModal.editId = null
  itemModal.error = ''
  resetForm()
}
function openEditItem(){
  if(!activeItem.value) return
  itemModal.open = true
  itemModal.mode = 'edit'
  itemModal.editId = activeItem.value.id
  itemModal.error = ''
  resetForm()

  const it = activeItem.value
  const priceNum = Number(String(it.info?.price || '').replace(/[^\d]/g, '') || 0)

  Object.assign(form, {
    icon: it.icon || '',
    unitNo: it.info?.unitNo || '',
    brand: it.info?.brand || '',
    model: it.info?.model || '',
    name: it.name || '',
    sub: it.sub || '',
    type: it.info?.type || '',
    status: it.status || '',
    purchased: it.info?.purchased || '',
<<<<<<< HEAD
    pricePerDay: Number.isFinite(priceNum) ? priceNum : null,
=======
    pricePerDay: priceNum || 0,
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
  })
}
function closeItemModal(){
  itemModal.open = false
  itemModal.error = ''
}
<<<<<<< HEAD
=======

>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
function onPhoto(e){
  const f = e.target.files?.[0]
  if(!f) return
  const r = new FileReader()
  r.onload = () => { form.icon = String(r.result || '') }
  r.readAsDataURL(f)
}

function saveItem(){
  itemModal.error = ''
<<<<<<< HEAD

  // ✅ robust checks: treat 0 as valid, ignore spaces
  const requiredOk =
    String(form.unitNo || '').trim() &&
    String(form.brand || '').trim() &&
    String(form.name || '').trim() &&
    String(form.sub || '').trim() &&
    String(form.type || '').trim() &&
    String(form.status || '').trim() &&
    String(form.purchased || '').trim() &&
    form.pricePerDay !== null &&
    form.pricePerDay !== '' &&
    !Number.isNaN(Number(form.pricePerDay))

  if(!requiredOk){
=======
  if(!form.unitNo || !form.brand || !form.model || !form.name || !form.sub || !form.type || !form.status || !form.purchased){
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
    itemModal.error = 'Please fill in all required fields.'
    return
  }

  const payload = {
<<<<<<< HEAD
    icon: form.icon || '',
    name: String(form.name || '').trim(),
    sub: String(form.sub || '').trim(),
    status: String(form.status || '').trim(),
    info: {
      unitNo: String(form.unitNo || '').trim(),
      brand: String(form.brand || '').trim(),
      model: String(form.model || '').trim(),
      type: String(form.type || '').trim(),
      purchased: String(form.purchased || '').trim(),
      price: `₱${Number(form.pricePerDay)} / day`,
=======
    icon: form.icon || undefined,
    name: form.name,
    sub: form.sub,
    status: form.status,
    info: {
      unitNo: form.unitNo,
      brand: form.brand,
      model: form.model,
      type: form.type,
      purchased: form.purchased,
      price: `₱${Number(form.pricePerDay || 0)} / day`,
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
    },
  }

  if(itemModal.mode === 'add'){
<<<<<<< HEAD
    const created = addInventoryItem(selectedCategory.value, { ...payload, history: [] })
=======
    const created = addInventoryItem(selectedCategory.value, payload)
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
    activeId.value = created.id
  }else{
    updateInventoryItem(selectedCategory.value, itemModal.editId, payload)
  }

  closeItemModal()
}

/* delete */
const deleteOpen = ref(false)
const deleteId = ref('')
const deleteError = ref('')

function openDeleteItem(){
  deleteOpen.value = true
  deleteError.value = ''
  deleteId.value = activeItem.value?.id || ''
}
function closeDelete(){
  deleteOpen.value = false
  deleteError.value = ''
  deleteId.value = ''
}
function confirmDelete(){
  if(!deleteId.value){
    deleteError.value = 'Select an item.'
    return
  }
  deleteInventoryItem(selectedCategory.value, deleteId.value)
  activeId.value = items.value[0]?.id || null
  closeDelete()
}

<<<<<<< HEAD
window.__inventoryOpenAdd = () => openAddItem()
</script>

<style src="../assets/viewItems.css"></style>
=======
/* hook */
window.__inventoryOpenAdd = () => openAddItem()
</script>

<style scoped>
/* ===== SIZING / PADDING FIXES to match screenshot ===== */

/* tighten page: remove extra vertical spacing */
.inv-page{
  padding: 0;
}

.view-items-page{
  overflow-x: hidden;
  padding: 22px 26px 22px 0; /* no left padding */
}

.view-items-page .left-panel{
  padding: 22px;
  border-radius: 16px;
}

/* make the grid closer to screenshot proportions */
.inv-grid{
  grid-template-columns: 360px 1fr !important; /* left column width */
  gap: 22px !important;
  min-height: calc(100vh - 44px);
}

/* left background panel: closer to screenshot */
.inv-left{
  background: #cfd5cf !important;
  padding: 20px !important;
  min-height: calc(100vh - 0px);
}

/* left card should be narrower/taller like the screenshot */
.inv-left-card{
  border-radius: 18px !important;
  margin-left: 25px;
}

/* left head: screenshot has a bit more breathing room */
.inv-left-head{
  padding: 16px 16px !important;
}

.left-head-row{
  display:flex;
  align-items:center;
  gap: 12px;
  width: 100%;
}

/* dropdown width and look like screenshot */
.inv-cat-select{
  width: 100%;
  height: 36px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 0 10px;
  background: #fff;
  font-weight: 600;
  margin-right: 20px;
}

/* menu button smaller */
.inv-menu-btn{
  width: 36px !important;
  height: 36px !important;
  border-radius: 10px !important;
}

/* item rows: match screenshot spacing */
.inv-item-row{
  padding: 14px 16px !important;
}

/* empty text align like screenshot */
.inv-empty{
  padding: 14px 18px;
  color:#8b8b8b;
  font-size: 13px;
}

/* right panel should not stretch too wide */
.inv-right{
  max-width: 1160px;
}

/* top info card padding closer to screenshot */
.inv-card-big{
  padding: 24px 26px !important;
}

/* info grid columns tighten */
.inv-info-grid{
  gap: 20px !important;
}

/* bottom cards row: make calendar card a bit wider like screenshot */
.inv-bottom{
  grid-template-columns: 1fr 350px !important;
}

/* calendar day should look like screenshot underline style (optional)
   If your global CSS already does it, ignore this. */
:deep(.cal-day){
  text-decoration: none;
}
</style>
>>>>>>> 35cebd18a259046858aca6c03e4477ff62ab5694
