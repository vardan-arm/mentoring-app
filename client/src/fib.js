const fib = (num, prevValues = []) => {
  let res = 0;

  if (num < 0) {
    // return 0;
    res = 0;
    // console.log(prevValues);
  } else if (num === 1) {
    res = 1;
  } else {
    res = fib(num - 1, prevValues) + fib(num - 2, prevValues);
  }
  prevValues.push(res);

  return res;
}

export default fib;
