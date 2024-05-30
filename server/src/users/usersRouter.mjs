import express from "express";
import { usersController } from "./UsersController.mjs";
import { RegisterValidation, LoginValidation, getByIdValidation } from "./usersValidator.mjs";
import { validationMiddleware } from "../shared/middleware/validationMiddleware.mjs";
import { authMiddleware } from "../shared/middleware/authMiddleware.mjs";
import { USER } from "../shared/config/UserRoles.mjs";

const usersRouter = express.Router();

/**
 *  @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - id
 *                  - email
 *                  - role
 *              properties:
 *                  _id:
 *                      type: string
 *                  email:
 *                      type: string
 *                  role:
 *                      type: string
 *              example:
 *                  _id: 1afs641f6a
 *                  email: mail@mail.com
 *                  role: USER
 *          UserRegister:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *                  - repeatPassword
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  repeatPassword:
 *                      type: string
 *              example:
 *                  email: mail@mail.com
 *                  password: Abcdef12!
 *                  repeatPassword: Abcdef12!
 *          UserLogin:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *              example:
 *                  email: mail@mail.com
 *                  password: Abcdef12!
 *          Token:
 *              type: object
 *              properties:
 *                  token:
 *                      type: string
 *              example:
 *                  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *              
 */


/**
*   @swagger
*       /api/users/register:
*           post:
*               tags:
*                 - Users
*               summary: User registration
*               requestBody:
*                 required: true
*                 content:
*                   application/json:
*                     schema:
*                         $ref: '#/components/schemas/UserRegister'
*               responses:
*                   201:
*                       description: Registration Successful. User object is created in the database
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/User'
*                   400:
*                       description: Validation errors
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Validation'
*                   409:
*                       description: User already exists
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Error'
*                   500:
*                       description: Unknown error
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Error'
*/
usersRouter.post("/register", [RegisterValidation, validationMiddleware], usersController.createUser);

/**
*   @swagger
*       /api/users/login:
*           post:
*               tags:
*                 - Users
*               summary: User login
*               requestBody:
*                 required: true
*                 content:
*                   application/json:
*                     schema:
*                         $ref: '#/components/schemas/UserLogin'
*               responses:
*                   200:
*                       description: Login Successful. token is returned
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Token'
*                   400:
*                       description: Validation errors
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Validation'
*                   401:
*                       description: Invalid email or password
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Error'
*                   500:
*                       description: Unknown error
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Error'
*/
usersRouter.post("/login", [LoginValidation, validationMiddleware], usersController.loginUser);

/**
*   @swagger
*       /api/users/{id}:
*           get:
*               tags:
*                 - Users
*               security:
*                   - bearerAuth: []
*               summary: Get user by Id
*               parameters:
*                   - in: path
*                     name: id
*                     required: true
*                     schema:
*                         type: string
*               responses:
*                   200:
*                       description: Success. User is returned
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/User'
*                   400:
*                       description: Validation errors
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Validation'
*                   401:
*                       description: Unauthorized
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Error'
*                   403:
*                       description: Access denied
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Error'
*                   404:
*                       description: User not found
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Error'
*                   500:
*                       description: Unknown error
*                       content:
*                           application/json:
*                               schema:
*                                   $ref: '#/components/schemas/Error'
*/
usersRouter.get("/:id", [authMiddleware(USER), getByIdValidation, validationMiddleware], usersController.getUserById);

export {usersRouter};