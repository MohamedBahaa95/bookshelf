
import { useState, useEffect } from "react";
import * as BooksApi from "./BooksAPI"
import SearchPage from "./SearchPage";
import MainPage from "./MainPage";
import "./App.css";
import { Routes, Route } from "react-router-dom";


const App = ()=> {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {  
    const getAllBooks = async() => {
      let res = await BooksApi.getAll()

      setAllBooks(res);
    };

    getAllBooks();    

  },[]);
  
  const bookUpdateHandle = (updatedBook)=> {
    console.log("before mod",allBooks)
    let updatedList = allBooks.filter( book=> book.id !== updatedBook.id );

    if(updatedBook.shelf !== undefined) { updatedList = [...updatedList, updatedBook] };
    console.log("mod",updatedList)
    setAllBooks(updatedList);
  };

  return (
    <Routes>
      <Route path="/SearchPage" element={ <SearchPage allBooks={allBooks} UpdateHandle={bookUpdateHandle} /> } />
      <Route path="/" element={ <MainPage allBooks={allBooks} UpdateHandle={bookUpdateHandle} /> } />
    </Routes>
  );
}

export default App;