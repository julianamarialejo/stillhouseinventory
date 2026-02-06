<template>
    <div class="page-container transaction-layout">
        <component :is="'style'">{{ internalStyles }}</component>

        <header class="main-header">
            <h1 class="page-title">Transaction History</h1>
            <div class="search-container">
                <Search class="search-icon" :size="18" />
                <input type="text" v-model="searchTerm" placeholder="Search..." class="search-input" />
            </div>

        </header>

        <section class="action-bar">
            <div class="filter-group">
                <input type="date" class="date-input-minimal" v-model="startDate" />
                <span class="date-separator">TO</span>
                <input type="date" class="date-input-minimal" v-model="endDate" />
                <button v-if="startDate || endDate" @click="resetDates" class="reset-btn">RESET</button>
            </div>



            <div class="btn-group">
                <button @click="exportToCSV" class="btn-export">
                    <Download :size="16" /> Export CSV
                </button>
                <button @click="isModalOpen = true" class="btn-add">
                    <Plus :size="18" :strokeWidth="3" /> Add Transaction
                </button>
            </div>
        </section>

        <div class="card-slider">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Client Name</th>
                        <th>Model</th>
                        <th>Add-ons</th>
                        <th>Daily Fee</th>
                        <th>Total Cost</th>
                        <th>Days</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Method</th>
                        <th>Paid</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="t in currentItems" :key="t.id" class="table-row" @click="openDetails(t)">
                        <td class="txt-date">{{ t.date }}</td>
                        <td class="txt-name">{{ t.name }}</td>
                        <td class="txt-model">{{ t.model }}</td>
                        <td class="txt-addons">{{ t.addons || "None" }}</td>
                        <td>₱{{ t.fee.toLocaleString() }}</td>
                        <td class="txt-total">₱{{ t.total.toLocaleString() }}</td>
                        <td class="txt-bold">{{ t.days }}</td>
                        <td>{{ t.start }}</td>
                        <td>{{ t.end }}</td>
                        <td>{{ t.method }}</td>
                        <td>₱{{ t.paid.toLocaleString() }}</td>
                        <td :class="t.balance > 0 ? 'txt-red' : 'txt-green'">
                            {{ t.balance <= 0 ? "Paid" : `₱${t.balance.toLocaleString()}` }} </td>
                        <td>
                            <span :class="['status-pill', t.status === 'Full Payment' ? 'status-full' : 'status-half']">
                                {{ t.status }}
                            </span>
                        </td>
                        <td class="txt-right" @click.stop>
                            <button @click="deleteTransaction(t.id)" class="btn-delete">
                                <Trash2 :size="16" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <footer class="pagination-bar">
            <button :disabled="currentPage === 1" @click="currentPage--" class="btn-page">PREV</button>
            <div class="page-info">
                <div class="page-number">{{ currentPage }}</div>
                <span class="page-total">of {{ totalPages || 1 }} Pages</span>
            </div>
            <button :disabled="currentPage >= totalPages" @click="currentPage++" class="btn-page">NEXT</button>
        </footer>

        <div v-if="selectedTransaction" class="modal-overlay" @click="selectedTransaction = null">
            <div class="modal-content details-modal" @click.stop>
                <div class="modal-header-section">
                    <button class="btn-close" @click="selectedTransaction = null">
                        <X :size="20" />
                    </button>
                    <h2 class="modal-subtitle">Transaction Details</h2>
                    <div class="modal-main-info">
                        <div>
                            <p class="m-label">Client Name</p>
                            <p class="m-title-text">{{ selectedTransaction.name }}</p>
                        </div>
                        <p class="m-price">₱{{ selectedTransaction.total.toLocaleString() }}</p>
                    </div>
                    <div class="tab-group">
                        <button @click="activeTab = 'details'"
                            :class="['tab-btn', activeTab === 'details' ? 'tab-active' : '']">Details</button>
                        <button @click="activeTab = 'edit'"
                            :class="['tab-btn', activeTab === 'edit' ? 'tab-active' : '']">Edit Payment</button>
                    </div>
                </div>

                <div class="modal-body">
                    <div v-if="activeTab === 'details'" class="space-y-sm">
                        <div class="detail-row"><span class="txt-gray">Payment Status</span><span
                                :class="['status-pill', selectedTransaction.status === 'Full Payment' ? 'status-full' : 'status-half']">{{
                                    selectedTransaction.status }}</span></div>
                        <div class="detail-row"><span class="txt-gray">Balance Due</span><span
                                :class="selectedTransaction.balance > 0 ? 'txt-red' : 'txt-green'">₱{{
                                    selectedTransaction.balance.toLocaleString() }}</span></div>
                        <div class="detail-row"><span class="txt-gray">Amount Paid</span><span class="txt-name">₱{{
                            parseInt(selectedTransaction.paid || 0).toLocaleString() }}</span></div>
                        <hr class="divider" />
                        <div class="detail-row"><span class="txt-gray">Account No.</span><span class="txt-name">{{
                            selectedTransaction.accountNo || "N/A" }}</span></div>
                        <div class="detail-row"><span class="txt-gray">Reference No.</span><span class="txt-name">{{
                            selectedTransaction.refNo || "N/A" }}</span></div>
                        <hr class="divider" />
                        <div class="detail-row"><span class="txt-gray">Transaction ID</span><span class="txt-id">{{
                            selectedTransaction.id }}</span></div>
                        <div class="detail-row"><span class="txt-gray">Date & Time</span><span class="txt-bold">{{
                            selectedTransaction.time }} | {{ selectedTransaction.date }}</span></div>
                    </div>

                    <div v-else class="space-y-md">
                        <div>
                            <label class="m-label">Update Paid Amount (₱)</label>
                            <input type="number" class="m-input input-highlight" v-model="selectedTransaction.paid"
                                @input="handleUpdatePayment" />
                        </div>
                        <div>
                            <label class="m-label">Reference No.</label>
                            <input class="m-input" v-model="selectedTransaction.refNo" />
                        </div>
                        <button @click="handleSaveChanges" class="btn-save-full">Save Transaction Updates</button>
                    </div>

                    <div class="notes-section">
                        <p class="notes-title">Notes
                            <Info :size="14" />
                        </p>
                        <textarea class="m-textarea" v-model="selectedTransaction.notes"
                            placeholder="Add notes here..." />
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isModalOpen" class="modal-overlay" @click="isModalOpen = false">
            <div class="modal-content" @click.stop>
                <div class="modal-header-simple">
                    <h2 class="modal-title-simple">New Transaction</h2>
                    <button @click="isModalOpen = false">
                        <X :size="18" />
                    </button>
                </div>
                <form @submit.prevent="handleAddTransaction" class="grid-2">
                    <div class="col-span-2"><label class="m-label">Client Name</label><input required class="m-input"
                            v-model="formData.name" /></div>
                    <div>
                        <label class="m-label">Model</label>
                        <select class="m-input" v-model="formData.model" @change="handleModelChange">
                            <option v-for="item in equipmentList" :key="item.name" :value="item.name">{{ item.name }}
                            </option>
                        </select>
                    </div>
                    <div><label class="m-label">Add-ons</label><input class="m-input" v-model="formData.addons"
                            placeholder="Films, Battery, etc." /></div>
                    <div><label class="m-label">Paid (₱)</label><input type="number" class="m-input"
                            v-model="formData.paid" /></div>
                    <div><label class="m-label">Balance</label>
                        <div class="m-input-static">₱{{ liveBalance.toLocaleString() }}</div>
                    </div>
                    <div><label class="m-label">Start Date</label><input type="date" required class="m-input"
                            v-model="formData.start" /></div>
                    <div><label class="m-label">End Date</label><input type="date" required class="m-input"
                            v-model="formData.end" /></div>
                    <div class="col-span-2 form-summary">
                        <span class="summary-left">Total: ₱{{ liveTotalCost.toLocaleString() }} ({{ formData.days }}
                            days)</span>
                        <span
                            :class="['summary-right', formData.status === 'Full Payment' ? 'txt-green' : 'txt-orange']">{{
                                formData.status }}</span>
                    </div>
                    <button type="submit" class="btn-submit">Save Record</button>
                </form>
            </div>
        </div>

        <div v-if="showToast" class="toast">
            <CheckCircle2 :size="18" /> <span>Changes Saved Successfully</span>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import {
    Search, Plus, X, Trash2, CheckCircle2, Info, Download
} from 'lucide-vue-next';

const searchTerm = ref("");
const startDate = ref("");
const endDate = ref("");
const currentPage = ref(1);
const isModalOpen = ref(false);
const showToast = ref(false);
const selectedTransaction = ref(null);
const activeTab = ref("details");

const itemsPerPage = 10;
const equipmentList = [
    { name: "80d", fee: 500 }, { name: "M50 Mark II", fee: 700 },
    { name: "Osmo Pocket 2", fee: 400 }, { name: "Instax Link", fee: 300 },
    { name: "Mini 2 SE Fly", fee: 600 },
];

const transactions = ref([
    {
        id: "CR01017", date: "6/2/2025", name: "Juan Dela Cruz", model: "80d", addons: "Films",
        fee: 500, total: 1550, days: 3, start: "2025-06-04", end: "2025-06-07",
        method: "GCash", paid: 500, balance: 1050, status: "Half Payment",
        time: "12:14:51", accountNo: "+63 9170118867", refNo: "R0091236790611", notes: ""
    }
]);

const formData = ref({
    name: "", model: "80d", addons: "", fee: 500, days: 1,
    start: "", end: "", method: "GCash", paid: "", status: "Half Payment"
});

const liveTotalCost = computed(() => formData.value.fee * formData.value.days);
const currentPaid = computed(() => formData.value.paid === "" ? 0 : parseInt(formData.value.paid));
const liveBalance = computed(() => liveTotalCost.value - currentPaid.value);

watch([() => formData.value.start, () => formData.value.end], ([startVal, endVal]) => {
    if (startVal && endVal) {
        const start = new Date(startVal);
        const end = new Date(endVal);
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        if (diffDays > 0) formData.value.days = diffDays;
    }
});

watch([currentPaid, liveTotalCost], ([paid, total]) => {
    if (paid >= total && total > 0) {
        formData.value.status = "Full Payment";
    } else {
        formData.value.status = "Half Payment";
    }
});

const handleModelChange = () => {
    const s = equipmentList.find(i => i.name === formData.value.model);
    if (s) formData.value.fee = s.fee;
};

const handleAddTransaction = () => {
    const currentYear = new Date().getFullYear();
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    const newEntry = {
        id: `${currentYear}-CR${randomNumber}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        ...formData.value,
        paid: currentPaid.value,
        total: liveTotalCost.value,
        balance: liveBalance.value,
        accountNo: "N/A", refNo: "N/A", notes: ""
    };
    transactions.value.unshift(newEntry);
    localStorage.setItem('transactions', JSON.stringify(transactions.value));
    isModalOpen.value = false;
    formData.value = { name: "", model: "80d", addons: "", fee: 500, days: 1, start: "", end: "", method: "GCash", paid: "", status: "Half Payment" };
    triggerToast();
};

const handleUpdatePayment = () => {
    const v = selectedTransaction.value.paid;
    const n = v === "" ? 0 : parseInt(v);
    const b = selectedTransaction.value.total - n;
    selectedTransaction.value.balance = b;
    selectedTransaction.value.status = n >= selectedTransaction.value.total ? "Full Payment" : "Half Payment";
};

const handleSaveChanges = () => {
    const d = { ...selectedTransaction.value, paid: selectedTransaction.value.paid === "" ? 0 : parseInt(selectedTransaction.value.paid) };
    const index = transactions.value.findIndex(t => t.id === d.id);
    if (index !== -1) transactions.value[index] = d;
    triggerToast();
    activeTab.value = "details";
};

const deleteTransaction = (id) => {
    // 1. Confirmation popup
    const confirmed = window.confirm("Are you sure you want to delete this record?");
    
    if (confirmed) {
        // 2. Filter out the deleted item
        transactions.value = transactions.value.filter(i => i.id !== id);
        
        // 3. Update localStorage para permanente ang delete
        localStorage.setItem('transactions', JSON.stringify(transactions.value));
        
        // 4. Trigger Toast para sa feedback
        triggerToast(); 
    }
};

const openDetails = (t) => {
    selectedTransaction.value = { ...t };
    activeTab.value = "details";
};

const resetDates = () => {
    startDate.value = "";
    endDate.value = "";
};

const triggerToast = () => {
    showToast.value = true;
    setTimeout(() => showToast.value = false, 3000);
};

const exportToCSV = () => {
    const h = ["ID,Date,Time,Client Name,Model,Add-ons,Daily Fee,Total Cost,Days,Start Date,End Date,Paid,Balance,Status,Account No,Ref No\n"];
    const r = transactions.value.map(t => `${t.id},${t.date},${t.time},"${t.name}",${t.model},"${t.addons || 'None'}",${t.fee},${t.total},${t.days},${t.start},${t.end},${t.paid},${t.balance},${t.status},'${t.accountNo},'${t.refNo}`).join("\n");
    const blob = new Blob([h + r], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Transactions_${new Date().toLocaleDateString()}.csv`;
    link.click();
};

const filteredData = computed(() => {
    return transactions.value.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            item.model.toLowerCase().includes(searchTerm.value.toLowerCase());
        const itemDate = new Date(item.start);
        const start = startDate.value ? new Date(startDate.value) : null;
        const end = endDate.value ? new Date(endDate.value) : null;
        return matchesSearch && (!start || itemDate >= start) && (!end || itemDate <= end);
    });
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage));
const currentItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredData.value.slice(start, start + itemsPerPage);
});

// ITO YUNG GINALAW KO PARA LUMIIT ANG MODAL AT MAALIS ANG SPACES
const internalStyles = `
    .page-container { width: 100%; display: flex; flex-direction: column; gap: 0; }
    .main-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px !important; }
    .page-title { font-size: 2rem; font-weight: 900; color: #1E1B18; margin: 0; }
    .search-icon { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }
    .search-input { width: 100%; padding: 0.75rem 1rem 0.75rem 3rem; background: white; border: 1px solid #e5e7eb; border-radius: 1rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05); outline: none; }
    .action-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px !important; }    
    .filter-group { display: flex; align-items: center; gap: 0.5rem; background: white; padding: 0.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
    .date-input-minimal { border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 6px 10px; font-size: 12px; font-weight: 700; color: #4b5563; width: 135px; background: white; outline: none; }
    .date-separator { font-size: 10px; font-weight: 900; color: #d1d5db; }
    .reset-btn { font-size: 10px; color: #ef4444; font-weight: 700; margin-left: 0.5rem; cursor: pointer; background: none; border: none; }
    .btn-group { display: flex; gap: 0.75rem; }
    .btn-export { padding: 0.625rem 1.5rem; border: 1px solid #3b82f6; color: #2563eb; border-radius: 0.75rem; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; display: flex; align-items: center; gap: 0.5rem; transition: background 0.2s; cursor: pointer; background: white; }
    .btn-export:hover { background-color: #eff6ff; }
    .btn-add { padding: 0.625rem 1.5rem; background-color: #4E73F8; color: white; border-radius: 0.75rem; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; display: flex; align-items: center; gap: 0.5rem; box-shadow: 0 4px 6px rgba(78, 115, 248, 0.3); border: none; cursor: pointer; }
    .card-slider { margin-top: 0; width: 100%; background: white; border-radius: 1.5rem; border: 1px solid #e5e7eb; }    
    table { border-collapse: collapse; min-width: 1200px; table-layout: auto; width: 100%; }
    th, td { padding: 1.2rem 1.5rem; text-align: left; border-bottom: 1px solid #f3f4f6; white-space: nowrap; }
    th { background-color: #E9F0FE; font-size: 11px; text-transform: uppercase; color: #4b5563; font-weight: 800; }
    .table-row { cursor: pointer; transition: background 0.2s; }
    .table-row:hover { background-color: rgba(239, 246, 255, 0.5); }
    .txt-date { color: #9ca3af; font-size: 0.75rem; }
    .txt-name { font-weight: 700; color: #1f2937; }
    .txt-model { font-weight: 600; }
    .txt-addons { color: #6b7280; font-style: italic; font-size: 0.85rem; }
    .txt-total { font-weight: 700; color: #2563eb; }
    .txt-bold { font-weight: 700; }
    .txt-red { font-weight: 700; color: #ef4444; }
    .txt-green { font-weight: 700; color: #16a34a; }
    .txt-orange { font-weight: 700; color: #f97316; }
    .txt-right { text-align: right; }
    .btn-delete { color: #d1d5db; transition: color 0.2s; background: none; border: none; cursor: pointer; }
    .btn-delete:hover { color: #ef4444; }
    .pagination-bar { margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 100%; }    
    .btn-page { padding: 0.625rem 1.5rem; background: white; border: 1px solid #e5e7eb; border-radius: 0.75rem; font-size: 0.75rem; font-weight: 900; box-shadow: 0 1px 2px rgba(0,0,0,0.05); cursor: pointer; }
    .btn-page:disabled { opacity: 0.3; cursor: not-allowed; }
    .page-info { display: flex; align-items: center; gap: 0.75rem; }
    .page-number { width: 2.5rem; height: 2.5rem; background: #1E1B18; color: white; display: flex; align-items: center; justify-content: center; border-radius: 0.75rem; font-size: 0.75rem; font-weight: 700; }
    .page-total { font-size: 10px; color: #9ca3af; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; }
    .status-pill { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 10px; font-weight: 900; text-transform: uppercase; white-space: nowrap; }
    .status-full { background-color: #d1fae5; color: #059669; }
    .status-half { background-color: #ffedd5; color: #d97706; }    
.modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(2px); display: flex; justify-content: center; align-items: center; z-index: 9999; }    
    /* MODAL HEIGHT & WIDTH FIX */
    .modal-content { background: white; padding: 1.2rem; border-radius: 1rem; width: 430px; max-height: 80vh; overflow-y: auto; }
    .details-modal { width: 400px; padding: 0; overflow: hidden; max-height: 85vh; }
    
.m-label { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px; display: block; }    .m-input { width: 100%; padding: 6px 10px; border: 1px solid #e2e8f0; border-radius: 8px; outline: none; font-size: 12px; font-weight: 600; color: #334155; }
.m-input { 
        width: 100%; 
        padding: 8px 12px; 
        border: 1px solid #e2e8f0; 
        border-radius: 8px; 
        font-size: 13px; 
        font-weight: 600; 
        outline: none; 
    }    
    /* REDUCED SPACING IN HEADER */
    .modal-header-section { padding: 1rem 1.5rem; border-bottom: 1px solid #f3f4f6; position: relative; }
    .btn-close { position: absolute; right: 0.75rem; top: 0.75rem; color: #9ca3af; transition: color 0.2s; background: none; border: none; cursor: pointer; }
    .btn-close:hover { color: #f43f5e; }
    .modal-subtitle { font-size: 0.75rem; font-weight: 700; color: #1d4ed8; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
    .modal-main-info { display: flex; justify-content: space-between; align-items: flex-end; }
    .m-title-text { font-size: 1.1rem; font-weight: 900; color: #1e293b; margin: 0; }
    .m-price { font-size: 1.25rem; font-weight: 900; color: #0a0a0a; margin: 0; }
    
    .tab-group { display: flex; gap: 1rem; margin-top: 0.75rem; }
    .tab-btn { padding-bottom: 0.25rem; font-size: 0.7rem; font-weight: 700; color: #9ca3af; transition: all 0.2s; background: none; border: none; cursor: pointer; }
    .tab-active { border-bottom: 2px solid black; color: black; font-weight: 800; }
    
    /* MODAL BODY SPACING FIX */
    .modal-body { padding: 1rem 1.5rem; }
    .detail-row { display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 12px; }
    .divider { margin: 0.4rem 0; border: 0; border-top: 1px solid #f1f5f9; }
    
    .txt-gray { color: #9ca3af; font-weight: 500; }
    .txt-id { font-family: monospace; font-size: 0.7rem; font-weight: 700; background: #f8fafc; padding: 2px 4px; border-radius: 4px; }
    .btn-save-full { width: 100%; padding: 0.6rem; background: #2D31FA; color: white; border-radius: 0.75rem; font-weight: 700; font-size: 0.7rem; text-transform: uppercase; margin-top: 0.75rem; border: none; cursor: pointer; }
    
    .space-y-sm > * + * { margin-top: 0.4rem; }
    .space-y-md > * + * { margin-top: 0.6rem; }
.grid-2 { 
        display: grid; 
        grid-template-columns: 1fr 1fr; /* Hahatiin sa dalawa yung row */
        gap: 12px; 
        width: 100%; 
    }   
        .col-span-2 { grid-column: span 2; } 
    .notes-section { margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid #f1f5f9; }
    .notes-title { font-weight: 700; color: #1e293b; margin-bottom: 0.3rem; display: flex; align-items: center; gap: 0.25rem; font-size: 0.7rem; text-transform: uppercase; }
    .m-textarea { width: 100%; border: 2px solid #f8fafc; border-radius: 0.5rem; padding: 0.5rem; font-size: 0.7rem; min-height: 60px; outline: none; }
    
.modal-header-simple { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .modal-title-simple { font-size: 1rem; font-weight: 900; color: #1d4ed8; text-transform: uppercase; }    .form-summary { background: #f8fafc; padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; margin-top: 0.25rem; }
.form-summary { 
        background: #f8fafc; padding: 10px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; 
    }
    .summary-left { font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; }
    .summary-right { font-size: 10px; font-weight: 900; text-transform: uppercase; }
    .btn-submit { grid-column: span 2; width: 100%; padding: 0.6rem; background: #1E1B18; color: white; border-radius: 0.5rem; font-weight: 900; font-size: 10px; text-transform: uppercase; border: none; cursor: pointer; }
    .toast { position: fixed; bottom: 2rem; right: 2rem; background: #1E1B18; color: white; padding: 1rem 1.5rem; border-radius: 1rem; display: flex; align-items: center; gap: 0.75rem; z-index: 10000; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
  `;
</script>