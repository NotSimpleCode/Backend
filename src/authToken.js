import jwt from 'jsonwebtoken';
const secretKey = process.env.SECRET_KEY;

// Función para generar un token JWT
function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '48h' });
}

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  // Verifica si el token existe
  if (!token) {
    return res.status(401).json({ message: 'No está autorizado. Por favor, inicie sesión.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Agrega la información del usuario 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido - Sesion caducada' });
  }
}

export{authenticateToken, generateToken}
