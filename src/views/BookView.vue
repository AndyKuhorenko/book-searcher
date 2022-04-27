<script setup lang="ts">
import { ref } from 'vue'
import { computed } from '@vue/reactivity'
import { useStore, type BooksDataType } from '../store/store'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const books = computed<BooksDataType>(() => store.getters.getBooks)

if (books.value === null) {
  router.push({ path: '/' })
}

const book = books.value?.items?.find(book => book.id === route.params.id)

let bookTitle: string
let bookSubtitle: string
let bookAuthors: string[]
let imageSrc: string
let bookPublisher: string
let bookPublishedDate: string
let bookDescription: string
let bookLanguage: string
let bookPreviewLink: string
let bookRating: number
let bookCategroies: string[]

if (book) {
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

  bookTitle = title
  bookSubtitle = subtitle
  bookAuthors = authors
  imageSrc = imageLinks?.thumbnail
  bookPublisher = publisher
  bookPublishedDate = publishedDate
  bookDescription = description
  bookLanguage = language
  bookPreviewLink = previewLink
  bookRating = averageRating
  bookCategroies = categories
}

</script>

<template>
  <main>
    <div class="app-wrapper">
      <button @click="router.back" class="return-button">Back</button>
      <div class="book">
        <img v-if="imageSrc" :src="imageSrc">
        <div class="book__info">
          <h2>{{bookTitle}}</h2>
          <p>{{bookSubtitle}}</p>
          <p v-if="bookCategroies">Genre:<span v-for="(category, index) in bookCategroies">{{index == bookCategroies.length - 1 ? ` ${category}.` : ` ${category},`}}</span></p>
          <p v-if="bookAuthors">Authors:<span v-for="(author, index) in bookAuthors">{{index == bookAuthors.length - 1 ? ` ${author}.` : ` ${author},`}}</span></p>
          <p>Publisher: {{bookPublisher}}</p>
          <p v-if="bookPublishedDate">Published date: {{bookPublishedDate}}</p>
          <p>Language: {{bookLanguage}}</p>
          <p v-if="bookRating">Average rating: {{bookRating}}</p>
          <a :href="bookPreviewLink">See preview</a>
        </div>
      </div>
      <div class="book__desription" v-if="bookDescription">
          <h3>Desription:</h3>
          <p>{{bookDescription}}</p>
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
