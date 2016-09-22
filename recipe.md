How did I build this simple page?

## 1 Requirebin
I developed the code in this [RequireBin] (http://requirebin.com/?code=2942e8a5d97e18831f7f)

## 2 Github Repo
I created this [repository] (https://github.com/ninabreznik/quiz-iOS-results) and then cloned it on my computer

## 3 index.js  
In index.js I copied everything from RequireBin

## 4 index.html
In this file I copied only this line

```html
<body style='margin:0px;'><script src='bundle.js'></script></body>
```

## 5 npm install

`npm install yo-yo csjs-inject minixhr chart.js`

## browserify

` browserify index.js > bundle.js`

## git push

`git add -A`

`git commit -m "Initial commit"`

`git push`

## Github pages

I created gh-pages directly on my Github repo for this project

Then went to Setting/Branches/Set default and set gh-pages as default
