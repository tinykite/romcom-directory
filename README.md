# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It also relies on:

- [Styled Components](https://styled-components.com/), a CSS-in-JS library for styling components
- [Framer Motion](https://www.framer.com/api/motion/), a React animation library to animate accordion components
- [Axios](https://axios-http.com/docs/intro), a promise-based HTTP client for the browser and node.js

It doesn't currently contain any tests. For a production application, I would definitely (at a minimum) write unit tests for all functions using Jest or Chai + Mocha.

The app is also admittedly very ugly! In a production environment, I would polish quite a few design details that include finessing paddings and margin, as well as replacing the + and - text in the accordion containers with icons. I would also focus on making sure the accordions are accessible, with tasks that include adding a button with an aria-attribute (`aria-expanded`) to toggle the actual open/close state of the container — and making sure that any visual UI elements are not read aloud to a screen-reader.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

There are currently no tests. However, if there were tests, this command would be helpful for launching the test runner in interactive watch mode. \

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
