class AddListIdToCards < ActiveRecord::Migration[5.2]
  def change
    add_column :cards, :project_id, :bigint
    add_index :cards, :project_id
  end
end
