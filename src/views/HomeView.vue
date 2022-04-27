<script setup lang="ts">
import { ref, reactive, VueElement } from 'vue'
import { computed } from '@vue/reactivity'
import { useStore, type BooksDataType, type BookType } from '../store/store'
import BookCard from '../components/BookCard.vue'
import Pagination from '../components/Pagination.vue'

const store = useStore()

const isLoading = computed<boolean>(() => store.getters.getIsLoading)
const books = computed<BooksDataType>(() => store.getters.getBooks)
const categories = computed<string[]>(() => store.getters.getCategories)
const currentCategory = computed<string>(() => store.getters.getCategory)
const currentSorting = computed<string>(() => store.getters.getSorting)
const startIndex = computed<number>(() => store.getters.getStartIndex)
const searchText = ref(store.getters.getSearchText)


function handleButtonClick() {
  store.dispatch('setStartIndex', 0)

  fetchBooks()
}

function fetchBooks() {
  if (searchText.value) {
    store.dispatch('fetchBooks', { searchText: searchText.value, sorting: currentSorting.value, startIndex: startIndex.value })
      .then(createCategories)
  }
}

function createCategories() {
  const newCategories = new Set<string>()

  newCategories.add('All')

  books.value.items.forEach(book => book.volumeInfo.categories?.forEach(category => newCategories.add(category)))

  store.dispatch('setCategories', Array.from(newCategories))

  store.dispatch('setCategory', 'All')
}

function handleCategoryChange(e: Event) {

  const target = e.target as HTMLSelectElement

  const category = target.value

  store.dispatch('setCategory', category)
}

function handleSortChange(e: Event) {
  const target = e.target as HTMLSelectElement

  const sorting = target.value

  store.dispatch('setSorting', sorting)
}
</script>

<template>
  <main>
    <div class="app-wrapper">
      <form>
        <input v-model="searchText" placeholder="Enter book title"/>
        <button type="submit" @click.prevent="handleButtonClick">Search</button>
      </form>
      <div class="home__categories">
        <label for="categories">Category</label>
        <select id="categories" :onchange="handleCategoryChange" :value="currentCategory">
          <option v-for="category in categories" :value="category">{{category}}</option>
        </select>
        <div>
          <label for="sortby">Sort by</label>
          <select id="sortby" :onchange="handleSortChange" :value="currentSorting">
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      <div v-if="isLoading" class="home__loader">Loading...</div>
      <div v-if="books != null && !isLoading" class="home__total">
        <p>Found {{books.totalItems}} results</p>
      </div>
      <div v-if="books != null && !isLoading" class="cards-wrapper">
        <BookCard v-for="book in books.items" v-bind="book" :key="book.id"/>
      </div>
      <Pagination v-if="books && !isLoading" @changePage="fetchBooks"/>
    </div>
  </main>
</template>

<style lang="scss" scoped>
form {
  button {
    margin-left: 20px;
    line-height: 30px;
    width: 100px;
    background-color: hsla(160, 100%, 37%, 1);
    border-radius:  5px;
    color: white;
    cursor: pointer;
  }
}

.home__total {
  padding-top: 20px;
}

.home__loader {
  padding-top: 30vh;
  text-align: center;
  color: hsla(160, 100%, 37%, 1);
  font-size: 40px;
  font-weight: 800;
}


.cards-wrapper {
  padding: 40px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit,  minmax(200px, 1fr));
  gap: 20px;
}

.home__categories {
  label {
    padding-right: 10px;
  }
  select {
    width: 110px;
    cursor: pointer;
    &:focus {
      outline-color: hsla(160, 100%, 37%, 1);
    }
  }
}

</style>
