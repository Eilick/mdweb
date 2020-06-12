package database

import (
	"database/sql"
	"fmt"

	"github.com/crackeer/mdweb/common"

	_ "github.com/mattn/go-sqlite3"
)

func GetDb() string {
	return *common.DbFile
}

func AddArticle(title, content, classify string) (int64, error) {

	tmpDb, err := sql.Open("sqlite3", GetDb())

	if err != nil {
		panic(err)
	}

	stmt, err := tmpDb.Prepare("INSERT INTO markdown(title, content, classify,show_status, create_at, update_at) values(?, ?, ?, ?, ?, ?)")

	if err != nil {
		return 0, err
	}

	nowTime := common.GetNowDateTimeString()
	res, err := stmt.Exec(title, content, classify, 0, nowTime, nowTime)
	stmt.Close()
	tmpDb.Close()
	if err != nil {
		return 0, err
	}

	id, _ := res.LastInsertId()

	return id, nil
}

func UpdateMd(id, title, content string) (bool, error) {

	tmpDb, err := sql.Open("sqlite3", GetDb())

	if err != nil {
		panic(err)
	}

	stmt, err := tmpDb.Prepare("UPDATE markdown SET title=?,content = ?,update_at =? WHERE id= ? ")
	if err != nil {
		return false, err
	}

	nowTime := common.GetNowDateTimeString()
	_, err = stmt.Exec(title, content, nowTime, id)
	stmt.Close()
	tmpDb.Close()
	if err != nil {
		return false, err
	}

	return true, nil
}

func MoveMd(id, classify string) (bool, error) {

	tmpDb, err := sql.Open("sqlite3", GetDb())

	if err != nil {
		panic(err)
	}

	stmt, err := tmpDb.Prepare("UPDATE markdown SET classify=? WHERE id= ? ")
	if err != nil {
		return false, err
	}

	_, err = stmt.Exec(classify, id)
	stmt.Close()
	tmpDb.Close()
	if err != nil {
		return false, err
	}

	return true, nil
}

func DeleteMd(id string) (bool, error) {

	tmpDb, err := sql.Open("sqlite3", GetDb())

	if err != nil {
		panic(err)
	}

	stmt, err := tmpDb.Prepare("UPDATE markdown SET show_status=-1,update_at =? WHERE id= ? ")
	if err != nil {
		return false, err
	}

	nowTime := common.GetNowDateTimeString()
	_, err = stmt.Exec(nowTime, id)
	stmt.Close()
	tmpDb.Close()
	if err != nil {
		return false, err
	}

	return true, nil
}

func DeleteMdForever(id string) (bool, error) {

	tmpDb, err := sql.Open("sqlite3", GetDb())

	if err != nil {
		panic(err)
	}

	stmt, err := tmpDb.Prepare("DELETE from markdown WHERE id= ? and show_status=-1")
	if err != nil {
		return false, err
	}

	_, err = stmt.Exec(id)
	stmt.Close()
	tmpDb.Close()
	if err != nil {
		return false, err
	}

	return true, nil
}

func RecoverMd(id string) (bool, error) {

	tmpDb, err := sql.Open("sqlite3", GetDb())

	if err != nil {
		panic(err)
	}

	stmt, err := tmpDb.Prepare("UPDATE markdown SET show_status=0,update_at =? WHERE id= ? and show_status = -1")
	if err != nil {
		return false, err
	}

	nowTime := common.GetNowDateTimeString()
	_, err = stmt.Exec(nowTime, id)
	stmt.Close()
	tmpDb.Close()
	if err != nil {
		return false, err
	}

	return true, nil
}

func ArticleList(listStatus string, classify string) []map[string]interface{} {
	tmpDb, err := sql.Open("sqlite3", GetDb())

	if err != nil {
		panic(err)
	}

	var showStatus int = 0
	if listStatus == "trash" {
		showStatus = -1
	}

	sqlStr := fmt.Sprintf("SELECT id, title,classify, create_at,update_at FROM markdown where show_status=%d order by update_at desc", showStatus)
	if classify != "全部" {
		sqlStr = fmt.Sprintf("SELECT id, title, classify, create_at,update_at FROM markdown where show_status=%d and classify='%s' order by update_at desc", showStatus, classify)
	}

	rows, err := tmpDb.Query(sqlStr)

	if err != nil {
		return []map[string]interface{}{}
	}

	list := []map[string]interface{}{}
	for rows.Next() {
		title := ""
		id := ""
		createAt := ""
		updateAt := ""
		clas := ""
		if err := rows.Scan(&id, &title, &clas, &createAt, &updateAt); err == nil {
			list = append(list, map[string]interface{}{
				"id":        id,
				"title":     title,
				"classify":  clas,
				"create_at": createAt,
				"update_at": updateAt,
			})
		}
	}
	rows.Close()
	tmpDb.Close()

	return list
}

func GetArticleClassify() []string {
	tmpDb, err := sql.Open("sqlite3", GetDb())

	if err != nil {
		panic(err)
	}

	sqlStr := fmt.Sprintf("SELECT distinct classify FROM markdown where show_status=0")
	rows, err := tmpDb.Query(sqlStr)

	if err != nil {
		return []string{}
	}

	list := []string{}
	for rows.Next() {
		classify := ""
		if err := rows.Scan(&classify); err == nil {
			list = append(list, classify)
		}
	}
	rows.Close()
	tmpDb.Close()

	return list
}

func SingleArticle(id string) map[string]interface{} {

	tmpDb, err := sql.Open("sqlite3", GetDb())

	if err != nil {
		panic(err)
	}

	rows, err := tmpDb.Query(fmt.Sprintf("SELECT id,title,content,classify, create_at,update_at,show_status FROM markdown where id = %s", id))

	if err != nil {
		return map[string]interface{}{}
	}

	data := map[string]interface{}{}
	for rows.Next() {
		title := ""
		id := 0
		content := ""
		createAt := ""
		updateAt := ""
		classify := ""
		showStatus := 0
		if err := rows.Scan(&id, &title, &content, &classify, &createAt, &updateAt, &showStatus); err == nil {
			data = map[string]interface{}{
				"id":          id,
				"title":       title,
				"content":     content,
				"update_at":   updateAt,
				"create_at":   createAt,
				"show_status": showStatus,
				"classify":    classify,
			}
			break
		}
	}
	rows.Close()
	tmpDb.Close()

	return data
}

func AddImage(content, sign string) (int64, error) {

	tmpDb, err := sql.Open("sqlite3", GetDb())

	if err != nil {
		panic(err)
	}

	stmt, err := tmpDb.Prepare("INSERT INTO picture(content, sign, create_at) values(?, ?, ?)")

	if err != nil {
		return 0, err
	}

	nowTime := common.GetNowDateTimeString()
	res, err := stmt.Exec(content, sign, nowTime)
	stmt.Close()
	tmpDb.Close()
	if err != nil {
		return 0, err
	}

	id, _ := res.LastInsertId()

	return id, nil
}

func GetImage(sign string) map[string]interface{} {

	tmpDb, err := sql.Open("sqlite3", GetDb())

	if err != nil {
		panic(err)
	}

	rows, err := tmpDb.Query(fmt.Sprintf("SELECT id,content,create_at FROM picture where sign = '%s'", sign))
	if err != nil {
		return map[string]interface{}{}
	}

	data := map[string]interface{}{}
	for rows.Next() {
		id := 0
		content := ""
		createAt := ""
		updateAt := ""
		if err := rows.Scan(&id, &content, &createAt); err == nil {
			data = map[string]interface{}{
				"id":        id,
				"content":   content,
				"update_at": updateAt,
			}
			break
		}
	}
	rows.Close()
	tmpDb.Close()

	return data
}
