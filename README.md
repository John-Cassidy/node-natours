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
PORT=4000
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

insert

> db.tours.insertOne or db.tours.insertMany - insert items into collection
> db.tours.insertOne({\_id: ObjectId("5c88fa8cf4afda39709c2959"), name: "The Forest Hiker", price: 397, rating: 4.7})

update

> db.tours.updateOne or db.tours.updateMany
> db.tours.updateOne( { name: "The Snow Adventurer" }, { $set: { price: 597 } })
> db.tours.updateMany( { price: { $lt: 500 } }, { $set: { price: 500 } })
> db.tours.updateMany({ price: { $gt: 500 }, rating: { $gte: 4.8 } }, { $set: { premium: true } })

show databases

> show dbs

query collections

tours

> db.tours.find({}).pretty()
> db.tours.find({ name: "The Forest Hiker" }).pretty()
> db.tours.find({ difficulty: "easy" }).pretty()
> db.tours.find({ price: { $lte: 500 } }).pretty()
> db.tours.find({ price: { $lt: 500 }, rating: { $gte: 4.8 } }).pretty()
> db.tours.find({ $or: [ { price: { $lt: 500 }}, { rating: { $gte: 4.8 }} ] }).pretty()
> db.tours.find({ $or: [ { price: { $gt: 500 }}, { rating: { $gte: 4.8 }} ] }).pretty()
> db.tours.find({ $or: [ { price: { $gt: 500 }}, { rating: { $gte: 4.8 }} ] }, { name: 1 }).pretty()

users

> db.users.find({}).pretty()

delete

> db.tours.deleteMany({ rating: { $lt: 4.8 }})
> db.tours.deleteMany({}) - DELETES ALL RECORDS
> db.users.deleteMany({})

remove collections

> db.tours.remove({})
> db.users.remove({})

quit mongo shell

> quit()

exit interactive terminal into container

> exit

### Mongo client

setup MongoDB Client docker container. [Official docker image](https://hub.docker.com/r/mongoclient/mongoclient)

docker run -d -p 3000:3000 mongoclient/mongoclient

### update mongodb connection in .env file

NODE_ENV=development
PORT=4000
DATABASE=mongodb+srv://<USER>:<PASSWORD>@cluster0-pwikv.mongodb.net/natours?retryWrites=true
DATABASE_LOCAL=mongodb://localhost:27017/natours
DATABASE_USERNAME=john
DATABASE_PASSWORD=123456

### install mongoose v5

npm i mongoose@5

[CRUD Operations](https://mongoosejs.com/docs/queries.html)

### import/delete dev data into DB from tours-simple.json

The file `dev-data\data\import-dev-data.js` has 2 functions:

> importData()
> deleteData()

run the functions by passing in following arguments:

```bash
    node dev-data/data/import-dev-data.js --import

    node dev-data/data/import-dev-data.js --delete
```

```cmd
    node dev-data\data\import-dev-data.js --import

    node dev-data\data\import-dev-data.js --delete
```

## install slugify

npm i slugify

## install validator

use this if you want to customized functions that it provides for validation
note: isAlpha() function breaks if you pass a string with spaces in between words

npm i validator

## install ndb

[Link](https://github.com/GoogleChromeLabs/ndb)

npm i ndb -g
or
npm i ndb -D

## install bcryptjs

npm i bcryptjs

## Authentication and Authorization

### install jsonwebtoken

npm i jsonwebtoken

### add evnironment variables to .env file

JWT_SECRET=my-ultra-secure-and-ultra-long-secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

## add email functionality for development

### install nodemailer

npm i nodemailer

### setup mailtrap service

register account at [https://mailtrap.io/](https://mailtrap.io/)

add environment variables in .env file

EMAIL_USERNAME=a124458539192a
EMAIL_PASSWORD=1e3caf48074eba
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=25
