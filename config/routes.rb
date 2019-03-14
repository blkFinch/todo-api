Rails.application.routes.draw do

  get 'home/index'

  namespace :api do
    namespace :v1 do

      resources :users do

        resources :lists do
          resources :cards
        end
      end

      post '/login', to: 'users#login'
      get '/test', to: 'users#test'
      delete '/logout', to: 'users#logout'

      post 'user_token' => 'user_token#create'
      get 'users/current' => 'users#current'
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "home#index"
end
