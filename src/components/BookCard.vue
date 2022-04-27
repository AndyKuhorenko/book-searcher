<script setup lang="ts">
import { RouterLink } from 'vue-router'
// import type { BookType } from '@/store/store';

interface BookType {
  id: string,
  volumeInfo: {
    title: string
    subtitle: string
    authors: string[]
    publisher: string
    publishedDate: string
    description: string
    averageRating: number
    imageLinks: {
      smallThumbnail: string
      thumbnail: string
    }
    language: string
    previewLink: string
  }
}

const props = defineProps<BookType>()

const {
  title,
  imageLinks,
} = props.volumeInfo

let showedTitle = title

if (showedTitle.length > 22) showedTitle = showedTitle.substring(0, 22).trim() + '...'

</script>

<template>
  <div class="card" :key="props.id" :title="title">
    <RouterLink 
      :to="{ 
        name: 'book',
        params: { id: props.id }
      }" 
      class="card__image"
    >
      <img :src="imageLinks?.thumbnail" alt="book image">
      <h3 class="card__title">{{showedTitle}}</h3>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    display: flex;
  }

  .card__image {
    width: 200px;
    height: 300px;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    align-items: center;
    background-color: rgba(236, 235, 235, 0.616);
    border-radius: 10px;
    img {
      width: 120px;
      height: 200px;
      border-radius: 2px;
    }

    h3 {
      padding-top: 10px;
    }

    &:hover {
      background-color: rgba(207, 206, 206, 0.616);
    }
  }

  .card__title {
    max-width: 180px;
    text-align: center ;
  }

  .card__info {
    padding: 20px;
  }
</style>
