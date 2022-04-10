import { Arg, FieldResolver,Query,Resolver, Mutation, Ctx, Root } from "type-graphql";
import { IUser, IUserResponse } from "./UserModel";
import * as bcrypt from "bcryptjs";
import UserSchema from "./UserSchema";


@Resolver((of) => UserSchema)
export class UserResolver {

    // @Query(() => String)
    // sample(): string {
    //     return "Hello World";
    // }

   @Query((returns) => UserResponse)
  async loginUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: any
  ): Promise<UserResponse> {
    const user = await ctx.userModel.findOne({
      email: email,
    });

    if (user) {
      const { err } = await bcrypt.compare(password, user.password);

      if (!!err) {
        return {
          success: false,
          error: "Invalid Credetials",
          data: null,
        };
      } else {
        return {
          success: true,
          error: null,
          data: user,
        };
      }
    } else {
      return {
        success: false,
        error: "User Not Found",
        data: null,
      };
    }
  }
}

