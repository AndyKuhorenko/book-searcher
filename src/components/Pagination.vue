<script setup lang="ts">
import { computed } from '@vue/reactivity'
import Paginate from 'vuejs-paginate-next';
import { useStore, type BooksDataType, type BookType } from '../store/store'

const store = useStore()
const emit = defineEmits(['changePage'])
const books = computed<BooksDataType>(() => store.getters.getBooks)
const startIndex = computed<number>(() => store.getters.getStartIndex)

const page = startIndex.value + 1;

function handleClick(index: number) {
  store.dispatch('setStartIndex', index - 1)
  emit('changePage')
}

</script>

<template >
  <Paginate
    v-model="page"
    :page-count="Math.floor(books.totalItems / 40)"
    :page-range="3"
    :margin-pages="2"
    :click-handler="handleClick"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'"
  ></Paginate>
    
</template>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  margin-bottom: 40px;
}

.page-item {
  cursor: pointer;

  a {
    padding: 10px;
  }
  &.active {
    a {
      text-decoration: underline;
    }
  }
  &.disabled {
    a {
      color: rgba(128, 128, 128, 0.568);
    }
  }
}

</style>
