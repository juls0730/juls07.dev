---
title: My 100DaysOfCode Challenge
description: A review of my 100DaysOfCode challenge
image:
  src: "/images/100DaysOfCode-overview.webp"
  alt: "How I made my site fast"
date: January 01, 2023
tags:
  - web dev
  - nodejs
---

For my #100DaysOfCode challenge on [twitter](https://twitter.com/julie4055_) I decided to make a UI framework similar to vue.js (terrible idea). For day 1 it started simple with learning about reactivity, a short read of this [great blog post](https://lihautan.com/reactivity-in-web-frameworks-the-when/) by Tan Li Hau I had a basic trackable object function in the script.js file. For day 2 I had covered a few more things in the UI framework world, I had a templating system, a basic virtualDOM-like implementation, a [different reactive prop function](https://dev.to/siddharthshyniben/implementing-reactivity-from-scratch-51op) from siddharth, and we had a basic click directive working, great work so far.

<!--more-->

Day 3 and 4 are kinda lame, on day 3 I added a model directive similar to vue.js' v-model and on day 4 I changed the way templates were handled so I could have text before the template and I started trying to be like JSX (lmao), kinda lame and basic IMO. Now day 5 I learned about SPA routing, very simple routing that just changed the page link and rendered the template from the new page. Day 6-9 is more boring shit, simple things like a once attribute, an html attribute, etc etc. But on day 10 I learned about conditional rendering, this was an amazing learning experience for me, it taught me loads about recursive functions and how recursive functions should be used. skipping over day 11 because I added a few more directives on day 12 I made a mounted function similar to vue.js' mounted function except for the fact that it was made by me so it was terrible XD. On day 13 crazy thing happened, I decided to stop pretending to be JSX and made template files using SSR, SSR was very simple to get working, basically I just pre-rendered the page and sent the page to the client, pretty simple, but SSR would give me many more opportunities in the future of this project. skipping over day 14-20 (can you tell I was loosing motivation fast or what?) on day 21 we actually got some code gen on the server side, very simple but still pretty cool in my opinion, here's the code I shared on day 21

```ts[index.ts]
template = template.replace('<script async src="/src/entry-client.ts" type="module"></script>', '');

template = template.replace('id="app"', 'id="app" data-server-rendered="true"');

let scriptedTemplate = template;

const { renderSSRHydrationCode } = await vite.ssrLoadModule(basepath.slice(1) + 'lib/router/ssrHydrationGenerator');

const code = await renderSSRHydrationCode(eval(appHtml.fnStr));

if (appHtml.script || code) {
   scriptedTemplate = template.replace('<!--script-outlet-->', '<script async type="module">' + appHtml.script + code + '</script>');
}
```

Very simple code but I still think it's pretty cool and a milestone in the project. Skipping day 22 to 47 (yeah, really got that amazing motivation) becausse it was all basically bug fixes or boring things, but on day 48 I got slot functions, well slot functions made by me working so yeah... the code is pretty bad for that, but it works and that's all that matters right? On day 50 I got a cool little image bundling feature working, I think it's pretty cool that the images can be baked into the page response, the code is bad and not very readable but it's a pretty cool feature, here's the code for that, the original version that only rendered svgs tho.

```ts[index.ts]
function renderSVGToBase64(element: string) {
   const fixedElm = element.split('>')[0];
   if (!fixedElm) return false;
   if (fixedElm.split(' ').length < 2) return false;
   if (!fixedElm.includes('svg:bundle')) return false;
   let srcName = fixedElm.split('src')[1]?.split(' ')[0]?.slice(2);
   if (!srcName) return;
   srcName = srcName.slice(0, srcName.length - 2);
   if (!srcName.includes('.svg')) return srcName;
   const svgBlob = fs.readFileSync(path.resolve(__dirname, './public' + srcName));
   return { data: ('data:image/svg+xml;base64,' + svgBlob.toString('base64')), srcName };
}
```

On day 52 I learned about memoization, although at the time I didn't know it was memoization so I just called it a page cache, here's the code using the LRUCache implementation from [@trunarla](https://twitter.com/trunarla) on twitter I used to cache pages.

```ts[pageRendered.ts]
if (cachedFile) {
 if (import.meta.env.VITE_VERBOSE && !import.meta.env.PROD && !import.meta.env.SSR) {
  console.groupCollapsed(`Loaded page ${dir}${url} from cache`);
  console.log(cachedFile);
  console.groupEnd();
 }
 file = cachedFile;
} else {
 // fetch page via the internet
}
```

Skipping past day 53 to day 78 (yeah, really motivated) since those days were just more bug fixes and such. On day 79 though, I learned about proxies and fixed an issue with accessing objects in the appState, here's the modified Reactive object class that I refactored.

```ts[ReactiveObject.ts]
export class Reactive {
 listeners: Record<string, Array<CallableFunction>>;
 contents: Record<string, unknown>;

 constructor(obj: Record<string, any>) {
  const createProxy = (target: any, propName: string) => {
   if (propName !== '') {
    propName = propName + '.';
   }
   function proxyObjects(obj: any) {
    if (typeof obj !== 'object') {
     return;
    }

    Object.keys(obj).forEach((key) => {
     if (typeof obj[key] == 'object') {
      proxyObjects(obj[key]);
      obj[key] = createProxy(obj[key], `${propName}${key}`);
     }
    });
   }

   proxyObjects(target);

   return new Proxy(target, {
    set: (target, key, value) => {
     if (typeof value === 'object') {
      // Recursively create a proxy for nested objects
      value = createProxy(value, `${propName}${key.toString()}`);
     }

     if (typeof key !== 'string') return false;

     target[key] = value;
     this.notify(`${propName}${key}`);
     return true;
    },
   });
  };

  this.contents = createProxy(obj, '');
  this.listeners = {};
 }

 listen(prop: string, handler: CallableFunction) {
  if (!this.listeners[prop]) this.listeners[prop] = [];

  this.listeners[prop]?.push(handler);
 }

 notify(prop: string) {
  if (!this.listeners[prop]) return;

  // Split the property name into its nested parts
  const propParts = prop.split('.');

  // Get the value of the nested property on the contents object
  let value: any = this.contents;
  propParts.forEach((part) => {
   value = value[part];
  });

  this.listeners[prop]?.forEach((listener: CallableFunction) => listener(value));
 }
}
```

On day 88 I changed my hydration so instead of manually typing the event listeners to look for I am able to loop over the page elements and automatically add event listeners to them based on their attributes, here's the code I wrote for that function, this function would later become the all encompassing function to hydrate every element on the page, but we're not their yet.

```ts[hydrationManager.ts]
export function hydrateElements(appState: Reactive) {
 const elements = Array.from(document.getElementById('app').querySelectorAll('*'));

 const eventElements = elements.filter((e) => {
  return Array.from(e.attributes).some(attr => attr.name.startsWith('d-on:'));
 });

 eventElements.forEach((e) => {
  const dOnAttrs = Array.from(e.attributes).filter(attr => attr.name.startsWith('d-on:'));

  dOnAttrs.forEach((attr) => {
   const [eventType, ...modifiers] = attr.name.split(':')[1].split('.');
   const code = attr.value;
   const isKeyboardEvent = (eventType.startsWith('key')) ? true : false;
   const keyName = (isKeyboardEvent && modifiers[0]) ? modifiers[0].charAt(0).toUpperCase() + modifiers[0].slice(1).toLowerCase() : '';
   e.removeAttribute(attr.name);

   e.addEventListener(eventType, (event) => {
    let eventKey = event.key;
    if (isKeyboardEvent && eventKey === ' ') {
     eventKey = 'Space';
    }
    const firstLetter = eventKey.split('')[0];
    eventKey = firstLetter?.toUpperCase() + eventKey.slice(1).toLowerCase();

    for (let i = 0; i < modifiers.length; i++) {
     const modifier = modifiers[i];

     if (modifier === 'stop') {
      event.stopPropagation();
     }

     if (modifier === 'prevent') {
      event.preventDefault();
     }

     if (modifier === 'self') {
      if (e !== event.target) return;
     }
    }

    if (!isKeyboardEvent || !keyName) {
     eval(code);
    } else if (eventKey === keyName) {
     eval(code);
    }
   }, { once: modifiers.some(mod => mod === 'once'), capture: modifiers.some(mod => mod === 'capture'), passive: modifiers.some(mod => mod === 'passive') });
  });
 });
}
```

On day 95 I completely consolidated the hydration function to reduce the amount of loops I call to hydrate the elements on the page. On day 98 I learned about real Virtual DOMs and the advantage of virtual DOMs, this is where in the project I was telling myself "fuck it, I should completely restart the whole project later and fix all of the dirty nasty code I have written.", but I continued the project as normal knowing that completely restarting the whole project would be much more than a 1 day process. And that's it, a brief overview of my 100DaysOfCode challenge.
<br />

## Overview

In the end of this project I feel more motivated to learn more about frameworks and everything related to that, a reflection coming soon to my [twitter](https://twitter.com/julie4055_) so keep an eye out if you're interested in that, after all that I hope you enjoyed reading.
<br/>

<p class="text-xl font-extrabold"><a href="https://twitch.tv/julie4055_">To be continued...?</a></p>
