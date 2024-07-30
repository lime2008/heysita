<template>
    <div class="pagination">
      <button v-if="layout.includes('prev')" 
              :disabled="currentPage === 1"
              @click="prevPage">
       <!--<div class="icon" :style="{ backgroundImage: 'url(' + leftSvg + ')' }"></div>-->
       <p style="font-weight: bold;color:#000000"><</p>
      </button>
      <div v-if="layout.includes('pager')">
        <button v-for="page in visiblePages" 
                :key="page" 
                :class="{ 'active': page === currentPage }"
                @click="setPage(page)">
          {{ page }}
        </button>
      </div>
      <input v-if="layout.includes('jumper')" 
             type="number" 
             :min="1" 
             :max="totalPages" 
             v-model.number="jumpPage" 
             @change="jumpToPage"
             placeholder="Jump to" />
      <span v-if="layout.includes('total')">
        Total: {{ total }}
      </span>
      <select v-if="layout.includes('sizes')" 
        :value="pageSize" 
        @change="handlePageSizeChange($event.target.value)">
  <option v-for="size in pageSizes" 
          :key="size" 
          :value="size">
    {{ size }} per page
  </option>
</select>
<button v-if="layout.includes('next')" 
              :disabled="currentPage === totalPages"
              @click="nextPage">
              <!--<div class="icon" :style="{ backgroundImage: 'url(' + rightSvg + ')' }"></div>-->
              <p style="font-weight: bold;">></p>
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue';
  //import  leftSvg  from '../assets/left.svg'
  //import  rightSvg  from '../assets/right.svg'
  const props = defineProps({
    total: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    layout: {
      type: String,
      default: 'prev, pager, next'
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50]
    }
  });
  
  const emit = defineEmits(['current-change']);

  const totalPages = computed(() => Math.ceil(props.total / props.pageSize));
  
  const visiblePages = computed(() => {
    const pages = [];
    let start = Math.max(1, props.currentPage - Math.floor(props.pagerCount / 2));
    let end = Math.min(totalPages.value, start + props.pagerCount - 1);
    if (end - start + 1 < props.pagerCount) {
      start = Math.max(1, end - props.pagerCount + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  });
  
  const jumpPage = ref(props.currentPage);
  
  function prevPage() {
    if (props.currentPage > 1) {
      emit('current-change', props.currentPage - 1);
    }
  }
  
  function nextPage() {
    if (props.currentPage < totalPages.value) {
      emit('current-change', props.currentPage + 1);
    }
  }
  
  function setPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      emit('current-change', page);
    }
  }
  
  function jumpToPage() {
    const page = Math.max(1, Math.min(totalPages.value, jumpPage.value));
    if (page !== props.currentPage) {
      emit('current-change', page);
    }
  }
  
  function handlePageSizeChange() {
    emit('current-change', 1);
  }
  </script>
  
  <style scoped>


  .icon{
    height: 0.8em;
    width : 0.7em;
    background-position: 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }



  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  
    

  
  button {
    padding: 6px 12px;
    background-color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    margin-right:5px;
    transition: all 0.2s ease;
  }

button:focus,
button:focus-visible {
  outline: none;
}

  button:hover {
    background-color: #f2f2f2;
  }

  button.active {
    background-color: #fefefe;
  }
  
  input, select {
    padding: 6px;
  }
  </style>
  