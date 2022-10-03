import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../prisma";
import {Task, User} from "../../models";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const {method, body} = req
  const {name, description, time, userId} = JSON.parse(body)

  if (method === 'POST') {
    const task = await prisma.task.create({
      data: {
        name,
        description,
        time,
        user_id: userId
      }
    })
    const result = {
      id: task.id,
      name: task.name,
      description: task.description,
      time: task.time,
      userId: task.user_id,
      status: task.status,
    } as Task
    if (task.user_id != null) {
      result.user = (await prisma.user.findFirst({where: {id: task.user_id}})) as User
    }
    res.status(200).json({task: result})
    return
  }

  res.end('Unknown route')
}
