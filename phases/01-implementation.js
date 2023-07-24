class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets;
    this.count = 0;
    this.data = new Array(numBuckets).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    const index = this.hashMod(key);
    const pair = new KeyValuePair(key, value);
    if (this.data[index] === null) {
      this.count++;
      this.data[index] = pair;
    } else {
      let curr = this.data[index]
      let keyExists = false;
      while (curr !== null) {
        if (curr.key === key) {
          keyExists = true;
          curr.value = value;
        }
        curr = curr.next;
      }
      if (!keyExists) {
        this.count++;
        const temp = this.data[index]
        pair.next = temp;
        this.data[index] = pair;
      }
    }
  }


  read(key) {
    const index = this.hashMod(key);
    if (this.data[index] === null) return undefined;
    let curr = this.data[index];
    while (curr !== null) {
      if (curr.key === key) {
        return curr.value;
      }
      curr = curr.next;
    }
    return undefined;
  }


  resize() {
    const temp = this.data;
    this.count = 0;
    this.capacity = this.capacity * 2;
    this.data = new Array(this.capacity).fill(null);
    for (let i = 0; i < temp.length; i++) {
      let curr = temp[i];
      while(curr !== null) {
        this.insert(curr.key, curr.value);
        curr = curr.next;
      }
    }
  }


  delete(key) {
    const index = this.hashMod(key);
    if (this.data[index] === null) return 'Key not found'
    let curr = this.data[index];
    let prev = {};
    prev.next = null
    while (curr !== null) {
      if (curr.key === key) {
        this.count--;
        if(prev.next === null) {
          this.data[index] = curr.next;
        } else {
          this.data[index] = prev.next;
          this.data[index].next = curr.next;
        }
      }
      prev.next = new KeyValuePair(curr.key, curr.value);
      curr = curr.next;
    }
    //code will get here when the element at index is not null but key not found
    return 'Key not found'

  }
}


module.exports = HashTable;
