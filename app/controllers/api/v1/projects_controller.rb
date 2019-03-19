module Api::V1
  class ProjectsController < ApplicationController

    def index
      @user = User.find(params[:user_id])
      @projects = @user.projects
      render json: @projects
    end
  end
end
