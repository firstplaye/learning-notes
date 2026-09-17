# 派生状态与原始状态
## 派生状态（Derived State）指的是：不需要单独保存，而是根据已有状态计算出来的数据。
```
假设你有：

商品单价：100
购买数量：3

那么总价：

总价 = 商品单价 × 购买数量
     = 100 × 3
     = 300

这里：

单价是原始状态
数量是原始状态
总价是派生状态

因为总价可以通过单价和数量计算出来，所以不需要再单独保存一个 totalPrice。
```
### 为什么需要派生状态?
因为在实际开发中，我们经常需要根据已有数据，得到一些用于显示、判断或统计的新数据。如果每次都手动保存这些新数据，就容易产生重复数据和同步问题。

### computed() 是 Vue 3 中用来创建计算属性的 API。根据一个或多个响应式状态，计算出一个新的值，并且在依赖发生变化时自动更新。

## computed和普通函数的区别
computed具有缓存机制，用一个“带缓存的响应式 effect”，记录它依赖了哪些响应式数据；依赖变化时先标记缓存失效，读取结果时再重新计算。  
当进行一次计算后dirty=false，若没有值修改，下次再调用时则会直接返回结果，若有值修改时，会触发响应式将dirty=true，再次调用时会检测到值变化从而计算后进入缓存，再将dirty变为false。
普通函数不管在值是否有更新时均会计算所以效率没有computed高。
```
可以把 computed() 的执行流程概括为：

第一次读取 computed.value
        ↓
dirty = true
        ↓
执行计算函数
        ↓
保存计算结果到缓存
        ↓
dirty = false
        ↓
返回结果

之后再次读取：

没有依赖变化
        ↓
dirty = false
        ↓
直接返回缓存结果
        ↓
不会重新执行计算函数

如果依赖值发生变化：

price.value 被修改
        ↓
触发响应式系统
        ↓
computed 被通知
        ↓
dirty = true
        ↓
下一次读取 computed.value
        ↓
重新执行计算函数
        ↓
更新缓存
        ↓
dirty = false
        ↓
返回新结果
```
```
const price = ref(100);
const quantity = ref(3);

const total = computed(() => {
  console.log("执行计算");
  return price.value * quantity.value;
});

console.log(total.value); // 执行计算 → 300
console.log(total.value); // 直接返回缓存 → 300

price.value = 200;        // 触发响应式，computed 变为 dirty

console.log(total.value); // 执行计算 → 600
console.log(total.value); // 直接返回缓存 → 600
```