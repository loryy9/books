<script lang="ts">
	import BookAdd from "$lib/components/BookAdd.svelte";
	import BooksList from "$lib/components/BooksList.svelte";
</script>

<BookAdd />

<BooksList canDelete={true}/>