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
                  </button>

                  <div class="menu-sep"></div>

                  <button
                    class="menu-item danger"
                    type="button"
                    :disabled="!activeItem"
                    @click="menuOpen=false; openDeleteItem()"
                  >
                    <span class="mi-ic">🗑</span>
                    <span>Delete Item</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="item-list">
            <div
              v-for="it in items"
              :key="it.id"
              class="item-row"
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

            <div v-if="!items.length" class="inv-empty">No items yet.</div>
          </div>
        </div>
      </section>

      <!-- RIGHT -->
      <section class="right-panel">
        <div class="card big">
          <div class="card-title">Equipment Information</div>

          <div class="info-grid">
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

        <div class="bottom-row">
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
                :class="{ muted: d.muted, selected: d.selected, 'has-order': d.hasOrder }"
                @click="selectDay(d)"
              >
                {{ d.label }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- ADD -->
    <div class="inv-modal" :class="{ hidden: !itemModal.open || itemModal.mode !== 'add' }">
      <div class="inv-modal-overlay" @click="closeItemModal"></div>

      <div class="inv-modal-card" role="dialog" aria-modal="true">
        <div class="modal-head">
          <h3>Add New {{ labelSingular }}</h3>
          <button class="modal-x" type="button" @click="closeItemModal">✕</button>
        </div>

        <form class="modal-body" @submit.prevent="saveItem">
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
          </div>
        </form>
      </div>
    </div>

    <!-- EDIT -->
    <div class="inv-modal" :class="{ hidden: !itemModal.open || itemModal.mode !== 'edit' }">
      <div class="inv-modal-overlay" @click="closeItemModal"></div>

      <div class="inv-modal-card" role="dialog" aria-modal="true">
        <div class="modal-head">
          <h3>Edit {{ labelSingular }}</h3>
          <button class="modal-x" type="button" @click="closeItemModal">✕</button>
        </div>

        <form class="modal-body" @submit.prevent="saveItem">
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
          </div>
        </form>
      </div>
    </div>

    <!-- DELETE -->
    <div class="inv-modal" :class="{ hidden: !deleteOpen }">
      <div class="inv-modal-overlay" @click="closeDelete"></div>

      <!-- ✅ smaller delete modal -->
      <div class="inv-modal-card inv-modal-card-sm" role="dialog" aria-modal="true">
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

  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { addInventoryItem, deleteInventoryItem, getItems, seedIfEmpty, updateInventoryItem } from '../lib/inventoryStore'

const props = defineProps({
  category: { type: String, default: 'cameras' },
  categories: { type: Array, default: null },
})

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

/** ✅ Use selectedCategory (NOT props.category) so title updates if you switch categories later */
const LABEL = { cameras:'Cameras', lenses:'Lenses', tripods:'Tripods', printer:'Printers', accessories:'Accessories' }
const selectedCategory = ref(props.category)
watch(() => props.category, (v) => { selectedCategory.value = v })

const categoryLabel = computed(() => LABEL[selectedCategory.value] || 'Items')

const SINGULAR = { cameras: 'Camera', lenses: 'Lens', tripods: 'Tripod', printer: 'Printer', accessories: 'Accessory' }
const labelSingular = computed(() => SINGULAR[selectedCategory.value] || 'Item')

const fallbackIcon = '/vite.svg'

const items = computed(() => getItems(selectedCategory.value))
const activeId = ref(null)
const activeItem = computed(() => items.value.find(x => x.id === activeId.value) || null)

watch(items, () => {
  if (!activeId.value && items.value.length) activeId.value = items.value[0].id
}, { immediate: true })

function select(id){
  activeId.value = id
  selectedDate.value = null
}

/* menu */
const menuOpen = ref(false)
onMounted(() => document.addEventListener('click', () => { menuOpen.value = false }))

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

const rentalsCompleted = computed(() =>
  (activeItem.value?.history || []).filter(h => (h.status || '').toLowerCase() === 'completed').length
)
const totalDaysRented = computed(() =>
  (activeItem.value?.history || []).reduce((sum, h) => sum + Number(h.days || 0), 0)
)

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
        { days:'04', code:'#CR01018', date:'Oct 1 - Oct 18', status:'Completed', start:'2025-10-01', end:'2025-10-18' },
        { days:'03', code:'#CR01007', date:'Oct 1 - Oct 3', status:'Cancelled', start:'2025-10-01', end:'2025-10-03' },
        { days:'05', code:'#CR00932', date:'Sept 1 - Sept 2', status:'Completed', start:'2025-09-01', end:'2025-09-02' },
      ],
    },
  ])
})

/* calendar */
const selectedDate = ref(null)
const calYear = ref(2025)
const calMonth = ref(9) // October (0-based)

function pad2(n){ return String(n).padStart(2,'0') }
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

  const out = []
  for(let i=0;i<start;i++){
    out.push({ label:String(prevCount - start + 1 + i), muted:true, selected:false, hasOrder:false, iso:null })
  }
  for(let d=1; d<=count; d++){
    const iso = toISO(y, m, d)
    out.push({ label:String(d), muted:false, selected:selectedDate.value===iso, hasOrder:dayHasOrder(iso), iso })
  }
  const total = start + count
  const remain = (7 - (total % 7)) % 7
  for(let i=1;i<=remain;i++){
    out.push({ label:String(i), muted:true, selected:false, hasOrder:false, iso:null })
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

/* add/edit */
const itemModal = reactive({ open:false, mode:'add', editId:null, error:'' })
const form = reactive({
  icon:'', unitNo:'', brand:'', model:'', name:'', sub:'', type:'', status:'', purchased:'', pricePerDay: null,
})

function resetForm(){
  Object.assign(form, { icon:'', unitNo:'', brand:'', model:'', name:'', sub:'', type:'', status:'', purchased:'', pricePerDay: null })
}
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
    pricePerDay: Number.isFinite(priceNum) ? priceNum : null,
  })
}
function closeItemModal(){
  itemModal.open = false
  itemModal.error = ''
}
function onPhoto(e){
  const f = e.target.files?.[0]
  if(!f) return
  const r = new FileReader()
  r.onload = () => { form.icon = String(r.result || '') }
  r.readAsDataURL(f)
}

function saveItem(){
  itemModal.error = ''

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
    itemModal.error = 'Please fill in all required fields.'
    return
  }

  const payload = {
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
    },
  }

  if(itemModal.mode === 'add'){
    const created = addInventoryItem(selectedCategory.value, { ...payload, history: [] })
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

window.__inventoryOpenAdd = () => openAddItem()
</script>

<style src="../assets/viewItems.css"></style>
