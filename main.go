package main

import (
	"fmt"
	"mysql-client/common"
	"mysql-client/database"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
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
	staticWorkDir := *common.WorkDir + "assets/dist"
	fmt.Println(staticWorkDir)
	router.StaticFile("/md", staticWorkDir+"/md.html")
	router.StaticFS("/image", http.Dir("./image"))
	router.StaticFS("/css", http.Dir(staticWorkDir+"/css"))
	router.StaticFS("/js", http.Dir(staticWorkDir+"/js"))
	router.StaticFS("/fonts", http.Dir(staticWorkDir+"/fonts"))

	router.POST("/sql", ExcuteSql)
	router.GET("/db_list", getDbList)
	router.GET("/test", Test)
	router.POST("/markdown/upload_image", uploadImage)
	router.POST("/markdown/create", CreateMd)
	router.POST("/markdown/update", UpdateMd)
	router.POST("/markdown/delete", DeleteMd)
	router.GET("/markdown/list", MdList)
	router.GET("/markdown/detail", SingleMd)

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

type Markdown struct {
	Id      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

func CreateMd(ctx *gin.Context) {
	var md Markdown
	if err := ctx.BindJSON(&md); err != nil {
		ctx.JSON(http.StatusOK, map[string]interface{}{
			"code":    -1,
			"message": err.Error(),
		})
		return
	}

	id, err := database.AddArticle(md.Title, md.Content)

	if err != nil {
		ctx.JSON(http.StatusOK, map[string]interface{}{
			"code":    -1,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"code": 0,
		"id":   id,
	})

}

func UpdateMd(ctx *gin.Context) {
	var md Markdown
	if err := ctx.BindJSON(&md); err != nil {
		ctx.JSON(http.StatusOK, map[string]interface{}{
			"code":    -1,
			"message": err.Error(),
		})
		return
	}

	id, err := database.UpdateMd(md.Id, md.Title, md.Content)

	if err != nil {
		ctx.JSON(http.StatusOK, map[string]interface{}{
			"code":    -1,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"code": 0,
		"id":   id,
	})

}

func DeleteMd(ctx *gin.Context) {
	var md Markdown
	if err := ctx.BindJSON(&md); err != nil {
		ctx.JSON(http.StatusOK, map[string]interface{}{
			"code":    -1,
			"message": err.Error(),
		})
		return
	}

	id, err := database.DeleteMd(md.Id)

	if err != nil {
		ctx.JSON(http.StatusOK, map[string]interface{}{
			"code":    -1,
			"message": err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, map[string]interface{}{
		"code": 0,
		"id":   id,
	})

}

func MdList(ctx *gin.Context) {

	list := database.ArticleList()

	ctx.JSON(http.StatusOK, list)

}

func SingleMd(ctx *gin.Context) {

	d := database.SingleArticle(ctx.DefaultQuery("id", "0"))

	ctx.JSON(http.StatusOK, d)

}

func uploadImage(ctx *gin.Context) {
	header, err := ctx.FormFile("file")
	if err != nil {
		ctx.JSON(http.StatusOK, map[string]interface{}{
			"code":    -1,
			"message": err.Error(),
		})
		return
	}

	dst := header.Filename
	l := strings.Split(dst, ".")
	md5Name := common.Md5Crypt([]byte(dst + common.GetNowDateTimeString()))
	fullPath := fmt.Sprintf("./image/%s.%s", md5Name, l[1])

	if err := ctx.SaveUploadedFile(header, fullPath); err != nil {
		ctx.JSON(http.StatusOK, map[string]interface{}{
			"code":    -1,
			"message": err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, map[string]interface{}{
		"code": 0,
		"file": fmt.Sprintf("%s.%s", md5Name, l[1]),
	})
	return
}
