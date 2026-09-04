## TEST Log
POST /tasks/1/attachments with "attachment" name --> 201 created, updatedTask
- also we can see the file with /files/1787831478724.png

## Failing case (with purpose)
1. POST /tasks/2/attachments with invalid id
--> Expected: 404 Not Found, { message: "There is no task with this id!" }
--> Got: 404 Not Found, { message: "There is no task with this id!" }