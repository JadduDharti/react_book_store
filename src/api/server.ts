import { BookForm } from "../components/BookForm/BookForm"

let token = '2bc418d8743d2e0ffa3b2bcc5649b8a93801203d4b41908a'


export const serverCalls = {
    get: async () => {
        const response = await fetch('https://book-store-example.onrender.com/api/books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async (data: any) => {
        const response = await fetch('https://book-store-example.onrender.com/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            throw new Error('Failed to create new data from server')
        }

        return await response.json()
    },

    update: async (id: string, data: any = {}) => {
        const response = await fetch(`https://book-store-example.onrender.com/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to update data from server')
        }

        console.log(`Successfully update character with id ${id}`)
    },
    
    delete: async (id: string) => {
        const response = await fetch(`https://book-store-example.onrender.com/api/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error('Failed to delete data from server')
        }
    }
}