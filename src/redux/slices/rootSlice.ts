import { createSlice } from '@reduxjs/toolkit';

interface BookState {
    title: string,
    author: string,
    published_date: string,
    publisher: string,
    isbn: number,
    description: string,
    price: number,
    stock_quantity: number,
    image_url: string
}

const initialState: BookState = {
    title: '',
    author: '',
    published_date: '',
    publisher: '',
    isbn: 0,
    description: '',
    price: 0,
    stock_quantity: 0,
    image_url: ''
}

const rootSlice = createSlice({
    name: "root",
    initialState,
    reducers: {
        chooseTitle: (state, action) => { state.title = action.payload },
        chooseAuthor: (state, action) => { state.author = action.payload },
        choosePublishedDate: (state, action) => { state.published_date = action.payload },
        choosePublisher: (state, action) => { state.publisher = action.payload },
        chooseIsbn: (state, action) => { state.isbn = action.payload },
        chooseDescription: (state, action) => { state.description = action.payload },
        choosePrice: (state, action) => { state.price = action.payload },
        chooseStock: (state, action) => { state.stock_quantity = action.payload },
        chooseImageUrl: (state, action) => { state.image_url = action.payload },
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
console.log(rootSlice)
export const {
    chooseTitle,
    chooseAuthor,
    choosePublishedDate,
    choosePublisher,
    chooseIsbn,
    chooseDescription,
    choosePrice,
    chooseStock,
    chooseImageUrl
} = rootSlice.actions;
