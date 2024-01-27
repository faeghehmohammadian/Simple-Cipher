const ABC = 'abcdefghijklmnopqrstuvwxyz';
const CODE_A = ABC.charCodeAt(0);
export class SimpleCipher {
  constructor(public key: string = '') {
    this.key = key || this.generateKey();
  }
  encode = (input: string) => this.getCipher(input, false);
  decode = (input: string) => this.getCipher(input, true);
  private generateKey(length = 100): string {
    return Array.from(
      { length },
      () => ABC[Math.floor(Math.random() * ABC.length)]
    ).join('');
  }
  private getCipher(input: string, isReverse = false): string {
    const res: string[] = [];
    let keyPosition = 0;
    const shiftMultiplier = isReverse ? -1 : 1;
    for (let i of input) {
      const charIndex = i.charCodeAt(0) - CODE_A;
      const shift = this.key.charCodeAt(keyPosition % this.key.length) - CODE_A;
      const newCode =
        CODE_A +
        ((ABC.length + charIndex + shiftMultiplier * shift) % ABC.length);
      res.push(String.fromCharCode(newCode));
      keyPosition++;
    }
    return res.join('');
  }
}
