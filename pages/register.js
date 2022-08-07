import axios from 'axios';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'



export default function Home() {
    const router = useRouter()


    return(
        <>
        <div class="bg-gray-100 dark:bg-gray-900 min-w-full min-h-full">
          
        <div class="w-full  mx-auto max-w-sm grid h-screen place-items-center overflow-hidden">

        <div class="px-6 py-8">
        <Link href="/">

        <p class="text-5xl text-center font-bold text-gray-900 hover:text-gray-700">Todoly</p>
        </Link>

            <p class="text-3xl mt-2 text-center font-bold text-gray-500 dark:text-gray-400">Register</p>

            <form>
                <div class="w-full mt-4">
                    <input class="block w-full px-8 py-4 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Username" aria-label="Username" />
                </div>

                <div class="w-full mt-4">
                    <input class="block w-full px-8 py-4 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                </div>

                
                <button class="mt-4 px-8 py-4 leading-5 text-white text-2xl transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="button">Sign up</button>
                <button onClick={() => router.back()} class="mt-4 ml-2 px-12 py-4 leading-5 text-white text-2xl transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="button">Back</button>

            </form>
        </div>

        
    </div>
    </div>
        </>
    )

}