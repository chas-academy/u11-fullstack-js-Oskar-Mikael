[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]

# **Bo**Forums

*A community to share your thoughts on several topics.*
 
<details><summary>TABLE OF CONTENTS</summary>

---

</details>

---

## About the Project

### Built with

* [MongoDB](https://www.mongodb.com)
* [Express JS](https://expressjs.com/)
* [Vue JS](https://vuejs.org/)
* [Node JS](https://nodejs.org/en/)

## Standards and Structure

Javascript and CSS follows the Airbnb code standards

#### PSR-2 coding style guide

* White space on new line between functions/methods
* Classes should be declared in PascalCase
* Variables, methods/functions should be declared in camelCase
* Keep it DRY
* If a function/method can do a lot of things, try to separate the functionality into two or more functions/methods
* Try not to overwrite controllers-method names, if you  must, make a new controller method

## Goals and Context

### Project Solves

<!-- GETTING STARTED -->
## Getting Started

### Create a MongoDB cluster
1. Visit https://mongodb.com and register an account

2. Create a project and a free shared database

3. After creation, click on **Connect** and choose **Connect your application**

4. Make sure **Driver** is set to Node.js

5. Save the URI string, and replace the password with a password of your choice, and replace **myFirstDatabase** with the name you want your database to have

### Installation

1. Clone the repository to your local files

2. Install npm packages for both the front- and backend. Frontend files are located in the /frontend folder. Backend files are located in the root folder.
```
npm install
```
3. To start the Node server, in the root folder, run:
```
npm run dev
```
4. To start the Vue server, in the frontend folder, run:
```
npm run serve
```
5. In the root folder, if not already created, create a .env file

6. In the .env file, add 3 environment variables:
```
MONGO_URI
JWT_SECRET
PORT
```
7. Set the **MONGO_URI** to the URI string you recievied from your MongoDB cluster

8. Set **JWT_SECRET** to any string you want, but recommended that it is a longer string, that includes lowercase, uppercase, numbers, and special characters.

9. Set the **PORT** to a port of your choice. By standard it will be set to 5000


## Page and Route Descriptions

| Page | Description |
| -----| ----------- |
| **Homepage** <br> <br> / | The page the when first entering the application |
| **Authentication Pages** <br> <br> /login <br> /register | Pages for authenticating users |
| **Post Pages** <br> <br> /categories <br> /posts <br> /post/:id <br> /create-post <br> /edit-post | Pages related to finding, viewing posts and managing posts |
| **User Pages** <br> <br> /profile <br> /my-profile | Pages for viewing the authenticated user's profile, aswell as other user's profiles |
| **Admin Pages** <br> <br> /admin | Pages for the administrators |

## Database-structure

## Contributors
- *Oskar Boström* [Github](https://github.com/Oskar-Mikael)

## License

Distributed under the GNU General Public License v3.0. 

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/chas-academy/u11-fullstack-js-Oskar-Mikael.svg?style=for-the-badge
[contributors-url]: https://github.com/chas-academy/u11-fullstack-js-Oskar-Mikael/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chas-academy/u11-fullstack-js-Oskar-Mikael.svg?style=for-the-badge
[forks-url]: https://github.com/chas-academy/u11-fullstack-js-Oskar-Mikael/network/members
[issues-shield]: https://img.shields.io/github/issues/chas-academy/u11-fullstack-js-Oskar-Mikael.svg?style=for-the-badge
[issues-url]: https://github.com/chas-academy/u11-fullstack-js-Oskar-Mikael/issues
