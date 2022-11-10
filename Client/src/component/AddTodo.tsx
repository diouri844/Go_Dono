import { useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Group, Modal, Textarea, TextInput } from '@mantine/core'
import { baseUrl, Todo } from '../App';
function AddTodo(){
    //define the state manger of opening and closing the modal : 
    const [open, setOpen] = useState(false);
    //create a formular to add new todo :
    async function InsertTodo(values:{Title:string , Body:string}){
        // send the formdata to the api :
        const sended = await fetch(baseUrl+'/api/Todos', {
           method:"POST",
           headers:{
            "Content-Type":"application/json",
           },
           body: JSON.stringify(values)
        })
        .then( response => response.json())
        //mutate(sended);
        // reset to default :
        form.reset();
        //close modal :
        setOpen(false); 
    }
    const form = useForm({
        initialValues: {
            Title:'',
            Body:''
        }
    });
    return <>
    <Modal opened={open} 
    onClose={()=>{ setOpen(false)}}
    title="Create Todo "
    >
        <form onSubmit={form.onSubmit(InsertTodo)}>
            <TextInput  
            label="Todo" 
            required
            mb={12}  
            placeholder=' i want to ..... '
            {...form.getInputProps('Title')}
            />
            <Textarea  
            mb={12}
            label="Body"
            required
            placeholder='tell me more ..'
            {...form.getInputProps('Body')}/>
            <Button type="submit"> Add it </Button>
        </form>
    </Modal>
    <Group position='center' >
        <Button fullWidth mb={12} onClick={()=>{ setOpen(true) }}> New One </Button>
    </Group>
    </>
}


//export the function : 

export default AddTodo;