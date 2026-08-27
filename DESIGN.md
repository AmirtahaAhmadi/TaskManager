## Task Manager

# Tasks Properties
Each task has : id, title, completed, createdAt, attachmentsPath

# APIs
- GET /tasks/getTasks --> for get all tasks
this endpoint on success returns status 200 and on failure returns

- POST /tasks/createTask --> for create a task
this endpoint on success returns status 201 and on failure returns status 400 for bad request

- PUT /tasks/updateTask/:id --> for update the title of task that selected with id with params
this endpoint on success returns status 200 and on failure returns status 400 for bad request and status 404 for invalid id

- DELETE /tasks/deleteTask/:id --> for delete a task with id
this endpoint on success returns status 200 and on failure returns status 404 for invalid id

- PATCH /tasks/toggleTask/:id --> for check or uncheck the completed property of task with id
this endpoint on success returns status 200 and on failure returns status 404 for invalid id

- GET /tasks/getTaskDetail/:id --> for get detail of a task with id
this endpoint on success returns status 200 and on failure returns status 404 for invalid id

- POST /tasks/addAttachmentToTask/:id --> for add an attachment to a task
this endpoint on success returns status 201 and on failure returns status 404 for invalid id

# Folders Plan
- main.js --> this is the main file of project
- routs/tasks --> index.js --> this file is for endpoints using express.Router()
- package.json --> I installed express, nodemon, multer packages and "dev" can run the app with nodemon and start can run the app with node
- utils --> attachment.util.js --> multer settings
- uploads --> uploaded files 