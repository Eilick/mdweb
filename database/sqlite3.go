package database

import (
	"database/sql"
	"mysql-client/common"

	_ "github.com/mattn/go-sqlite3"
)

func AddArticle(title, content string) (int64, error) {

	db, err := sql.Open("sqlite3", "./data.db")

	if err != nil {
		return 0, err
	}

	defer db.Close()

	stmt, err := db.Prepare("INSERT INTO markdown(title, content, create_at) values(?, ?, ?)")

	if err != nil {
		return 0, err
	}

	res, err := stmt.Exec(title, content, common.GetNowDateTimeString())
	if err != nil {
		return 0, err
	}

	id, _ := res.LastInsertId()

	return id, nil
}
