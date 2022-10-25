const { assert } = require("chai");

function upArray(arr) {
	let result = [...arr];
	let len = result.length;

	if(len == 0) {
		return [];
	}
	else if(result[len-1]+1 < 10) {
		result[len-1]++;
	}
	else {
		result[len-1] = 0;
		let carry = 1;
		for(let i=len-2; i>=0; i--) {
			if(result[i]+carry > 9) {
				result[i] = 0;
			}
			else {
				result[i] += carry;
				carry = 0;
				break;
			}
		}

		// if carry still remain 1 at the end of for loop, in case like [9, 9] => [1, 0, 0]
		if(carry === 1) {
			result.unshift(carry);
		}
	}

	return result;
}

// Below approach looks clean but it has to traverse all input elements

// function upArray(arr) {
// 	let result = [];
// 	let last_carry = arr.reverse().reduce((carry, num) => {
// 		if(carry === 0) {
// 			result.unshift(num);
// 			return 0;
// 		}
// 		else {
// 			if(num+carry > 9) {
// 				result.unshift(0);
// 				return 1;
// 			}
// 			else {
// 				result.unshift(num+carry);
// 				return 0;
// 			}
// 		}
// 	}, 1);
// 	if(arr.length > 0 && last_carry === 1) {
// 		result.unshift(last_carry);
// 	}

// 	return result;
// }

describe("Tests", () => {
	it("test", () => {
		assert.sameOrderedMembers(upArray([4, 3, 2, 5]), [4, 3, 2, 6]);
		assert.sameOrderedMembers(upArray([2, 3, 9, 9]), [2, 4, 0, 0]);
		assert.sameOrderedMembers(upArray([9, 9]), [1, 0, 0]);
		assert.sameOrderedMembers(upArray([0, 7]), [0, 8]);
		assert.sameOrderedMembers(
			upArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
			[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1]
		);
		assert.sameOrderedMembers(upArray([9]), [1, 0]);
		assert.sameOrderedMembers(upArray([1, 9]), [2, 0]);
	});
});
