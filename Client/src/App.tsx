import './App.css';
import { useState, useEffect } from 'react';
// use the box component from maintain core :
import { Box, Title, List, ThemeIcon  } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';
// import add todo modal component :

import AddTodo from './component/AddTodo';
// import swr-data-fetcher :
import axios from "axios";
// define url base :
export const baseUrl = "http://localhost:3030";

// create an interface for an todo object :

export interface Todo{
  id:number,
  title: string,
  body:string,
  done:boolean
};

function App() {
  //declare my state :
  function OpenTodo(id:number){
    // send get request to the backend api : 
    const target:Todo = listtodo.filter( (item:Todo) => {return item.id === id})[0]; 
    console.log (target);
    //check if is done :
    if ( target.done ){
      console.log( " remove todo ");
      // delet the todo item from todo list :
      setlisttodo(listtodo.filter((item:Todo)=>{return item.id != id}))
      // send delet request to the backend api :
      axios({
        url: baseUrl+"/api/Todos/delete/"+id,
        method: "DELETE",
        headers: {
        'Content-Type' : 'application/json',
        },
      })
      .then( response => {
        setlisttodo(response.data);
        setnoData(response.data.length === 0);
      })
    }
    else{ 
      console.log(" update with patch ");
      // send patch request to the backend api :
      axios({
        url: baseUrl+"/api/Todos/"+target.id+"/Done",
        method: "PATCH",
        headers: {
        'Content-Type' : 'application/json',
        },
    })
    .then( (response) => { 
      console.log(response.data);
      setlisttodo(response.data);
      //update style : 
      document.getElementById('todo_item_'+id)?.classList.add('done');
    })  
    }
  }
  const [listtodo, setlisttodo] = useState([]);
  const [load , setload] = useState(true);
  const [noData, setnoData] = useState(true);
  // create an fetch function :
  const getData = (url:string)=>{
    axios({
      url: baseUrl+url,
        method: "GET",
        headers: {
        'Content-Type' : 'application/json',
        },
    })
    .then( (response) => { 
      if ( response.data.length === 0){
        setlisttodo([]);  
        setload(false);
        return;
      }
      setlisttodo(response.data);
      setload(false);
      setnoData(false);
    })
  }
  //const fetcher = (url: string)=>fetch(baseUrl+"/"+url).then(resp => { resp.json()});
  // fetch data from the end point : 
  //
  
  useEffect(() => {
    // Update the document title using the browser API
    getData("/api/Todos");
  },[load,listtodo,noData]);
  return (
    <Box>
        <Title order={1} mb={12} color="cyan"> Todo List  </Title>
      { noData &&
        <Title order={4} mb={12} color="white"> No todo yet ...  </Title>
      }
      { !noData && 
        <List 
        center
        mb={15} 
        size="sm"
        icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                <IconCircleDashed  size={16} />
                </ThemeIcon>
        }
        >
        {
          listtodo?.map( (current:Todo) => { 
            return <List.Item 
            className='todo_item'
            key={`todo_list_${current.id}`}
            mb={12}
            onClick={ () => OpenTodo(current.id )}
            > <div className="todo_display"> 
              <span className="todo_title">{ current.title }</span>
              <p 
              id={`todo_item_${current.id}`}
               className={ current.done ? 'done' : ''}
              > { current.body } </p>
              </div>
            </List.Item>
            })}
        </List>}
        <AddTodo />
      </Box>
  )}

export default App
