import {Form, Link} from "@remix-run/react";

export default function SignUp() {
    return(
        <div className="flex h-screen justify-center items-center">
            <div className="w-96">
                <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
                <Form method="post" className="space-y-4">
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