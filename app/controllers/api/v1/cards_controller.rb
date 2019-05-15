module Api::V1
  class CardsController < ApplicationController

    def index
      @list = List.find(params[:list_id])
      @cards = @list.cards.order(:order_index)
      sort_cards(@cards)
      render json: @cards
    end

    def create
      @list = List.find(params[:list_id])
      @card = @list.cards.create
      render json: @card
    end

    def update
      @card = Card.find(params[:id])
      @card.update_attributes(card_params)
      puts @card.errors.inspect
      render json: @card
    end

    def destroy
      @card = Card.find(params[:id])
      if @card.destroy
        head :no_content, status: :ok
      else
        render json: @card.errors, status: :unprocessable_entity
      end
    end

    def sort_cards(cards)
      i = 1
      cards.each do |card|
        card.update_attribute(:order_index, i)
        i += 1
      end
    end

    private

      def card_params
        params.require(:card).permit(:title, :body, :order_index, :collapsed)
      end
  end
end