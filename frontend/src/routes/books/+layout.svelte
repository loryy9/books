<script lang="ts">
	import { storeBooks } from '$lib/books.svelte';
	import { onMount } from 'svelte';

	interface Props {
		children: any;
	}
	let { children }: Props = $props();
	let isReady: boolean = $state(false);

	onMount(async () => {
		const res = await storeBooks.load();
		if (res.error) return;

		isReady = true;
	});
</script>

<h1>Books</h1>
{#if isReady}
	{@render children()}
{:else}
	loading...
{/if}
