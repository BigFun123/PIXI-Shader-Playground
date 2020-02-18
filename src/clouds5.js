export let frag = "";
$.get("./src/shaders/clouds.glsl", (text)=>
  {  
    frag = text;
    BuildShader();
  }
);

const app = new PIXI.Application();
let ren = document.getElementById("renderer"); 
ren.appendChild(app.view);
var stage = app.stage;

var bg = null;

var width = 800 ;
var height = 600;

    var uniforms = {
      iResolution:[320,240],
      iGlobalTime:10,
      iMouse:[5,5],
       time:0.1,
       mouse:[0,0.5]
      };
 
      let frag2 = `
      uniform vec2 mouse;
      uniform float time;
      void main(void){
        vec2 uv = gl_FragCoord.xy;
        vec4 color = vec4(mouse.x,0,0,1);
        gl_FragColor = color;
      }`;

var count =0;
app.ticker.add((delta)=>{
      //console.log(delta);
      count += delta;
      uniforms.time=Math.sin(count);
      uniforms.iGlobalTime=(count * 0.01);
      var mouse;
      app.stage.interactive = true;
      app.stage.on("pointermove", updatemouse);           
  });

  function updatemouse(e) {
    uniforms.mouse.x = e.data.global.x / 1024.;
    uniforms.mouse.y = e.data.global.y / 1024.;
    uniforms.iMouse = [e.data.global.x * 0.1, e.data.global.y * 0.1];
}


export function SetFrag(text) {
  frag = text;
  BuildShader();
}      
function BuildShader() {
  
      let vert = null;
      var shader = new PIXI.Filter(vert, frag, uniforms);
      
    if ( bg == null ){
      bg = PIXI.Sprite.fromImage("https://s3-us-west-2.amazonaws.com/s.cdpn.io/167451/test_BG.jpg");
      bg.width = width;
      bg.height = height;
      
      stage.addChild(bg);
    }

    bg.filters = [shader];
      

      
      
}      
 
      
      