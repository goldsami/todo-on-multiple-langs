import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const {method} = req

  if (method === 'GET') {
    const users = await prisma.users.findMany()
    res.status(200).json({users})
    return
  }

  res.end('Unknown route')
}
