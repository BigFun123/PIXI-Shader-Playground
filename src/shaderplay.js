console.log("shaderplay 1");
import {SetFrag,frag} from './clouds5.js';

$(document).ready(()=>
{
    $('textarea#tarea').val(frag);
})
function getText() {
    let ta = document.getElementById("tarea");
    return ta.innerHTML;
}

$('#tarea').bind('input propertychange', function() {

    SetFrag( $('textarea#tarea').val());
});

let SHADERPLAY = null;
export default SHADERPLAY;
