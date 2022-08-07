import Head from 'next/head'
import Image from 'next/image'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todo, setTodo] = useState("");

  let addTodo = (event) => {
    setLoading(true);
    event.preventDefault();
    fetch("/api/add?todo=" + todo)
      .then((res) => res.json())
      .then((data) => {
        loadTodos();
      });
  };

  let removeTodo = (rtodo) => {
    setLoading(true);
    fetch("/api/remove?todo=" + rtodo)
      .then((res) => res.json())
      .then((data) => {
        loadTodos();
      });
  };


  useEffect(()=> {
    setLoading(true);
    loadTodos();
  }, [])

  return (
    <>
      <header class="bg-gray-100 dark:bg-gray-900 min-w-full min-h-full">
        <nav class="flex flex-col py-2 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <a href="#" class="text-3xl font-bold ml-16 text-gray-900 hover:text-gray-700">Todoly</a>
          </div>

          <div class="flex items-center mt-2 -mx-2 mr-16 sm:mt-0">
            <a href="#" class="px-3 py-1 text-xl font-semibold text-gray-900 transition-colors duration-200 transform border-2 rounded-md hover:bg-gray-300">Sign In</a>
            <a href="#" class="px-3 py-1 text-xl font-semibold text-gray-900 transition-colors duration-200 transform border-2 rounded-md hover:bg-gray-300 ml-2">Sign Up</a>
          </div>
        </nav>
        <section class="bg-gray-100 dark:bg-gray-900 lg:py-12 lg:flex lg:justify-center">
          <div class="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
            <div class="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">Build Your New <span class="text-blue-600 dark:text-blue-400">Idea</span></h2>
              <p class="mt-4 text-gray-600 dark:text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit vitae exercitationem aliquid dolores ullam temporibus enim expedita aperiam mollitia iure consectetur dicta tenetur, porro consequuntur saepe accusantium consequatur.</p>

              <div class="mt-8">
                <a href="#" class="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Start Now</a>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  )
}
