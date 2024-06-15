import './App.css'

import { 
  RouterProvider, 
  createBrowserRouter,
 } from 'react-router-dom'
import AllBooks from './components/AllBooks'
import CreateBook from './components/CreateBook'
import BookDetail from './components/BookDetail'
import UpdateBook from './components/UpdateBook'

 const router = createBrowserRouter([
  {
    "path":"/",
    "element": <AllBooks />
  },
  {
    "path":"/create",
    "element": <CreateBook />
  },
  {
    "path":"/detail/:bookId",
    "element": <BookDetail />
  },
  {
    "path":"/update/:bookId",
    "element": <UpdateBook />
  }
 ])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App