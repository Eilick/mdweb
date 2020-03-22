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
