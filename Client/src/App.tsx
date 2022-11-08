import './App.css';
// use the box component from maintain core :
import { Box, List } from '@mantine/core';
// import add todo modal component :

import AddTodo from './component/AddTodo';
// import swr-data-fetcher :
import useSWR from 'swr';
// define url base :
export const baseUrl = "http://localhost:3030";

// create an interface for an todo object :

export interface Todo{
  id:number,
  Title: string,
  Body:string,
  Done:boolean
};

function App() {
  //declare my state :
  // create an fetch function :
  const fetcher = (url: string)=>fetch(baseUrl+"/"+url).then(resp => { resp.json()});
  // step 2: fetch data from the get go-endpoint :
  const { data, mutate } = useSWR<Todo[]>('api/Todos', fetcher);
  // check if error not null :

  return (
    <Box>
      <List spacing="xs" size="sm" mb={12} center listStyleType="disc">
      { data?.map( (todo) => {
        console.log( todo);
        return( 
        <List.Item key={`todo__${todo.id}`}  color="blue"> { todo.Title }</List.Item>
        );
      })} 
      </List>
    <AddTodo mutate={ mutate }/>
    </Box>
  )
}

export default App
