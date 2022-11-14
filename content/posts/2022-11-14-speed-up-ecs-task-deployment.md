---
template: post
title: Improve ECS Deployment Speed By Over 50%
slug: improve-ecs-deployment-speed
socialImage: https://miro.medium.com/max/761/1*0XaVw5RxRmdYC6urU010-A.png
draft: false
date: 2022-11-14T03:43:59.548Z
description: >
  A standard ECS setup is you deploy both the ECS service and the load balancer together. However, you will notice by default each deployment to update the ECS service would take a long time. Let me show you how to speed up the ECS deployment speed in this article.
category: Software
tags:
  - Software
  - Infrastructure
  - Performance
---

Recently, I decided to investigate the issues and optimise the deployment speed. Here are four areas of changes you can make to optimise your ECS service deployment speed.

1. Load balancer health check parameters

The ECS task deployment will only succeed if it passes the load balancer health check. There are two important parameters here, HealthyThresholdCount (the amount of consecutive successful health check responses needed to consider the target as healthy) and HealthCheckIntervalSeconds (the amount of time between each health check).

By default, HealthyThresholdCount is 3, and HealthCheckIntervalSeconds is 30, so a task deployment will take at least 3 * 30 = 90 seconds here. We can improve this by decreasing HealthyThresholdCount to 2 and HealthCheckIntervalSeconds to 10, which is 20 seconds in total, so this will reduce the total deployment time by at least one minute.

![ECS load balancer health check](https://docs.aws.amazon.com/images/AmazonECS/latest/bestpracticesguide/images/load-balancer-healthcheck.png)

2. Load balancer connection draining

When you stop an ECS task, you will notice the task going into the draining state before the stopped state. The draining state is when the period when the ECS task tries to terminate the keep-alive connection with the load balancer. The ECS task maintains the keep-alive connection with the load balancer so it can reuse the connection for receiving a request and sending a response to the load balancer.

There is a parameter named DeregistrationDelay, the amount of time the load balancer waits for the ECS task to terminate the keep-alive connection with the load balancer. The default value of DeregistrationDelay is 300 seconds. We can update it to 10 or less if the service doesn’t have long-running requests such as file uploading or video processing.

![ECS task load balancer connection draining](https://docs.aws.amazon.com/images/AmazonECS/latest/bestpracticesguide/images/load-balancer-connection-draining.png)

3. Container image pull behavior

Fargate tasks don't cache the Docker images. Consider the following methods to speed up the image pulling speed.

- A new ECS task needs to pull a fresh Docker image over the network before running. The more vCPUs a task has, the more network bandwidth it has. Hence it can pull the Docker image faster. The minimum 0.25 vCPUs is enough for pulling images under 500MB, and 0.5 vCPUs to 1 vCPUs is sufficient for pulling images between 500MB to 1.5GB.
- Use a smaller base image.
- Store the image in the same region as the task.


4. Task deployment

In your deployment configuration, the minimumHealthyPercent parameter is the minimum percent of the number of desired tasks that should be in the RUNNING state and maximumPercent is the maximum percent of the number of desired tasks should be either in the RUNNING or PENDING state.

A successful deployment will replace all existing ECS tasks with new ECS tasks with the latest task definitions. For example, consider the following sequences.

1. You have three running tasks in a cluster with room for 5, and you trigger a new deployment.
2. You have minimumHealthyPercent and maximumPercent at their default values which are 100% and 200% respectively. The service cannot deregister any tasks because it must have three running tasks simultaneously, so it creates two new tasks.
3. Once the two new tasks enter the RUNNING state, it deregisters an old task and creates another new task.
4. Finally, it deregisters the last two old running tasks, thus completing the deployment.

There is a 2.5-minute wait for each task that starts, and the load balancer needs to wait 5 minutes (because the deregistrationDelay is 300s by default) to deregister the task successfully.

Suppose some of your tasks don’t have a high utilisation rate. In that case, you can adjust minimumHealthyPercent to 50%, so the above example will deregister a task and create three new tasks in the beginning, which speeds up the deployment significantly.

5. Bonus point: when you update the ECS service, the service will need to register a new ECS task, and the task then pulls a fresh Docker image, and the service waits for the task to pass the load balancer health check out etc. All of these could take up to a few minutes. You can avoid this by including some logic in your application that pulls the latest code from your git repository, build the code, and restart the server itself. You encapsulate the logic inside an API endpoint, and only you are authorised to hit this API endpoint.

Implementing the above optimising methods reduced my ECS deployment time from 10-12 minutes to 3-6 minutes.

Reference:

- [Best Practices - Speeding up deployments](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/deployment.html)
