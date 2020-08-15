package common

import (
	"github.com/dgrijalva/jwt-go"
	"fmt"
	"time"
)

const AppSecret string = "hello, world"

func GenJwt(user interface{}) (string, error) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user": user,
		"exp":  time.Now().Add(720 * time.Hour),
	})

	return token.SignedString([]byte(AppSecret))
}

func GenMDJwt(id string) (string, error) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": id,
	})

	return token.SignedString([]byte(AppSecret))
}


func ParseJwt(token string) (map[string]interface{}, error) {

	tokenObj, err := jwt.Parse(token, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(AppSecret), nil
	})

	if err != nil {
		return nil, err
	}

	return tokenObj.Claims.(jwt.MapClaims), nil
}