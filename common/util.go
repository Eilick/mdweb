package common

import "time"

func GetNowDateTimeString() string {
	return time.Now().Format("2006-01-02 15:04:05")
}

func GetNowDate() string {
	return time.Now().Format("2006-01-02")
}
