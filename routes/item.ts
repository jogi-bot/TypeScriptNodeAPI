import ItemsService from "../services/item";
import { Application, Request, Response } from "express";

export default (app: Application) => {
  app.post("/item", async (req: Request, res: Response) => {
    try {
      const user = req.body.user;

      const itemServiceInstance = new ItemsService();
      const items = await itemServiceInstance.GetMyItems(user);
      return res.json(items).status(200);
    } catch (e) {
      return res.json(e).status(500);
    }
  });

  app.post("/item/:id", async (req: Request, res: Response) => {
    try {
      const user = req.body.currentUser;

      const itemServiceInstance = new ItemsService();

      const items = await itemServiceInstance.GetItem(user);

      return res.status(200).json(items);
    } catch (e) {
      return res.json(e).status(500);
    }
  });
};
