#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform vec3 u_color_0;
uniform vec3 u_color_1;
uniform vec3 u_color_2;
uniform vec3 u_color_3;


void main() {

    vec2 st = gl_FragCoord.xy*2.0/u_resolution.xy;

    vec3 xmixColor = mix( u_color_1, u_color_2, st.x);
    
    vec3 ymixColor = mix( u_color_0, u_color_3, st.y);

    
    // vec3 finalColor = mix( color_01, color_02, st.y );
    
    // vec3 finalColor_02 = mix( color_01, color_02, st.y );
    
    vec3 mixColor = xmixColor*0.6 + ymixColor*0.8;
    
    vec3 finalColor_04 = mix( u_color_0, mixColor, st.y );

    

    gl_FragColor = vec4( finalColor_04 ,1.0);
}
