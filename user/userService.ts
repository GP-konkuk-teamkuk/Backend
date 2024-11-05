import { Request, Response } from 'express';
import { findUserByEmail, createUser } from './userRepository';

// Assuming session management middleware is used
interface SessionRequest extends Request {
  session: {
    user?: any;
    destroy: (callback: (err: any) => void) => void;
  };
}

export const loginUser = async (req: SessionRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (user && user.password === password) {
      req.session.user = user;
      res.status(200).send('Logged in');
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const logoutUser = async (req: SessionRequest, res: Response) => {
  try {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send('Logged out');
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    await createUser(name, email, password);
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
