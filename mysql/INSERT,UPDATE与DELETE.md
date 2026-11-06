# 1.INSERT 是什么
INSERT 用于向表中新增数据。分为:
指定列名插入  
`INSERT INTO 表名 (列1, 列2, 列3) VALUES (值1, 值2, 值3);`
不指定列名插入(要求值的数量和顺序必须和表字段完全一致)  
`INSERT INTO 表名 VALUES (值1, 值2, 值3);`

# 2.UPDATE 是什么
UPDATE 用于修改已有数据。
`UPDATE 表名 SET 列1 = 新值1,列2 = 新值2 WHERE 条件;`

# 3.DELETE 是什么
DELETE 用于删除表中的数据。  
`DELETE FROM 表名 WHERE 条件;`
