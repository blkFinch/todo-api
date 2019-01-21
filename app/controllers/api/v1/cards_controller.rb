module Api::V1
  class CardsController < ApplicationController

    def index
      @cards = Card.all
      render json: @cards
    end
  end
end