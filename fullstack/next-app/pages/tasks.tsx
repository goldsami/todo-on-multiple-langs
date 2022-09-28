import { prisma } from "../prisma";
import { Task } from "../models";
import Layout from "../components/layout";
import {TaskCard} from "../components/taskCard";

export default function Tasks({ tasks }: { tasks: Task[] }) {
  return (
    <Layout>
      <article className="panel is-primary">
        <p className="panel-tabs">
          <a className="is-active">All</a>
          <a>Upcoming</a>
          <a>Done</a>
        </p>
        {tasks.map((task, i) => (
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
