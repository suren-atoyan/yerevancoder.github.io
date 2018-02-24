webpackJsonp([34813623196209],{533:function(n,s){n.exports={data:{site:{siteMetadata:{title:"yerevancoder",author:"Coders of Armenia"}},markdownRemark:{id:"/Users/robgev/Projects/yerevancoder.github.io/src/pages/2018-02-08-js-types-primitives-variable-initialization/index.md absPath of file >>> MarkdownRemark",html:'<h2>Primitives</h2>\n<p>What is data type?</p>\n<p>A data type is a classification that specifies which type of value\na <code>variable</code> has and what type of operations\ncan be applied to it without causing an error.</p>\n<p>You can read it a few times to understand. Anyway, it is fine\nif you’ll not understand it now :D</p>\n<p>So we can store and use different data types in our program: strings,\nnumbers and etc.</p>\n<p>Let’s list those!</p>\n<p>Primitives:</p>\n<ul>\n<li>number</li>\n<li>string</li>\n<li>boolean</li>\n<li>null</li>\n<li>undefined</li>\n<li>symbol (new to ES6)</li>\n</ul>\n<p>Object:</p>\n<ul>\n<li>object</li>\n</ul>\n<p>The examples of objects are:</p>\n<ul>\n<li>Function</li>\n<li>Array</li>\n<li>Map</li>\n<li>Set</li>\n</ul>\n<p>So basically, everything that is not an object is considered as a\nPrimitive data type. Smart right? :D There are a lot of differences\nbetween those and we’re going to understand everything together! For\ntoday, we’ll focus our attention on primitive types.</p>\n<p>Let’s get some practice already!</p>\n<p>if you’ve been on our installation day, then most probably you have\nUNIX-based Operating System (Ubuntu, MacOS, Debian, Kali, BSD, etc.).\nYou already should have <code>atom</code> and <code>node</code>. Let’s setup our workplace.</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code><span class="token comment"># go to Documents directory</span>\n<span class="token function">cd</span> ~/Documents\n<span class="token comment"># create js file</span>\n<span class="token function">touch</span> file.js\n<span class="token comment"># open that file with Atom</span>\natom file.js\n<span class="token comment"># now we are going to edit that file</span>\n<span class="token comment"># with atom. After edit, you can run that</span>\n<span class="token comment"># file with</span>\nnode file.js\n</code></pre>\n      </div>\n<p>OR</p>\n<p>Open your Unix terminal and type <code>node</code>. However, this is not convenient\nfor writing everything that is bigger than a few lines:</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code><span class="token comment"># open node</span>\nnode\n<span class="token comment"># now you should this kind of "arrow"</span>\n<span class="token comment"># that means you can write js here</span>\n<span class="token comment"># then push "enter" to evaluate the code</span>\n<span class="token operator">></span>\n<span class="token comment"># to quit it simply do 2 times CTRL+C</span>\n<span class="token comment"># or write .exit</span>\n</code></pre>\n      </div>\n<p>OR</p>\n<p>open <code>developer tools</code> in the browser and open console there.</p>\n<p>So now let’s start with numbers. To use those you simply have to type a\nnumber in the console:</p>\n<h3>number</h3>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token operator">></span> <span class="token number">5</span>\n<span class="token number">5</span>\n<span class="token comment">// evaluated to: 5</span>\n</code></pre>\n      </div>\n<hr>\n<p>I’m using a symbol <code>//</code> called <code>comments</code>. Basically, JS doesn’t\nevaluate everything that is after <code>//</code> on the line. It is a very useful\nthing when you want to describe what your code does.</p>\n<p>JS is not going to evaluate this:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// yo, I\'m not evaluated</span>\n<span class="token comment">// :(</span>\n</code></pre>\n      </div>\n<hr>\n<p>So we tried to evaluate 5 and JS evaluated that to 5. Simple!</p>\n<p>let’s try to do some math operations! To use those you have to just\ntype mathematical operation symbols:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// sum</span>\n<span class="token operator">></span> <span class="token number">5</span> <span class="token operator">+</span> <span class="token number">5</span>\n<span class="token number">10</span>\n<span class="token comment">// evaluated to: 10</span>\n\n<span class="token comment">// substraction</span>\n<span class="token operator">></span> <span class="token number">7</span> <span class="token operator">-</span> <span class="token number">10</span>\n<span class="token operator">-</span><span class="token number">3</span>\n<span class="token comment">// evaluated to: -3</span>\n\n<span class="token comment">// deletion</span>\n<span class="token operator">></span> <span class="token number">10</span> <span class="token operator">/</span> <span class="token number">2</span>\n<span class="token number">5</span>\n<span class="token comment">// evaluated to: 5</span>\n<span class="token operator">></span> <span class="token number">7</span> <span class="token operator">/</span> <span class="token number">2</span>\n<span class="token number">3.5</span>\n<span class="token comment">// evaluated to 3.5</span>\n\n<span class="token comment">// multiplication</span>\n<span class="token operator">></span> <span class="token number">5</span> <span class="token operator">*</span> <span class="token number">4</span>\n<span class="token number">20</span>\n<span class="token comment">// evaluated to: 20</span>\n<span class="token operator">></span> <span class="token number">3.5</span> <span class="token operator">*</span> <span class="token number">2.5</span>\n<span class="token comment">// evaluated to: 8.75</span>\n</code></pre>\n      </div>\n<p>JS also has a special value called <code>NaN</code> which basically means <code>Not A Number</code>. We are going to discuss it later in the course.</p>\n<h3>string</h3>\n<p>But you’ll not be able to do a lot of things with only numbers!\nLet’s try to use text. The data type responsible for that in JS is\ncalled <code>string</code>.</p>\n<p>There are few ways of declaring a string. We will only review 2 of\nthose:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token operator">></span> <span class="token string">\'Hello world!\'</span>\n<span class="token comment">// evaluated to: \'Hello world!\'</span>\n</code></pre>\n      </div>\n<p>and</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token operator">></span> <span class="token string">"Hello world!"</span>\n<span class="token comment">// evaluated to: \'Hello world!\'</span>\n</code></pre>\n      </div>\n<p>There are also some operations which are performed on strings. Here is\nthe one called <code>concatenation</code>. Basically, that means adding one string\nto another:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// concatenation</span>\n<span class="token operator">></span> <span class="token string">\'Hello \'</span> <span class="token operator">+</span> <span class="token string">\'world!\'</span>\n<span class="token comment">// evaluated to: \'Hello world!\'</span>\n</code></pre>\n      </div>\n<h3>boolean</h3>\n<p>Next data type I want to talk about is very simple. It’s called\n<code>boolean</code>. It only has values <code>false</code> and <code>true</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token operator">></span> <span class="token boolean">false</span>\n<span class="token comment">// evaluated to: false</span>\n<span class="token operator">></span> <span class="token boolean">true</span>\n<span class="token comment">// evaluated to: true</span>\n</code></pre>\n      </div>\n<p>In JS and in the majority of other programming languages you are able\nto compare different values and get a <code>boolean</code> value as a result of\nevaluation:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// equal</span>\n<span class="token operator">></span> <span class="token number">5</span> <span class="token operator">===</span> <span class="token number">5</span>\n<span class="token comment">// evaluated to: true</span>\n\n<span class="token comment">// equal</span>\n<span class="token operator">></span> <span class="token number">5</span> <span class="token operator">===</span> <span class="token operator">-</span><span class="token number">3</span>\n<span class="token comment">// evaluated to: false</span>\n\n<span class="token comment">// not equal</span>\n<span class="token operator">></span> <span class="token number">5</span> <span class="token operator">!==</span> <span class="token number">3</span>\n<span class="token comment">// evaluated to: true</span>\n\n<span class="token comment">// not equal</span>\n<span class="token operator">></span> <span class="token number">5</span> <span class="token operator">!==</span> <span class="token number">5</span>\n<span class="token comment">// evaluated to: false</span>\n\n<span class="token comment">// less than</span>\n<span class="token operator">></span> <span class="token number">5</span> <span class="token operator">&lt;</span> <span class="token number">6</span>\n<span class="token comment">// evaluated to: true</span>\n\n<span class="token comment">// less than</span>\n<span class="token operator">></span> <span class="token number">5</span> <span class="token operator">&lt;</span> <span class="token number">5</span>\n<span class="token comment">// evaluated to: false</span>\n\n<span class="token comment">// less than or equal</span>\n<span class="token operator">></span> <span class="token number">5</span> <span class="token operator">&lt;=</span> <span class="token number">5</span>\n<span class="token comment">// evaluated to: true</span>\n\n<span class="token comment">// less than or equal</span>\n<span class="token operator">></span> <span class="token operator">-</span><span class="token number">5</span> <span class="token operator">&lt;=</span> <span class="token number">343</span>\n<span class="token comment">// evaluated to: true</span>\n\n<span class="token comment">// greater than</span>\n<span class="token operator">></span> <span class="token number">5</span> <span class="token operator">></span> <span class="token number">3</span>\n<span class="token comment">// evaluated to: true</span>\n\n<span class="token comment">// greater than</span>\n<span class="token operator">></span> <span class="token operator">-</span><span class="token number">5</span> <span class="token operator">></span> <span class="token operator">-</span><span class="token number">3</span>\n<span class="token comment">// evaluated to: false</span>\n\n<span class="token comment">// greater than or equal</span>\n<span class="token operator">></span> <span class="token number">10</span> <span class="token operator">>=</span> <span class="token number">10</span>\n<span class="token comment">// evaluated to: true</span>\n</code></pre>\n      </div>\n<p>Javascript also has <code>==</code> as an equality operator. It’s a convention to\nsay that <code>==</code> is a loose-equal and <code>===</code> is a strict-equal. For now just\ndon’t use <code>==</code>, use <code>===</code> for checking equality. We will describe the\ndifference later in the course.</p>\n<h3>undefined and null</h3>\n<p>We also can use it for any other data type, but that’s something that\nwe would like to discuss later in the course :D</p>\n<p>JS also has data types that basically mean <code>nothing</code>.</p>\n<p><code>undefined</code> and <code>null</code></p>\n<p>The first one, <code>undefined</code>, means the absence of the value, whereas\n<code>null</code> means that value is nothing. It maybe confusing at first but\nyou’ll get used to it!</p>\n<p>We can also use boolean operators on these data types:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code>undefined <span class="token operator">===</span> undefined<span class="token punctuation">;</span> <span class="token comment">// true</span>\n\n<span class="token string">\'hello\'</span> <span class="token operator">===</span> <span class="token string">\'hello\'</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\n</code></pre>\n      </div>\n<h3>symbol</h3>\n<p>We are not going to cover <code>symbol</code> data type now. It’s a little bit\nadvanced topic that we’ll talk about in a few weeks.</p>\n<p>Great, so now we know how Primitive data types look and we also know a\nfew basic operations on those!</p>\n<h2>Variable initialization</h2>\n<h3>let</h3>\n<p>Now we need to understand where we can store that value. Imagine a\n<code>box</code> where you can put anything you want. That <code>box</code> in JS is called a\n<code>variable</code>. You basically can put any JS data type in it. There are a\nfew ways of initializing a variable. The first way is using <code>let</code>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token comment">// initialized a variable called a</span>\n<span class="token keyword">let</span> a<span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>Now we just initialized a <code>variable</code> which has a value of nothing. As\nwe’ve already discussed, a value of nothing in JS is represented as\n<code>undefined</code>.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token operator">></span> <span class="token keyword">let</span> a<span class="token punctuation">;</span>\n<span class="token operator">></span> a <span class="token operator">===</span> undefined\n<span class="token comment">// true</span>\n</code></pre>\n      </div>\n<p>Now let’s put some value in it:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token operator">></span> a <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>\n<span class="token comment">// 5</span>\n<span class="token operator">></span> a<span class="token punctuation">;</span>\n<span class="token comment">// 5</span>\n</code></pre>\n      </div>\n<p>Congratulations! Now we have <code>number</code> 5 in the <code>variable</code> <code>a</code>.\nWe can also change the value of <code>a</code> to string.</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token operator">></span> a <span class="token operator">=</span> <span class="token string">\'string\'</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>In the majority of programming languages, you are actually not able to\ndo so. There you initialize a <code>variable</code> and tell it to ONLY store one\ndata type. It is also possible in Javascript, but for that, you have to\nuse <code>TypeScript</code> or <code>Flow</code>. We are going to cover it later in the\ncourse. For now, you can just google it! :D</p>\n<h3>const</h3>\n<p>As you’ve already found out, when we initialize a <code>variable</code> with <code>let</code>\nwe are able to change the value that is stored in the <code>variable</code>!! In\nthis course, we are going to mostly learn Functional Programming. And\nfunctional programming doesn’t like mutatable (changeable) variables!\nThus it’s always better to use <code>const</code>, which stands for <code>constant</code>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>\n<span class="token comment">// 5</span>\nb <span class="token operator">=</span> <span class="token number">7</span><span class="token punctuation">;</span>\n<span class="token comment">// TypeError: Assignment to constant variable.</span>\n</code></pre>\n      </div>\n<p>and using <code>let</code>:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>\n<span class="token comment">// 6</span>\nc <span class="token operator">=</span> <span class="token number">8</span><span class="token punctuation">;</span>\n<span class="token comment">// Totally fine, evaluated to: 8</span>\n</code></pre>\n      </div>\n<p>This helps you to keep your mind organized and get fewer bugs in the\nprogram later in the development process!</p>\n<h3>typeof</h3>\n<p>Also, Javascript provides a special operator called <code>typeof</code> that\ndescribes you what type is in the variable right now. The output of\nthat operator is always <code>string</code>. This is how to use it:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> first<span class="token punctuation">;</span>\n<span class="token keyword">typeof</span> first<span class="token punctuation">;</span>                <span class="token comment">// "undefined"</span>\n\n<span class="token keyword">const</span> second <span class="token operator">=</span> <span class="token string">"hello world"</span><span class="token punctuation">;</span>\n<span class="token keyword">typeof</span> second<span class="token punctuation">;</span>                <span class="token comment">// "string"</span>\n\n<span class="token keyword">const</span> third <span class="token operator">=</span> <span class="token number">42</span><span class="token punctuation">;</span>\n<span class="token keyword">typeof</span> third<span class="token punctuation">;</span>                <span class="token comment">// "number"</span>\n\n<span class="token keyword">const</span> fourth <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>\n<span class="token keyword">typeof</span> fourth<span class="token punctuation">;</span>                <span class="token comment">// "boolean"</span>\n\n<span class="token keyword">const</span> fifth <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>\n<span class="token keyword">typeof</span> fifth<span class="token punctuation">;</span>                <span class="token comment">// "object" -- weird, bug</span>\n\n<span class="token keyword">const</span> sixth <span class="token operator">=</span> undefined<span class="token punctuation">;</span>\n<span class="token keyword">typeof</span> sixth<span class="token punctuation">;</span>                <span class="token comment">// "undefined"</span>\n\n<span class="token comment">// this is object, hence not a Primitive data type</span>\n<span class="token comment">// we will study it in the upcoming lectures</span>\n<span class="token keyword">const</span> seventh <span class="token operator">=</span> <span class="token punctuation">{</span> b<span class="token punctuation">:</span> <span class="token string">"c"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token keyword">typeof</span> seventh<span class="token punctuation">;</span>                <span class="token comment">// "object"</span>\n</code></pre>\n      </div>\n<h3>console.log()</h3>\n<p>Sometimes you want your program output something on the screen. For\nthat, you can use <code>console.log()</code>. It is a <code>function call</code> (will get to\nit later), which lets you output the value to the screen. Let’s try\nthis:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">const</span> hello <span class="token operator">=</span> <span class="token string">\'helloWorld!\'</span><span class="token punctuation">;</span>\n<span class="token keyword">let</span> hey <span class="token operator">=</span> <span class="token string">\'Yo!\'</span><span class="token punctuation">;</span>\n\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>hello<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>hey<span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'OMG\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<p>and the output is something like:</p>\n<div class="gatsby-highlight">\n      <pre class="language-bash"><code>helloWorld<span class="token operator">!</span>\nYo<span class="token operator">!</span>\nOMG\n</code></pre>\n      </div>\n<h3>Assignment operator shortcuts</h3>\n<p>The majority of programming languages have some kind of <code>shortcuts</code> for\narithmetic operations. Let’s review some of those:</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>\na <span class="token operator">=</span> a <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// add 1 to a</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 6</span>\n\n<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>\n<span class="token comment">// here you can use any arithmetic operation in cooperation with =</span>\n<span class="token comment">// e.g. += , -=, /=, *=, etc...</span>\nb <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// add 1 to the value of b and put the updated value back to b</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 11</span>\n\n<span class="token keyword">let</span> c <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>\n<span class="token operator">++</span>c<span class="token punctuation">;</span> <span class="token comment">// increments c by 1</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 3</span>\n\n<span class="token comment">// we also can do</span>\n<span class="token comment">// c++;</span>\n<span class="token comment">// that increments the value of c by 1</span>\n<span class="token comment">// but it does it in the other way.</span>\n<span class="token comment">// We will describe it later in the course!</span>\n</code></pre>\n      </div>\n<hr>\n<p>Thanks for reading!</p>\n<p>Don’t forget that you can always reach members of the iterate community\nask questions, fix issues and bugs, also just talk about random things\nin the iterate Slack <a href="https://iterate-hackerspace.slack.com/messages">channel</a>.</p>',frontmatter:{title:"Javascript. Types, Primitives and Variable Initialization",date:"February 08, 2018",discussionId:"2018-02-08-js-types-primitives-variable-initialization"}}},pathContext:{slug:"/2018-02-08-js-types-primitives-variable-initialization/"}}}});
//# sourceMappingURL=path---2018-02-08-js-types-primitives-variable-initialization-1af86f318888879d2204.js.map