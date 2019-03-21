module Api::V1
  class ProjectsController < ApplicationController

    def index
      @user = User.find(params[:user_id])
      @projects = @user.projects
      render json: @projects
    end

    def create
      @user = User.find(params[:user_id])
      @project = @user.projects.create(project_params.merge(user: @user))
      render json: @project
    end

    private
    def project_params
      params.require(:project).permit(:title, :body)
    end
  end
end
