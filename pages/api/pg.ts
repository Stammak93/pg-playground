import type { NextApiRequest, NextApiResponse } from 'next'
import { sequelize } from "../../pg-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const userQuery: string = req.body;
  
  try {
    
    const [result,metadata] = await sequelize.query(userQuery);

    res.status(200).json({ metadata });
  
  } catch (err: unknown) {

      let data = "";
      if(err instanceof Error) {
        data = err.message;
      
      } else {
          throw new Error("No property 'message' on Error object");
      }

      return res.status(400).json([data]);
  }
}
