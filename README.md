# Trivia: Next.js - React - Unistore - Auth with JWT - Material UI - API with Express and Mongo

I am using Next.js as a boilerplate. It removes the pain in Javascript/React configuration while setting up a project by taking care of the "babelification", the server-side rendering, code-splitting, hot reloading and more... The main difference in the React code you might notice is the `getInitialProps` even method that is run during server side rendering ;)

I spent some time to assemble Next.js with Unistore, Material-UI, JWT altogether because I realized that I really like this stack and could use it as a boilerplate for future projects. Let me know if you are interested to get it as well for your future interviewees, it would give them more time to focus on what's matter for you, the UI/UX.
Material-UI was not required but I took some time to integrate it to match your stack.

## Getting Started

The database is hosted so no need to setup one locally.

- `git clone`
- `cd trivia`
- `yarn`
- `yarn dev` for the development server with hot reloading

- `yarn build` then `yarn start` to build the production release and launch it

## Notes

## Material UI

I decided to create 3 main UI components to show you 3 different things:

- the wheel, to show you that I can do some relative complex CSS3/JSS
- the info card to show you that I could learn and apply key concept of Material UI
- the question/answers component to show that I can create my own component

I am sure there are many aspects of Material-UI that I have not covered but I tried to used as many components as I could. There is a lot of code for only 3 components because I tried to make it more the simplest possible!

### Server

The Node server is responsible of the SSR and serving data through the API endpoints. Here too, I tried to make it simple.

### Mongoose

If you use Mongo with Node, you most likely use Mongoose so nothing fancy here. I defined very simple models. The only warnings in the console came from Mongoose. I put the connection string in the server file. It could be safer but I wanted you to be able to launch the project quickly. But of course I would have add more security layer in a production environment

### Auth system - JWT

I decided to use JWT for the authentication, it is currently one of the simplest and safest way to implement authentication. I know it was not evaluated but I still wanted to do something solid.
I am using the same server that is server the front, that is one of the main benefit of using a Node server, generating SSR page and work as an API as well. Of course when the project gets bigger, we should split the 2 for more consistency and to separate the concerns. With `express-jwt`, we have access to the user directly from the request.

### Syntax

You will notice a different in syntax between the client and the server, especially for the import/export of the modules. It is due to the fact that the client code will need to be "babelified" to be compatible with every browser and for code splitting. Whereas on the server we handle the node version we want. On top of that it helps me to identify quickly where I am.

### Client calls to trivia

I am making the calls to the Trivia API directly from the client. One objection to that would be that someone could look at the code and know the correct answer. A simple solution would be simply to get the answers and validate them on the server side. But it would have added an extra layer of complexness to this exercise and, from my understanding, the focus is more on the UI
