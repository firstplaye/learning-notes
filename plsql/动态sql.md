# PL/SQL 动态 SQL
动态 SQL 是指在程序运行时，通过字符串构造 SQL 语句，然后执行它。

# EXECUTE IMMEDIATE 基本用法
```
set serveroutput on;
declare
    v_sql varchar2(1000);
begin
    v_sql := 'update employees
              set salary = salary * 1.05
              where department = ''HR''';
    
    execute immediate v_sql;
    
    dbms_output.put_line('rows:' || sql%rowcount);
end;
/
```
