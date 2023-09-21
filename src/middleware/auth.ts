import { Request, Response, NextFunction } from 'express'
import {verify} from 'jsonwebtoken'

const secretKey = 'SecretKey'

type TokenPayload = {
  id: string  
  iat: number
  exp: number
}

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token')
  
  if (!token) {
    return res.status(401).json({ error: 'Missing authentication token. Access denied.' })
  }

  try {
    const decoded = verify(token, "secret ") 
    const {id} = decoded as TokenPayload

    req.user = id

    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid authentication token. Access denied.' });
  }
}

export default auth
