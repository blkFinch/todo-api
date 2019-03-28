module Api::V1
  class ProjectsController < ApplicationController

    def index
      @user = current_user
      @projects = @user.projects
      render json: @projects
    end

    def create
      @user = current_user
      @project = @user.projects.create(project_params)
      render json: @project
    end

    def update
      @proejct = Project.find(params[:id])
      @project.update_attributes(project_params)
      render json: @project
    end

    def destroy
      @project = Project.find(params[:id])
      if @project.destroy
        head :no_content, status: :ok
      else
        render json: @project.errors, status: :unprocessable_entity
      end
    end

    private
    def project_params
      params.require(:project).permit(:title, :description)
    end
  end
end
