# TODO
initialize app in docker
```
docker-compose up
```

then install gems

```
docker-compose run api bundle
```

then create the app 
```
docker-compose run api bundle exec rails new . --api --database=postgresql
```
### Create Tables
Users
Lists
Cards