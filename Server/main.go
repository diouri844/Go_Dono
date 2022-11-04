package main
 import (
   "github.com/gofiber/fiber/v2"
  )

// create an todo struct :


type Todo struct{
  Id int `json:"id"`
  Title string `json:"title"`
  Done bool `json:"done"`
  Body string `json:"body"`
}

// for now we don't use a database :

func main(){
  // create new fiber instace :
  my_app := fiber.New()
  // create an todo slice :
  todo_list := []Todo{}
  // create the ferst test router :
  my_app.Get("/Check",func(c *fiber.Ctx) error {
     return c.SendString("Hello, World 👋!")
  })
  // generate a post request handler :
  my_app.Post("/api/Todos",func(c *fiber.Ctx) error{
    current_todo := &Todo{}
    // get the body from the request :

    // check if there is an error :
    if err := c.BodyParser(current_todo) ; err!= nil {
      return err
    }
    // add generique id :
    current_todo.Id = len(todo_list)+1
    // add current todo to todo list :
    todo_list = append(todo_list,*current_todo)
    return c.JSON(todo_list)
  })
  // generate listen port :
  my_app.Listen(":3030")
}
