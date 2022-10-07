<script lang="ts">
  import {useMutation, useQuery, useQueryClient} from '@sveltestack/svelte-query';
  import axios from 'axios';
  import MutateTaskModal from "../MutateTaskModal.svelte";
  import type {Task} from "../models";

  let modalState = {
    show: false,
    task: null,
  }

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

  const closeModal = () => {
    modalState = {
      show: false,
      task: null,
    }
  }

  const saveTask = (task: Task) => {
    console.log({task})
    closeModal()
  }
</script>

{#if $queryResult.isLoading}
    <span>Loading...</span>
{:else if $queryResult.error}
    <span>An error has occurred: {$queryResult.error.message}</span>
{:else}
    {#each $queryResult.data.data as task}
        <b on:click={() => modalState = {show: true, task}}>{task.name}</b>
        <div>{task.description}</div>
        <button on:click={() => $deleteTaskMutation.mutate(task.id)}>delete task</button>
        <br/>
        <br/>
    {/each}
{/if}
<br/>
<br/>
<br/>
<button on:click={() => modalState.show = true}>Create task</button>
<MutateTaskModal
        on:close={closeModal}
        on:save={(e) => saveTask(e.detail)}
        show={modalState.show}
        task={modalState.task}
/>
