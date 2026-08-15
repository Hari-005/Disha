import"./rolldown-runtime-CNC7AqOf.js";import{n as e,t}from"./react-B9erjAfV.js";import{t as n}from"./compiler-runtime-B4KMrlb8.js";import{F as r,H as i,Nt as a,Pt as o,R as s,gt as c,wt as l}from"./dist-B-LO11CG.js";import{$o as u,Bo as d,Go as f,Ko as p,Ss as m,Vl as h,Xo as g,Yo as _,Zo as v,co as y,pn as b,qo as x,so as S,zo as C}from"./index2-GGDaOkqr.js";var w=e(),T=n();t(),h(),v(),g(),f(),_(),x(),p(),m(),u(),d(),C();var E=1,D=3,O=o(s).withConfig({displayName:`RootFlex`,componentId:`sc-1y8zfkj-0`})(({theme:e})=>a`
    min-height: 100%;

    @media (max-width: ${e.sanity.media[D]}px) {
      position: relative;
    }
  `),k=o(i).withConfig({displayName:`SidebarMotionLayer`,componentId:`sc-1y8zfkj-1`})(({theme:e})=>{let t=e.sanity.media;return a`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 360px;
    border-left: 1px solid var(--card-border-color);
    box-sizing: border-box;
    overflow: hidden;

    box-shadow:
      0px 6px 8px -4px var(--card-shadow-umbra-color),
      0px 12px 17px -1px var(--card-shadow-penumbra-color);

    @media (max-width: ${t[D]}px) {
      bottom: 0;
      position: absolute;
      right: 0;
      top: 0;
    }

    @media (max-width: ${t[E]}px) {
      border-left: 0;
      min-width: 100%;
      left: 0;
    }
  `});function A(e){let t=(0,T.c)(12),n=c(),{state:i}=y(),{isOpen:a}=i,o=n<=E&&a?`hidden`:`auto`,s;t[0]===e?s=t[1]:(s=e.renderDefault(e),t[0]=e,t[1]=s);let u;t[2]!==o||t[3]!==s?(u=(0,w.jsx)(r,{flex:1,height:`fill`,overflow:o,children:s}),t[2]=o,t[3]=s,t[4]=u):u=t[4];let d;t[5]===a?d=t[6]:(d=a&&(0,w.jsx)(k,{zOffset:100,height:`fill`,children:(0,w.jsx)(b,{})}),t[5]=a,t[6]=d);let f;t[7]===d?f=t[8]:(f=(0,w.jsx)(l,{initial:!1,children:d}),t[7]=d,t[8]=f);let p;return t[9]!==u||t[10]!==f?(p=(0,w.jsxs)(O,{sizing:`border`,height:`fill`,children:[u,f]}),t[9]=u,t[10]=f,t[11]=p):p=t[11],p}function j(e){let t=(0,T.c)(4),{enabled:n}=S();if(!n){let n;return t[0]===e?n=t[1]:(n=e.renderDefault(e),t[0]=e,t[1]=n),n}let r;return t[2]===e?r=t[3]:(r=(0,w.jsx)(A,{...e}),t[2]=e,t[3]=r),r}export{j as TasksStudioActiveToolLayout};