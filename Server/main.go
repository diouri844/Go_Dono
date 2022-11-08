package main
 import (
   "github.com/gofiber/fiber/v2"
   "github.com/gofiber/fiber/v2/middleware/cors"
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
  // add cors to owr application :
  my_app.Use(cors.New(
    cors.Config{
      AllowOrigins:"http://127.0.0.1:5173",
      AllowHeaders:"Origin, Content-Type, Accept",
    }))
  // create an todo slice :
  todo_list := []Todo{}
  // create the ferst test router :
  my_app.Get("/api/Todos",func(c *fiber.Ctx) error {
     return c.JSON(todo_list)
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
  // add an update request handler to manage updating state of todo :
  my_app.Patch("/api/Todos/:id/Done", func(c *fiber.Ctx) error{
    // get the id url-argument :
    id, err := c.ParamsInt("id")
    // check if there is an error :
    if err != nil{
      return c.Status(401).SendString("Invalid id")
    }
    // get the todo target from todo_list :
    for index,t_current := range(todo_list){
      if t_current.Id == id{
        todo_list[index].Done = true
        break
      }
    }
    return c.JSON(todo_list)
  })
  // generate listen port :
  my_app.Listen(":3030")
}
