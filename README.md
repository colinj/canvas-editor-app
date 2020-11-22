# Canvas Editor app

This is a simple Vue application that allows a user to load and display an image file (png or jpg) from the file system using the normal file picker dialog. The image is loaded and resized to fit the width of the image viewport while keeping the aspect ratio of the image intact. The size of the viewport is fixed so that the vertical dimension of the image may not fill the entire height of the viewport. If the height of the image is larger than the viewport then the bottom portion of the image will be hidden.

Once the image is loaded, the brightness and contrast controls will be activated and will allow the user to manipulate the image as they move the controls.

## Assumptions and Design Decisions

* The requirements specified that the application layout should match the [screen design]( https://drive.google.com/open?id=1nrA_v8P1SmOQjGKEkoXpHqO8mzOp6AFC) that was also provided in the [Sketch design](https://drive.google.com/file/d/1PV5wtOWZ283cgi-LPSYoYC8zC2SYrP4U/view?usp=sharing). As such, the application was built with a fixed layout and not with a responsive layout design in mind.
* The [Graphik font family](https://commercialtype.com/catalog/graphik/graphik), which is a commercial font, is used in the Sketch design file. This font was not embedded nor made available in the Sketch file so no information was given regarding the font sizes and weights used in the layout. Instead, I replaced the Graphik font in my application with the [Mulish font family from Google](https://fonts.google.com/specimen/Mulish) and made a rough "guesstimation" for sizes and weights.
* The algorithm used to manipulate the pixels on the canvas to calculate the brightness and contrast was referenced from [this article](https://css-tricks.com/manipulating-pixels-using-canvas/) on CSS-tricks.com. A brightness factor of 255 was used in the article but I changed this to 200 which reduced the range but provided a greater level of granularity on the brightness control. The contrast algorithm that I used remain unchanged.
* The application does not work on IE11. The application was built with Vue 3 and was tested on Chrome, Firefox, Safari and Edge. Vue 3 does not support IE11 (as of November 2020) and there is currently no expected deadline as to when support will be provided (if at all).


## Project setup and installation

1. Please make sure you have [node](https://nodejs.org/) and [yarn](https://yarnpkg.com/) installed globally on your computer.

2. Download this repository from Github by either cloning the repository or downloading it from the zip file. 

3. Once you have cloned or unzipped the repo, open a terminal session or command prompt and go to the folder containing this project.

4. From the command line enter the following to install the project dependencies.  

```
yarn install
```

### Compiles and hot-reloads for development

After installing the project dependencies, enter the following to start your local server.
```
yarn serve
```
To start the application in development mode, open your local browser and enter in the default URL http://localhost:8080 or http://127.0.0.1:8080.

You can find some example image files to open in the `/public/images` folder. As well as a sample text file which will not be accepted by the file system picker dialog as per design.



### Compiles and minifies for production
```
yarn build
```
