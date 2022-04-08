import { Arg, FieldResolver, Query, Mutation, Resolver, Ctx, Root} from "type-graphql";
import UserSchema from "./UserSchema";

@Resolver((of) => UserSchema)
export class UserResolver {
    @Query(() => String)
    sample(): string {
        return "Hello World";
    }
}

