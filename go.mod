module github.com/crackeer/mdweb

go 1.13

require (
	github.com/BurntSushi/toml v0.3.1
	github.com/gin-gonic/gin v1.5.0
	github.com/go-sql-driver/mysql v1.5.0
	github.com/gobuffalo/envy v1.9.0 // indirect
	github.com/gobuffalo/packr v1.30.1
	github.com/gobuffalo/packr/v2 v2.8.0 // indirect
	github.com/jinzhu/gorm v1.9.12
	github.com/karrick/godirwalk v1.15.6 // indirect
	github.com/mattn/go-sqlite3 v2.0.1+incompatible
	github.com/sirupsen/logrus v1.6.0 // indirect
	github.com/spf13/cobra v1.0.0 // indirect
	github.com/spf13/pflag v1.0.5 // indirect
	golang.org/x/crypto v0.0.0-20200429183012-4b2356b1ed79 // indirect
	golang.org/x/sync v0.0.0-20200317015054-43a5402ce75a // indirect
	golang.org/x/sys v0.0.0-20200501145240-bc7a7d42d5c3 // indirect
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
