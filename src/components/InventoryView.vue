<!-- src/components/InventoryView.vue (your Categories + Items wrapper) -->
<template>
  <div class="page inventory-root">
    <div v-if="mode === 'categories'" class="content inventory-page">
      <div class="topbar">
        <h1 class="h1">Inventory</h1>

        <div class="search-wrap">
          <span class="search-ic" aria-hidden="true"></span>
          <input v-model.trim="q" placeholder="Search" />
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <div class="panel-title">Categories</div>
          <button class="btn" @click="openAddForSelected">
            <span class="btn-plus">+</span>
            Add New
          </button>
        </div>

        <div class="rows">
          <div
            v-for="c in filteredCategories"
            :key="c.key"
            class="row"
            :class="{ selected: c.key === category }"
            @click="category = c.key"
          >
            <div class="row-left">
              <div class="cat-ic">
                <img class="cat-img" :src="c.icon" :alt="c.label" />
              </div>
              <div class="text">
                <p class="name">{{ c.label }}</p>
                <p class="desc">{{ c.desc }}</p>
              </div>
            </div>

            <div class="row-right">
              <button class="view" @click.stop="goItems(c.key)">View Items</button>
              <span class="chev">›</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Items view -->
    <div v-else class="itemsWrap">
      <InventoryPage :category="category" :categories="categories" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import InventoryPage from './InventoryPage.vue'

const mode = ref('categories')
const category = ref('cameras')
const q = ref('')

const categories = [
  { key: 'cameras', label: 'Cameras', desc: 'Canon and Sony cameras for photo and video shoots.', icon: '/icons/camera.png' },
  { key: 'lenses', label: 'Lenses', desc: 'Prime and zoom lenses for different shooting needs.', icon: '/icons/lense.png' },
  { key: 'tripods', label: 'Tripods', desc: 'Support gear for steady shots and stable setups.', icon: '/icons/tripod.png' },
  { key: 'printer', label: 'Printers', desc: 'Photo printers and consumables for output & proofs.', icon: '/icons/printer.png' },
  { key: 'accessories', label: 'Accessories', desc: 'Batteries, chargers, memory cards, and other add-ons.', icon: '/icons/accessories.png' },
]

const filteredCategories = computed(() => {
  const s = q.value.toLowerCase()
  if (!s) return categories
  return categories.filter(c => (c.label + ' ' + c.desc).toLowerCase().includes(s))
})

function goItems(key) {
  category.value = key
  mode.value = 'items'
}

function openAddForSelected() {
  mode.value = 'items'
  requestAnimationFrame(() => window.__inventoryOpenAdd?.())
}
</script>

<style scoped>
:global(:root){
  --inv-bg: #f5f1ea;
  --inv-panel: #ffffff;
  --inv-muted: #7e7e7e;
  --inv-text: #161616;
  --inv-border: #ececec;
  --inv-shadow: 0 10px 22px rgba(0,0,0,.06);
  --inv-blue: #2f6bff;
  --inv-rowBlue: #eaf2ff;
  --inv-rowHover: #f6f8ff;
}

.page{ background: var(--inv-bg); min-height: 100%; }
.content{ padding: 26px 34px; }

.topbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap: 16px;
  margin-bottom: 25px;
}
.h1{ margin:0; font-size: 29px; font-weight: 700; color: var(--inv-text); }

/* search */
.search-wrap{ position: relative; width: 260px; margin-left: auto; }
.search-wrap input{
  width: 100%;
  height: 34px;
  padding-left: 34px;
  padding-right: 12px;
  border: none;
  outline: none;
  border-radius: 8px;
  background: #fff;
  box-shadow: none;
  font-size: 12px;
  color: #333;
}
.search-ic{
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  background: url("icons/search.png") no-repeat center / contain;
  pointer-events: none;
}

.panel{
  background: var(--inv-panel);
  border: 1px solid var(--inv-border);
  border-radius: 12px;
  box-shadow: var(--inv-shadow);
  overflow:hidden;
}
.panel-head{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 12px 20px;
  background: #ffffff;
}
.panel-title{ font-size: 16px; font-weight: 600; color: #2a2a2a; }

.btn{
  display:inline-flex;
  align-items:center;
  gap: 10px;
  height: 28px;
  border-radius: 8px;
  border: 0;
  padding: 0 12px;
  background: #1670ff;
  color: #fff;
  cursor:pointer;
  font-weight: 500;
  font-size: 12px;
}
.btn-plus{
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background: rgba(255,255,255,.18);
  display:grid;
  place-items:center;
  font-size: 14px;
  line-height: 0;
}

.rows{ border-top: 1px solid var(--inv-border); }

.row{
  min-height: 74px;
  display:grid;
  grid-template-columns: 1fr auto;
  align-items:center;
  padding: 16px 20px;
  border-top: 1px solid var(--inv-border);
  background: #fff;
  cursor:pointer;
}
.row:first-child{ border-top: none; }
.row:hover{ background: var(--inv-rowHover); }

.row.selected{
  background: var(--inv-rowBlue);
  position:relative;
}
.row.selected::before{
  content:"";
  position:absolute;
  left:0;
  top:0;
  bottom:0;
  width: 4px;
  background: var(--inv-blue);
}

.row-left{ display:flex; align-items:center; gap: 14px; min-width:0; }
.cat-ic{
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--inv-border);
  background: #f4f4f4;
  display:grid;
  place-items:center;
  flex: 0 0 auto;
}
.cat-img{ width: 35px; height: 35px; }

.text{ min-width:0; }
.name{ margin:0; font-size: 15px; font-weight: 600; color: var(--inv-text); }
.desc{
  margin: 2px 0 0 0;
  font-size: 12px;
  color: var(--inv-muted);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  max-width: 70ch;
}

.row-right{ display:flex; align-items:center; gap: 10px; }

.view{
  height: 25px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid var(--inv-border);
  background: #fff;
  font-size: 10.5px;
  font-weight: 500;
  color: #333;
  cursor:pointer;
}
.view:hover{ border-color: #9db7ff; color: #6f8cff; }

.row.selected .view{
  border-color: rgba(47,107,255,.35);
  box-shadow: 0 0 0 3px rgba(47,107,255,.10);
}

.chev{ opacity:.7; font-weight: 900; font-size: 14px; }

.itemsWrap{ background: #f4f1ea; min-height: 100%; }

@media (max-width: 860px){
  .topbar{ flex-direction:column; align-items:flex-start; }
  .search-wrap{ width: 100%; }
  .content{ padding: 18px; }
}
</style>
