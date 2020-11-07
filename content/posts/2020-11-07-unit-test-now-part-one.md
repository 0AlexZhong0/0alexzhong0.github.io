---
template: post
title: Unit Test Now - Part One
slug: unit-test-now-part-one
socialImage: /media/image-2.jpg
draft: false
date: 2020-11-07T10:17:48.445Z
description: First of the two-part Unit Test Now series where we give a
  high-level overview of common unit test scenarios and we provide some examples
  to help you get started today!
category: software
tags:
  - unit test
  - testing
---
## Where To Start?

Assuming you have understood the importance of testing, (if not, Google "why is software testing important" and be overwhelmed with the answers) and you want to start testing your project today. However, sometimes we don't know how to begin. This article focuses on unit testing because unit tests make up the majority of the tests we write. ![Testing Pyramid](https://miro.medium.com/max/2444/1*Tcj3OsK8Kou7tCMQgeeCuw.png "Testing Pyramid")

## A Simple Unit Test

Firstly, a [unit test](https://en.wikipedia.org/wiki/Unit_testing) is simply a function/program that **validates the expected behaviour** of another function. For example, suppose we have a function that returns a list of numbers between a range inclusive of 2 ends:

    const range = (start, end) => {
      const result = []
      for (let n = start; n <= end; n++) result.push(n)
      return result
    }

Some examples of test cases can be, if `start` is greater than or equal to `end`, the result should be an empty array `[]`. If the input is (1, 3), i.e. `start` is smaller than `end`, then the result is `[1, 2, 3]`. Finally, we can also check for invalid inputs such as if any of the two input is a string, then we will expect the program to throw an error. However, that is not a concern, if we use a statically typed language like TypeScript, Java or C++, because the compiler will throw an error to prevent us from compiling the source code.

## Scenarios We Have Tested

The aspects of a function our unit tests we covered above are:

1.  What is the expected behaviour when handling the edge case? (What does `range` return when `start > end`)
2.  What is the desired result for valid inputs?
3.  What happens if the inputs are invalid? (How the program behaves when either `start` or `end` is not a number)

## A More Practical Look

Next, we will dive into a more practical scenario. Suppose you are building an eCommerce app, and you are writing a function to handle a successful customer sale. Let's say the customer has bought 1kg of apples and 2kg of potatoes. In the function that handles a successful purchase, we will only perform two actions. First, remove the purchased products from the stock, then create a transaction in the database. Let's now define the function, and we will make use of [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) by using the two controller instances as input to make our code reliable and testable, look [here](https://softwareengineering.stackexchange.com/questions/140992/is-dependency-injection-essential-for-unit-testing) for more discussions.

    const onSuccessSale = (InventoryControllerInstance, TransactionControllerInstance) => (purchasedProducts, user) => {
      for (const product of purchasedProducts) InventoryControllerInstance.remove(product)

      const createTransactionPayload = formatCreateTransactionPayload(purchasedProducts, user)
      TransactionControllerInstance.create(createTransactionPayload)
    }

It is not trivial to test `onSuccessSale` as a whole, because the function relies on three other methods. Unit tests resolve the issue. We can write a unit test for each method `onSuccessSale` depends on, in this case, the three methods are `InventoryControllerInstance.remove`, `formatCreateTransactionPayload` and `TransactionControllerInstance.create`. For each one, we can leverage the principles we covered above, when we have addressed the correctness of each method, then we will have confidence that `onSuccessSale` will work.

## Summary

There are three simple aspects you can use to start testing your functions:

1.  What is the expected behaviour when handling the edge case?
2.  What is the desired result for valid inputs?
3.  What happens if the inputs are invalid?

## What's Next?

In part 2 of this series, I will use concrete examples to breakdown and analyze the testing principles outlined in a best-seller software development guide **The Pragmatic Programmer**. Also, in future articles, I will show how to **test a method that interacts with a database** and how to write **integration tests**.