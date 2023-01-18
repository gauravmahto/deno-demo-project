async function test() {

  return new Promise(res => setTimeout(res, 1000, '2.ts - Call complete'));

}

console.log('2.ts - Before call')
console.log(await test());
console.log('2.ts - After call')
