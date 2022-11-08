import './App.css';
import { useState, useEffect } from 'react';
// use the box component from maintain core :
import { Box, Title, List, ThemeIcon  } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons';
// import add todo modal component :

import AddTodo from './component/AddTodo';
// import swr-data-fetcher :
import useSWR from 'swr';
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
  // create an fetch function :
  const fetcher = (url: string)=>fetch(baseUrl+"/"+url).then(resp => { resp.json()});
  // step 2: fetch data from the get go-endpoint :
  const [listtodo, setlisttodo] = useState([]);
  const { data, mutate } = useSWR<Todo[]>('api/Todos', fetcher);
  useEffect(() => {
    // Update the document title using the browser API
    console.log (" data loaded ");
    setlisttodo(data);
    console.log(listtodo);
  },[mutate,data]);
  return (
    <Box>
        <Title order={2} mb={12} color="cyan"> Todo List  </Title>
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
          listtodo?.map( (current) => { 
            console.log(current)
            return <List.Item 
            className='todo_item'
            key={`todo_list_${current.id}`}
            mb={12}
            > { current.body }</List.Item>
            })}
        </List>
        <AddTodo mutate={ mutate }/>
      </Box>
  )}

export default App
