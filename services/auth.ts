import * as argon2 from "argon2";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import DemoModel from "../model/user";

export default class AuthService {
  constructor() {}

  public async Login(email: string, password: string): Promise<any> {
    const userRecord = await DemoModel.findOne({ email });

    if (!userRecord) {
      throw new Error("User not found");
    }

    if (userRecord.password) {
      const correctPassword = await argon2.verify(
        userRecord.password,
        password
      );

      if (!correctPassword) {
        throw new Error("Incorrect password");
      }

      return {
        user: {
          email: userRecord.email,
        },
        token: this.generateJWT(userRecord),
      };
    } else {
      throw new Error("Password not set for the user");
    }
  }

  public async LoginAs(email: string): Promise<any> {
    console.log("Finding user record...");
    const userRecord = await DemoModel.findOne({ email });
    if (!userRecord) {
      throw new Error("User not found");
    }
    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token: this.generateJWT(userRecord),
    };
  }

  public async SignUp(
    email: string,
    password: string,
    name: string
  ): Promise<any> {
    const salt = randomBytes(32);
    const passwordHashed = await argon2.hash(password, { salt });

    const userRecord = await DemoModel.create({
      password: passwordHashed,
      email,
      salt: salt.toString("hex"),
      name,
    });
    const token = this.generateJWT(userRecord);
    return {
      user: {
        email: userRecord.email,
        name: userRecord.name,
      },
      token,
    };
  }

  private generateJWT(user: {
    _id: string;
    name: string;
    email: string;
  }): string {
    return jwt.sign(
      {
        data: {
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      "MySuP3R_z3kr3t.",
      { expiresIn: "6h" }
    );
  }
}
