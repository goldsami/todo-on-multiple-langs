import {Task} from "../models";
import {useEffect, useState} from "react";
import Select from "react-select";

type MutateTaskModalProps = {
  isActive: boolean,
  taskToUpdate: Task | null,
  createTask: (task: Partial<Task>) => any,
  updateTask: (id: number, task: Partial<Task>) => any,
  close: () => any,
}

export function MutateTaskModal({isActive, taskToUpdate, createTask, updateTask, close}: MutateTaskModalProps) {
  const [users, setUsers] = useState<{ id?: number, name: string }[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [userId, setUserId] = useState<number | null>(null)
  const [time, setTime] = useState<string | null>(null)

  const initForm = (task: Task | null) => {
    fetchUsers()
    setName(task?.name || '')
    setDescription(task?.description || '')
    setUserId(task?.user?.id || null)
    setTime(task?.time ? new Date(task?.time).toISOString().split(':').slice(0, -1).join(':') : null)
  }

  const fetchUsers = async () => {
    const res = await fetch(`/api/users`, {
      method: 'GET',
    })
    const {users} = await res.json()

    setUsers(users)
  }

  useEffect(() => {
    initForm(taskToUpdate)
  }, [taskToUpdate])

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!taskToUpdate) {
      createTask({
        name,
        description,
        userId,
        time: time ? new Date(time) : null
      })
    } else {
      updateTask(taskToUpdate.id, {
        name,
        description,
        userId,
        time: time ? new Date(time): null
      })
    }
  }

  return (
    <div className={`modal ${isActive ? 'is-active' : ''}`}>
      <div className="modal-background" onClick={close}></div>
      <form className="modal-card" onSubmit={handleSubmit}>
        <header className="modal-card-head">
          <p className="modal-card-title">{taskToUpdate ? 'Update Task' : 'Create Task'}</p>
          <button className="delete" aria-label="close" onClick={close}></button>
        </header>
        <section className="modal-card-body">
          <div className="field">
            <label className="label" htmlFor="name">Name:</label>
            <div className="control">
              <input className="input" type="text" id="name" name="name" required
                     value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="description">Description:</label>
            <div className="control">
              <input className="input" type="text" id="description" name="description" value={description}
                     onChange={(e) => setDescription(e.target.value)}/>
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="description">Time:</label>
            <div className="control">
              <input className="input" type="datetime-local" id="time" name="time" value={time || ''}
                     onChange={(e) => setTime(e.target.value)}/>
            </div>
          </div>
          <div className="field">
            <label className="label">Assignee: {userId}</label>
            <div>
              <Select
                value={{
                  label: users.find(x => x.id == userId)?.name || 'Select User',
                  value: userId || undefined
                }}
                options={users.map(x => ({value: x.id, label: x.name}))}
                onChange={(e) => setUserId(e?.value || null)}
              />
            </div>
          </div>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            type="submit"
          >Save changes
          </button>
          <button className="button" onClick={close}>Cancel</button>
        </footer>
      </form>
    </div>
  )
}