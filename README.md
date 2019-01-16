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

##Wylans shell command
run this in a bash shell to create a temporary docker for initialization

```
docker run --rm -v $(pwd):/apps -w sh -c "/apps ruby:2.6 bundle install && rails new . --database=postgresql --webpack -T"
```
### Create Tables
Users
Lists
Cards