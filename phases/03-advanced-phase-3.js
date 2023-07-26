//Kth most frequent
const kth = (string, num) => {
  const charCount = {};
  const countArr = [];
  for (let i = 0; i < string.length; i++) {
    charCount[string[i]] = (charCount[string[i]] || 0) + 1;
  }
  for (let char in charCount) {
    countArr.push([char, charCount[char]])
  }
  countArr.sort((a, b) => a[1] > b[1]);
  return countArr[num - 1][0];
}
//Time: O(N)
//Space: O(N)
console.log(kth('aaabbc', 1));//  => 'a'
console.log(kth('aaabbc', 2));//  => 'b'
console.log(kth('aaabbc', 3));//  => 'c'



//New Alphabet
const newAlphabet = (string, alphabetStr) => {
  const alphabetObj = {};
  for (let i = 0; i < alphabetStr.length; i++) {
    alphabetObj[alphabetStr[i]] = i;
  }
  let currNum = alphabetObj[string[0]];
  for (let i = 1; i < string.length; i++) {
    const numNow = alphabetObj[string[i]]
    if (currNum > numNow) return false;
    else currNum = numNow;
  }
  return true;
}
//Time: O(M + N)
//Space: O(N)
console.log(newAlphabet('dino', 'abcdefghijklmnopqrstuvwxyz'));           // => true
console.log(newAlphabet('leetcode', 'abcdefghijklmnopqrstuvwxyz'));       // => false
console.log(newAlphabet('leetcod', 'labefghijkmnpqrstucvowxdyz'));        // => true



//longestPalindrome
const longestPalindrome = string => {
  const charCount = {}
  let evenSum = 0;
  let oddPresent = false;
  let oddHighestCount = 1;
  for (let i = 0; i < string.length; i++) {
    charCount[string[i]] = (charCount[string[i]] || 0) + 1;
  }
  for (let char in charCount) {
    if (charCount[char] % 2 === 0) evenSum += charCount[char];
    if (charCount[char] % 2 !== 0) {
      oddPresent = true;
      if (charCount[char] > oddHighestCount) {
        oddHighestCount = charCount[char];
      }
    }
  }
  if (oddPresent) {
    return evenSum + oddHighestCount;
  } else {
    return evenSum;
  }
}
//Time: O(N)
//Space: O(N)
console.log(longestPalindrome("abccccddddd"));     //  => 9 because the palindrome "dccaccd" can be built.

//longestSubstr
const longestSubstr = str => {
  const unique = {}
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    if (unique[str[i]] === undefined) {
      unique[str[i]] = 1;
    } else {
      break;
    }
  }
  for (let key in unique) {
    sum += 1;
  }
  return sum;
}
//Time: O(N)
//Space: O(N)
console.log(longestSubstr("abcabcbb"));      // => 3, where the longest substring is "abc"
console.log(longestSubstr("bbbbb"));         // => 1, where the longest substring is "b"



//Max Subarray Length
const maxSubarr = arr => {
  let maxLength = 0;
  //get unique numbers from array
  const numSet = new Set(arr);
  //store frequency of each number in array
  const frequency = {}
  for (let num of arr) {
    frequency[num] = (frequency[num] || 0) + 1;
  }
  //iterate thru each num in numSet
  for (const num of numSet) {
    //declare currentLength add curr num's frequency to it
    let currentLength = frequency[num];
    maxLength = Math.max(maxLength, currentLength)
    //if current number's neighbor is in the numSet
    if ((numSet.has(num + 1))) {
      //add neighbor's frequency if available (otherwise, add 0)
      currentLength += frequency[num + 1] || 0;
      maxLength = Math.max(maxLength, currentLength)
    }
    if ((numSet.has(num - 1))) {
      //currentLength is reset here in case num + 1 is also present above.
      //Note that the difference between num + 1 and num - 1 is 2 (we want the difference to be at most 1).
      currentLength = frequency[num];
      currentLength += frequency[num - 1] || 0;
      maxLength = Math.max(maxLength, currentLength)
    }
    //get max length so far.
  }
  return maxLength;
}

console.log(maxSubarr([1,3,2,2,5,2,3,7]));  // => 5 because the longest subarray is [3,2,2,2,3]
console.log(maxSubarr([1,1,1,1,3]));     // => 4 because the longest subarray is [1,1,1,1]


//Coin Change
const coinChange = (array, num) => {
  if (num === 0) return 0;
  let totalCoins = 0;
  const coinCount = {};
  let allDenoLarge = true;
  for (const coin of array) {
    if (coin <= num) {
      allDenoLarge = false;
      coinCount[coin] = 0;
    }
  }
  if (allDenoLarge) return -1;
  while(Object.keys(coinCount).length !== 0) {
    const largestDeno = Math.max(...Object.keys(coinCount));
    if (num - largestDeno < 0) {
      totalCoins += coinCount[largestDeno];
      delete coinCount[largestDeno];
    } else {
      coinCount[largestDeno] += 1;
      num = num - largestDeno;
    }
  }
  return totalCoins;
}
//Time: O(N)
//Space: O(N)

const coins = [1, 5, 10, 25];
const coins2 = [5];
console.log(coinChange(coins, 11));      // => 2, 10 + 1 = 11
console.log(coinChange(coins2, 3));      // => -1
console.log(coinChange(coins2, 0));      // => 0)


//Climbing Steps
const climbingSteps = steps => {
  const stepsCombo = {};
  stepsCombo[0] = 1;
  stepsCombo[1] = 1;
  stepsCombo[2] = 2;
  let i = 3;
  while (i <= steps) {
    stepsCombo[i] = stepsCombo[i - 1] + stepsCombo[i - 2] + stepsCombo[i - 3]
    i++;
  }
  return stepsCombo[steps];
}

// There is 1 way to climb zero steps:
//   1. 0 steps
console.log(climbingSteps(0));  // 1

// There is 1 ways to climb one step:
//   1. 1 step
console.log(climbingSteps(1));  // 1

// There are 2 ways to climb two steps:
//   1. 1 step + 1 step
//   2. 2 steps
console.log(climbingSteps(2));  // 2

// There are 4 ways to climb three steps:
//   1. 1 step + 1 step + 1 step
//   2. 1 step + 2 steps
//   3. 2 steps + 1 step
//   4. 3 steps
console.log(climbingSteps(3));  // 4

// There are 7 ways to climb four steps:
//   1. 1 step + 1 step + 1 step + 1 step
//   2. 1 step + 1 step + 2 steps
//   3. 1 step + 2 steps + 1 step
//   4. 2 steps + 1 step + 1 step
//   5. 1 step + 3 steps
//   6. 3 steps + 1 steps
//   7. 2 steps + 2 steps
console.log(climbingSteps(4));  // 7
