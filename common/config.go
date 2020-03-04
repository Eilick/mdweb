package common

import (
	"flag"
	"sync"
)

var (
	cfgOnce sync.Once
)

var DbDir *string
var Port *string

func GetConfigInstance() {
	cfgOnce.Do(func() {
		DbDir = flag.String("db-dir", "./", "database dir file")
		Port = flag.String("port", "8888", "port")
		flag.Parse()

	})
	return
}
