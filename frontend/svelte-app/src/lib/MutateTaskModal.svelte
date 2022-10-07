<script lang="ts">
    import {createEventDispatcher, onMount} from "svelte";
    import {Button, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "sveltestrap";
    import type {Task} from "./models";
    import axios from "axios";

    onMount(() => axios.get('http://localhost:4000/api/users').then(({data}) => users = data))

    export let show = false
    export let task: Task = null

    let users = []

    let time = null
    let name = ''
    let description = ''
    let userId = null

    $: updateForm(task)
    $: formValid = !!name

    const updateForm = (task: Task) => {
        name = task?.name || ''
        description = task?.description || ''
        time = task?.time ? new Date(task.time).toISOString().split(':').slice(0, -1).join(':') : null
    }

    const dispatch = createEventDispatcher()
    const close = () => dispatch('close')
    const save = () => {
        console.log('save', {name, description})
        dispatch('save', {
            ...task,
            name,
            description,
            time,
        })
    }

</script>

<Modal isOpen={show} {close}>
    <ModalHeader>{task ? 'Update task' : 'Create task'}</ModalHeader>
    <ModalBody>
        <Form>
            <FormGroup floating label="Name">
                <Input bind:value={name} required placeholder="Enter a value" />
            </FormGroup>
            <FormGroup floating label="Description">
                <Input bind:value={description} placeholder="Enter a value" />
            </FormGroup>
            <FormGroup floating label="Date">
                <Input type="datetime-local" bind:value={time} placeholder="Enter a value" />
            </FormGroup>

        </Form>
    </ModalBody>
    <ModalFooter>
        <Button disabled={!formValid} color="primary" on:click={save}>Save</Button>
        <Button color="secondary" on:click={close}>Cancel</Button>
    </ModalFooter>
</Modal>