import * as Mongoose from "mongoose";

export interface IUser extends Mongoose.Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema: Mongoose.Schema = new Mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default Mongoose.model<IUser>("User", UserSchema);