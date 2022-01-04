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

reviews

> db.reviews.find({}).pretty()

delete

> db.tours.deleteMany({ rating: { $lt: 4.8 }})
> db.tours.deleteMany({}) - DELETES ALL RECORDS
> db.users.deleteMany({})

remove collections

> db.tours.remove({})
> db.users.remove({})
> db.reviews.remove({})

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

### add JWT environment variables to .env file

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

## SECURITY BEST PRACTICES

### COMPROMISED DATABASE

> Strongly encrypt passwords with salt and hash (bcrypt)
> Strongly encrypt password reset tokens (SHA 256)

### BRUTE FORCE ATTACKS

> Use bcrypt (to make login requests slow)
> Implement rate limiting (express-rate-limit)
> Implement maximum login attempts

#### install express-rate-limit package

npm i express-rate-limit

### CROSS-SITE SCRIPTING (XSS) ATTACKS

> Store JWT in HTTPOnly cookies
> Sanitize user input data
> Set special HTTP headers (helmet package)

#### install helmet package

npm i helmet

#### review how to add helment contentSecurityPolicies

[Helmet](https://helmetjs.github.io/)
[StackOverflow](https://stackoverflow.com/questions/67601708/axios-cdn-link-refused-to-load)
[StackOverflow](https://stackoverflow.com/questions/64762132/how-do-i-set-up-helmet-js-correctly-to-resolve-csp-issue)

### NOSQL QUERY INJECTION

> Use mongoose for MongoDB (because of SchemaTypes)
> Sanitize user input data

### OTHER BEST PRACTICES AND SUGGESTIONS

> Always use HTTPS
> Create random password reset tokens with expiry dates
> Deny access to JWT after password change
> Don't commit sensitive config data to Git
> Don't send error details to clients
> Prevent Cross-Site Request Forgery (csurf package)
> Require re-authentication before a high-value action
> Implement a blacklist of untrusted JWT
> Confirm user email address after first creating account
> Keep user logged in with refresh tokens
> Implement two-factor authentication Prevent parameter pollution causing Uncaught Exceptions

#### install cross site forgery and data sanitation security packages

npm i express-mongo-sanitize
npm i xss-clean

#### install hpp package to remove array paramaters passed in

if you pass in sort=price&sort=duration, then node will create a sort[].
this package will keep this as a single object, not an array.

npm i hpp

## Import Test Data for: Tours, Reviews, Users

NOTE - all test user passwords: test1234

1 use the updated import-dev-data.js file
2 use the npm run script commands in package.json

> test-data:delete
> test-data:import

3 comment out following code in usermodel.js so encryption does not occur.
this is because users.json password values are already encrypted.

```javascript
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
```

4 run delete test data script
5 run import test data script

## Improving Read Performance with Indexes

add indexes on fields that are queried often

```javascript
// ADD INDEXES TO MODEL
// single field index
tourSchema.index({ price: 1 });
// multi field index. this index works when user queries by single field query.
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ startLocation: '2dsphere' });

// ADD TEST CODE TO CONFIRM INDEXES WORKING in factory get method - handlerFactory.js.exports.getAll
const doc = await features.query.explain();
```

## Server-Side Rendering with Pug Templates

[Top Express.js template engines fo Express](https://blog.logrocket.com/top-express-js-template-engines-for-dynamic-html-pages/)

> Pug
> EJS
> Handlebars

Setup Pug in app.js

install Pug

> npm i pug

### Formatting pug files

#### Pug beautify

There is an extention to beautify Pug files [Pug beautify](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-pugbeautify)

#### @prettier/plugin-pug

Optional Prettier plugin [@prettier/plugin-pug](https://www.npmjs.com/package/@prettier/plugin-pug)
[Documentation](https://prettier.github.io/plugin-pug/guide/)

##### Install @prettier/plugin-pug

> npm i -D @prettier/plugin-pug

##### Usage @prettier/plugin-pug

Prettier is setup to format on save so that should work. However, the package documentation says you can also use this command to update all pug files.

```cmd
npx prettier --write "**/*.pug"
```

## MapBox

Create an account at mapbox.com

NOTE - added Content-Security-Policy header to router that displays map: [Link](https://stackoverflow.com/questions/66650925/getting-error-message-while-try-to-load-mapbox)

### add MAPBOX environment variables to .env file

MAPBOX_TOKEN=token

## Login Users

### install cookie-parser

> npm i cookie-parser

## Add Bundler

We are using [Parcel](https://parceljs.org/) to bundle js scripts

The original documentation instructions are to install parcel-bundler like below:

> npm i -D parcel-bundler@1.12.3

### Package name

The problem is that Parcel v2 package name has changed:

> npm i -D parcel

The first thing to note when upgrading from Parcel 1 to Parcel 2 is that the npm package name has changed from parcel-bundler to parcel. You'll need to update the dependencies in your package.json accordingly.

### Modify JS files to use import/export

Install axios

> npm i axios

Install @babel/polyfill - If you want to functionality to work with older browsers

> npm i @babel/polyfill

## File Upload

Use file upload middleware - multer

> npm i multer

Use file resize middleware - sharp

> npm i sharp

## Email using pug, html-to-text, and SendGrid

Use html-to-text middleware to Render HTML based on a pug template

> npm i html-to-text

Email template adapted from [https://github.com/leemunroe/responsive-html-email-template](https://github.com/leemunroe/responsive-html-email-template)

Converted from HTML using [HTML-TO-PUG](https://html2pug.now.sh/)

Use SendGrid.com to Send emails in production

> create an account and setup SMTP Relay
> add env variables to env file: SENDGRID_USERNAME, SENDGRID_PASSWORD
