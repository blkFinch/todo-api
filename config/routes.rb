Rails.application.routes.draw do

  get 'home/index'

  namespace :api do
    namespace :v1 do
      resources :cards
      resources :users

      post '/login', to: 'users#login'
      get 'test', to: 'users#test'

      post 'user_token' => 'user_token#create'
      get 'users/current' => 'users#current'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "home#index"
end
