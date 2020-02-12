bob = 2;
function test(e){
    potato = e + 1 + bob;
    var potato;
    setTimeout(()=>{        
        console.log(potato * 2);
    }, 0);
    return potato;
}
var bob;
console.log(test(5));