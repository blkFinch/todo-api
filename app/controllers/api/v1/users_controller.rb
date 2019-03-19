module Api::V1
  class UsersController < ApplicationController
    skip_before_action :authenticate_request, :only => [:login]

    def login
      authenticate user_params[:username], user_params[:password]
    end

    def logout
      cookies.delete(:jwt)

      render json:{
        message: 'Logout Successful-- Goodbye!'
      }
    end

    def test
      render json: {
            message: 'You have passed authentication and authorization test'
          }
    end

    def show
    end

    def current
      render json: current_user.as_json(only: :username)
    end

    private

    def authenticate(username, password)
      command = AuthenticateUser.call(username, password)
      if command.success?
        created_jwt = command.result
        cookies.signed[:jwt] = {
          value: created_jwt,
          httponly: true,
          expires: 1.hour.from_now
        }

        @user = User.find_by(username: username).as_public_json

        render json: {
          access_token: command.result,
          message: 'Login Successful',
          user: @user
        }
      else
        render json: { error: command.errors }, status: :unauthorized
      end
    end

    def user_params
      params.permit(
        :username,
        :email,
        :password
      )
    end
  end
end