/*
const bar = () => console.log('bar');
const baz = () => console.log('baz');
const foo = () => {
    console.log("foo");
    setTimeout(bar, 0);
    new Promise ((resolve, reject) => resolve('promise'))
        .then ( resolve => console.log(resolve))
        baz();
};
foo();
*/

/*
let promise = new Promise(function(resolve, reject) {
    resolve(1);
    setTimeout(()=>resolve(2), 1000);
});
promise.then(alert);
*/

/*
let counter = 0;

 class test {
    async SerialReduceFlow(jobs) {
        let finalResult = await jobs.reduce(async (total, job) => {
            return await total + await this.doJob(job, job);
        }, 0);
        console.log(finalResult);
    };

    doJob(job1, job2) {
        return new Promise((resolve)=>{
            counter++;
            console.log(counter);
            resolve(2);
        });
    }
    Serial2(jobs) {        

        jobs.reduce( (total, job) => {

        });
        Promise.all(jobs => {
            this.doJob();
        })
    }
 }
*/
//await Promise.all([]) //executes in parallel
 //new test().SerialReduceFlow([1,2,5,6,]);
 //new test().Serial2([2,3,6,61,,1,3]);
 
/*
 console.log( 0.1 + 0.2);
 console.log( 0.1 + 0.2 === 0.3 );

 for ( var i=0; i< 5; i++) {
     var btn = document.createElement('button');
     btn.appendChild(document.createTextNode('Button ' + i));
     btn.addEventListener('click', function() {console.log(i);})
     document.body.appendChild(btn);
 }

 */
const d = (d,e)=> d - e;
 let res = [125,5,4,12,2,3,6,6,5,3,7]
    .sort(d)
    .filter(n=>1-n%2)
    .map(n=>n*2)
    //.reduce((x,y) =>(x + y)< 100, 0);
 console.log(res);
 let res2 = [125,5,4,12,2,3,6,6,5,3,7]
    .filter(item=>{return item> 11})
 console.log(res2);

 