import jwt from 'jsonwebtoken';

const generateToken = (id, role = 'patient') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
