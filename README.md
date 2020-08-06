# Summary
##The following is completed. Everything marked with [x]

Test Coverage is: 55%
#
The exam started without a candidate number given so the project is given the student id.
the zip file is corrected and uses candidate number.
#
How to run the program:
#
Yarn have been used.

"scripts": {

 "test": "jest --coverage",
 "dev": "concurrently \"yarn watch:client\" \"yarn watch:server\"",
 "watch:client": "webpack --watch --mode development",
 "watch:server": "nodemon src/server/server.js --watch src/server --watch public/bundle.js",
 "build": "webpack --mode production",
 "start": "node src/server/server.js"
 }
 #

What is achieved:

R1: is completed.

R2: is completed. Note! the delete method is not in use in the front end.

R3: is completed.

R4: and R5 is NOT attempted.

T1: is completed. Note! the visitor is only able to se the items on sale once he/she is logged in.

T2: is completed.

T3: is completed.

T4: is completed.

T5 is NOT attempted.
#
