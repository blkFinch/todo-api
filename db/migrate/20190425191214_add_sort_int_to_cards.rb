class AddSortIntToCards < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :order_index, :integer,  default: 0
  end
end
