console.log("shaderplay 1");

setInterval(()=>{
    getText();
}, 1000);

function getText() {
    let ta = document.getElementById("tarea");
    console.log("G" + ta.value);
}

let SHADERPLAY = null;
export default SHADERPLAY;
