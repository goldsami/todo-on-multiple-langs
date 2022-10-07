<script lang="ts">
  import { useQuery } from '@sveltestack/svelte-query';
  import axios from 'axios';

  const queryResult = useQuery('tasks', () =>
    axios.get('http://localhost:4000/api/tasks')
  );
</script>

{#if $queryResult.isLoading}
    <span>Loading...</span>
{:else if $queryResult.error}
    <span>An error has occurred: {$queryResult.error.message}</span>
{:else}
    {#each $queryResult.data.data as task}
        <div>{task.name}</div>
    {/each}
{/if}
