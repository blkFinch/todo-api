module Api::V1
  class CardsController < ApplicationController

    def index
      @cards = Card.all
      render json: @cards
    end

    def create
      @card = Card.create(card_params)
      render json: @card
    end

    private
      def card_params
        params.require(:card).permit(:title, :body)
      end
  end
end