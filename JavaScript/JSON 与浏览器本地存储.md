# 1.JSON 解决什么问题
程序之间需要交换数据,JSON（JavaScript Object Notation）是一种表示数据的文本格式。

# 2.JSON 能表示哪些数据
对象,数组,字符串,数字,true、false,null

# 3.JSON.stringify()
JSON.stringify() 把 JavaScript 值转换为 JSON 文本，这个过程称为序列化。
```
const application = {
  employeeName: "田中太郎",
  leaveType: "有給休暇",
};

const jsonText = JSON.stringify(application);
console.log(jsonText);
console.log(typeof jsonText); // string
```
# 4.JSON.parse()
JSON.parse() 读取 JSON 文本，并转换成对应的 JavaScript 值，这个过程称为反序列化或解析。
```
const jsonText = '{"employeeName":"田中太郎","approved":false}';
const application = JSON.parse(jsonText);

console.log(application.employeeName); // 田中太郎
console.log(typeof application); // object
```
## 输入不是合法 JSON 时会抛出 SyntaxError。

# Web Storage 是什么
浏览器提供了两种键值形式的 Web Storage：
```
localStorage：保存刷新或重新打开页面后仍要保留的少量数据。
sessionStorage：保存当前标签页使用的临时数据。
```
它们都按照 key → value 保存数据，而且 key 和 value 最终都是字符串。保存对象或数组时，需要先转换为 JSON 文本。