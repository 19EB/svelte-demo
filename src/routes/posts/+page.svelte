<script lang="ts">

    type Post = {
        userId: number;
        id: number;
        title: string;
        body: string;
    }

	import { Accordion, AccordionItem, Alert, ListPlaceholder } from "flowbite-svelte";
    import { onMount } from "svelte";
	import Fetcher from "../../util/fetcher";
    
    let posts:Array<any> = [];
    let loading:boolean = true;

    onMount(async () => {
        const postFetch = await Fetcher.Get<Post[]>("https://jsonplaceholder.typicode.com/posts");
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate 1 second of fetching so the skeleton is visible for a moment
        if(postFetch.data) {
            posts = postFetch.data;
            loading = false;
        }
    });
</script>

<Alert color="yellow" class="mb-5">
    <span slot="icon"><svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
    </span>
    Fetcing is delayed by 1 second to emulate loading times.
</Alert>

{#if loading}
    <ListPlaceholder divClass="p-4 space-y-4 max-w rounded border border-gray-200 divide-y divide-gray-200 animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700" />
{/if}

{#if !loading}
<Accordion>
        {#each posts as post}
        <AccordionItem>
            <span slot="header">{post.title}</span>
            <p class="mb-2 text-gray-500 dark:text-gray-400">{post.body}</p>
        </AccordionItem>
        {/each}
    </Accordion>
{/if}
