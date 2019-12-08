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

var DbConn *sql.DB
var once sync.Once

func DbSetUp(cfg *common.Config) {
	once.Do(func() {
		msCf := cfg.Mysql["1"]
		dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=false&loc=Local", msCf.User,
			msCf.Pswd, msCf.Host, msCf.Db)
		conn, err := sql.Open("mysql", dsn)
		fmt.Println(dsn, err, conn)
		if err != nil {
			panic("连接Faraday数据库失败:" + err.Error())
		}
		conn.SetMaxIdleConns(10)
		conn.SetMaxOpenConns(100)
		DbConn = conn
	})

	fmt.Println(DbConn)
}
