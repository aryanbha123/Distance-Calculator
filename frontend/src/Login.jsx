import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    return (
        <div>
            {/* Background overlay with blur effect */}
            <div
                id="login-popup"
                tabIndex="-1"
                style={{
                    backgroundImage: `url(https://singularityhub.com/uploads/2020/07/NASA-drones-future-city.jpg)`,
                }}
                className="bg-black/50 fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center overflow-y-auto backdrop-blur-lg"
            >
                {/* Modal content */}
                <div className="relative p-4 w-full max-w-md h-auto md:h-auto bg-white rounded-lg shadow-lg">
                    <div className="p-5">
                        <div className="text-center">
                            <p className="text-2xl font-semibold text-slate-900 mb-4">Login to your account</p>
                            <p className="text-sm text-slate-600">You must be logged in to perform this action.</p>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="mt-7 flex flex-col gap-2">
                            <button
                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1"
                            >
                                <img
                                    src="https://www.svgrepo.com/show/512317/github-142.svg"
                                    alt="GitHub"
                                    className="h-[18px] w-[18px]"
                                />
                                Continue with GitHub
                            </button>

                            <button
                                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1"
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                    className="h-[18px] w-[18px]"
                                />
                                Continue with Google
                            </button>

                        
                        </div>

                        {/* OR Divider */}
                        <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                            <div className="h-px w-full bg-slate-200"></div>
                            OR
                            <div className="h-px w-full bg-slate-200"></div>
                        </div>

                        {/* Login Form */}
                        <form className="w-full">
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                name="email"
                                type="email"
                                required=""
                                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                placeholder="Email Address"
                            />

                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                required=""
                                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                                placeholder="Password"
                            />
                            <p className="mb-3 mt-2 text-sm text-gray-500">
                                <a href="/forgot-password" className="text-blue-800 hover:text-blue-600">
                                    Reset your password?
                                </a>
                            </p>
                            <Link to={"/home"}
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                            >
                                Continue
                            </Link>
                        </form>

                        {/* Sign-up Link */}
                        <div className="mt-6 text-center text-sm text-slate-600">
                            Don't have an account?
                            <a href="/signup" className="font-medium text-[#4285f4]">
                                Sign up
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
