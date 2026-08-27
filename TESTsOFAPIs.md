## Test Log
1. GET /tasks/getTasks --> 200 OK, tasks
2. POST /tasks/createTask --> 201 created, { message: "Task created successfully!", addedData: newTask }
3. PUT /tasks/updateTask/1 --> with valid id and title --> 200 OK, updatedTask
4. DELETE /tasks/deleteTask/1 --> with valid id --> 200 OK, { message: "Task deleted successfully!", data: tasks }
5. PATCH /taasks/toggleTask/70768 for check completed --> with valid id --> 200 OK, checkedTask
6. PATCH /taasks/toggleTask/70768 for uncheck completed --> with valid id --> 200 OK, checkedTask
7. GET /tasks/getTaskDetail/70768 --> with valid id --> 200 OK, selectedTask
8. POST /tasks/addAttachmentToTask/1

## Failing case (with purpose)
1. POST /tasks/createTask with no "title" field
--> Expected: 400 Bad Request, {meesage: "Please enter the title of task!"}
--> Got: 400 Bad Request, {meesage: "Please enter the title of task!"}

2. PUT /tasks/updateTask/2 with invalid id
--> Expected: 404 Not Found, { message: "There is no task with this id!" }
--> Got: 404 Not Found, { message: "There is no task with this id!" }