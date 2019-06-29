# js tactics

learn js by making the test pass (TDL - Test Driven Learning)

## getting started

`$ cd code`

`$ git clone https://github.com/nikfrank/js-tactics`

`$ cd js-tactics`

`$ npm install`

`$ npm run test`

---

now open up `./src/exercises.js`

in it you'll find names for the functions and the requirements to pass each test

the names and exports are already set up, you just need to write the function! (replace `null` each time with a function)

then jest will run the test and tell you if you've passed (jest is running from `npm run test`)

eg

```js
export const subtract = null;
// here we'll receive two numbers, we need to return the first minus the second
// example input: (4, 20)
// example output: -16
```

we should write

```js
export const subtract = (num1, num2)=> num1 - num2;
```

to pass the test


the example input and output should help you understand what the requirements are!


good luck!!!



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

