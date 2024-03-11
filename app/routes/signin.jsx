import {Form, Link, useLoaderData} from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";
import { sessionStorage } from "~/services/session.server";

export async function loader({request}){
    
    return await authenticator.isAuthenticated(request,{
        successRedirect: "/events",
    });
   
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    const error = session.get("sessionErrorKey");

    session.unset("sessionErrorKey");

    const headers = new Headers({ 
        "Set-Cookie": await sessionStorage.commitSession(session),
    });

    return json({error}, {headers});
};

export default function SignIn() {
    const loaderData = useLoaderData();

    return (
        <div className="min h-screen py-40 bg-gray-700">
            <div className="container mx-auto">
                <div className="flex w-8/12  bg-gray-200 rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div className="w-1/2 py-10 px-8 bg-[url('https://images.unsplash.com/photo-1583482183620-f692113aafc3?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
                        <h1 className="text-3xl px-10 text-gray-200 font-bold mb-4 font-mono">Teater events</h1>
                        <p className="px-10 text-gray-200 mt-40 bg-gray-500 bg-opacity-80 p-5 rounded-xl">Her kan du finde og tilføje teater events i dit område. Der vil være forskellige events at vælge i mellem, som improv-gruppper, teater kurser, auditions på frivillige forstillinger m.m.</p>

                    </div>
                    <div className="w-1/2 py-10 px-8">
                    <h2 className="text-3xl text-gray-700 font-bold mb-4 font-sans">Login</h2>
                    <Form method="post" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-md font-medium text-gray-600">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-2/3 h-8 rounded-sm border-gray-400 shadow-md"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-md font-medium text-gray-600">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-2/3 h-8 rounded-sm border-gray-400 shadow-md"
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-1/3 bg-blue-500 text-white py-2 rounded-md"
                            >
                                Login
                            </button>
                        </div>
                        {loaderData?.error ? (
                        <div className="error-message">
                        <p>{loaderData?.error?.message}</p>
                        </div>
                        ) : null}
                    </Form>
                    <div className="mt-4">
                        <p className="text-gray-500">Don't have an account?</p>
                        <Link to="/signup" className="text-blue-600">
                            <u>Create account</u>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
    };

export async function action({request}){

    return await authenticator.authenticate("user-pass", request, {
        successRedirect: "/events",
        failureRedirect: "/signin",
    });

};