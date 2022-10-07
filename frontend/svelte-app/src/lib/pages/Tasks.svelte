<script lang="ts">
    import {useMutation, useQuery, useQueryClient} from '@sveltestack/svelte-query';
  import axios from 'axios';

  const queryClient = useQueryClient()

  const queryResult = useQuery('tasks', () =>
    axios.get('http://localhost:4000/api/tasks')
  );

  const deleteTaskMutation = useMutation((id) => {
      return axios.delete(`http://localhost:4000/api/tasks/${id}`)
  }, {
      onSuccess: () => {
          queryClient.invalidateQueries('tasks')
      }
  })
</script>

{#if $queryResult.isLoading}
    <span>Loading...</span>
{:else if $queryResult.error}
    <span>An error has occurred: {$queryResult.error.message}</span>
{:else}
    {#each $queryResult.data.data as task}
        <div>{task.name}</div>
        <button on:click={() => $deleteTaskMutation.mutate(task.id)}>delete task</button>
    {/each}
{/if}
