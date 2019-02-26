# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

cards = Card.create([
  {
    title: "Add sessions/users",
    body: "users should be able to login to access a list of projects and lists"
  },
  {
    title:"Add lists",
    body:"every card should be long to a list"
  },
  {
    title: "Single page or Multi-page??",
    body:"should the app be entirely react or use some rails routing etc..."
  },
  {
    title: "add status to cards",
    body: "cards should have a status to decide if pending or done or in progress etc..."
  }
])

users = User.create([
  {
    username: "finch",
    password: "finchpass",
    password_confirmation: "finchpass",
    permission_level: 2
  },
  {
    username: "scout",
    password: "scoutpass",
    password_confirmation: "scoutpass"
  }
])