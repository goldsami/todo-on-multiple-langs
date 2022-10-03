import {Task} from "../models";

type TaskCardProps = {
  task: Task,
  updateTask: (id: number, task: Partial<Task>) => any,
  deleteTask: (id: number) => any
}

export function TaskCard({task, updateTask, deleteTask}: TaskCardProps) {
  const toggleTaskStatus = async () => {
    const status = task.status === 'open' ? 'done' : 'open'
    updateTask(task.id, {status})
  }

  return (
    <a className="panel-block is-active level mb-0">
      <input
        type="checkbox"
        checked={task.status === 'done'}
        onChange={() => toggleTaskStatus()}
      />
      <div className="is-full level-left level-item is-flex is-flex-direction-column is-align-items-start">
        <div>{task.name}</div>
        <div className="is-size-7 has-text-grey">
          {task.time &&
            <b>
              {new Date(task.time).toLocaleDateString() + '   '}
            </b>
          }
          {task.description}
        </div>
        {task.user?.id != null && <div>
          <figure className="image is-24x24 mt-1 is-square">
            <img className='is-rounded' src={task.user.image_url}/>
          </figure>
        </div>}
      </div>
      <button className="delete level-right level-item" onClick={() => deleteTask(task.id)}></button>
    </a>
  )
}
