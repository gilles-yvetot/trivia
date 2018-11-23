# Boilerplate: Next.js - React - Unistore - Auth with JWT - Material UI

I am using Next.js as a boilerplate. It removes the pain in Javascript/React configuration while setting up a project by taking care of the "babelification", the server-side rendering, code-splitting, hot reloading and more... The main difference in the React code you might notice is the `getInitialProps` even method that is run during server side rendering ;)

I spent some time to assemble Next.js with Unistore, Material-UI, JWT altogether because I realized that I realli like this stack and could use it as a boilerplate for future projects. Let me know if you are interested to get it as well for your future interviewees, it would give them more time to focus on what's matter for you, the UI.
Material-UI was not required but I took some time to integrate it to match your stack.

## Notes

### Auth system - JWT

I decided to use JWT for the authentication, it is currently one of the simplest and safest way to implement authentication. I know it was not evaluated but I still wanted to do something solid.
I am using the same server that is server the front, that is one of the main benefit of using a Node server, generating SSR page and work as an API as well. Of course when the project gets bigger, we should split the 2 for more consistency and to separate the concerns.

### Syntax

You will notice a different in syntax between the client and the server, especially for the import/export of the modules. It is due to the fact that the client code will need to be "babelified" to be compatible with every browser and for code splitting. Whereas on the server we handle the node version we want. On top of that it helps me to identify quickly where I am.

### Client calls to trivia

I am making the calls to the Trivia API directly from the client. One objection to that would be that someone could look at the code and know the correct answer. A simple solution would be simply to get the answers and validate them on the server side. But it would have added an extra layer of complexness to this exercise and, from my understanding, the focus is more on the UI
