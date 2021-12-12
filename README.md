# Course Material and FAQ for my Complete Node.js, Express and MongoDB Bootcamp

[Link to Udemy Course](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)

[Link to Github Course Material](https://github.com/jonasschmedtmann/complete-node-bootcamp)

## install Express

npm i express

## install morgan

npm i morgan

## install dotenv

npm i dotenv

- you may also want to add the dotenv extension

## create .env file that server.js will import

NODE_ENV=development
PORT=3000
USERNAME=john
PASSWORD=123456

## setting up ESLint + Prettier in VS Code

install eslint extension
install prettier extension

install packages: eslint prettier

> npm i eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-config-airbnb eslint-plugin-node eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react -D

## MongoDb

setup MongoDB in docker container. [Official docker image](https://hub.docker.com/_/mongo)

docker pull mongo

docker run -d -p 27017:27017 --name natours-mongo mongo

### Run interactive terminal in mongodb (Powershell)

docker exec -it natours-mongo /bin/bash
ls

start mongo client

> mongo

create new database

> use natours

create collection

> db.createCollection('tours')
> db.tours.insert or db.tours.insertMany - insert items into collection

show databases

> show dbs

show collections

> db.tours.find({}).pretty()

remove collesions

> db.tours.remove({})

quit mongo shell

> quit()

exit interactive terminal into container

> exit
