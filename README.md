# Image Processing Api

This Image processing API serves two purses:

```bash

```

1.  It's used as a simple placeholder api, it allows users to query images from the server with the image name, width and height specified as parameters on the URL as seen below.

```bash
    http://localhost:5000/api/v1/images?filename=fjord&width=200&height=200
```

2.  Second, this api can also be used to properly scale your images or resize your images based on the url parameters specified.

## Project setup

First, clone this repo and switch into the repo folder:

```bash
git clone https://github.com/ivanepou22/imageprocessing.git
```

Now you need to install the dependencies for the server code.

### Set up the Express server

```bash
npm install
```

### Now that everything is set up, you can test the app by starting the server using nodemon

```bash
npm run start
```

### Lint the code using Eslint

```bash
npm run lint
```

### Format the code using Prettier

```bash
npm run prettier
```

### Build and Test the app using Jasmine

```bash
npm run test
```

### sample tests

1. should send the resized image if it exists in the "images/thumb" folder.
2. should send a 404 error if the original image does not exist in the "images/full" folder.
