class AddCollapsedToCards < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :collapsed, :boolean, default: false
  end
end
