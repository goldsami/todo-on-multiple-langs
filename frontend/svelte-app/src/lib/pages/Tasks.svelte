<script lang="ts">
  import {useMutation, useQuery, useQueryClient} from '@sveltestack/svelte-query';
  import axios from 'axios';
  import MutateTaskModal from "../components/MutateTaskModal.svelte";
  import type {Task} from "../models";
  import TaskCard from "../components/TaskCard.svelte";
  import {Button} from "sveltestrap";

  const taskTabs = {
    all: 'All',
    upcoming: 'Upcoming',
    done: 'Done'
  }

  let currentTab = taskTabs.all

  let modalState = {
    show: false,
    task: null,
  }

  const filterTasks = (tasks: Task[], currentTab: string) => {
    switch (currentTab) {
      case taskTabs.all:
        return tasks
      case taskTabs.upcoming:
        return tasks.filter(x => x.time && new Date() < new Date(x.time))
      case taskTabs.done:
        return tasks.filter(x => x.status === 'done')
    }
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
  const createTaskMutation = useMutation((task: Partial<Task>) => {
    return axios.post(`http://localhost:4000/api/tasks`, task)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('tasks')
    }
  })
  const updateTaskMutation = useMutation(({id, user, ...task}: Partial<Task>) => {
    return axios.put(`http://localhost:4000/api/tasks/${id}`, task)
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
    if (task.id) {
      $updateTaskMutation.mutate(task)
    } else {
      $createTaskMutation.mutate(task)
    }
    closeModal()
  }

  $: filteredTasks = filterTasks($queryResult?.data?.data, currentTab)
</script>

{#if $queryResult.isLoading}
    <span>Loading...</span>
{:else if $queryResult.error}
    <span>An error has occurred: {$queryResult.error.message}</span>
{:else}
    <ul class="nav nav-tabs">
        {#each Object.values(taskTabs) as tab}
            <a class="nav-link" class:active={tab === currentTab} href="#"
            on:click={() => currentTab = tab}>{tab}</a>
        {/each}
    </ul>
    {#each filteredTasks as task}
        <TaskCard {task}
                  on:deleteTask={({detail}) => $deleteTaskMutation.mutate(detail)}
                  on:onClick={(detail) => modalState = {show: true, task: detail}}
                  on:updateStatus={({detail}) => saveTask({...task, status: detail})}
        />
    {/each}
{/if}
<Button class="m-4" on:click={() => modalState.show = true}>Create task</Button>
<MutateTaskModal
        on:close={closeModal}
        on:save={(e) => saveTask(e.detail)}
        show={modalState.show}
        task={modalState.task}
/>
