import {prisma} from "../prisma";
import {Task} from "../models";

export default function Tasks({tasks}: {tasks: Task[]}) {
  return (
    <>
      {tasks.map(task => (<div>{task.name}</div>))}
    </>
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
