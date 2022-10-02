import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../prisma";

export default async function taskHandler(req: NextApiRequest, res: NextApiResponse<any>) {
  const {query: {id}, method, body} = req

  if (!id || isNaN(+id)) {
    res.end('id is invalid')
    return
  }

  if (method === 'POST') {
    console.log('status::', {body})
    const task = await prisma.task.update({
      where: {id: +id},
      data: {status: body.status}
    })
    res.status(200).json(task)
    return
  }

  res.end('Unknown route')
}