Rails.application.routes.draw do

  get 'home/index'

  namespace :api do
    namespace :v1 do

      resources :users

      resources :projects do
        resources :lists
      end

      resources :lists do
        resources :cards
      end

      resources :cards, only: :update

      post '/login', to: 'users#login'
      get '/return_active_user', to: 'users#return_active_user'
      delete '/logout', to: 'users#logout'

      post 'user_token' => 'user_token#create'
      get 'users/current' => 'users#current'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "home#index"
end
