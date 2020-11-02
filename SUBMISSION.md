## Name

Yinhao He

## Date

11/02/2020 - 03:09 A.M.

## Explanation

The app is built with ES6/JS, React and React hooks. 

- Backend: Node.js Express Morgan, Config
  - Search function can be cound in 'routes' folder.
- Frontend: React, React hooks(seEffect, useMemo, useState), Axios
  - Search bar component can be found in 'components' folder

## Any steps to run your application in addition to the scripts provided

```bash
cd backend
npm install
export NODE_ENV=development
npm run dev


cd frontend
npm install
npm run start
```

Go to localhost:8080 to check the frontend page

The backend server listens on localhost port 9090

## If you had a full day to work on this, what would you change/add to your solution?

- I would refactor the search bar component and extract the sort hooks to improve the reusablity of my code
- I would add a more advanced input validation using Joi which is more standard in modern web applications
- Currently, the search result will be automatically generated when the use enters. The result will show when there is a match. I would change the search algorithm to if the user enter somthing included in the result, it will immediately start to generate the result. It could work as a search hint, that may give the users some recommendation about what to search.
- Also, I could add an inteceptor to do authentication

## List bonus feature implemented (if applicable)

I am sorry I finish this task at midnight. I have contacted the HR Julia Arthur and let her know that I would finish the takehome by this week. I can't find a contineous three-hour at weekdays. So I build the solution at midnight on Sunday. Sorry about submitting the code at 3 AM. Thank you so much for giving me any feedback!

- I build the search to be automatically generated with any changes.
