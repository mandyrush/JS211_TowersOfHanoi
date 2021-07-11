'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  // Your code here
  // Remove the last disc in the startStack and add it to the top of the endStack
  let piece = stacks[startStack].pop();
  stacks[endStack].push(piece);
}

const stackHasDisc = (stack) => {
  return stacks[stack].length !== 0;
}

const validStackEntry = (startStack, endStack) => {
  return (startStack === 'a' || startStack === 'b' || startStack === 'c') && (endStack === 'a' || endStack === 'b' || endStack === 'c');
}

const validBlockMove = (startStack, endStack) => {
  // Get the value of the last block in the stacks
  let startBlockPosition = stacks[startStack].length - 1;
  let startBlockValue = stacks[startStack][startBlockPosition];

  let endBlockPosition = stacks[endStack].length - 1;
  let endBlockValue = stacks[endStack][endBlockPosition];

  // Make sure the stack you are moving to is empty or the block that you are moving to is bigger 
  // than the block you are moving
  if(!stackHasDisc(endStack)) {
    return true;
  } else {
    return startBlockValue < endBlockValue;
  }
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  // Make sure the startStack is not empty so it has a disc to move
  // Check to see if the startStack and endStack values are either 'a', 'b', or 'c'
  // Make sure larger discs can't move on top of smaller discs
  return validStackEntry(startStack, endStack) && stackHasDisc(startStack) && validBlockMove(startStack, endStack);
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  // You win the game when Stack B or Stack C has all of the discs from largest to smallest starting at the bottom
  let stackBString = stacks['b'].join(',');;
  let stackCString = stacks['c'].join(','); 

  return stackBString === '4,3,2,1' || stackCString === '4,3,2,1';
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  if(isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    if(checkForWin()) {
      return true;
    }
  } else {
    console.log('That move was not legal, please make a legal move');
  }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      if(towersOfHanoi(startStack, endStack)) {
        console.log('You Win!!!');
      }
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
    it('should make sure only a b or c is entered', () => {
      assert.equal(isLegal('m', 'd'), false);
    });
    it('should make sure the startStack is not empty', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('b', 'c'), false);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
