class Tester {
    bob : string;  

    constructor(t:string) {
        this.bob = "hello " + t;
        console.log(this.bob); 
    }
}

let g: Tester = new Tester("hefdegh"); 
