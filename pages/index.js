import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';




export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [alertFlag, setAlertFlag] = useState(false);




  let loadTodos = async () => {
    try{
    let response = await fetch('http://localhost:8000/todos', {
      credentials: 'include'
    });
    if (response.status == 401) {
      router.push('/login')
    } else {
      const json = await response.json();
      setTodos(json.todos);
    }
  }catch(err){
    console.log(err);
  }
  }

  let handleDescription = (event) => {
    event.preventDefault();
    setDescription({ todoText: event.target.value });
  }

  let handleTitle = (event) => {
    event.preventDefault();
    setTitle({ title: event.target.value });
  }

  let handleSetEditDescription = (event) => {
    event.preventDefault();
    setEditDescription({ todoText: event.target.value });
  }

  let handleSetEditTitle = (event) => {
    event.preventDefault();
    setEditTitle({ title: event.target.value });
  }

  

  let createTodos = async () => {
    try{
    if (title.title  == '' || description.todoText == '') {
      setAlertFlag(true);
    } else {
      let response = await fetch('http://localhost:8000/createtodos', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.title, todoText: description.todoText })
      });
      router.reload();
    }
  }catch(err){
    console.log(err)
  }
  }

  let deleteTodo = async (id) =>{
    try{

      let response = await fetch('http://localhost:8000/deletetodos', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo_id: id})
    });
      router.reload();
  }catch(err){
    console.log(err);
  }
  }

  let openModal = (title, description) =>{
    setEditTitle({title: title});
    setEditDescription({todoText: description});
  }

  let editTodo = async (id) => {
  try{
      let response = await fetch('http://localhost:8000/updatetodos', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, title: editTitle.title, todoText: editDescription.todoText })
    });
      router.reload();
  }catch(err){
    console.log(err);
  }
}


  useEffect(() => {
    setLoading(true);
    loadTodos();
  }, [])

  useEffect(() => {
    if (todos) {
      setLoading(false);
      console.log(todos);
    }
  }, [todos])

  if (loading) {
    return (
      <>
        <div>Loading....</div>
      </>

    )
  } else {
    return (
      <>


        <header className="bg-gray-100 dark:bg-gray-900 min-w-full min-h-full">
          <nav className="flex flex-col py-2 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <a href="#" className="text-3xl font-bold ml-16 text-gray-900 hover:text-gray-700">Todoly</a>
            </div>

            <div className="flex items-center mt-2 -mx-2 mr-16 sm:mt-0">
              <label for="my-modal-6" class="px-3 py-1 text-xl font-semibold text-gray-900 transition-colors duration-200 transform border-2 rounded-md hover:bg-gray-300">Create Todos</label>
              <a href="/login" className="px-3 py-1 text-xl font-semibold text-gray-900 transition-colors duration-200 transform border-2 rounded-md hover:bg-gray-300">Logout</a>
            </div>
          </nav>
          <section className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {todos.map((todo, i) => {
              return (
                <>
                <div key={i} className="bg-white dark:bg-gray-800 lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
                  <div className="max-w-xl px-6 py-12 lg:max-w-5xl lg:w-1/2">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white md:text-3xl">{todo.title}</h2>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">{todo.todoText}</p>
                    <p className='mt-4'>{new Date(todo.dt).toDateString()}</p>


                    <div className="mt-8">
                      <label onClick={() => (openModal(todo.title, todo.todoText))} for="my-modal-3" className="px-5 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-gray-700">Edit</label>
                      <a onClick={() => deleteTodo(todo.id)} className="px-5 py-2 ml-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500">Delete</a>
                    </div>
                  </div>
                </div>

                
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />

        <div class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <div class="mt-6 ">
              <div class="items-center -mx-2 md:flex">
                <div class="w-full mx-2">
                  <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Title</label>
                  <p className='mb-2'>{todo.title}</p>
                  <input onChange={handleSetEditTitle} class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text" />
                </div>
              </div>

              <div class="w-full mt-4">
                <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Description</label>
                <p className='mb-2'>{todo.todoText}</p>
                <textarea onChange={handleSetEditDescription} class="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
              </div>

              <div class="flex justify-center mt-6">
                <button onClick={() => editTodo(todo.id)}  class="btn px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Edit todo</button>
              </div>
            </div>


            {alertFlag &&
              <div className="flex mt-12 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-center w-12 bg-red-500">
                  <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                  </svg>
                </div>

                <div className="px-4 py-2 -mx-3">
                  <div className="mx-3">
                    <span className="font-semibold text-red-500 dark:text-red-400">Error</span>
                    <p className="text-sm text-gray-600 dark:text-gray-200">Please fill in the required fields </p>
                  </div>
                </div>
              </div>

            }

          </div>
        </div>
        </>)
            })}

          </section>
        </header>


        <input type="checkbox" id="my-modal-6" class="modal-toggle" />

        <div class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <label for="my-modal-6" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <div class="mt-6 ">
              <div class="items-center -mx-2 md:flex">
                <div class="w-full mx-2">
                  <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Title</label>

                  <input onChange={handleTitle} class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" type="text" />
                </div>
              </div>

              <div class="w-full mt-4">
                <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Description</label>

                <textarea onChange={handleDescription} class="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
              </div>

              <div class="flex justify-center mt-6">
                <button onClick={createTodos} class="btn px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Create todo</button>
              </div>
            </div>


            {alertFlag &&
              <div className="flex mt-12 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-center w-12 bg-red-500">
                  <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
                  </svg>
                </div>

                <div className="px-4 py-2 -mx-3">
                  <div className="mx-3">
                    <span className="font-semibold text-red-500 dark:text-red-400">Error</span>
                    <p className="text-sm text-gray-600 dark:text-gray-200">Please fill in the required fields </p>
                  </div>
                </div>
              </div>

            }

          </div>
        </div>


      </>
    )
  }
}
