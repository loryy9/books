/* eslint-disable @typescript-eslint/no-explicit-any */
import { bookAdd, bookDel, bookList } from "./actions";
import type { Book } from "./types";

interface StoreBooks {
    books: Record<number, Book>;
    add ( id: number, title: string, author: string): Promise<any>;
    load (): Promise<any>;
    del ( id: number ): Promise<any>
    list (): Book[];
    getBook(id: string): Book | undefined;
}

export const storeBooks: StoreBooks = $state({
    books: {},
    async add ( id: number, title: string, author: string) {
        const res = await bookAdd(id, title, author);

        if ( res.error ) return res;

        storeBooks.books[ id ] = {id, title, author};
        return res;
    },
    async load () {
        const res = await bookList();
        if ( res.error ) return res;

        res.data.forEach((book: Book) => {
            storeBooks.books[ book.id ] = book;
        });
        return res
    },
    async del ( id: number ){
        const res = await bookDel(id);

        if ( res.error ) return res;

        delete storeBooks.books[ id ];
        return res;
    },
    list () {
        return Object.values( storeBooks.books );
    },
    getBook(id: string){
        return storeBooks.books[parseInt(id)];
    }
});