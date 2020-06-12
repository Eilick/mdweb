package common

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"net/http"
	"time"
)

var (
	client = &http.Client{
		Timeout: 30 * time.Second,
	}
)

func UploadPicture(fileName string, f *multipart.File) map[string]interface{} {

	body := new(bytes.Buffer)
	writer := multipart.NewWriter(body)

	fmt.Println(fileName)
	formFile, err := writer.CreateFormField("smfile")
	if err != nil {
		return map[string]interface{}{
			"code":    " fail",
			"message": err.Error(),
		}
	}

	_, err = io.Copy(formFile, *f)
	if err != nil {
		return map[string]interface{}{
			"code":    " fail",
			"message": err.Error(),
		}
	}

	err = writer.Close()
	if err != nil {
		return map[string]interface{}{
			"code":    " fail",
			"message": err.Error(),
		}
	}

	req, _ := http.NewRequest("POST", "https://sm.ms/api/v2/upload", body)

	req.Header.Set("Content-Type", writer.FormDataContentType())
	req.Header.Set("Authorization", "Basic Pyd7FCFpDbltmNJMr5Gol5vcyVhvCNNQ")

	resp, err := client.Do(req)

	if err != nil {
		return map[string]interface{}{
			"code":    " fail",
			"message": err.Error(),
		}
	}

	defer resp.Body.Close()

	res, _ := ioutil.ReadAll(resp.Body)

	retData := map[string]interface{}{}

	json.Unmarshal(res, &retData)

	return retData

}
