import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middlewares

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // whom to allow to talk to our backend (we only want to allow our frontend)
    credentials: true,
  })
); // cors takes an object for its configuration(optional)

app.use(express.json({ limit: "16kb" })); // configure incoming json data -> it accepts an object of options (which is optional)

// configure data coming from url
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // extended --> allow nested objects

// cofiguration for assets
app.use(express.static("public")); // static is used to store assets like images, favicons on our server --> it takes folder name where we want to store this stuff

// configure cookies
app.use(cookieParser()); // it also has optional options


// routes import (import statements are written in app.js and not at the start as well)
import userRouter from './routes/user.routes.js';

//router declaration
// app.get() won't work here since now we have segregated router, controller etc, so we need to use a middleware to bring router --> app.use()

// app.use("/users", userRouter); // when any user goes to /users url, controller is tranferred to userRouter --> user.routes.js file
// standard practice is to specify that we are defining an api, then its version and then our router
app.use("/api/v1/users", userRouter);


export { app }; // can be exported as default as well

// imp req properties -> req.params (data in req/url), req.body
// npm in cookie-parser, cors (used to set settings for cross origin resource sharing)
// app.use() --> for middlewares / configurations
// cookie parser is used to access as well as set cookies in users' browser -> perform crud operations on user's cookies
