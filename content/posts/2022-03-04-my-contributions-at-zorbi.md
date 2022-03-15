---
template: post
title: My Work at Zorbi
slug: contributions-at-zorbi
socialImage: https://lh3.googleusercontent.com/xxTrkjBvZrjWhb3MxhwDkWaUz5nWEbf9FAUF-1P00n6gkiDy3_bJ6J2Qo2ZE0SUU5ivsnnWktJ4Qq8J-cpH_qv3-=w128-h128-e365-rj-sc0x00ffffff
draft: false
date: 2022-03-04T21:55:13.862Z
description: I share with you my technical contributions I have made to Zorbi - a flashcards app that predicts when you will forget them. It has helped tens of thousands of people improve their learning efficiency.
category: Software
tags:
  - Startup
  - Engineering
  - Technology
---
I helped Zorbi scale from 0 to 20k+ users in March 2022. I have designed the UI/UX flow, made technical architectural decisions and built every feature I showcase below. The list is not extensive but highlights the major features I have made. The code snippets in this article are in a private repo, feel free to DM me so I can add you to the repo.

# My Zorbi GitHub Metrics

Note: the metrics are between July 2021 to March 2022 (8 months).

- **Total no. of commits**: 405
- **Total no. of code reviews**: 50
- **Total no. of pull requests**: 46

# Infrastructure

GitHub Action is Zorbi's CICD pipeline. I automated the mobile deployment to the Play Store and the App Store using Fastlane. The app is hosted as a static single-page application using Firebase Hosting, and we use AWS EBS to host our GraphQL server. We use Firestore as our database and Firebase Auth for user authentication.

# Payments

`/payments/Stripe.ts`: A handler that processes Stripe Webhook events, e.g. our API endpoint receives events from Stripe; when a customer creates, updates or deletes a subscription, the API will update the pro membership for the user accordingly.

`/payments/ProSubscriptionModal.tsx`: The in-app-purchase subscription modal is built using Ionic React and TailwindCSS. See the GIF below for the UI.

`/payments/InAppPurchase.ts`: iOS In-App-Purchase using RevenueCat SDK.

<img height="500" src="https://media.giphy.com/media/oHnEaxEUdyfIo6PMJV/giphy.gif" />

# Referral

`/referral/InviteFriendPopover.tsx`: See the referral flow in the video below.

`/referral/InviteStore.ts`: The referral service integrates with the payment service. It gives both the referrer and those who signed up with the invite links pro memberships.

<img height="500" src="https://media.giphy.com/media/qRiav3SjIWJwhvR7vz/giphy.gif" />

# PDF Viewer

`/pdf/ChromePdfViewerExtension.ts`: Chrome extension that injects a button that helps the user navigates to Zorbi's custom PDF viewer if the user attempts to create the flashcard from the Chrome PDF viewer.

`/pdf/PdfViewerPage.tsx`: Zorbi's custom PDF viewer enables users to create flashcards using the Zorbi Chrome extension.

    The GIF shows the flow of how a user will use Zorbi's PDF viewer.

<img src="https://media.giphy.com/media/WsDWNAJ4hH9QqlNLfD/giphy.gif" />

# Text to Speech

`/text-to-speech/TextToSpeechService.ts`: A service that converts raw text to speech using Amazon Polly and uploads the audio buffer to S3 for the client to use.

`/text-to-speech/TTSBlot.ts`: A [quilljs](https://github.com/quilljs/quill) blot that renders the blue text to speech bubbles in the flashcards.

`/text-to-speech/TTSBlotHandler.ts`: A backend handler with the business logic of converting the text inside each text-to-speech blots to speech and updates the user's monthly text to speech usage.

    The GIF shows how a user might use the text to speech feature.

<img height="500" src="https://media.giphy.com/media/EmtzBzCjIi0dl80l05/giphy.gif" />

# Performance Optimization

Here are the main performance improvements I have made to the app:

1. Initially, it took between 3-5s to load the app. After adding apollo cache and authentication state persistence, the load time decreased to <=1s. (300% improvement)
1. I improved the GraphQL query time to fetch the cards to study by 50%. I achieved it by removing unnecessary data fetching in the backend.
1. Initially, it took around 5-10s to render the long list of cards on Android devices. I reduced the rendering time to almost instant by using lazy component loading and rendering HTML content rather than a quill component for the card. (500% improvement)
