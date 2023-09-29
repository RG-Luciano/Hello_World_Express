import { Request, Response, NextFunction } from 'express'
import {verify} from 'jsonwebtoken'

const secretKey = 'SecretKey'

function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('x-auth-token')
  
  if (!token) {
    return res.status(401).json({ error: 'Missing authentication token. Access denied.' })
  }

  try {
    const decoded = verify(token, secretKey) 
    const {sub} = decoded
    res.locals.user = sub

    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid authentication token. Access denied.' });
  }
}

export default auth
