class ApplicationController < ActionController::Base
  include ::ActionController::Cookies

  before_action :authenticate_request
  attr_reader :current_user

  include ExceptionHandler

  # [...]
  private
  def authenticate_request
    jwt = cookies.signed[:jwt]
    puts "jwt: " + jwt
    @current_user = AuthorizeApiRequest.call(request.headers, jwt).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
