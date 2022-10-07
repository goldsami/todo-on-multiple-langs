<script lang="ts">
  import {createEventDispatcher, onMount} from "svelte";
  import {Button, Form, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader} from "sveltestrap";
  import Select from "svelte-select";
  import type {Task} from "./models";
  import axios from "axios";

  onMount(() => axios.get('http://localhost:4000/api/users')
    .then(({data}) => userOptions = data.map(x => ({value: x.id, label: x.name}))))

  export let show = false
  export let task: Task = null

  let time = null
  let name = ''
  let description = ''
  let selectedUserOption = null

  let userOptions: {value: string, label: string}[] = []

  const updateForm = (task: Task) => {
    name = task?.name || ''
    description = task?.description || ''
    time = task?.time ? new Date(task.time).toISOString().split(':').slice(0, -1).join(':') : null
    selectedUserOption = task?.user ? {value: task.user.id, label: task.user.name} : null
  }

  const dispatch = createEventDispatcher()
  const close = () => dispatch('close')
  const save = () => {
    dispatch('save', {
      ...task,
      name,
      description,
      time,
      user_id: selectedUserOption?.value || null,
    })
  }

  $: updateForm(task)
  $: formValid = !!name

</script>

<Modal {close} isOpen={show}>
    <ModalHeader>{task ? 'Update task' : 'Create task'}</ModalHeader>
    <ModalBody>
        <Form>
            <FormGroup floating label="Name">
                <Input bind:value={name} placeholder="Enter a value" required/>
            </FormGroup>
            <FormGroup floating label="Description">
                <Input bind:value={description} placeholder="Enter a value"/>
            </FormGroup>
            <FormGroup floating label="Date">
                <Input bind:value={time} placeholder="Enter a value" type="datetime-local"/>
            </FormGroup>
            <FormGroup label="">
                <Select bind:value={selectedUserOption} items={userOptions}></Select>
            </FormGroup>

        </Form>
    </ModalBody>
    <ModalFooter>
        <Button color="primary" disabled={!formValid} on:click={save}>Save</Button>
        <Button color="secondary" on:click={close}>Cancel</Button>
    </ModalFooter>
</Modal>