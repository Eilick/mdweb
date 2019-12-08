package database

import (
	"database/sql"
	"fmt"
	"strings"
)

func GetSqlExcute(sqlStr string) []map[string]interface{} {

	rows, _ := DbConn.Query(sqlStr)

	columns, err := rows.Columns()
	if err != nil {
		panic(err.Error())
	}

	values := make([]sql.RawBytes, len(columns))

	scanArgs := make([]interface{}, len(values))
	for i := range values {
		scanArgs[i] = &values[i]
	}
	fmt.Println(scanArgs)

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
