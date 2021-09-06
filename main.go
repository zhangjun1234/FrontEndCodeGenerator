package main

import (
	"FrontEndCodeGenerator/copyDirectory"
	"FrontEndCodeGenerator/dbchain"
	"FrontEndCodeGenerator/toZip"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

func GenerateCode(w http.ResponseWriter, r *http.Request) {
	//get params
	appCode :=r.FormValue("appCode")
	templateFlag :=r.FormValue("templateFlag")
	baseUrl :=r.FormValue("baseUrl")
	//basic Verify
	if len(appCode)==0|| len(templateFlag)==0|| len(baseUrl)==0 {
		fmt.Fprintf(w,"params error")
		return
	}
	//get dataMap from dbchain
	dataMap := dbchain.GetFinalMap(baseUrl, appCode)
	//remove previous data
	os.RemoveAll("FrontEndCode")
	switch templateFlag {
	case "1":
		copyDirectory.Dir("templates/template1", "FrontEndCode")
		//inject data to templates
		var s []string
		s, _ = GetAllFile("FrontEndCode", s)
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
	//compress
	toZip.ToZip("FrontEndCode", "./code.zip")
	//download
	fileName := "code.zip"
	file, err := os.Open(fileName)
	if err != nil {
		fmt.Println(err)
		return
	}
	w.Header().Add("Content-Type", "application/octet-stream")
	w.Header().Add("content-disposition", "attachment; filename=\""+fileName+"\"")
	_, err = io.Copy(w, file)
	if err != nil {
		w.Write([]byte(err.Error()))
		return
	}
}

func TemplatePreview(w http.ResponseWriter, r *http.Request) {
	//get params
	templateFlag :=r.FormValue("templateFlag")

	//basic Verify
	if  len(templateFlag)==0 {
		fmt.Fprintf(w,"params error")
		return
	}

	switch templateFlag {
	case "1":
		filename := "templatePreview/templatev"+templateFlag+".html"
		t := template.Must(template.New(GetTrimPrefixFileName(filename)).Delims("{[", "]}").ParseFiles(filename))
		t.Execute(w, nil)
	default:
		fmt.Fprintln(w, "no such template")
	}
}

func TemplateNums(w http.ResponseWriter, r *http.Request) {
	rd, _ := ioutil.ReadDir("templates")
	var templateNames []string
	for _, fi := range rd {
		templateNames = append(templateNames,fi.Name())
	}
	tmp := make(map[string]interface{})
	tmp["templateNames"]=templateNames
	templateNamesJson :=MapToJson(tmp)
	fmt.Fprintf(w, templateNamesJson)
}


func main() {
	http.HandleFunc("/GenerateCode", GenerateCode)
	http.HandleFunc("/templateNums",  TemplateNums)
	http.HandleFunc("/templatePreview", TemplatePreview)
	http.ListenAndServe(":8080", nil)
}








func GetTrimPrefixFileName(path string)string{
	lastIndex :=strings.LastIndex(path,"/")
	return  path[lastIndex+1:]
}

func GetAllFile(pathname string, s []string) ([]string, error) {
	rd, err := ioutil.ReadDir(pathname)
	if err != nil {
		fmt.Println("read dir fail:", err)
		return s, err
	}
	for _, fi := range rd {
		if fi.IsDir() {
			fullDir := pathname + "/" + fi.Name()
			s, err = GetAllFile(fullDir, s)
			if err != nil {
				fmt.Println("read dir fail:", err)
				return s, err
			}
		} else {
			fullName := pathname + "/" + fi.Name()
			s = append(s, fullName)
		}
	}
	return s, nil
}


func MapToJson(myMap map[string]interface{}) string {
	bytes, err := json.Marshal(myMap)
	if err != nil {
		panic(err)
	}
	return string(bytes)
}