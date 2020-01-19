package database

import (
	"database/sql"
	"fmt"
	"strings"
)

func GetSqlExcute(dbName, sqlStr string) []map[string]interface{} {

	fmt.Println(dbName)
	if _, ok := DbConn[dbName]; !ok {
		return []map[string]interface{}{}
	}
	dbConn := DbConn[dbName]

	rows, _ := dbConn.Query(sqlStr)

	columns, err := rows.Columns()
	if err != nil {
		panic(err.Error())
	}

	values := make([]sql.RawBytes, len(columns))

	scanArgs := make([]interface{}, len(values))
	for i := range values {
		scanArgs[i] = &values[i]
	}

	list := []map[string]interface{}{}

	for rows.Next() {
		err = rows.Scan(scanArgs...)
		if err != nil {
			panic(err.Error())
		}

		var value string
		data := make(map[string]interface{})
		for i, col := range values {
			if col == nil {
				value = ""
			} else {
				value = string(col)
			}

			columName := strings.ToLower(columns[i])
			data[columName] = value
		}
		list = append(list, data)
	}
	return list
}
