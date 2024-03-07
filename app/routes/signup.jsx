import {Form, Link} from "@remix-run/react";

//what is in meta data
export function meta() {    
    return [
        {
            title: "Sign Up",
            description: "Sign up for an account",
        }
    ]
};

// LOADER FUNCTION


//ACTION FUNCTION


export default function SignUp() {
    return(
        <div className="flex min-h-full flex-1 flex-col mt-20 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">Sign Up</h1>
                <Form method="post" className="space-y-6 ">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                    <label htmlFor="city" className="block text-sm font-medium">
                            City
                        </label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-md"
                        >
                            Sign Up
                        </button>
                    </div>
                </Form>
                <div className="mt-4">
                    <Link to="/signin" className="text-indigo-600">
                        Already have an account? Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};