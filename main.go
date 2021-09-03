package main

import (
	"FrontEndCodeGenerator/CopyDirectory"
	"FrontEndCodeGenerator/DBChain"
	"FrontEndCodeGenerator/Zip"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strings"
)

var dataBaseName string


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

func ToDownload(w http.ResponseWriter, r *http.Request) {
	t := template.Must(template.ParseFiles("ToDownload.html"))
	t.Execute(w, nil)
}

func GenerateCode(w http.ResponseWriter, r *http.Request) {
	//copy templates to pages
	CopyDirectory.Dir("templates", "pages")
	//get data from dbchain
	dataMap := DBChain.GetFinalMap(dataBaseName)
	//inject data to templates
	var s []string
	s, _ = GetAllFile("templates", s)
	for _, filename := range s {
		t := template.Must(template.New(GetTrimPrefixFileName(filename)).Delims("{[", "]}").ParseFiles(filename))
		os.RemoveAll("pages/" + filename)
		trimPrefixPath := strings.TrimPrefix(filename, "templates/")
		file, err := os.OpenFile("pages/"+trimPrefixPath, os.O_WRONLY|os.O_CREATE, 0600)
		if err != nil {
			fmt.Println(err)
			return
		}
		t.Execute(file, dataMap)
	}
	//compress to zip
	Zip.ToZip("pages", "./code.zip")
	//redirect
	w.Header().Set("location", "http://192.168.0.199:8080/ToDownload")
	w.WriteHeader(302)
}

func GetTrimPrefixFileName(path string)string{
	lastIndex :=strings.LastIndex(path,"/")
	return  path[lastIndex+1:]
}

func Download(res http.ResponseWriter, r *http.Request) {
	fileName := "code.zip"
	file, err := os.Open(fileName)
	if err != nil {
		fmt.Println(err)
		return
	}
	res.Header().Add("Content-Type", "application/octet-stream")
	res.Header().Add("content-disposition", "attachment; filename=\""+fileName+"\"")
	_, err = io.Copy(res, file)
	if err != nil {
		res.Write([]byte(err.Error()))
		return
	}
}



func GetDatabaseName(res http.ResponseWriter, req *http.Request) {
	receiveParam := req.URL.RawQuery
	fmt.Println(receiveParam)
	dataBaseName = receiveParam
}

func main() {
	http.HandleFunc("/ToDownload", ToDownload)
	http.HandleFunc("/Download", Download)
	http.HandleFunc("/transDatabaseName", GetDatabaseName)
	http.HandleFunc("/GenerateCode", GenerateCode)
	http.ListenAndServe(":8080", nil)

}

