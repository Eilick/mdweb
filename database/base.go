package database

import (
	"database/sql"
	// "fmt"
	"sync"

	// "github.com/Eilick/mysql-client/common"

	_ "github.com/go-sql-driver/mysql"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

const PAGE_SIZE = 20

var DbConn map[string]*sql.DB
var once sync.Once


func GenerateDatabase(dbfile string) error {
	db, err := sql.Open("sqlite3", dbfile)
	defer db.Close()

	sqlStmt := `
	CREATE TABLE markdown(id integer primary key,title text,content text,show_status int,create_at char(64),modify_at char(64), update_at char(60));`
	_, err = db.Exec(sqlStmt)
	if err != nil {
		panic("init database file failed")
	}
	return err

}