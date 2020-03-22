package common

import (
	"flag"
	"sync"
)

var (
	cfgOnce sync.Once
)

var DbFile *string
var Port *string

func GetConfigInstance() {
	cfgOnce.Do(func() {
		DbFile = flag.String("db", "./data.db", "database file")
		Port = flag.String("port", "8888", "port")
		flag.Parse()

	})
	return
}
