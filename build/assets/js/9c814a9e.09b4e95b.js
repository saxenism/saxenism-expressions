"use strict";(self.webpackChunksaxenism_personal_website=self.webpackChunksaxenism_personal_website||[]).push([[7052],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),u=p(n),g=a,f=u["".concat(l,".").concat(g)]||u[g]||m[g]||i;return n?r.createElement(f,o(o({ref:t},c),{},{components:n})):r.createElement(f,o({ref:t},c))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,o[1]=s;for(var p=2;p<i;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},8678:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const i={slug:"functions-as-params",title:"Solidity - Passing functions as parameters",authors:{name:"Rahul Saxena",title:"EVM Enjoyoor",url:"https://twitter.com/saxenism",image_url:"https://pbs.twimg.com/profile_images/1554486619914117126/7QV7CHum_400x400.jpg"},tags:["web3","language-tricks","intermediate","solidity"]},o=void 0,s={permalink:"/blog/functions-as-params",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-09-27-Solidity-Functions-As-Params.md",source:"@site/blog/2022-09-27-Solidity-Functions-As-Params.md",title:"Solidity - Passing functions as parameters",description:"Function Types",date:"2022-09-27T00:00:00.000Z",formattedDate:"September 27, 2022",tags:[{label:"web3",permalink:"/blog/tags/web-3"},{label:"language-tricks",permalink:"/blog/tags/language-tricks"},{label:"intermediate",permalink:"/blog/tags/intermediate"},{label:"solidity",permalink:"/blog/tags/solidity"}],readingTime:1.985,hasTruncateMarker:!0,authors:[{name:"Rahul Saxena",title:"EVM Enjoyoor",url:"https://twitter.com/saxenism",image_url:"https://pbs.twimg.com/profile_images/1554486619914117126/7QV7CHum_400x400.jpg",imageURL:"https://pbs.twimg.com/profile_images/1554486619914117126/7QV7CHum_400x400.jpg"}],frontMatter:{slug:"functions-as-params",title:"Solidity - Passing functions as parameters",authors:{name:"Rahul Saxena",title:"EVM Enjoyoor",url:"https://twitter.com/saxenism",image_url:"https://pbs.twimg.com/profile_images/1554486619914117126/7QV7CHum_400x400.jpg",imageURL:"https://pbs.twimg.com/profile_images/1554486619914117126/7QV7CHum_400x400.jpg"},tags:["web3","language-tricks","intermediate","solidity"]},prevItem:{title:"Solidity - Bit Packing",permalink:"/blog/bit-packing"},nextItem:{title:"Welcome",permalink:"/blog/welcome"}},l={authorsImageUrls:[void 0]},p=[{value:"Function Types",id:"function-types",level:2}],c={toc:p},u="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"function-types"},"Function Types"),(0,a.kt)("p",null,"For official documentations follow this ",(0,a.kt)("a",{parentName:"p",href:"https://docs.soliditylang.org/en/v0.8.11/types.html#function-types"},"link"),"."),(0,a.kt)("p",null,"So, in Solidity, you can pass functions themselves as parameters to other functions. These type of parameters are called function types."),(0,a.kt)("p",null,"These function types can be used to pass and return functions from function calls."))}m.isMDXComponent=!0}}]);