package common

import (
	//"bufio"
	"flag"
	"sync"

	"github.com/BurntSushi/toml"
)

var (
	cfgInstance *Config
	cfgOnce     sync.Once
)

/* 程序配置结构体 */
type Config struct {
	Main  mainSection             `toml:"main"`
	Mysql map[string]mysqlSection `toml:"mysql"`
}

type mainSection struct {
	Host           string
	GinMode        string
	TestTable      string
	Timeout        int
	MaxDBIdleConns int
	MaxDBOpenConns int
}

type mysqlSection struct {
	Host string
	User string
	Pswd string
	Db   string
}

func GetConfigInstance() *Config {
	cfgOnce.Do(func() {
		cfile := flag.String("c", "./conf/faraday.toml", "config file")
		flag.Parse()
		if _, err := toml.DecodeFile(*cfile, &cfgInstance); err != nil {
			panic(err)
		}
	})
	return cfgInstance
}
