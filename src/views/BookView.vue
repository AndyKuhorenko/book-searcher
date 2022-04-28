<script setup lang="ts">
import { ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useStore, type BooksDataType } from '../store/store'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const isLoading = computed<boolean>(() => store.getters.getIsLoading)
const books = computed<BooksDataType>(() => store.getters.getBooks)
const { id } = route.params

if (!books.value) {
  await store.dispatch('fetchBook', id)
}

const [book] = books.value.items.filter(book => book.id === id)

const {
  title,
  subtitle,
  authors,
  imageLinks,
  publisher,
  publishedDate,
  description,
  language,
  previewLink,
  averageRating,
  categories
} = book.volumeInfo

</script>

<template>
  <main>
    <div class="app-wrapper">
      <button @click="router.back" class="return-button">Back</button>
      <div v-if="books != null" class="book">
        <img v-if="imageLinks?.thumbnail" :src="imageLinks.thumbnail">
        <div class="book__info">
          <h2>{{title}}</h2>
          <p>{{subtitle}}</p>
          <p v-if="categories">Genre:<span v-for="(category, index) in categories">{{index == categories.length - 1 ? ` ${category}.` : ` ${category},`}}</span></p>
          <p v-if="authors">Authors:<span v-for="(author, index) in authors">{{index == authors.length - 1 ? ` ${author}.` : ` ${author},`}}</span></p>
          <p>Publisher: {{publisher}}</p>
          <p v-if="publishedDate">Published date: {{publishedDate}}</p>
          <p>Language: {{language}}</p>
          <p v-if="averageRating">Average rating: {{averageRating}}</p>
          <a :href="previewLink" target="blank">See preview</a>
        </div>
      </div>
      <div class="book__desription" v-if="description">
          <h3>Desription:</h3>
          <p>{{description}}</p>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>

.book {
  display: flex;
  img {
    min-width: 250px;
    min-height: 350px;
    border-radius: 2px;
  }
}

.book__info {
  padding-left: 20px;
  h2 {
    padding-bottom: 20px;
  }
}

.book__desription {
  padding-top: 20px;
  p {
    padding-top: 10px;
    text-indent: 20px;
  }
}

.return-button {
  margin-bottom: 30px;
}
</style>
