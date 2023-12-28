export class Cipher {
	constructor(key) {
		this.alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 
		'w', 'x', 'y', 'z'];
		if (typeof key === 'undefined') {
			this.key = ''
			for (let x = 0; x < 100; x++) {
				this.key += (this.alphabetArray[Math.floor(Math.random()*this.alphabetArray.length)]);	
			}
		} else if (key.length !== 0) {
			for (let i = 0; i < key.length; i++){
				if (key[i] < 'a' || key[i] > 'z') {
					throw 'Bad key';
				}
			}
			this.key = key;
		} else {
			throw 'Bad key';
		}
	}
	encode(toEncode) {
		return this.loop(this.doEncode.bind(this), toEncode);
	}
	decode(toDecode) {
		return this.loop(this.doDecode.bind(this), toDecode);
	}
	loop(code, originalWord) {
		let word = ''
		this.key = this.key.repeat(originalWord.length);
		for (let j = 0; j < originalWord.length ; j++) { 
			word += code(originalWord[j], this.key[j])
		}
		return word;
	}
	doEncode(letter, keyLetter) {
		if (this.alphabetArray.indexOf(letter) + this.alphabetArray.indexOf(keyLetter) <= this.alphabetArray.length-1) {
			return this.alphabetArray[this.alphabetArray.indexOf(letter) + this.alphabetArray.indexOf(keyLetter)];
		} else {
			return this.alphabetArray[this.alphabetArray.indexOf(letter) + this.alphabetArray.indexOf(keyLetter) - this.alphabetArray.length];
		}
	}
	doDecode(letter, keyLetter) {
		if (this.alphabetArray.indexOf(letter) - this.alphabetArray.indexOf(keyLetter) >= 0) {
			return this.alphabetArray[this.alphabetArray.indexOf(letter) - this.alphabetArray.indexOf(keyLetter)]; 
		} else {
			return this.alphabetArray[this.alphabetArray.indexOf(letter) - this.alphabetArray.indexOf(keyLetter) + this.alphabetArray.length];
		}
	}
};
