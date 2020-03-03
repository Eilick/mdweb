package common

import (
	"flag"
	"sync"
)

var (
	cfgOnce     sync.Once
)

var WorkDir *string
var Port *string

func GetConfigInstance() {
	cfgOnce.Do(func() {
		WorkDir = flag.String("work-dir", "./", "work-dir file")
		Port = flag.String("port", "8888", "work-dir file")
		flag.Parse()

	})
	return
}
