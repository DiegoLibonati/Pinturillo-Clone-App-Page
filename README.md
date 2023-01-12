# Pinturillo-Clone-App-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Go to the folder of my-app and run npm install
4. Go to the folder of server and run npm install
5. Run npm start in both folders or use docker-compose build and docker-compose up to run the image of docker (But the last of docker you need to run those commands in Pinturillo-Clone-App-Page)

## Description

I made a web application that will allow different users to enter different rooms using "Socket IO" (which allows us to handle sockets) to be able to play the iconic game pinturillo. This version of pinturillo was made from scratch, my version was called Dierillo. It should be noted that I didn't use code from anywhere else, it was pure improvisation. Users will be able to enter a room through a name or see which rooms are active through the page that is responsible for displaying which rooms have not started yet. After the owner of the lobby and/or room starts the game, the users will paint 1 by 1 during 3 rounds for 90 seconds the words they have to paint and the users that are not painting will have to guess the word and score points.

## Technologies used

1. React JS
2. Node JS
3. Typescript
4. Docker

## Libraries used

1. Socket IO
2. Redux Tookit
3. uuid

## Portfolio Link

Portfolio link coming soon...

## Galery

Images coming soon...

## Video

Video coming soon...

## Documentation

### React JS - My-App Folder

1. Folder **assets**: Here we are going to find all kind of images, audio or video that we want to use in the project.

2. Folder **auth**: Here we will find all the necessary to manage the authentication of the users before choosing a room.

3. Folder **contexts**: Here we are going to find the contexts that are in charge of handling the states in the different components. In the folder **_socket_** we will find a context that will handle the events or receive the events that are executed (they are not all).

4. Folder **hooks**: Here we are going to find the general customs hooks that are used in the whole project.

5. Folder **painting**: Here we are going to find all the folders that are proper of the project. Such as helpers, hooks, pages, components etc that make reference to the project itself.

6. Folder **router**: Here we will find the router of the project.

7. Folder **store**: Here we are going to find the slices that are in charge of managing the redux states.

8. Folder **types**: Here we are going to find the defined types of our application.

9. Folder **views**: Here we will find the views that will be rendered depending on the screen resolution of the user.

### Node JS - Server Folder - ¡SRC FOLDER!

1. Folder **room**: Aca vamos a encontrar un archivo llamado **index** que se va a encargar de ejecutar las funciones a traves de los eventos que se iran llamando o emitiendo. Ademas encontraremos otra carpeta llamada **helpers** que seran dichas funciones que se ejecutaran cuando "X" evento es emitido.

2. Folder **room/helpers**: The clearCanvas file will clear the Canvas.
3. Folder **room/helpers**: The file createRoom will create a new room.
4. Folder **room/helpers**: The file deleteRoom will delete a room.
5. Folder **room/helpers**: The getAllUsers file will get the information of all the rooms that have not yet started.
6. Folder **room/helpers**: The getCanvasData file will get the Canvas information.
7. Folder **room/helpers**: The getCountdown file will be in charge of executing the countdown of each round.
8. Folder **room/helpers**: The file getMessage will be in charge of sending the messages sent by the chat.
9. Folder **room/helpers**: The getNewPainter file will be in charge of assigning a new painter each time the painter changes.
10. Folder **room/helpers**: The joinRoom file will join a user to a room.
11. Folder **room/helpers**: The file leaveRoom will disconnect a user from a room.
12. Folder **room/helpers**: The randomWords file will get a word from an array.
13. Folder **room/helpers**: The resetCountdown file will reset the countdown to 90.
14. Folder **room/helpers**: The resetUsersRound file will reset the users' pertaining information each time the round is updated.
15. Folder **room/helpers**: The startGameRoom file will start the game.
16. Folder **room/helpers**: The userGuessWord file will update the scores if a word is guessed.
