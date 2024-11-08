<script lang="ts">
	import { storeBooks } from "$lib/books.svelte";
	import type { Book } from "$lib/types";

    interface Props {
        book?: Book;
    }

    let { book }: Props = $props()

    let isbn: string = $state(book ? book.id.toString() : '')
    let title: string = $state(book ? book.title : '')
    let author: string = $state(book ? book.author : '') 
    
    const BASE_URL = "http://localhost:8000";
    
    const book_add = async () => {
        const res = await storeBooks.add(parseInt(isbn), title, author);

        if ( res.error ) {
            alert(res.error);
            return;
        }
    }
</script>

<div class="book-add-container">
    ISBN <input type="text" bind:value={isbn}><br>
    TITOLO <input type="text" bind:value={title}><br>
    AUTORE <input type="text" bind:value={author}><br>

    <button onclick={book_add}>Aggiungi</button>
</div>