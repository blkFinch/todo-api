module Api::V1
  class ListsController < ApplicationController

    def index
      @project = Project.find(params[:project_id])
      @lists = @project.lists
      render json: @lists
    end

    def create
      @project = Project.find(params[:project_id])
      @list = @project.lists.create(list_params)
      render json: @list
    end

    def destroy
      @list = List.find(params[:id])
      if @list.destroy
        head :no_content, status: :ok
      else
        render json: @list.errors, status: :unprocessable_entity
      end
    end

    private

      def list_params
        params.require(:list).permit(:name)
      end

  end
end