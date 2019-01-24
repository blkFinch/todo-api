module Api::V1
  class CardsController < ApplicationController

    def index
      @cards = Card.order("created_at DESC")
      render json: @cards
    end

    def create
      @card = Card.create(card_params)
      render json: @card
    end

    def update
      @card = Card.find(params[:id])
      @card.update_attributes(card_params)
      render json: @card
    end

    private
      def card_params
        params.require(:card).permit(:title, :body)
      end
  end
end