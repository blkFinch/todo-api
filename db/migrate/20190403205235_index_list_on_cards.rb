class IndexListOnCards < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :list_id, :bigint
    add_index :cards, :list_id
  end
end
