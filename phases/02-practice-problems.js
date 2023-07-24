const HashTable = require("../phases/01-implementation");

function anagrams(str1, str2) {
  if (str1.length !== str2.length) return false;
  const hashTable = new HashTable(str1.length);
  for (let i = 0; i < str1.length; i++) {
    if (hashTable.read(str1[i]) !== undefined) {
      const count = hashTable.read(str1[i]) + 1;
      hashTable.insert(str1[i], count);
    } else {
      hashTable.insert(str1[i], 1);
    }
  }
  for (let i = 0; i < str2.length; i++) {
    if (hashTable.read(str2[i]) === undefined) return false;
  }
  return true;
}


function commonElements(arr1, arr2) {
  const resultArr = [];
  const cache = {};
  for (let i = 0; i < arr1.length; i++) {
    cache[arr1[i]] = (cache[arr1[i]] || 0) + 1;
  }
  for (let i = 0; i < arr2.length; i++) {
    if (cache[arr2[i]] !== 0) {
      resultArr.push(arr2[i]);
      cache[arr2[i]] -= 1;
    }
  }
  return resultArr;
}


function duplicate(arr) {
  const set = new Set();
  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) return arr[i]
    set.add(arr[i])
  }
}

function twoSum(nums, target) {
  const otherNum = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (otherNum.has(target - nums[i])) return true;
    otherNum.add(nums[i]);
  }
  return false;
}


function wordPattern(pattern, strings) {
  // Your code here
  const lettersSet = new Set();
  const stringsSet = new Set();
  for (let i = 0; i < pattern.length; i++) {
    lettersSet.add(pattern[i]);
  }
  for (let i = 0; i < strings.length; i++) {
    stringsSet.add(strings[i]);
  }
  return lettersSet.size === stringsSet.size;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
