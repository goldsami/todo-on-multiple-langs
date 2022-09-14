import {prisma} from "../prisma";
import {Task} from "../models";
import Layout from "../components/layout";

export default function Tasks({tasks}: {tasks: Task[]}) {
  return (
    <Layout>
      {tasks.map((task, i) => (<div key={i}>{task.name}</div>))}
    </Layout>
  )
}

export async function getServerSideProps() {
  const tasks = await prisma.task.findMany()

  return {
    props: {
      tasks: JSON.parse(JSON.stringify(tasks))
    },
  };
}
