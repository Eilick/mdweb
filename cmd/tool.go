package main

import (
	"encoding/base64"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"regexp"

	"github.com/crackeer/mdweb/common"
	"github.com/crackeer/mdweb/database"
)

var imgRegObj *regexp.Regexp
var indexFile *os.File

func main() {

	InitResource()

	list := database.GetArticleClassify()

	for _, c := range list {
		ExportMdList(c)
	}

	f, err := os.OpenFile(*common.ExportMdDir+"/README.md", os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		panic("生成readme.md失败")
	}

	content := []byte{}
	indexFile.Read(content)
	f.Write(content)
}

func InitResource() {
	common.GetToolConfigInstance()

	if _, err1 := os.Stat(*common.DbFile); err1 != nil {
		panic("请选择sqlite3数据库地址")
	}

	if _, err := os.Stat(*common.ExportMdDir); os.IsNotExist(err) {
		os.Mkdir(*common.ExportMdDir, os.ModePerm) //0777也可以os.ModePerm
		os.Chmod(*common.ExportMdDir, 0777)
	}

	RemoveContents(*common.ExportMdDir)

	if _, err := os.Stat(*common.ExportMdDir + "/image"); os.IsNotExist(err) {
		os.Mkdir(*common.ExportMdDir+"/image", os.ModePerm) //0777也可以os.ModePerm
		os.Chmod(*common.ExportMdDir+"/image", 0777)
	}

	var err error

	f, err := os.OpenFile(*common.ExportMdDir+"/SUMMARY.md", os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		panic("生成目录失败")
	}
	indexFile = f

	imgRegObj, err = regexp.Compile(`!\[image.png\]\(\/image\/([a-z0-9]+)\)`)

	if err != nil {
		panic(err)
	}
}

func ExportMdList(classify string) {

	list := database.ArticleList("", classify)

	classifyMdPath := *common.ExportMdDir + "/" + classify
	if _, err := os.Stat(classifyMdPath); os.IsNotExist(err) {
		os.Mkdir(classifyMdPath, os.ModePerm) //0777也可以os.ModePerm
		os.Chmod(classifyMdPath, 0777)
	}
	indexFile.Write([]byte("* " + classify + "\n"))
	for _, item := range list {
		GenMdById(item["id"].(string), item["title"].(string), classifyMdPath)
	}
}

func GenMdById(id string, name string, dir string) {

	fmt.Println("正在导出《" + name + "》.....")

	d := database.SingleArticle(id)
	if len(d) < 1 {
		return
	}

	mdText := d["content"].(string)

	fileName := fmt.Sprintf("%s/%s.md", dir, d["title"].(string))
	f, err := os.OpenFile(fileName, os.O_CREATE, 0666)

	if err != nil {
		return
	}
	defer f.Close()

	f.Write([]byte(mdText))

	match := imgRegObj.FindAllString(mdText, -1)

	if len(match) > 0 {
		fmt.Println("------正在导出文档里面的图片-------")
		for i, n := range match {
			fmt.Print("导出第", i+1, "张图片:")
			ExportImage(n, *common.ExportMdDir+"/image")
		}

	}
	fmt.Println("")
	indexItem := fmt.Sprintf("    * [%s](%s/%s.md)\n", name, d["classify"].(string), name)
	indexFile.Write([]byte(indexItem))

}

func ExportImage(imgUrl string, dir string) {
	imgName := strings.Replace(imgUrl, "![image.png](/image/", "", -1)
	imgName = strings.Replace(imgName, ")", "", -1)

	img := database.GetImage(imgName)
	if len(img) < 1 {
		fmt.Print("图片不存在")
		return
	}

	imgBase64Str := ""
	if _, ok := img["content"]; ok {
		imgBase64Str = img["content"].(string)
	}

	imgBytes, _ := base64.StdEncoding.DecodeString(imgBase64Str)

	imgPath := fmt.Sprintf("%s/%s", dir, imgName)
	f, err := os.OpenFile(imgPath, os.O_CREATE, 0666)

	if err != nil {
		return
	}
	defer f.Close()

	if _, err := f.Write(imgBytes); err != nil {
		fmt.Println("导出failed，", err.Error())
	} else {
		fmt.Println("导出ok")
	}
}

func RemoveContents(dir string) error {
	d, err := os.Open(dir)
	if err != nil {
		return err
	}
	defer d.Close()
	names, err := d.Readdirnames(-1)
	if err != nil {
		return err
	}
	for _, name := range names {
		err = os.RemoveAll(filepath.Join(dir, name))
		if err != nil {
			return err
		}
	}
	return nil
}
