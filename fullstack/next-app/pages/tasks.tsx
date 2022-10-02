import { prisma } from "../prisma";
import { Task } from "../models";
import Layout from "../components/layout";
import {TaskCard} from "../components/taskCard";
import {useEffect, useState} from "react";

const taskTabs = {
  all: 'All',
  upcoming: 'Upcoming',
  done: 'Done'
}

export default function Tasks({ tasks }: { tasks: Task[] }) {
  const [currentTab, setCurrentTab] = useState(taskTabs.all)
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks)

  useEffect(() => {
    console.log('use effect', {tasks, currentTab})
    switch (currentTab){
      case taskTabs.all:
        setFilteredTasks(tasks)
        break
      case taskTabs.upcoming:
        setFilteredTasks(tasks.filter(x => new Date() < new Date(x.time)))
        break
      case taskTabs.done:
        setFilteredTasks(tasks.filter(x => x.status === 'done'))
        break
    }
  }, [tasks, currentTab])

  return (
    <Layout>
      <article className="panel is-primary">
        <p className="panel-tabs">
          {Object.values(taskTabs).map((v, i) => (
            <a
              key={i}
              className={v === currentTab ? 'is-active' : ''}
              onClick={() => setCurrentTab(v)}
            >{v}</a>
          ))}
        </p>
        {filteredTasks.map((task, i) => (
          <TaskCard task={task} key={i} />
        ))}
      </article>
    </Layout>
  )
}

export async function getServerSideProps() {
  const tasks = (await prisma.$queryRaw`
    SELECT "task".*, json_build_object('id', "user"."id", 'image_url' ,"user"."image_url") as "user" FROM "task" 
    LEFT JOIN "user" on "user"."id" = "task"."user_id"
    GROUP BY "task"."id", "user"."id"`)

  return {
    props: {
      tasks: JSON.parse(JSON.stringify(tasks))
    }
  }
}
