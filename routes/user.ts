import AuthService from "../services/auth";
import { Application, Request, Response } from "express";
export default (app: Application) => {
  app.post("/user/login", async (req: Request, res: Response) => {
    const email = req.body.user.email;
    const password = req.body.user.password;

    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.Login(email, password);
      return res.status(200).json({ user, token }).end();
    } catch (e) {
      return res.json(e).status(500).end();
    }
  });

  app.post("/user/signup", async (req:Request,res:Response) => {
      const { name, email, password } = req.body.user;
      
    try {
      const authServiceInstance = new AuthService();
      const { user, token } = await authServiceInstance.SignUp(
        email,
        password,
        name
      );
      return res.json({ user, token }).status(200).end();
    } catch (e) {
      return res.json(e).status(500).end();
    }
  });
};
