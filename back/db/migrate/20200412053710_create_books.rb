class CreateBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :books do |t|
      t.integer :user_id, foreign_key: true, null: false
      t.string :title, null: false
      t.integer :status, null: false
      t.integer :range
      t.datetime :limit

      t.timestamps
    end
  end
end
