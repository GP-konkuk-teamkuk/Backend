import { Request, Response, NextFunction } from 'express';
import { findUserByEmail, createUser } from './userRepository';
import bcrypt from 'bcrypt';

interface SessionRequest extends Request {
  session: {
    user?: any;
    id?: string;
    save: (callback: () => void) => void;
    destroy: (callback: (err: any) => void) => void;
  };
}

export const loginUser = async (req: SessionRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      req.session.save(() => {
        res.cookie('session_id', req.session.id, { httpOnly: true });
        res.redirect('/');
      });
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
        res.clearCookie('session_id');
        res.status(200).send('Logged out');
      }
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(email, hashedPassword);
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const isAuthenticated = (req: SessionRequest, res: Response, next: NextFunction) => {
  const sessionId = req.cookies.session_id;
  if (sessionId && req.session.id === sessionId && req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};
