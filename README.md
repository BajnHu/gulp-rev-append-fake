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

- `mode` (defalut : `strict`) -- 分为 严格模式和简单模式
  - 严格模式：默认为严格模式，有以下特征
    1. 针对文件内容分型产生hash值，所以文件内容没有改变不产生新的hash值。
    2. 查找文件是从`gulp(src("__current_path__"))`里面的`__current_path__`所在的当前目录开始找需要增加hash值的本地资源文件。
    3. 不管资源文件是相对路径、绝对路径、完整cdn url全部从当前目录开始查找
    4. 如果找不到文件则不添加替换`@@hash`
    5. <span color="#2d97b7">用户浏览页面则不会会重新加载没有更新的资源，节省冗余资源加载，流量</span>
  - 简单模式：
    1. 不需要关心页面引用资源是否在本地存在。不管文件是否存在都直接替换。
    2. 以当前毫秒时间戳替换`@@hash`
    3. <span color="#ee4b4c">用户浏览页面则会重新加载没有更新的资源，增加冗余资源加载</span>



























  

