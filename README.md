## 描述
  - 名称：gulp-rev-append-fake
  - 功能：避免浏览器缓存，自动在静态资源路径后面增加动态hash或时间戳。

## 用法

```shell
 #安装 
npm i -D gulp-rev-append-fake gulp
```

```javascript
//gulpfile.js 
var gulp = require('gulp');
var revFake = require('gulp-rev-append-fake');

gulp.task("rev",()=>{
    return gulp.src('src/index.html')
    .pipe(rev())
    .pipe(gulp.dest('dist/index.html'))
})
```

```html
<!-- index.html -->

<link href="dist/index.css?rev=@@hash" rel="stylesheet"/>
<!-- <link href="dist/index.css?rev=5cadf43edba6a97980d42331f9fffd17" rel="stylesheet"/> -->


<script src="dist/index..js?rev=@@hash"></script>
<!-- <script src="dist/index..js?rev=5cadf43edba6a97980d42331f9fffd17"></script> -->


<img src="./dist/index.png?rev=@@hash" />
<!-- <img src="./dist/index.png?rev=5cadf43edba6a97980d42331f9fffd17" /> -->


<a href="./dsit/index.html?rev=@@hash" >index</a>
<!-- <a href="./dsit/index.html?rev=5cadf43edba6a97980d42331f9fffd17" >index</a> -->

```

## 参数（options）

- `mode` (defalut : `strict`) -- 分为 严格模式，简单模式和松散模式
  - `strict`：严格模式
    1. 针对文件内容分型产生hash值，所以文件内容没有改变不产生新的hash值。
    2. 如果找不到文件则不添加替换`@@hash`
  - `easy`： 简单模式
    1. 不需要关心页面引用资源是否在本地存在。不管文件是否存在都直接替换。
    2. 以当前毫秒时间戳替换`@@hash`
 - `loose`：松散模式
    1. 对找得到的文件使用`strict`模式增加 动态hash；对找不到的文件使用`easy`模式增加动态时间戳
- `outputPath`:（defalut : `''`） -- 配置html的输出目录，用来对相对路径的文件引用进行查找。
- `rootDir`:(default :  当前项目的根目录) -- 配置网站站点的根目录 , 用来对绝对路径文件进行查找  


























  

