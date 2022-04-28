import axios from 'axios'

import type { BooksDataType, BookType, GetBooksParams } from '../store/store'

const maxResults = 40;

async function fetchBooks(params: GetBooksParams): Promise<BooksDataType> {
  const { searchText, sorting, startIndex } = params;

  const url = 
    `https://www.googleapis.com/books/v1/volumes?key=AIzaSyDgZldmbQ9gaBPrIH4BW2-83lnFwprfry4&startIndex=${startIndex * maxResults}&q=${searchText}&orderBy=${sorting}&maxResults=${maxResults}`

  const optionsAxios = {
    method: 'GET',
    url
  };

  return new Promise<BooksDataType>((resolve, reject) => {


    axios (optionsAxios)
      .then((response: any) => {
          resolve(response.data)
      })
      .catch((error: any) => {
          console.error(error)
      })
  })

}

async function fetchBook(id: string): Promise<BookType> {

  const url =
    `https://www.googleapis.com/books/v1/volumes/${id}?key=AIzaSyDgZldmbQ9gaBPrIH4BW2-83lnFwprfry4`

  const optionsAxios = {
    method: 'GET',
    url
  };

  return new Promise<BookType>((resolve, reject) => {


    axios (optionsAxios)
      .then((response: any) => {
          resolve(response.data)
      })
      .catch((error: any) => {
          console.error(error)
      })
  })

}


function sortBooksByCategory(a: BookType, b: BookType, category: string) {
  if (a.volumeInfo.categories && a.volumeInfo.categories[0].includes(category)) {
    return -1
  }

  if (b.volumeInfo.categories && b.volumeInfo.categories[0].includes(category)) {
    return 1
  }

  return 0
}


export {
  fetchBooks,
  fetchBook,
  sortBooksByCategory
}