---
template: post
title: Unit Test Now - Part Two, The Pragmatic Programmer Edition
slug: unit-test-now-part-two
socialImage: /media/image-4.jpg
draft: false
date: 2020-11-00T10:27:49.450Z
description: Last part of the Unit Test Now Series. We will go through the best
  practices and principles in the all-time classic the Pragmatic Programmer. The
  principles have been tried and tested and it enables programmers to write
  reliable clean quality code.
category: Software
tags:
  - Unit Test
  - Testing
---

## Test is the first user of code

Many of us, including me, have always thought the only reason we write tests is to ensure the correctness of the code. While that is indeed true, a more important reason is:

> Testing is **vital feedback** that guides your coding.

In other words, testing helps you **code better**, period. Let's use some code examples to see how that is true.

Suppose we want to write a function that withdraws money from a user's bank account and first let's see how neglecting testing before we code can be a mess. We will work with the following class and method definitions.

```typescript
class BankAccount:
  constructor(user: User, balance: number) {
    this.user = user;
    this.balance = balance;
  }

  withdraw(amount: number) {
  // ...add implementation here
  }
```

### What happens if I neglect tests before I code?

Straight away, we may only write `this.balance -= amount;` in the `withdraw` method and call it a day. But what about the **boundary condition**, what happens if the balance is 0? Okay, we will throw an error when that's the case. Then we will have:

```javascript
// ...class definition
withdraw(amount: number) {
  if (this.balance == 0)
    throw new Error('Cannot withdraw, balance is 0');

  this.balance -= amount;
}
```

However, we are still not done; there are a few more cases we have to consider, for example, what happens if the amount we are withdrawing is larger than the current balance and how do you deal with a negative amount?

As you can see, there are many cases to cover for a seemingly simple function. If you try to add a new conditional check each time after your user crashes the app, it will be costly and disastrous. Let's see how thinking about tests first is better.

### Benefits of thinking tests before you code

> If you think about testing boundary conditions and how that will work before you start coding, you may well find the patterns in the logic that'll simplify the function.

## <a name='tdd' style='border:none;'>Test-Driven Development (TDD)</a>

### <a name='tdd-basic-cycle' style='border:none;'>The basic cycle</a>

TDD suggests writing the tests upfront before we start implementing the functions. The **basic cycle** of _TDD_ is:

> 1. **Decide** on a small piece of functionality you want to add.
> 2. Write a test that will pass once that functionality is implemented.
> 3. Run all tests. Verify that the **only failure** is the one you just wrote.
> 4. Write the smallest amount of code needed to get the test to pass and verify that the tests now run cleanly.
> 5. **Refactor** your code: see if there is a way to improve on what you just wrote (the test or the function). Make sure the tests still pass when you're done.

Let's put the steps into practice, suppose we want to define a function that checks if two words are anagrams, we say string `s1` is an [anagram](https://en.wikipedia.org/wiki/Anagram) of string `s2` if we can rearrange the letters of `s1` to make it the same as `s2`. Initially, we will make the function always return `false`. Here is the start:

```python
def is_anagram(s1, s2):
	return False
```

We will also setup the test suite, I am using the built-in Python unit testing framework `unittest`, refer to its [official documentation](https://docs.python.org/3/library/unittest.html) for more details such as how to run tests:

```python
class TestIsAnagram(unittest.TestCase):
	def test_is_anagram(self):
		is_anagram_true = is_anagram('app', 'pap')
		self.assertEqual(is_anagram_true, True)
```

The test will fail because currently `is_anagram` always returns `False` even though `app` is an anagram of `pap`. Now let's think about how to implement `is_anagram`. A simple algorithm is first to **count the frequencies** of occurrences of the letters in the first word and the second word. If both words have the **same unique characters** and the occurance frequency of each character is the same, then the pair is an anagram. Therefore, we want to create two more methods to complete `is_anagram`. Let's define the two stub functions `char_counter` and `is_counter_equal` and modify our original function body:

```python
def char_counter(s):
	pass

def is_counter_equal(c1, c2):
	pass

def is_anagram(s1, s2):
	counter_one = char_counter(s1)
	counter_two = char_counter(s2)

	return is_counter_equal(counter_one, counter_two)
```

Let's also test the two new functions in our existing test suite.

```python
class TestIsAnagram(unittest.TestCase):
	def test_char_counter(self):
		word_one = 'app'
		counter_one = char_counter(word_one)
		expected_counter_one = { 'a': 1, p': 2 }
		self.assertEqual(counter_one, expected_counter_one)

	def test_is_counter_equal(self):
		c1 = char_counter('grand')
		c2 = char_counter('drang')
		self.assertFalse(is_counter_equal(c1, c2))

	def test_is_anagram(self):
		is_anagram_true = is_anagram('app', 'pap')
		self.assertEqual(is_anagram_true, True)
```

Right now, all three test methods will fail because the two helper functions have not been implemented. However, I hope you can see the we have modularized the `is_anagram` function which makes it clean and easy to understand. This result is exactly one of the benefits of being test-driven. It also enables us to break a non-trivial problem to smaller pieces of functions that would be easier to implement. Let's implement the helper functions.

Firstly, let's finish `char_counter`, we will make use of a dictionary which will help us store the frequencies of each letter of the word. Then we iterate through the word character by character, increment the count if the character exists; otherwise, we insert it into the dictionary. This results in:

```python
def char_counter(s):
	counter = {}
	for char in s:
		if char not in counter:
			counter[char] = 1
		else:
			count[char] += 1

	return counter

# note: for those interested, this function can be
# achieved using the built-in Python package
# collections and we can use the Counter class it has

# e.g. collections.Counter(s) will also give the character frequency counts of the word.
```

The `test_char_counter` test method will now pass.

Next, let's implement the `is_counter_equal` function. `==` does the job, because Python will do the key-value pair comparison for us. However, the function is not complex, so we can implement it just for fun:

```python
def is_counter_equal(c1, c2):
	if len(c1) != len(c2):
		return False

	for char in c1:
		if char not in c2 and c1[char] != c2[char]:
			return False

	return True
```

Now, after running the test suites, it will give us the green tick. Note although I haven't followed the exact steps of the [TDD cycle](#tdd-basic-cycle) outlined above, the idea is the same, which is to be test-driven, write the tests first and think about what steps of the implementation we can refactor to a separate function, which results in clean code at the end.

### Be aware of the traps and pitfalls

When you start doing TDD, you may become obsessed with the "green ticks". As authors put it:

> People become slaves to TDD.

What that means is sometimes people write many unnecessary tests. Here is a paraphrase example from the book:

> Before writing a class for the first time, they will write a failing test that references the class's name. It fails, then they write an empty class definition, and it passes. But now you have a test that does **absolutely nothing**; the next test you write will also reference the class, and so it **makes the first unnecessary**

Therefore, we mustn't write trivial tests such as simply checking the name of the class. Instead, we want to focus on the functionality, use cases and correctness of a function, a class or a component.

## Summary

1. By thinking tests before you start a single line of code, it helps you come up with a **more correct, clean and modularized** solution.
2. TDD is powerful when you **have a direction** in mind, and it even may help you find it. Because by definition of test-driven, you first need to decide what your function or class does, then you come up with respective tests that cover most of its use cases. In the [is_anagram](#tdd) above, I decide what the function does, how I want to implement it, then use two helper functions to complete the implementation.

- Note: all the quotes used in the article are from the [Pragmatic Programmer](https://en.wikipedia.org/wiki/The_Pragmatic_Programmer), 2nd Edition.
