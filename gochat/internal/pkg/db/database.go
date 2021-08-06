package db

import (
	"fmt"

	"go/chat/internal/pkg/config"

	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// SetupDB opens a database and saves the reference to `Database` struct.
func SetupDBV2() {
	configuration := config.GetConfig()

	database := configuration.Database.Dbname
	host := configuration.Database.Host
	port := configuration.Database.Port

	err := mgm.SetDefaultConfig(nil, database, options.Client().ApplyURI("mongodb://"+host+":"+port+"/"))

	if err != nil {
		fmt.Println(err)
	}
}
