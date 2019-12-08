package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"mysql-client/common"
	"mysql-client/database"
	"net/http"
)

func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "*")

		if c.Request.Method == "OPTIONS" {
			c.JSON(http.StatusOK, "Options Request")
		}

		c.Set("content-type", "application/json")
		c.Next()
	}
}
func main() {

	cfg := common.GetConfigInstance()
	database.DbSetUp(cfg)

	router := gin.New()
	router.Use(Cors())
	router.Use(gin.Recovery())

	gin.SetMode(gin.DebugMode)

	router.POST("/sql", ExcuteSql)
	router.GET("/db_list", getDbList)
	router.GET("/test", Test)

	router.Run(cfg.Main.Host)

}

type SqlReq struct {
	Sql    string `json:"sql"`
	DbName string `json:"db_name"`
}

func Test(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, map[string]interface{}{})
}

func ExcuteSql(ctx *gin.Context) {

	var sqlreq SqlReq
	err := ctx.BindJSON(&sqlreq)
	fmt.Println(sqlreq)

	if err != nil {
		ctx.JSON(http.StatusOK, map[string]interface{}{})
		return
	}

	d := database.GetSqlExcute(sqlreq.DbName, sqlreq.Sql)
	ctx.JSON(http.StatusOK, d)
}

func getDbList(ctx *gin.Context) {

	cfg := common.GetConfigInstance()

	list := make(map[string]string)
	for n, item := range cfg.Mysql {
		list[n] = item.Name
	}

	ctx.JSON(http.StatusOK, list)
}
