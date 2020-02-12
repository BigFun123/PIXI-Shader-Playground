const app = new PIXI.Application();
document.body.appendChild(app.view);
var stage = app.stage;

var width = window.innerWidth / 2;
var height = window.innerHeight / 2;

console.log(5);

    var uniforms = {
      iResolution:[320,240],
      iGlobalTime:10,
      iMouse:[5,5],
       time:0.1,
       mouse:[0,0.5]
      };
      
var frag  =
        `precision mediump float;
        uniform vec2 iResolution;
        uniform float iGlobalTime;
        uniform vec2 iMouse;

        float hash( float n ) {
          return fract(sin(n)*43758.5453);
        }
        
        float noise( in vec3 x ) {
          vec3 p = floor(x);
          vec3 f = fract(x);
          f = f*f*(3.0-2.0*f);
          float n = p.x + p.y*57.0 + 113.0*p.z;
          return mix(mix(mix( hash(n+  0.0), hash(n+  1.0),f.x),
                         mix( hash(n+ 57.0), hash(n+ 58.0),f.x),f.y),
                     mix(mix( hash(n+113.0), hash(n+114.0),f.x),
                         mix( hash(n+170.0), hash(n+171.0),f.x),f.y),f.z);
        }
        
        vec4 map( in vec3 p ) {
         float d = 0.2 - p.y;
          vec3 q = p - vec3(1.0,0.1,0.0)*iGlobalTime;
          float f;
          f  = 0.5000*noise( q ); q = q*2.02;
          f += 0.2500*noise( q ); q = q*2.03;
          f += 0.1250*noise( q ); q = q*2.01;
          f += 0.0625*noise( q );
          d += 3.0 * f;
          d = clamp( d, 0.0, 1.0 );
          vec4 res = vec4( d );
          res.xyz = mix( 1.15*vec3(1.0,0.95,0.8), vec3(0.7,0.7,0.7), res.x );
          return res;
        }      
        vec3 sundir = vec3(-1.0,0.0,0.0);
        
        vec4 raymarch( in vec3 ro, in vec3 rd ) {
          vec4 sum = vec4(0, 0, 0, 0);
          float t = 0.0;
          for(int i=0; i<64; i++) {
            if( sum.a > 0.99 ) continue;
      
            vec3 pos = ro + t*rd;
            vec4 col = map( pos );
              
            #if 1
              float dif =  clamp((col.w - map(pos+0.3*sundir).w)/0.6, 0.0, 1.0 );
              vec3 lin = vec3(0.65,0.68,0.7)*1.35 + 0.45*vec3(0.7, 0.5, 0.3)*dif;
              col.xyz *= lin;
            #endif
              
            col.a *= 0.35;
            col.rgb *= col.a;
            sum = sum + col*(1.0 - sum.a);
      
            #if 0
              t += 0.1;
            #else
              t += max(0.1,0.025*t);
            #endif
          }
      
          sum.xyz /= (0.001+sum.w);
          return clamp( sum, 0.0, 1.0 );
        }
        
        void main(void) {
          vec2 q = gl_FragCoord.xy / iResolution.xy;
          vec2 p = -1.0 + 2.0*q;
          p.x *= iResolution.x/ iResolution.y;
          vec2 mo = -1.0 + 2.0*iMouse.xy / iResolution.xy;
          
          // camera
          vec3 ro = 4.0*normalize(vec3(cos(2.75-3.0*mo.x), 0.7+(mo.y+1.0), sin(2.75-3.0*mo.x)));
          vec3 ta = vec3(0.0, 1.0, 0.0);
          vec3 ww = normalize( ta - ro);
          vec3 uu = normalize(cross( vec3(0.0,1.0,0.0), ww ));
          vec3 vv = normalize(cross(ww,uu));
          vec3 rd = normalize( p.x*uu + p.y*vv + 1.5*ww );
      
          
          vec4 res = raymarch( ro, rd );
      
          float sun = clamp( dot(sundir,rd), 0.0, 1.0 );
          vec3 col = vec3(0.6,0.71,0.75) - rd.y*0.2*vec3(1.0,0.5,1.0) + 0.15*0.5;
          col += 0.2*vec3(1.0,.6,0.1)*pow( sun, 8.0 );
          col *= 0.95;
          col = mix( col, res.xyz, res.w );
          col += 0.1*vec3(1.0,0.4,0.2)*pow( sun, 3.0 );
        
          gl_FragColor = vec4( col, 1.0 );
        }
      `

      let frag2 = `
      uniform vec2 mouse;
      uniform float time;
      void main(void){
        vec2 uv = gl_FragCoord.xy;
        vec4 color = vec4(mouse.x,0,0,1);
        gl_FragColor = color;
      }`;

      
      let vert = null;
      var shader = new PIXI.Filter(vert, frag, uniforms);
      
      var bg = PIXI.Sprite.fromImage("https://s3-us-west-2.amazonaws.com/s.cdpn.io/167451/test_BG.jpg");
      bg.width = width;
      bg.height = height;
      bg.shader = shader;
      stage.addChild(bg);
      
      app.loader
      .add("bunny", "../bunny.png")
      .load((loader, resources)=>{
          const bunny = new PIXI.Sprite(resources.bunny.texture);
          bunny.scale.set(1.1,1.1);
          bunny.position.set(0, 0);
          bunny.filters = [shader]
          app.stage.addChild(bunny);
      })
  
      var count =0;
      app.ticker.add((delta)=>{
            //console.log(delta);
            count += delta;
            uniforms.time=Math.sin(count);
            uniforms.iGlobalTime=(count * 0.01);
            var mouse;
            app.stage.interactive = true;
            app.stage.on("pointermove", updatemouse);
           // mouse = app.interaction.InteractionManager.mouse.getMousePosition();
           /*
            if (mouse.x > 0 && mouse.y > 0) {  // If mouse is over stage
                shader.uniforms.iMouse.value = {
                x: mouse.x,
                y: mouse.y
                };
            };
            */
        });

        function updatemouse(e) {
            uniforms.mouse.x = e.data.global.x / 1024.;
            uniforms.mouse.y = e.data.global.y / 1024.;
            uniforms.iMouse = [e.data.global.x * 0.1, e.data.global.y * 0.1];
        }
  


        var count = 0;
      
      
 
      
      