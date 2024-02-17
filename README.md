React Book Writer Platform
This React-based platform allows users to create, edit, and collaborate on books. It includes user authentication, permissions, and roles features.
Getting Started
To use this application, follow these steps:
1.	Clone the repository from GitHub: https://github.com/maulsmeko/Book-Writer-Platform.git
2.	Install dependencies by running npm install in the project directory.
3.	Start the development server with npm start.
4.	Access the application in your web browser at http://localhost:3000.
5.	For access the json-server install the by running npm i -g json-server.
6.	Now for server access please run this command json-server-auth --watch db.json –9000

Components:
1-	Assets:
The Assets component serves as the images, CSS and fonts.
2-	Components:
The Components includes a reusable piece of code that encapsulates a part of the user interface and its behavior. Components are the building blocks of React applications, allowing developers to create complex UIs by composing smaller, self-contained pieces together. 
3-	Hooks:
The Hooks component consists of custom hooks that are used for achieving infinite nesting levels for sections and subsections.
4-	Layout:
The Layout component consists of protected and private routes.
5-	Pages: 
The "Pages" component encompasses the main screens of the application, including signup, login, homepage, add books, and edit books. 
6-	Router:
The Router component includes a routing of whole application through react router DOM library.
Interactions:
1.	User Authentication: Users can sign up for a new account or log in with their existing credentials using the pages SignUp and Login components (inside pages component) for that we used json-server-auth package (https://www.npmjs.com/package/json-server-auth).
2.	Homepage Navigation: After logging in, users are directed to their Homepage where they can manage their books.
3.	Add Book: when user click on add book button then we redirect to the add book route and from there user can add, edit, delete their sections and this section can go to infinite levels also on add book route we give the access to the collaborator so when that particular collaborator is logged in then that collaborator can see the edit icon if author give the access.
4.	Permissions and Roles: Authors have the ability to create and edit sections/subsections, while collaborators can only edit existing content. Authors can also manage permissions for collaborators.

Assumptions:
For simplicity, for user data we are using local Storage.
Additional Information:
For more information or assistance, you can contact mshah7329@gmail.com. 

