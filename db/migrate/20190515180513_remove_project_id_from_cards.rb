class RemoveProjectIdFromCards < ActiveRecord::Migration[5.2]
  def change
    remove_column :cards, :project_id, :bigint
  end
end
