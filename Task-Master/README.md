# COMP3900-9900-Capstone-Project Peepo

Task Master project created in React and Python using SQLite for storage.

## Requirements
- Python3 version 3.7.3 or over
- Node version 10.24.0

## How to Setup the project

### On CSE machines

1. git clone this project

2. Run the setup.sh script like this to install all dependencies:

```
bash setup.sh
```

3. Start the web server using:

```
yarn start
```

4. Run this command to run the backend server, running on http://localhost:5423:

```
yarn start-api
```

5. Navigate to [http://localhost:3012](http://localhost:3012) to access the website.

### On a local machine

1. git clone this project
2. Change directory into the root of the repository
3. Install npm using this command:

```
sudo apt install npm
```

4. Install yarn using this command:

```
sudo npm install --global yarn
```

5. Install python3 venv using this command:

```
sudo apt install python3-venv
```

6. Run the setup.sh script like this to install all dependencies:

```
bash setup.sh
```

7. Start the web server using:

```
yarn start
```

8. Run this command to run the backend server, running on http://localhost:5423:

```
yarn start-api
```

9. Navigate to [http://localhost:3012](http://localhost:3012) to access the website.

## Commands

In the project directory, you can run:

### `yarn start`

Runs the frontend app in the development mode.\
Open [http://localhost:3012](http://localhost:3012) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start-api`

Runs the Python Django backend api app in development mode.\
This service runs on http://localhost:8000.

### `yarn migrate`

Runs database migrations and creates the database if it does not exist yet.\
This will update the database with any changes to the existing models or creates tables if there are new models.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

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
