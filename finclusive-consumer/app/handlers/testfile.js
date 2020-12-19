// function hello() { console.log('hello');return "Hello" };
// console.log('outsidscript')
// hello();

//const { waitForDebugger } = require("inspector");

// async function hello() { console.log('hello');console.log('hello');console.log('hello');console.log('hello');return "Hello" };
// console.log('outsidscript begin');
// hello();
// console.log('outsidscript end');

// let hello = async function() { console.log('hello');return "Hello" };
// console.log('outsidscript begin')
// hello();
// console.log('outsidscript end');

// let hello = async()=>{console.log('hello');return "Hello"};
// console.log('outsidscript begin')
// hello();
// console.log('outsidscript end');
// var var1 = {};
// var1.fetch(()=> {console.log('fetch');});

  
 
//  //fetch('wwww.google.com',callback).then(function (success){return 'success'}); 

// var name = {firstName:"John", lastName:"Doe", age:50, office: function(url,callback){}, call: function(){console.log(this.firstName+" "+ this.lastName)}};
// name.call();
// name.office('url',()=>{console.log("office")});

// var nam = new name();
// name.office;

// function Person(first, last, age, eye,say) {
//     this.firstName = first;
//     this.lastName = last;
//     this.age = age;
//     this.eyeColor = eye;
//     this.say = say;
     
//     }
//     function study(){
//         console.log(this.firstName+' '+'I am studying');
//     }
  
// var p = new Person('Asha','Manju',12,'brown', ()=>{setTimeout(()=>{console.log("Hi there Asha")},5000) });
// p.say();
// console.log("Before")
// console.log("After");


// function a(cb){
//     setTimeout(function(){
//         console.log('calling a');
//         cb();
//     },1000);
    

// }

// a(()=>{console.log('a is done');});

/*
*Promise basic example
New Promise Constructor, Resolve and Reject are return params.
On calling resolve or reject the promise is fullfilled or rejected
Synchronous & basic syntac
Catch on Reject or exception in Promise outside timeout
Finally always
If return is mentioned there there is value if not return is undefined payload
*/
// const promiseA = new Promise((resolve,reject)=>{
//     console.log("Inside PromiseA");
//     setTimeout(function(){
//         resolve ('result of a()');
//     },0);
//     setTimeout(function(){
//         reject('error of a()');
//     },0);
   
    
// });


// promiseA.then((result)=>{console.log('Result of A',result)})
//                         .catch((error)=>{console.log('Error of A',error)})
//                         .finally(()=>{console.log('Completed')});


/*
*End

*/
/*
*Second function inside promise means reject
*/

// const promiseA = new Promise((resolve,reject)=>{
//     console.log("Inside PromiseA");
//     setTimeout(function(){
//         resolve ('result of a()');
//     },0);
//     setTimeout(function(){
//         reject('error of a()');
//     },0);
   
    
// });
//promiseA.then((result)=>{console.log('Result of A',result)},(error)=>{console.log('Error of A',error)})
//                        .finally(()=>{console.log('Completed')});

/*
*End
*/



/*
*Failure inside promise ( outside setTimeout will automaically call catch
*/
// promiseB = new Promise((resolve,reject)=> i++);
// promiseB.then((result)=>{console.log('Result of A',result)})
//                         .catch((error)=>{console.log('Error of A',error)})
//                         .finally(()=>{console.log('Completed')});
// console.log('Hello');
/*
*End
*/

/*
*It can also return a promise
*/
// Promise.resolve('Resolve Data').then((result)=>{
//     console.log("Inside promise111");
//     return new Promise((resolve,reject)=>{
//         console.log("inside Promise222");
//             setTimeout(function(){
//                 resolve ('result of a()');
//             },0);
//             setTimeout(function(){
//                 reject('error of a()');
//             },0);
           
            
//         }).then((result=>{console.log("Final answer is ", result)}));
// });
/*
*End
*/

/*
*Promise Chaining - Option1
*/

// const a = ()=>  new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         console.log('Executing A');
//         resolve("Inside Promise a")
//     ,3000})
// });

// const b = ()=> new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         console.log('Executing B');
//         resolve("Inside Promise b")
//     ,2000})
// });

// const c = ()=>  new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         console.log('Executing C');
//         resolve("Inside Promise c")
//     ,1000})
// });

// a()
// .then((result)=>{
//     console.log("A",result);
//     b().then((result)=>{
//         console.log("B",result);
//         c().then((result)=>{
//             console.log("C",result);
//         })
//         .catch( (error)=>{
//             console.log("C", error);  
//         });
//     })
//     .catch( (error)=>{
//         console.log("B", error);  
//     })
//     .catch( (error)=>{
//         console.log("A", error);  
//     });
// })
//     .catch((error)=>{console.log('Error',error)});

/*
*End
*/

/*
*Promise Chaining - Option2
*/

/*
*End
*/

/*
*Asynch Await
*/

// const a = ()=>  new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//            resolve("Inside Promise a")
//     ,3000})
// });
// async function myFunction() {
//     console.log( 'Before' );
//     var result = await a();
//     console.log( "Result is", result );
//     console.log( 'After' );
//  }

//   function myFunction1() {
//     console.log( 'Before1 ' );
//     var result = a();
//     console.log( "Result is 1 ", result );
//     console.log( 'After 1 ' );
//  }
//  myFunction(); // returns a promise
//  myFunction1(); // returns a promise

/*
*Asynch Await
*/

/*
*End
*/
const a = ()=>  new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('Executing Promise A');
        resolve("Inside Promise a")
    ,3000})
});

const b = ()=> new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('Executing Promise B');
        resolve("Inside Promise b")
    ,0})
});

const c = ()=>  new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('Executing Promise C');
        resolve("Inside Promise c")
    ,1000})
});

const doJobs = async()=>{
    console.log('1');
    var resultA = await a();
    console.log('2');
    var resultB =  b();
    console.log('3');
    var resultC = await c();
  
    console.log('4');
    return[resultA,resultB,resultC];
}

doJobs().then((result)=>{
    console.log("Result is ", result);
    })
    .catch( (error) =>{
        console.log("Error is ", error);
    });

/*
*End
*/
