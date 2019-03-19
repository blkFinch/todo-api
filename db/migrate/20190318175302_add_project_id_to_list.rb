class AddProjectIdToList < ActiveRecord::Migration[5.2]
  def change
    add_column :lists, :project_id, :bigint
    add_index :lists, :project_id
  end
end
