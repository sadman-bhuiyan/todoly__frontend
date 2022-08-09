import axios from 'axios';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react';


export default function Home() {
    const router = useRouter();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [alertFlag, setAlertFlag] = useState(false);
    const [alertType, setAlertType] = useState(false);

    let handleUsernameInput = (event) => {
        event.preventDefault();
        setUsername({ username: event.target.value });
    }

    let handlePasswordInput = (event) => {
        event.preventDefault();
        setPassword({ password: event.target.value });
    }

    let handleLogin = (event) => {
        event.preventDefault();



        axios.post('http://localhost:8000/login', {
            username: username.username,
            password: password.password
        })
            .then(res => {
                setAlertFlag(true);
                setAlertType(true);
                window.sessionStorage.setItem("username", res.data.user.username);
                window.sessionStorage.setItem('id', res.data.user.id);

            }).catch(err => {
                setAlertFlag(true);
                setAlertType(false);
                console.log(err)
            }).then(() => {
                router.push('/')
            })
    }

    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-900 min-w-full min-h-full">

                <div className="w-full  mx-auto max-w-sm grid h-screen place-items-center overflow-hidden">

                    <div className="px-6 py-8">
                        <p className="text-5xl text-center font-bold text-gray-900 hover:text-gray-700">Todoly</p>

                        <p className="text-3xl mt-2 text-center font-bold text-gray-500 dark:text-gray-400">Login or create account</p>

                        <form onSubmit={handleLogin}>
                            <div className="w-full mt-4">
                                <input onChange={handleUsernameInput} className="block w-full px-4 py-4 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Username" aria-label="Username" />
                            </div>

                            <div className="w-full mt-4">
                                <input onChange={handlePasswordInput} className="block w-full px-4 py-4 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center justify-center py-4 text-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>
                                    <a href="#" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</a>
                                </div>
                            </div>
                            <button className="px-12 py-4 leading-5 text-white text-2xl transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="submit">Login</button>
                            <button onClick={() => router.back()} className="mt-4 ml-2 px-12 py-4 leading-5 text-white text-2xl transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="button">Back</button>

                        </form>

                        {alertFlag && alertType && 
                        
                        <div className="flex w-full mt-12 bg-white max-w-sm mx-auto overflow-hidden rounded-lg shadow-md dark:bg-gray-800">
                        <div className="flex items-center justify-center w-12 bg-emerald-500">
                            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                            </svg>
                        </div>

                        <div className="px-4 py-2 -mx-3">
                            <div className="mx-3">
                                <span className="font-semibold text-emerald-500 dark:text-emerald-400">Success</span>
                                <p className="text-sm text-gray-600 dark:text-gray-200">Your account was registered!</p>
                            </div>
                        </div>
                    </div>}
                        {alertFlag && !alertType && <div className="flex mt-12 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <div className="flex items-center justify-center w-12 bg-red-500">
                            <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"/>
                            </svg>
                        </div>
                        
                        <div className="px-4 py-2 -mx-3">
                            <div className="mx-3">
                                <span className="font-semibold text-red-500 dark:text-red-400">Error</span>
                                <p className="text-sm text-gray-600 dark:text-gray-200">Incorrect username or password!</p>
                            </div>
                        </div>
                    </div>}
                    </div>


                </div>
            </div>
        </>
    )

}