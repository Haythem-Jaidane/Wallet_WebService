import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();

export function authenticateJWT (req, res, next){
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY, {
      expiresIn: '1h', // Set the maximum lifetime of the token to 1 hour
    });
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    }

    // Other errors
    res.status(403).json({ message: 'Invalid token.' });
  }
};