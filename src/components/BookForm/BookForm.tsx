import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
    chooseTitle,
    chooseAuthor,
    choosePublishedDate,
    choosePublisher,
    chooseIsbn,
    chooseDescription,
    choosePrice,
    chooseStock,
    chooseImageUrl
} from '../../redux/slices/rootSlice';
import { Button } from '@mui/material';
import { Input, Input3 } from '../sharedComponents/Input';
import { serverCalls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface BookFormProps {
    id?: string;
    data?: {}
}

interface BookState {
    title: string;
    author: string;
    published_date: string;
    publisher: string;
    isbn: number;
    description: string;
    price: number;
    stock_quantity: number;
    image_url: string;
}

export const BookForm = (props: BookFormProps) => {

    const dispatch = useDispatch();
    let { bookData, getData } = useGetData();
    const store = useStore()
    const title = useSelector<BookState>(state => state.title)
    console.log(title)
    const { register, handleSubmit } = useForm({})

    const onSubmit = async (data: any, event: any) => {
        console.log(props.id)

        if (props.id!) {
            console.log("Inside if")
            await serverCalls.update(props.id!, data)
            console.log(`Updated:${data} ${props.id}`)
            // event.target.closest('form').reset();
            window.location.reload()
            event.target.reset()

        } else {
            dispatch(chooseTitle(data.title))
            dispatch(chooseAuthor(data.author))
            dispatch(choosePublishedDate(data.published_date))
            dispatch(choosePublisher(data.publisher))
            dispatch(chooseIsbn(data.isbn))
            dispatch(chooseDescription(data.description))
            dispatch(choosePrice(data.price))
            dispatch(chooseStock(data.stock_quantity))
            dispatch(chooseImageUrl(data.image_url))
            console.log(store.getState())
            await serverCalls.create(store.getState())
            window.location.reload()
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="title">Title</label>
                    <Input {...register('title')} name="title" placeholder='Title' />
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <Input {...register('author')} name="author" placeholder="Author" />
                </div>
                <div>
                    <label htmlFor="published_date">Published Date</label>
                    <Input3 {...register('published_date')} name="published_date" placeholder="Published Date (mm-dd-yyyy)" />
                </div>
                <div>
                    <label htmlFor="publisher">Publisher</label>
                    <Input {...register('publisher')} name="publisher" placeholder="Publisher" />
                </div>
                <div>
                    <label htmlFor="isbn">ISBN</label>
                    <Input {...register('isbn')} name="isbn" placeholder="ISBN (numbers only)" />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <Input {...register('description')} name="description" placeholder="Description" />
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder="Price" />
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <Input {...register('stock_quantity')} name="stock_quantity" placeholder="Stock" />
                </div>
                <div>
                    <label htmlFor="image_url">Image URL</label>
                    <Input {...register('image_url')} name="image_url" placeholder="Image URL" />
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}