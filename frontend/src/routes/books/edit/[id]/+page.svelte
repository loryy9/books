<script lang="ts">
	import { page } from "$app/stores";
	import { storeBooks } from "$lib/books.svelte";
	import BookAdd from "$lib/components/BookAdd.svelte";
	import type { Book } from "$lib/types";

    let id = $page.params.id;

    let book: Book | undefined = storeBooks.getBook(id);
</script>

{#if book}
    <BookAdd {book} />
{:else}
    <p>libro non trovato</p>
{/if}