import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../prisma";

export default async function taskHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  const {query: {id}, method, body} = req

  if (!id || isNaN(+id)) {
    res.end('id is invalid')
    return
  }

  if (method === 'PUT') {
    const task = await prisma.task.update({
      where: {id: +id},
      data: {
        user_id: body.userId,
        status: body.status,
        time: body.time,
        name: body.name,
        description: body.description,
      }
    })
    res.status(200).json(task)
    return
  }

  if (method === 'DELETE') {
    const task = await prisma.task.update({
      where: {id: +id},
      data: {status: 'deleted'}
    })
    res.status(200).json(task)
    return
  }

  res.end('Unknown route')
}
