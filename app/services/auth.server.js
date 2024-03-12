import { Authenticator, AuthorizationError } from "remix-auth";
import { sessionStorage} from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";


export let authenticator = new Authenticator (sessionStorage, {
    sessionErrorKey: "sessionErrorKey"
});

authenticator.use(
    new FormStrategy(async ({ form }) => {
        let email = form.get("email");
        let password = form.get("password");

        if (!email || email?.length === 0){
            throw new AuthorizationError("Email is required"); 
        }
        if (typeof email !== "string"){
            throw new AuthorizationError("Email must be a string");
        }
        if (!password || password?.length === 0){
            throw new AuthorizationError("Password is required");
        }
        if (typeof password !== "string"){
            throw new AuthorizationError("Password must be a string");
        }

        //verify user credentials

        const User = await verifyUser({ email, password });
        if(!User){
            throw new AuthorizationError("User not found");
        }
        console.log(User);
        return User;
    }),

    "user-pass"
);

async function verifyUser({ email, password }) {
    const User = await mongoose.models.User.findOne({ email }).select("+password").exec();
    if(!User){
        throw new AuthorizationError("No user found");
    }
    const passwordMatch = await bcrypt.compare(password, User.password);
    if(!passwordMatch){
        throw new AuthorizationError("Password does not match");
    }

    User.password = undefined;
    return User;
};