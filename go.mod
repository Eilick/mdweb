module github.com/crackeer/mdweb

go 1.13

require (
	github.com/BurntSushi/toml v0.3.1
	github.com/gin-gonic/gin v1.5.0
	github.com/go-sql-driver/mysql v1.5.0
	github.com/gobuffalo/envy v1.9.0 // indirect
	github.com/gobuffalo/packd v1.0.0 // indirect
	github.com/gobuffalo/packr v1.30.1
	github.com/jinzhu/gorm v1.9.12
	github.com/mattn/go-sqlite3 v2.0.1+incompatible
	github.com/rogpeppe/go-internal v1.5.2 // indirect
)

replace (
	golang.org/x/crypto => github.com/golang/crypto v0.0.0-20200302210943-78000ba7a073
	golang.org/x/mod => github.com/golang/mod v0.2.0
	golang.org/x/net => github.com/golang/net v0.0.0-20200301022130-244492dfa37a
	golang.org/x/sync => github.com/golang/sync v0.0.0-20190911185100-cd5d95a43a6e
	golang.org/x/sys => github.com/golang/sys v0.0.0-20200302150141-5c8b2ff67527
	golang.org/x/text => github.com/golang/text v0.3.2
	golang.org/x/tools => github.com/golang/tools v0.0.0-20200304024140-c4206d458c3f
	golang.org/x/xerrors => github.com/golang/xerrors v0.0.0-20191204190536-9bdfabe68543
	google.golang.org/appengine => github.com/golang/appengine v1.6.5

)
