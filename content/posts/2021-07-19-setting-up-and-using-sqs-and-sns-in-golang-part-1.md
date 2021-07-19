---
template: post
title: "Setting Up And Using SQS And SNS In Golang: Part One"
slug: using-sqs-and-sns-in-golang-pt-1
socialImage: /media/sheep-crowd.jpeg
draft: true
date: 2021-07-19T01:39:59.960Z
description: >
  SQS and SNS are commonly used together to make a robust one-to-many messaging
  system. This is the first post of the two-part series for setting up and using
  SQS and SNS in Golang.
category: Software, Architecture
tags:
  - Golang
  - SQS
  - SNS
  - AWS
---
## Prerequisites

* An AWS account.
* A pair of AWS access key and secret key.
* Golang. If you don't have it installed, follow the instructions [here](https://golang.org/doc/install).

## Why SQS and SNS?

Describe what they are and what are their use cases and how they stand out.

## Alternatives

Talk about another blog post that I will write for technology comparisons.

## Setting up SNS from the console

As mentioned above, SNS have a concepts of topics where the publisher pushes the message to a topic and then those messages are pushed to the respective topic subscribers. I will show you how to create a topic first.

Go to the AWS SNS page -> Click "Topics" from the left-side panel -> Click "Create topic"

## Setting up SQS from the console

## Coming Next

In the next part of the series, I will explain with Golang, how to programatically send and receive message in a real-world scenario where you want to receive the message from SQS in a long-running server.

Thanks for reading and see you next time.
