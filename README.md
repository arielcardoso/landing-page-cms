## Simple Landing Page CMS

App created to manage a simple web landing page.


### Configuration

Go to config folder. Clone the **prod.js** file creating a new file called **dev.js**.

Then replace the keys values:

```javascript
module.exports = {
    mongoURI: "Your MongoDB Uri",
    secretKey: "Some secret string for cryptography"
}
```


### How to run

To install dependencies:

```npm install```


To generate initial data:

```npm run seed```


To run the app:

```npm start```


Access the site at:

```http://localhost:5000/```


Access the admin page at:

```http://localhost:5000/admin```

User: ```admin```

Password: ```123```


### Tech Stack

- Node.js
- Express
- Mongoose
- MongoDB
- EJS (templates)
- CSS, Bootstrap, JavaScript
