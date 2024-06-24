console.log('1');
Promise.resolve(2).then((res) => {
    console.log(res);
    Promise.resolve(7).then(res => {
        console.log(res);
    });
});
Promise.resolve(8).then(res => console.log(res));
console.log('3');

async function fn1() {
    console.log('4');
    await fn2();
    setTimeout(() => {
        console.log('5');
    }, 0);
    Promise.resolve(9).then(res => console.log(res));
}

fn1();

async function fn2() {
    console.log('6');
}

setTimeout(() => {
    console.log('10');
}, 0);

