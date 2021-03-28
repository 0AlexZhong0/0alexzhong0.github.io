---
template: post
title: Manually Pass Credentials To Initialize The Firebase NodeJS Admin Sdk
slug: manually-passing-firebase-admin-sdk
socialImage: /media/google-firebase-logo.png
draft: false
date: 2021-03-28T03:19:07.631Z
description: "In a non Google Cloud deployment environment, we need to pass the
  credentials manually to initialize the Firebase app, this tutorial contains
  the instructions for how to do that. "
category: software
tags:
  - google cloud
  - nodejs
  - firebase
---
Recently, I am using Firebase admin Sdk in the server to send notifications. The [current documentation](https://firebase.google.com/docs/admin/setup#initialize_the_sdk) only has instructions for how to use the Application Default Credentials to initialize the app . While this method of firebase authentication works great in the local and the Google Cloud deployment environment, it breaks when using external cloud providers to host the app, e.g. AWS or Azure. Therefore, a workaround is necessary to pass the credentials correctly to the app. The documentation for this instruction is lacking. How I figured it out was through inspecting the type definitions of `admin.initialzeApp` (Note: I am using the `firebase-admin` NodeJs Sdk). So, here is the solution:

```javascript
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  }),
})
```

The `initializeApp` method expects a `Credential` object which is created via the `admin.credential.cert` method, the fields `projectId`, `clientEmail` and `privateKey` are the necessary fields for proper initialization. Then what we will need to do next is creating the environment variables with the respecting values so the application can read the right values at runtime.

The credentials for the service account can be generated via the instructions in the `To generate a private key file for your service account` section in the [link](https://firebase.google.com/docs/admin/setup#initialize_the_sdk) provided above.

**Bonus tip**: having separate development/deployment stages, e.g. `dev`, `qa`, and `prod`, is important for data sanity and quality assurance before the release is rolled out to production. To do that for firebase, you can create a separate project for each deployment stage, so that you can use the corresponding credentials for the client and server. Essentially, you will have three different service account credential files if you have three Firebase projects. Let me know if you would love me to write a blog post about that.    

