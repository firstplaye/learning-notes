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

##