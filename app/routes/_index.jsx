import { authenticator } from "~/services/auth.server";


export async function loader({request}){
  
  return await authenticator.isAuthenticated(request,{
    successRedirect: "/events",
    failureRedirect: "/signin",
  });
};