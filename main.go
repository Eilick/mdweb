package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/Eilick/mysql-client/common"
	"github.com/Eilick/mysql-client/database"

	"github.com/gin-gonic/gin"
	"github.com/gobuffalo/packr"
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

	if _, err := os.Stat("./image"); os.IsNotExist(err) {
		os.Mkdir("./image", 0777) //0777也可以os.ModePerm
		os.Chmod("./image", 0777)
	}
	common.GetConfigInstance()
	router := gin.New()
	router.Use(Cors())
	router.Use(gin.Recovery())

	gin.SetMode(gin.DebugMode)
	staticWorkDir := "./assets/dist"
	box := packr.NewBox(staticWorkDir)

	if md, err := box.Find("index.html"); err == nil {
		router.GET("/", func(ctx *gin.Context) {
			ctx.Data(http.StatusOK, "text/html", md)
		})
	}
	router.GET("/css/:name", func(ctx *gin.Context) {
		name := ctx.Param("name")
		if css, err := box.Find("css/" + name); err == nil {
			ctx.Data(http.StatusOK, "text/css", css)
		} else {
			ctx.Data(http.StatusOK, "text/css", []byte(""))
		}
	})
	router.GET("/fonts/:name", func(ctx *gin.Context) {
		name := ctx.Param("name")
		if css, err := box.Find("fonts/" + name); err == nil {
			ctx.Data(http.StatusOK, "text/css", css)
		} else {
			ctx.Data(http.StatusOK, "text/css", []byte(""))
		}
	})
	router.GET("/js/:name", func(ctx *gin.Context) {
		name := ctx.Param("name")
		if css, err := box.Find("js/" + name); err == nil {
			ctx.Data(http.StatusOK, "application/javascript", css)
		} else {
			ctx.Data(http.StatusOK, "application/javascript", []byte(""))
		}
	})

	router.StaticFS("/image", http.Dir("./image"))
	router.POST("/markdown/upload_image", uploadImage)
	router.POST("/markdown/create", CreateMd)
	router.POST("/markdown/update", UpdateMd)
	router.POST("/markdown/delete", DeleteMd)
	router.GET("/markdown/list", MdList)
	router.GET("/markdown/detail", SingleMd)
	router.GET("/markdown/images", getImageList)

	router.Run(":" + *common.Port)

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

func getImageList(ctx *gin.Context) {
	fs, _ := ioutil.ReadDir("./image")
	list := []map[string]interface{}{}
	for _, file := range fs {
		t := file.ModTime()
		ts := t.Format("2006-01-02 15:04:05")
		list = append(list, map[string]interface{}{
			"name":      file.Name(),
			"create_at": ts,
			"url":       "/image/" + file.Name(),
		})
	}
	ctx.JSON(http.StatusOK, map[string]interface{}{
		"code": 0,
		"data": list,
	})
}
