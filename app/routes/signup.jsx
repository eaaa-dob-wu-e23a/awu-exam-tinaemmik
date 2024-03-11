import {
    Form, 
    Link,
    useFetcher} from "@remix-run/react";

//what is in meta data
export function meta() {    
    return [
        {
            title: "Create account",
            description: "Create an account",
        }
    ]
};

//LOADER

//ACTION
//export const action = ({request}) => {
        //let formData = await request.formData();

        //await new Promise((resolve) => setTimeout(resolve, 1000));

        //const {name, city, email, password} = Object.fromEntries(formData);
        //return await mongoose.models.User.create({name, city, email, password});
    //};



export default function SignUp() {
    const fetcher = useFetcher();

    return(
        <div className="min h-screen py-40 bg-gray-700">
            <div className="container mx-auto">
            <div className="flex w-8/12  bg-gray-200 rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-1/2 py-10 px-8 bg-[url('https://images.unsplash.com/photo-1621873493371-9aea49f66b9b?q=80&w=3065&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
                        <h1 className="text-3xl px-10 text-gray-200 font-bold mb-4 font-mono">Velkommen til Teater events</h1>
                        <p className="px-10 text-gray-200 mt-40 bg-gray-500 bg-opacity-80 p-5 rounded-xl">Her kan du finde og tilføje teater events i dit område. Der vil være forskellige events at vælge i mellem, som improv-gruppper, teater kurser, auditions på frivillige forstillinger m.m.</p>
                    </div>
                <div className="w-1/2 py-10 px-8">
                <h1 className="text-3xl text-gray-700 font-bold mb-4">Create account</h1>
                <fetcher.Form method="post" className="space-y-6">
                    <fieldset
                    className="disabled:opacity-70"
                    disabled={fetcher.state === "submitting"}
                    >
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
                    </fieldset>
                </fetcher.Form>
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