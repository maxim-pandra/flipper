(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{197:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return l})),t.d(n,"metadata",(function(){return r})),t.d(n,"rightToc",(function(){return o})),t.d(n,"default",(function(){return b}));var i=t(1),a=t(11),p=(t(0),t(233)),l={id:"js-setup",title:"Desktop Plugin Development"},r={id:"extending/js-setup",title:"Desktop Plugin Development",description:"## Workflow",source:"@site/../docs/extending/jssetup.mdx",permalink:"/docs/extending/js-setup",editUrl:"https://github.com/facebook/flipper/blob/master/website/../docs/extending/jssetup.mdx",sidebar:"extending",previous:{title:"Publishing your Plugin",permalink:"/docs/tutorial/js-publishing"},next:{title:"Desktop Plugin API",permalink:"/docs/extending/js-plugin-api"}},o=[{value:"Workflow",id:"workflow",children:[]},{value:"Dynamically Loading Plugins",id:"dynamically-loading-plugins",children:[]},{value:"Plugin Definition",id:"plugin-definition",children:[{value:"npm dependencies",id:"npm-dependencies",children:[]}]},{value:"Development Build",id:"development-build",children:[]},{value:"Transpiling and Bundling",id:"transpiling-and-bundling",children:[]},{value:"Packaging and Publishing",id:"packaging-and-publishing",children:[{value:"Publishing to npm",id:"publishing-to-npm",children:[]},{value:"Packaging to File",id:"packaging-to-file",children:[]},{value:"Installation from File",id:"installation-from-file",children:[]}]}],c={rightToc:o};function b(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(p.b)("wrapper",Object(i.a)({},c,t,{components:n,mdxType:"MDXLayout"}),Object(p.b)("h2",{id:"workflow"},"Workflow"),Object(p.b)("p",null,"In a nutshell, the workflow for creating Flipper Desktop Plugin is the following:\n1) ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"#dynamically-loading-plugins"}),"To make your custom plugins discoverable by Flipper"),", create a directory to contain them, e.g. ",Object(p.b)("inlineCode",{parentName:"p"},"~/flipper-plugins"),", and add this path to the ",Object(p.b)("inlineCode",{parentName:"p"},"pluginPaths")," property in the Flipper config (",Object(p.b)("inlineCode",{parentName:"p"},"~/.flipper/config.json"),").\n2) Create a directory for your plugin inside the directory created at step 1, e.g. ",Object(p.b)("inlineCode",{parentName:"p"},"~/flipper-plugins/my-plugin"),".\n3) ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"#plugin-definition"}),"Define your plugin")," in the directory created at step 2.\n4) ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"#development-build"}),"Start a development build of Flipper")," which will automatically ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"#transpiling-and-bundling"}),"transpile, bundle and load")," the defined plugin, as well as all other plugins found in the directories specified as ",Object(p.b)("inlineCode",{parentName:"p"},"pluginPaths")," in the Flipper config.\n5) ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"debugging"}),"Debug your plugin"),", make necessary changes and verify them in the running Flipper development build instance which will re-load the changed components automatically.\n6) If you want to be sure the plugin works as expected with a release build, you can ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"#packaging-to-file"}),"package it as a tarball")," and ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"#installation-from-file"}),"install it from the file system")," into a released version of Flipper.\n7) Finally, ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"#publishing-to-npm"}),"bundle the plugin and publish it to npm"),", so it can be discovered and installed by any Flipper user."),Object(p.b)("h2",{id:"dynamically-loading-plugins"},"Dynamically Loading Plugins"),Object(p.b)("p",null,"Flipper loads and runs plugins it finds in a configurable location. The paths searched are specified in ",Object(p.b)("inlineCode",{parentName:"p"},"~/.flipper/config.json"),". These paths, ",Object(p.b)("inlineCode",{parentName:"p"},"pluginPaths"),", should contain one folder for each of the plugins it stores. An example config setting and plugin file structure is shown below:"),Object(p.b)("p",null,Object(p.b)("inlineCode",{parentName:"p"},"~/.flipper/config.json"),":"),Object(p.b)("pre",null,Object(p.b)("code",Object(i.a)({parentName:"pre"},{}),'{\n  ...,\n  "pluginPaths": ["~/flipper-plugins"]\n}\n')),Object(p.b)("p",null,"Plugin File example structure:"),Object(p.b)("pre",null,Object(p.b)("code",Object(i.a)({parentName:"pre"},{}),"~ flipper-plugins/\n    my-plugin/\n      package.json\n      src/index.tsx\n      dist/bundle.js\n")),Object(p.b)("h2",{id:"plugin-definition"},"Plugin Definition"),Object(p.b)("p",null,"All Flipper Desktop plugins must be self-contained in a directory. This directory must contain at a minimum package.json and entry source file, e.g.:"),Object(p.b)("ul",null,Object(p.b)("li",{parentName:"ul"},"package.json"),Object(p.b)("li",{parentName:"ul"},"src/index.tsx")),Object(p.b)("p",null,"The best way to initialize a JS plugin is to create a directory, and run ",Object(p.b)("inlineCode",{parentName:"p"},"yarn init")," inside it. By convention, the ",Object(p.b)("inlineCode",{parentName:"p"},"name")," of a Flipper plugin package should start with ",Object(p.b)("inlineCode",{parentName:"p"},"flipper-plugin-"),", e.g. ",Object(p.b)("inlineCode",{parentName:"p"},"flipper-plugin-myplugin"),"."),Object(p.b)("p",null,"Make sure that the ",Object(p.b)("inlineCode",{parentName:"p"},"id")," field in your package.json is the same as the identifier of the client plugin, e.g. if your Java plugin returns ",Object(p.b)("inlineCode",{parentName:"p"},"myplugin")," from its ",Object(p.b)("inlineCode",{parentName:"p"},"getId()")," method, the ",Object(p.b)("inlineCode",{parentName:"p"},"id")," field in your ",Object(p.b)("inlineCode",{parentName:"p"},"package.json")," should also be ",Object(p.b)("inlineCode",{parentName:"p"},"myplugin"),"."),Object(p.b)("p",null,"Flipper has ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"#transpiling-and-bundling"}),"tooling for transpiling and bundling")," which allows writing plugins in plain ES6 JavaScript, ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"https://flow.org/"}),"Flow")," or ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"https://www.typescriptlang.org/"}),"TypeScript")," but we recommend you use ",Object(p.b)("strong",{parentName:"p"},"TypeScript")," for the best development experience. We also recommend you use the file extension ",Object(p.b)("inlineCode",{parentName:"p"},".tsx")," when using TypeScript which adds support for inline React expressions."),Object(p.b)("p",null,"After ",Object(p.b)("inlineCode",{parentName:"p"},"yarn init")," finishes, create an ",Object(p.b)("inlineCode",{parentName:"p"},"src/index.tsx")," file which will be the entry point to your plugin. An example ",Object(p.b)("inlineCode",{parentName:"p"},"package.json")," file could look like this:"),Object(p.b)("p",null,"Example ",Object(p.b)("inlineCode",{parentName:"p"},"package.json"),":"),Object(p.b)("pre",null,Object(p.b)("code",Object(i.a)({parentName:"pre"},{}),'{\n  "name": "flipper-plugin-myplugin",\n  "id": "myplugin",\n  "specVersion": 2,\n  "version": "1.0.0",\n  "main": "dist/bundle.js",\n  "flipperBundlerEntry": "src/index.tsx",\n  "license": "MIT",\n  "keywords": ["flipper-plugin"],\n  "title": "My Plugin",\n  "icon": "apps",\n  "bugs": {\n    "email": "you@example.com"\n  },\n  "scripts": {\n    "prepack": "flipper-pkg bundle"\n  }\n  "dependencies": {\n    "flipper": "latest"\n  },\n  "devDependencies": {\n    "flipper-pkg": "latest"\n  }\n}\n')),Object(p.b)("p",null,"Important attributes of ",Object(p.b)("inlineCode",{parentName:"p"},"package.json"),":"),Object(p.b)("ul",null,Object(p.b)("li",{parentName:"ul"},Object(p.b)("p",{parentName:"li"},Object(p.b)("inlineCode",{parentName:"p"},"name")," Npm package name. Should start with ",Object(p.b)("inlineCode",{parentName:"p"},"flipper-plugin-")," by convention, so Flipper plugins can be easily found on npm.")),Object(p.b)("li",{parentName:"ul"},Object(p.b)("p",{parentName:"li"},Object(p.b)("inlineCode",{parentName:"p"},"specVersion")," Version of the Flipper plugin specification. Currently, Flipper supports plugins defined using version 2 of the specification which is described in the current section.")),Object(p.b)("li",{parentName:"ul"},Object(p.b)("p",{parentName:"li"},Object(p.b)("inlineCode",{parentName:"p"},"id")," Used as the plugin native identifier and ",Object(p.b)("strong",{parentName:"p"},"must match the mobile plugin identifier"),".")),Object(p.b)("li",{parentName:"ul"},Object(p.b)("p",{parentName:"li"},Object(p.b)("inlineCode",{parentName:"p"},"main"),' Points to the plugin bundle which will be loaded by Flipper. The "flipper-pkg" utility uses this field to determine output location during plugin bundling.')),Object(p.b)("li",{parentName:"ul"},Object(p.b)("p",{parentName:"li"},Object(p.b)("inlineCode",{parentName:"p"},"flipperBundlerEntry"),' Points to the source entry point which will be used for plugin code bundling. "flipper-pkg" takes the path specified in ',Object(p.b)("inlineCode",{parentName:"p"},"flipperBundlerEntry")," as source, transpiles and bundles it, and saves the output to the path specified in ",Object(p.b)("inlineCode",{parentName:"p"},"main"),".")),Object(p.b)("li",{parentName:"ul"},Object(p.b)("p",{parentName:"li"},Object(p.b)("inlineCode",{parentName:"p"},"keywords")," The field must contain the ",Object(p.b)("inlineCode",{parentName:"p"},"flipper-plugin")," keyword, otherwise Flipper won't discover the plugin. Additionally, the field can also contain any other keywords for better plugin discoverability.")),Object(p.b)("li",{parentName:"ul"},Object(p.b)("p",{parentName:"li"},Object(p.b)("inlineCode",{parentName:"p"},"title")," Shown in the main sidebar as the human-readable name of the plugin.")),Object(p.b)("li",{parentName:"ul"},Object(p.b)("p",{parentName:"li"},Object(p.b)("inlineCode",{parentName:"p"},"icon")," Determines the plugin icon which is displayed in the main sidebar. The list of available icons is static for now: ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"https://github.com/facebook/flipper/blob/master/desktop/static/icons.json"}),"https://github.com/facebook/flipper/blob/master/desktop/static/icons.json"),".")),Object(p.b)("li",{parentName:"ul"},Object(p.b)("p",{parentName:"li"},Object(p.b)("inlineCode",{parentName:"p"},"bugs")," Specify an email and/or url, where plugin bugs should be reported."))),Object(p.b)("p",null,"In ",Object(p.b)("inlineCode",{parentName:"p"},"index.tsx")," you will define the plugin in JavaScript. This file must export a default class that extends ",Object(p.b)("inlineCode",{parentName:"p"},"FlipperPlugin"),". Browse our ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"js-plugin-api"}),"JS API docs")," to see what you can do, and make sure to check out our ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"ui-components"}),"UI Component Library")," for lots of pre-made components."),Object(p.b)("p",null,"Example ",Object(p.b)("inlineCode",{parentName:"p"},"index.tsx"),":"),Object(p.b)("pre",null,Object(p.b)("code",Object(i.a)({parentName:"pre"},{className:"language-js"}),"import {FlipperPlugin} from 'flipper';\n\nexport default class extends FlipperPlugin {\n  render() {\n    return 'hello world';\n  }\n}\n")),Object(p.b)("h3",{id:"npm-dependencies"},"npm dependencies"),Object(p.b)("p",null,"If you need any dependencies in your plugin, you can install them using ",Object(p.b)("inlineCode",{parentName:"p"},"yarn add"),"."),Object(p.b)("h2",{id:"development-build"},"Development Build"),Object(p.b)("p",null,"A Flipper development build should be used for plugin debugging. It is also used for Flipper core development and provides the following features:"),Object(p.b)("ul",null,Object(p.b)("li",{parentName:"ul"},"Automatic transpilation and bundling of loaded plugins: ES6, Flow, TypeScript, JSX."),Object(p.b)("li",{parentName:"ul"},"Automatic refresh after code changes."),Object(p.b)("li",{parentName:"ul"},"React and Redux Dev Tools."),Object(p.b)("li",{parentName:"ul"},Object(p.b)("a",Object(i.a)({parentName:"li"},{href:"debugging"}),"Debugging")," using Chrome Dev Tools or Visual Studio Code.")),Object(p.b)("p",null,"Prerequisites for Flipper development build:"),Object(p.b)("ul",null,Object(p.b)("li",{parentName:"ul"},"node \u2265 8"),Object(p.b)("li",{parentName:"ul"},"yarn \u2265 1.5"),Object(p.b)("li",{parentName:"ul"},"git"),Object(p.b)("li",{parentName:"ul"},"watchman")),Object(p.b)("p",null,"To start a development build, clone the Flipper repository, install the dependencies and execute the ",Object(p.b)("inlineCode",{parentName:"p"},"start")," script:"),Object(p.b)("pre",null,Object(p.b)("code",Object(i.a)({parentName:"pre"},{}),"git clone https://github.com/facebook/flipper.git\ncd flipper/desktop\nyarn\nyarn start\n")),Object(p.b)("h2",{id:"transpiling-and-bundling"},"Transpiling and Bundling"),Object(p.b)("p",null,"As we already mentioned, the ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"#development-build"}),"Flipper development build")," automatically transpiles and bundles plugins on loading. It is capable of all the ES6 goodness, Flow annotations, TypeScript, as well as JSX and applies the required babel-transforms."),Object(p.b)("p",null,"The Flipper release build, in contrast, does not transpile or bundle plugins on loading. For production usage, plugins should be ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"#packaging-and-publishing"}),"bundled before publishing")," using ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"https://classic.yarnpkg.com/en/package/flipper-pkg"}),"flipper-pkg"),". This utility applies the same modifications as the plugin loader of the development build."),Object(p.b)("p",null,"The tool is published to npm and can be installed as a ",Object(p.b)("inlineCode",{parentName:"p"},"devDependency")," for the plugin package, or as a global CLI tool:"),Object(p.b)("pre",null,Object(p.b)("code",Object(i.a)({parentName:"pre"},{}),"yarn global add flipper-pkg\n")),Object(p.b)("p",null,"Then, to bundle the plugin, execute the following command in its folder:"),Object(p.b)("pre",null,Object(p.b)("code",Object(i.a)({parentName:"pre"},{}),"flipper-pkg bundle\n")),Object(p.b)("p",null,"This command reads the ",Object(p.b)("inlineCode",{parentName:"p"},"package.json"),", takes the path specified in the ",Object(p.b)("inlineCode",{parentName:"p"},"flipperBundleEntry")," field as entry point, transpiles and bundles all the required code, and outputs the produced bundle to the path specified in field ",Object(p.b)("inlineCode",{parentName:"p"},"main"),"."),Object(p.b)("p",null,"You can get the list of other available commands by invoking ",Object(p.b)("inlineCode",{parentName:"p"},"flipper-pkg help"),", and get detailed description for any command by invoking ",Object(p.b)("inlineCode",{parentName:"p"},"flipper-pkg help [COMMAND]"),". You can also check README on npmjs.com for usage details: ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"https://www.npmjs.com/package/flipper-pkg"}),"https://www.npmjs.com/package/flipper-pkg"),"."),Object(p.b)("h2",{id:"packaging-and-publishing"},"Packaging and Publishing"),Object(p.b)("h3",{id:"publishing-to-npm"},"Publishing to npm"),Object(p.b)("p",null,"Flipper plugins are essentially standard npm packages. So you can publish them by executing ",Object(p.b)("inlineCode",{parentName:"p"},"yarn publish")," or ",Object(p.b)("inlineCode",{parentName:"p"},"npm publish")," in the plugin directory. The only requirements are:\n1) ",Object(p.b)("inlineCode",{parentName:"p"},"package.json")," and code ",Object(p.b)("a",Object(i.a)({parentName:"p"},{href:"#plugin-definition"}),"must follow the Flipper plugin specification"),'\n2) code must be bundled using "flipper-pkg" before packing or publishing. This can be done by executing ',Object(p.b)("inlineCode",{parentName:"p"},"flipper-pkg bundle")," on ",Object(p.b)("inlineCode",{parentName:"p"},"prepack")," step:"),Object(p.b)("pre",null,Object(p.b)("code",Object(i.a)({parentName:"pre"},{}),'```\n{\n  ...\n  "devDependencies": {\n    ...\n    "flipper-pkg": "latest"\n  },\n  "scripts": {\n    ...\n    "prepack": "flipper-pkg bundle"\n  }\n}\n```\n')),Object(p.b)("h3",{id:"packaging-to-file"},"Packaging to File"),Object(p.b)("p",null,"To package plugin as a tarball, you can use the same command as for packaging any other npm package, e.g. ",Object(p.b)("inlineCode",{parentName:"p"},"yarn pack")," or ",Object(p.b)("inlineCode",{parentName:"p"},"npm pack"),"."),Object(p.b)("p",null,'"flipper-pkg" also provides a convenient command ',Object(p.b)("inlineCode",{parentName:"p"},"pack")," which:\n1) Installs the plugin dependencies\n2) Bundles the plugin\n3) Creates the tarball and saves it at the specified location"),Object(p.b)("p",null,"E.g. to package plugin located at ",Object(p.b)("inlineCode",{parentName:"p"},"~/flipper-plugins/my-plugin")," to ",Object(p.b)("inlineCode",{parentName:"p"},"~/Desktop"),", execute the following command:"),Object(p.b)("pre",null,Object(p.b)("code",Object(i.a)({parentName:"pre"},{}),"flipper-pkg pack ~/flipper-plugins/my-plugin -o ~/Desktop\n")),Object(p.b)("h3",{id:"installation-from-file"},"Installation from File"),Object(p.b)("p",null,'It is possible to install plugins into Flipper from tarballs. This is useful in cases when you need to try a plugin version which is not published to npm, or if you want to distribute plugin privately:\n1) Launch Flipper\n2) Click the "Manage Plugins" button in the bottom-left corner\n3) Select the "Install Plugins" tab in the opened sheet\n4) Specify the path to the plugin package (or just drag and drop it) and click "Install"'))}b.isMDXComponent=!0},233:function(e,n,t){"use strict";t.d(n,"a",(function(){return s})),t.d(n,"b",(function(){return m}));var i=t(0),a=t.n(i);function p(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){p(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,i,a=function(e,n){if(null==e)return{};var t,i,a={},p=Object.keys(e);for(i=0;i<p.length;i++)t=p[i],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(i=0;i<p.length;i++)t=p[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=a.a.createContext({}),b=function(e){var n=a.a.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):r({},n,{},e)),t},s=function(e){var n=b(e.components);return a.a.createElement(c.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},u=Object(i.forwardRef)((function(e,n){var t=e.components,i=e.mdxType,p=e.originalType,l=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),s=b(t),u=i,m=s["".concat(l,".").concat(u)]||s[u]||d[u]||p;return t?a.a.createElement(m,r({ref:n},c,{components:t})):a.a.createElement(m,r({ref:n},c))}));function m(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var p=t.length,l=new Array(p);l[0]=u;var r={};for(var o in n)hasOwnProperty.call(n,o)&&(r[o]=n[o]);r.originalType=e,r.mdxType="string"==typeof e?e:i,l[1]=r;for(var c=2;c<p;c++)l[c]=t[c];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);