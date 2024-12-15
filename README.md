# Getting Started with REX SPA

This project is demonstrational single page app made in React and Typescript from scratch, that uses [dummy json](https://dummyjson.com/) service as a backend.

## Requirements

- [Node](https://nodejs.org/en) version 20 or higher
- [Yarn](https://yarnpkg.com/) recommended version 1.22

## Available Scripts

In the project directory, you can run:

### `yarn run start`

Runs the app in the development mode.\
Open [http://localhost:1234](http://localhost:1234) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn run test`

Launches the test runner in the interactive watch mode.

### `yarn run coverage`

Launches the test runner and generates a coverage report in the `coverage` folder.

### `yarn run lint`

Analyzes Typescript code for potential errors and style inconsistencies.

### `yarn run check`

Analyzes code types using the Typescript compiler without generating report.

### `yarn run format`

Formats all files in the current directory and its subdirectories with the specified file extensions using Prettier. This helps ensure consistent code style across the project.

### `yarn run clear`

Removes the specified directories and their contents, including compiled output, dependencies, cache files, and coverage reports.

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).\
To learn TypeScript, check out the [TypeScript documentation](https://www.typescriptlang.org/docs/).\
To learn about Eslint, check out the [Eslint documentation](https://eslint.org/docs/latest/).\
To learn about Prettier, check out the [Prettier documentation](https://prettier.io/docs/en/).\
To learn about Parcel, check out the [Parcel documentation](https://parceljs.org/docs/).\
To learn about Mantine, check out the [Mantine documentation](https://mantine.dev/).\
To learn about Axios, check out the [Axios documentation](https://axios-http.com/docs/intro).

## Deployment

#### 1. Set up CI/CD:
- Create a pipeline that triggers on code pushes to your desired branch.
- Define the following steps in your pipeline:
    - Checkout code: Clone your repository.
    - Install dependencies: Run `yarn install`.
    - Build the app: Run `yarn run build`.
    - Deploy to server: Use your CI/CD provider's deployment features to deploy the dist folder to your chosen hosting platform.

#### 2. Configure Hosting:
- Choose a static hosting provider (e.g., Netlify, Vercel, AWS S3).
- Connect your repository to the provider.
- Configure the build command to `yarn run build`.
- Set the deploy directory to dist.

### TODOs

- Preload images
- Add PWA meta tags to `index.html`
- Add social meta tags to `index.html`
- Reorganize and split components 

### Contribute

- Fork the repository to your personal GitHub account.
- Create a new branch for your feature or bug fix.
- Commit your changes with clear and concise commit messages.
- Push your changes to your remote branch.
- Create a pull request from your branch to the main branch of the original repository:
    - Provide a clear and concise description of your changes in the pull request.
    - Address any feedback from the maintainers or other contributors.

### Security

TODO

### Arhitecture

TODO

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
