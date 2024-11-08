<script lang="ts">
	import { goto } from '$app/navigation';
	import { storeBooks } from '$lib/books.svelte';

	interface Props {
		canDelete?: boolean;
	}

	let { canDelete = false }: Props = $props();

	const delBook = async (id: number) => {
		if (!confirm('Cancellare libro?')) return;

		storeBooks.del(id);
	};

	const editBook = async (id: number) => {
		goto('/books/edit/' + id);
	}
</script>

<table>
	<thead>
		<tr>
			<th>ISBN</th>
			<th>Title</th>
			<th>Author</th>
			{#if canDelete}
				<th>Actions</th>
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each storeBooks.list() as book}
			<tr>
				<td>{book.id}</td>
				<td>{book.title}</td>
				<td>{book.author}</td>
				{#if canDelete}
					<td><button onclick={() => editBook(book.id)}>Edit</button></td>
					<td><button onclick={() => delBook(book.id)}>Delete</button></td>
				{/if}
			</tr>
		{/each}
	</tbody>
</table>
