package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"strings"
)

func GetTrimPrefixFileName(path string) string {
	lastIndex := strings.LastIndex(path, "/")
	return path[lastIndex+1:]
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
