# 1.ALTER TABLE 是什么
添加字段:  
`ALTER TABLE 表名 ADD [COLUMN] 列名 数据类型`
修改字段类型:  
`ALTER TABLE 表名 MODIFY [COLUMN] 列名 新数据类型;`
修改字段名:  
`ALTER TABLE 表名 RENAME COLUMN 旧列名 TO 新列名;`
删除字段:  
`ALTER TABLE 表名 DROP COLUMN 列名;`
添加或删除约束:在上一章节  

# 2.DROP TABLE
`DROP TABLE 表名`用于删除整张表。  
`TRUNCATE TABLE 表名;`TRUNCATE TABLE 用于清空整张表的数据，但保留表结构。  