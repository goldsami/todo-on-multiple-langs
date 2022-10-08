<script lang="ts">
  import type {Task} from "../models";
  import {createEventDispatcher} from "svelte";
  import {Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Icon, Image} from "sveltestrap";

  export let task: Task

  const dispatch = createEventDispatcher()

  function deleteTask() {
    dispatch('deleteTask', task.id)
  }

  function onClick() {
    dispatch('onClick', task)
  }
</script>

<Card class="m-4">
    <CardHeader class="d-inline-flex justify-content-between">
        <div on:click={onClick}>
            <CardTitle>{task.name}</CardTitle>
        </div>
        <div on:click={deleteTask}>
            <Icon name="trash" />
        </div>
    </CardHeader>
    {#if (task.description)}
        <CardBody>
            <CardText>
                {task.description}
            </CardText>
        </CardBody>
    {/if}
    {#if task.user?.image_url || task.time}
        <CardFooter>
            {#if task.user?.image_url}
                <img src={task.user.image_url} class="img-thumbnail rounded-circle" alt="...">
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