# 1.SELECT 是什么
SELECT 用于从表中查询数据。  
`SELECT 列1, 列2 FROM 表名 WHERE 条件 ORDER BY 排序列;`

## 1.别名as
`SELECT name AS employee_name,salary AS monthly_salary FROM employees;`

## 2.排序order by
`ASC`升序，默认  
`DESC`降序

## 3.分页
分页用于每次只查询一部分数据。
`LIMIT 10 OFFSET 0`

# 2.为什么需要多表查询
业务数据通常不会全部放在一张表中。

## 1.INNER JOIN
返回两张表中能匹配上的数据。

## 2.LEFT JOIN
```
SELECT e.id,
    e.name AS employee_name,
    d.name AS department_name
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.id;
```
LEFT JOIN 会保留左表 employees 的所有数据。如果右表没有匹配数据，右表字段返回 NULL。

## 3.RIGHT JOIN
```
SELECT e.id,
       e.name AS employee_name,
       d.name AS department_name
FROM employees e
RIGHT JOIN departments d
    ON e.department_id = d.id;
```
RIGHT JOIN 会保留右表 departments 的所有数据。

## 4.FULL JOIN
它会同时保留左表和右表的数据。INNER JOIN只保留两张表同时都有的数据。

## 5.子查询
子查询是 SQL 内部再写一个查询。
```
SELECT id, name, salary
FROM employees
WHERE salary > (
    SELECT AVG(salary)
    FROM employees
);
```

## 6.EXISTS
EXISTS 用于判断子查询是否有结果。如果子查询能查到至少一行数据,EXISTS 就是 true。如果子查询查不到任何数据，EXISTS 就是 false。
```
SELECT d.id, d.name
FROM departments d
WHERE EXISTS (
    SELECT 1
    FROM employees e
    WHERE e.department_id = d.id
);
```
需求：查询至少有员工的部门。

### NOT IN 遇到 NULL 容易出问题,NOT EXISTS 通常更安全


## 7.WITH AS 公共表表达式
WITH AS 用于把一个查询结果临时命名，然后在后面的主查询中使用。

## 8.集合操作是什么
集合操作用于把多个 SELECT 的结果进行合并(UNION、UNION ALL)、取交集(	INTERSECT)或取差集(EXCEPT、MINUS)

# 3.分组与聚合函数
## 1.聚合函数是什么
聚合函数用于对多行数据进行统计，并返回统计结果。COUNT(),SUM(),AVG(),MAX(),MIN()

## 2.COUNT(*)的问题
COUNT(*) 会统计所有行，即使某些列是 NULL。

## 3.DISTINCT去重
COUNT(DISTINCT 列名) 用于统计去重后的数量。
`SELECT COUNT(DISTINCT department_id) AS department_count FROM employees;`

## 4.GROUP BY 是什么
GROUP BY 用于按照指定列分组统计。

## 5.WHERE 和 HAVING 的区别
WHERE 用于分组前筛选行。HAVING 用于分组后筛选统计结果。

# 4.窗口函数与条件表达式
## 1.为什么需要窗口函数
有些统计需求既要保留每一行明细，又要计算排名、累计值或前后行差异。
用 GROUP BY 会把多行合并成一行，不适合保留明细。

## 2.GROUP BY 和窗口函数的区别
GROUP BY:会合并,不保留全部明细,汇总统计
窗口函数:不合并,保留每一行,排名、累计、前后比较、组内统计

## 3.窗口函数基本语法
`窗口函数() OVER (PARTITION BY 分组列 ORDER BY 排序列)`

## 4.PARTITION BY
PARTITION BY 表示按什么分组计算窗口函数。

## 5.排名函数
```
ROW_NUMBER()	给每行连续编号	不考虑并列
RANK()	        排名	       并列后跳号
DENSE_RANK()	密集排名	    并列后不跳号
```

## 6.LAG 与 LEAD
LAG 用于取得上一行的值。LEAD 用于取得下一行的值。

## 7.CASE WHEN
CASE WHEN 用于条件表达式。
```
CASE
    WHEN 条件1 THEN 结果1
    WHEN 条件2 THEN 结果2
    ELSE 默认结果
END
```
CASE WHEN 经常和聚合函数一起使用。如按部门统计高工资人数。
```
SELECT department_id,
       SUM(CASE WHEN salary >= 300000 THEN 1 ELSE 0 END) AS high_salary_count
FROM employees
GROUP BY department_id;
```

## 8.NULL 处理
`COALESCE(email, '未设置')`将`'未设置'`视为null

# 5.视图是什么
视图（View）是基于查询语句保存下来的“虚拟表”。视图本身通常不直接保存数据，而是保存一段查询定义。查询视图时，数据库会根据视图中的 SELECT 语句从真实表中取数据。  
