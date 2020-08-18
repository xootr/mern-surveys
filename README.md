This is play toy application to work with the MERN stack. The app includes the full gamut of features, including everything from authentication to email handling.  

## Features:

* Learn the architectural considerations of building a full stack app
* Connect a front-end Create-React-App server to a NodeJS and Express backend
* Communicate data from your Mongo database to your React application
* Understand how to route user requests on the front end with React Router and on the backend with Express
* Build reusable user inputs with Redux Form, complete with navigation
* Handle credit cards and receive payments from your users with Stripe
* Engage your users with automated emails
* Enhance authentication flows in your app with Google OAuth authentication
* Separate production and development resources with advanced API key handling techniques
* Educate your users on how to use your app with custom build landing pages

## Ngrok setup instead of LocalTunnel

This note will cover using Ngrok instead of LocalTunnel, which has proven to be buggy and inconsistent since the course lectures were originally recorded.

### Setting Up Ngrok
We can use npx to run ngrok and have it forward traffic to port 5000 without installing anything. To do this, open a brand new terminal and run:

`npx ngrok http 5000`

This will launch up a pop-up window with the address you can use:


This address that was generated, in my case: https://ed3ce60.ngrok.io will only exist for 8 hours. You'll want to keep this terminal session open and running while you are developing. If you close the running ngrok session and re-run npx ngrok http 5000, the address will be different. It is important to remember these two things as you will likely need to update the ngrok generated address in your Sendgrid dashboard a few times through the development process.

Since we are not using LocalTunnel, we also don't need the webhook script in our package.json file as noted in the "LocalTunnel Setup" lecture video. We also don't need to call the 'webhook' script from the 'dev' script.

The scripts property should now look like this:

`
  "scripts": {
    "start": "node index.js",
    "server": "nodemon index.js",
    "client": "npm run start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  },
`

### Sendgrid Integration

In the upcoming lecture "Testing Webhooks", you will be adding your LocalTunnel address to the Event Notification's HTTP POST URL field. Since we are going to use Ngrok, you'll want to paste the current session's address into this field instead:

Remember, anytime you start a new ngrok session, you'll need to update this HTTP POST URL field.

You should be able to then click the "Test Your Integration" button. If it's working, you might get some data from Sendgrid or an error in your terminal like this:

[0] TypeError [ERR_INVALID_URL]: Invalid URL: undefined

This is fine, as it does prove the integration is working and is sending data through ngrok to your application.

A quick note about production, since this has been a major topic of confusion. The Ngrok session (and the LocalTunnel usage from the videos) are development only. These tools only serve to allow Sendgrid to post back to your application running on localhost. If you were to deploy your finished application to Heroku and users filled out a survey, the Sendgrid integration for click tracking would post directly to your Heroku application at https://your_heroku_url/api/surveys/webhooks

