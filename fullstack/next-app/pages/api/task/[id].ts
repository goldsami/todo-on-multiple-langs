import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../prisma";
import {Task, User} from "../../../models";

export default async function taskHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  const {query: {id}, method, body} = req

  if (!id || isNaN(+id)) {
    res.end('id is invalid')
    return
  }

  if (method === 'PUT') {
    const task = await prisma.tasks.update({
      where: {id: +id},
      data: {
        user_id: body.userId,
        status: body.status,
        time: body.time,
        name: body.name,
        description: body.description,
      }
    })
    const result = {...task} as Task
    if (task.user_id) {
      result.user = (await prisma.users.findFirst({where: {id: task.user_id}})) as User
    }
    res.status(200).json(result)
    return
  }

  if (method === 'DELETE') {
    const task = await prisma.tasks.update({
      where: {id: +id},
      data: {status: 'deleted'}
    })
    res.status(200).json(task)
    return
  }

  res.end('Unknown route')
}
