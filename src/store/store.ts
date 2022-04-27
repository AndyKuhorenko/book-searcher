import type { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

import { fetchBooks, sortBooksByCategory } from '../static/books'

const relevance = 'relevance'
const newest = 'newest'

type SortingType = typeof relevance | typeof newest

type GetBooksParams = {
  searchText: string
  sorting: string
  startIndex: number
} 

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
    categories: string[]
  }
}

interface BooksDataType {
  totalItems: number,
  items: BookType[]
}

// define your typings for the store state
interface State {
  books: BooksDataType | null
  isLoading: boolean
  category: string
  categories: string[]
  sorting: SortingType
  startIndex: number
  searchText: string
}

// define injection key
const key: InjectionKey<Store<State>> = Symbol()

function useStore() {
  return baseUseStore(key)
}

const store = createStore<State>({
  state: {
    books: null,
    isLoading: false,
    category: 'All',
    categories: ['All'],
    sorting: 'relevance',
    startIndex: 0,
    searchText: ''
  },

  mutations: {
    setBooks (state, books: BooksDataType) {
      state.books = books
    },

    setIsLoading (state, isLoading: boolean) {
      state.isLoading = isLoading
    },

    setCategory (state, category: string) {
      state.category = category

      if (state.books) state.books.items.sort((a, b) => sortBooksByCategory(a, b, category))
    },
    
    setCategories (state, categories: string[]) {
      state.categories = categories
    },

    setSorting(state, sorting: SortingType) {
      state.sorting = sorting
    },

    setStartIndex(state, startIndex) {
      state.startIndex = startIndex
    },

    setSearchText(state, searchText) {
      state.searchText = searchText
    }
  },
  actions: {
    async fetchBooks ({ state, commit }, params: GetBooksParams) {
      commit('setIsLoading', true)

      await fetchBooks(params).then((books: BooksDataType) => {
        if (books.totalItems > 0) {
          commit('setBooks', books)
          commit('setSearchText', params.searchText)
        }
      })

      commit('setIsLoading', false)
    },

    setCategory ({state, commit}, category: string) {
      commit('setCategory', category)
    },

    setCategories ({state, commit}, categories: string[]) {
      commit('setCategories', categories)
    },

    setSorting ({state, commit}, sorting: SortingType) {
      commit('setSorting', sorting)
    },

    setStartIndex({state, commit}, startIndex: number) {
      commit('setStartIndex', startIndex)
    }
  },
  getters: {
    getBooks (state) {
      return state.books
    },

    getIsLoading (state) {
      return state.isLoading
    },

    getCategory (state) {
      return state.category
    },

    getCategories (state) {
      return state.categories
    },

    getSorting (state) {
      return state.sorting
    },

    getStartIndex(state) {
      return state.startIndex
    },

    getSearchText(state) {
      return state.searchText
    }
  }
})

export type {
  GetBooksParams,
  BookType,
  BooksDataType,
  State
}

export {
  store,
  key,
  useStore
}
