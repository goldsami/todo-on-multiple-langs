import {prisma} from "../prisma";
import {Task} from "../models";
import Layout from "../components/layout";
import {TaskCard} from "../components/taskCard";
import {useEffect, useState} from "react";
import {MutateTaskModal} from "../components/mutateTaskModal";

const taskTabs = {
  all: 'All',
  upcoming: 'Upcoming',
  done: 'Done'
}

export default function Tasks({tasks: _tasks}: { tasks: Task[] }) {
  const [currentTab, setCurrentTab] = useState(taskTabs.all)
  const [tasks, setTasks] = useState<Task[]>(_tasks)
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [modalProps, setModalProps] = useState<{show: boolean, task: Task | null}>({show: false, task: null})

  const updateTask = async (id: number, task: Partial<Task>) => {
    const res = await fetch(`/api/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()
    setTasks(tasks.map(x => {
      if (x.id === id) return {...x, ...data}
      else return x
    }))
  }

  const deleteTask = async (id: number) => {
    await fetch(`/api/task/${id}`, {
      method: 'DELETE',
    })
    setTasks(tasks.filter(x => x.id !== id))
  }

  const createTask = async (newTask: Partial<Task>) => {
    const res = await fetch(`/api/tasks`, {
      method: 'POST',
      body: JSON.stringify(newTask)
    })
    const {task} = await res.json()

    setTasks([task, ...tasks])
    setModalProps({show: false, task: null})
  }

  const filterTasks = (tasks: Task[]) => {
    switch (currentTab) {
      case taskTabs.all:
        setFilteredTasks(tasks)
        break
      case taskTabs.upcoming:
        setFilteredTasks(tasks.filter(x => x.time && new Date() < new Date(x.time)))
        break
      case taskTabs.done:
        setFilteredTasks(tasks.filter(x => x.status === 'done'))
        break
    }
  }

  useEffect(() => {
    filterTasks(tasks)
  }, [currentTab, tasks])

  return (
    <Layout>
      <article className="panel is-primary">
        <p className="panel-tabs" style={{position: 'relative'}}>
          {Object.values(taskTabs).map((v, i) => (
            <a
              key={i}
              className={v === currentTab ? 'is-active' : ''}
              onClick={() => setCurrentTab(v)}
            >{v}</a>
          ))}
          <button
            className="button is-success is-small"
            style={{position: 'absolute', right: '2px', alignSelf: 'center'}}
            onClick={() => setModalProps({show: true, task: null})}
          >Add task</button>
        </p>
        {filteredTasks.map((task, i) => (
          <TaskCard
            task={task}
            key={i}
            updateTask={updateTask}
            deleteTask={deleteTask}
            onClick={(event) => setModalProps({show: true, task: event})}
          />
        ))}
      </article>
      <MutateTaskModal
        isActive={modalProps.show}
        taskToUpdate={modalProps.task}
        createTask={createTask}
        updateTask={(id, task) => {
          updateTask(id, task);
          setModalProps({show: false, task: null})
        }}
        close={() => setModalProps({show: false, task: null})}
      />
    </Layout>
  )
}

export async function getServerSideProps() {
  const tasks = (await prisma.$queryRaw`
    SELECT "task".*, json_build_object('id', "user"."id", 'image_url' ,"user"."image_url") as "user" FROM "task" 
    LEFT JOIN "user" on "user"."id" = "task"."user_id"
    WHERE "task"."status" != 'deleted'
    GROUP BY "task"."id", "user"."id"`)

  return {
    props: {
      tasks: JSON.parse(JSON.stringify(tasks))
    }
  }
}
