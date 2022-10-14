<script lang="ts">
  import type {Task} from '../models';
  import {createEventDispatcher} from 'svelte';
  import {Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Icon,} from 'sveltestrap';

  export let task: Task;

  const dispatch = createEventDispatcher();

  function deleteTask() {
    dispatch('deleteTask', task.id);
  }

  function onClick() {
    dispatch('onClick', task);
  }

  function updateStatus() {
    if (task.status === 'open') dispatch('updateStatus', 'done');
    if (task.status === 'done') dispatch('updateStatus', 'open');
  }
</script>

<Card class="m-4">
    <CardHeader class="d-inline-flex justify-content-between">
        <div class="d-inline-flex">
            <input
                    aria-label="Checkbox for following text input"
                    checked={task.status === 'done'}
                    class="form-check-input me-2"
                    on:click={updateStatus}
                    type="checkbox"
            />
            <div on:click={onClick}>
                <CardTitle>{task.name}</CardTitle>
            </div>
        </div>
        <div on:click={deleteTask}>
            <Icon name="trash"/>
        </div>
    </CardHeader>
    {#if task.description}
        <CardBody>
            <CardText>
                {task.description}
            </CardText>
        </CardBody>
    {/if}
    {#if task.user?.image_url || task.time}
        <CardFooter>
            {#if task.user?.image_url}
                <img
                        src={task.user.image_url}
                        class="img-thumbnail rounded-circle"
                        alt="..."
                />
            {/if}
            {#if task.time}
                <span>{new Date(task.time).toLocaleDateString()}</span>
            {/if}
        </CardFooter>
    {/if}
</Card>

<style>
    img {
        width: 40px;
        height: 40px;
        object-fit: cover;
        padding: 0;
    }
</style>
