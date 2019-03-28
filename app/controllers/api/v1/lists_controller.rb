module Api::V1
  class ListsController < ApplicationController

    def index
      @project = Project.find(params[:project_id])
      @lists = @project.lists
      render json: @lists
    end

  end
end