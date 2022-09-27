import { prisma } from "../prisma";
import { Task } from "../models";
import Layout from "../components/layout";

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
          <a key={i} className="panel-block is-active level mb-0">
            <div className="is-full level-left level-item is-flex is-flex-direction-column is-align-items-start">
              <div>{task.name}</div>
              <div className="is-size-7 has-text-grey">{task.description}</div>
              {task.user?.id != null && <div>
                <figure className="image is-24x24 mt-1 is-square">
                  <img className='is-rounded' src={task.user.image_url} />
                </figure>
              </div>}
            </div>
            <button className="delete level-right level-item"></button>
          </a>
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
