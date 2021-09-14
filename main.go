package main

import (
	"FrontEndCodeGenerator/copyDirectory"
	"FrontEndCodeGenerator/dbchain"
	"FrontEndCodeGenerator/toZip"
	"crypto/hmac"
	"crypto/sha256"
	"fmt"
	"github.com/mr-tron/base58"
	"html/template"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"time"
)

func GenerateCode(w http.ResponseWriter, r *http.Request) {
	//get params
	appCode := r.FormValue("appCode")
	templateFlag := r.FormValue("templateFlag")
	baseUrl := r.FormValue("baseUrl")
	accessToken := r.FormValue("accessToken")
	//accessToken :=dbchain.MakeAccessCode()
	//basic Verify
	if len(appCode) == 0 || len(templateFlag) == 0 || len(baseUrl) == 0 || len(accessToken) == 0 {
		fmt.Fprintf(w, "params error")
		return
	}
	//get dataMap from dbchain
	dataMap := dbchain.GetFinalMapData(baseUrl, accessToken, appCode)
	h := hmac.New(sha256.New, []byte(strconv.FormatInt(time.Now().UnixNano(), 10)))
	tmpDirName := base58.Encode(h.Sum(nil))
	//delete tmpDir
	defer os.RemoveAll(tmpDirName)
	var fileName string
	var finalDir string
	switch templateFlag {
	case "1":
		fileName = "dbchain_" + appCode + "_" + "template" + templateFlag
		os.MkdirAll(tmpDirName+"/"+fileName, 0777)
		fileName = "dbchain_" + appCode + "_" + "template" + templateFlag
		finalDir = tmpDirName + "/" + fileName
		copyDirectory.Dir("templates/template1", finalDir)
		//inject datas to template
		var s []string
		s, _ = GetAllFile(finalDir+"/dbchain-template/src/views/template", s)
		for _, filename := range s {
			t := template.Must(template.New(GetTrimPrefixFileName(filename)).Delims("{[", "]}").ParseFiles(filename))
			file, err := os.OpenFile(filename, os.O_WRONLY|os.O_TRUNC|os.O_CREATE, 0600)
			if err != nil {
				fmt.Println(err)
				return
			}
			t.Execute(file, dataMap)
		}
	default:
		fmt.Fprintln(w, "no such template")
		return
	}
	fileZipName := fileName + ".zip"
	//compress
	toZip.ToZip(finalDir, fileZipName)
	//download
	file, err := os.Open(fileZipName)
	if err != nil {
		fmt.Println(err)
		return
	}
	//set response head
	w.Header().Add("Content-Type", "application/octet-stream")
	w.Header().Add("content-disposition", "attachment; filename=\""+fileZipName+"\"")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	_, err = io.Copy(w, file)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
	os.Remove(fileZipName)
}


func TemplatePreview(w http.ResponseWriter, r *http.Request) {
	//set response head
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type")
	//get params
	templateFlag := r.FormValue("templateFlag")
	//basic Verify
	if len(templateFlag) == 0 {
		fmt.Fprintf(w, "params error")
		return
	}
	//choose template by flag
	switch templateFlag {
	case "1":
		filename := "templatePreview/template1/index.html"
		t := template.Must(template.New(GetTrimPrefixFileName(filename)).Delims("{[", "]}").ParseFiles(filename))
		t.Execute(w, nil)
	default:
		fmt.Fprintln(w, "no such template")
	}
}

func TemplateNums(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type")
	rd, _ := ioutil.ReadDir("templatePreview")
	var templateNames []map[string]interface{}
	for index, fi := range rd {
		tmpMap := make(map[string]interface{})
		f, _ := os.Open("templatePreview/" + fi.Name() + "/baseUrl.txt")
		tmpMap["name"] = fi.Name()
		baseUrl, _ := ioutil.ReadAll(f)
		tmpMap["baseUrl"] = string(baseUrl)
		tmpMap["templateFlag"] = index + 1
		templateNames = append(templateNames, tmpMap)
	}
	tmp := make(map[string]interface{})
	tmp["templateNames"] = templateNames
	templateNamesJson := MapToJson(tmp)
	fmt.Fprintf(w, templateNamesJson)
}

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/GenerateCode", GenerateCode)
	http.HandleFunc("/templateNums", TemplateNums)
	http.HandleFunc("/templatePreview", TemplatePreview)
	http.ListenAndServe(":8080", nil)
}

