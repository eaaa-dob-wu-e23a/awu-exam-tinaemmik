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
        <div className="min h-screen py-40 bg-gray-700">
            <div className="container mx-auto">
            <div className="flex w-8/12  bg-gray-200 rounded-xl mx-auto shadow-lg overflow-hidden">
                <div className="w-1/2 py-10 px-8">
                    <h1 className="text-3xl px-10 text-gray-700 font-bold mb-4">Welcome to Teater events!</h1>
                    <p className="px-10 text-gray-600">Here you can find and add events</p>
                </div>
                <div className="w-1/2 py-10 px-8">
                <h1 className="text-3xl text-gray-700 font-bold mb-4">Create  account</h1>
                <Form method="post" className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-md font-medium text-gray-600">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="mt-1 block w-2/3 h-8 rounded-sm border-gray-400 shadow-md"
                        />
                    </div>
                    <div>
                    <label htmlFor="city" className="block text-md font-medium text-gray-600">
                            City
                        </label>
                        <input
                            id="city"
                            name="city"
                            type="text"
                            required
                            className="mt-1 block w-2/3 h-8 rounded-sm border-gray-400 shadow-md"
                        />
                    </div>
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
                            className="w-2/3 bg-blue-500 text-white py-2 rounded-md"
                        >
                            Create account
                        </button>
                    </div>
                </Form>
                <div className="mt-4">
                    <p className="text-gray-500">Already have an account?</p>
                    <Link to="/signin" className="text-blue-600">
                        <u>Sign in</u>
                    </Link>
                </div>
                </div>
                </div>
            </div>
        </div>
    );
};