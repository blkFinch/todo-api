module Api::V1
  class UsersController < ApplicationController

    def current
      render json: current_user.as_json(only: :username))
    end
  end
end