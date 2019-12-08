package database

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"mysql-client/common"
	"sync"
)

const PAGE_SIZE = 20

var DbConn map[string]*sql.DB
var once sync.Once

func DbSetUp(cfg *common.Config) {
	once.Do(func() {
		DbConn = make(map[string]*sql.DB)
		for k, c := range cfg.Mysql {
			dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=false&loc=Local", c.User, c.Pswd, c.Host, c.Db)
			conn, err := sql.Open("mysql", dsn)

			if err != nil {
				panic(fmt.Sprint("连接数据库%s失败，错误原因", c.Name, err.Error()))
			}
			conn.SetMaxIdleConns(10)
			conn.SetMaxOpenConns(100)
			DbConn[k] = conn
		}

	})

	fmt.Println(DbConn)
}
