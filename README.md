# Unified Push Admin UI

This is the admin interface for the AeroGear Unified Push Server. It is run alongside Unified Push. 

## Local Development

### `npm install`
This project requires a recent version of the NPM tool chain.

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Contributing and Releases

This project follows conventional comments and semantic versioning. Every commit to master is automatically versioned and tags. GitHub released tags automatically get build as containers and uploaded as an image to quay.io.

### Container information

The container requires the Unified Push server be routable. You need to set the `UPS_HOST` environment variable to run the container.