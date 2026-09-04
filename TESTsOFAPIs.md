## Test Log
1. GET /tasks --> 200 OK, tasks
2. POST /tasks --> 201 created, { message: "Task created successfully!", addedData: newTask }
3. PUT /tasks/1 --> with valid id and title --> 200 OK, updatedTask
4. DELETE /tasks/1 --> with valid id --> 200 OK, { message: "Task deleted successfully!", data: tasks }
5. PATCH /taasks/70768 for check completed --> with valid id --> 200 OK, checkedTask
6. PATCH /taasks/70768 for uncheck completed --> with valid id --> 200 OK, checkedTask
7. GET /tasks/70768 --> with valid id --> 200 OK, selectedTask
8. POST /tasks/1/attachments

## Failing case (with purpose)
1. POST /tasks with no "title" field
--> Expected: 400 Bad Request, {meesage: "Please enter the title of task!"}
--> Got: 400 Bad Request, {meesage: "Please enter the title of task!"}

2. PUT /tasks/2 with invalid id
--> Expected: 404 Not Found, { message: "There is no task with this id!" }
--> Got: 404 Not Found, { message: "There is no task with this id!" }