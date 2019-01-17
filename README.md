# SETUP

##Wylans shell command
run this in a bash shell to create a temporary docker for initialization

```
docker run --rm -v $(pwd):/app -w /app ruby:2.6 bundle install && rails new --database=postgresql --webpack -T
```

#NOTES

##Setting Up React
/app/assets/ - Rails will compile any resources in this folder. JavaScript files in this folder can be included in your views with <%= javascript_include_tag %>.
/app/javascript/ - Webpack will compile any resources in this folder. JavaScript files in this folder can be included in your views with <%= javascript_pack_tag %>.

By default, none of your packs are being rendered to your views. Open up /app/views/layouts/application.html.erb and add the following to the bottom of your <head> tag:
```
<%= javascript_pack_tag 'application' %>
```



#TODO
look into using react-rails gem
### Create Tables
Users
Lists
Cards