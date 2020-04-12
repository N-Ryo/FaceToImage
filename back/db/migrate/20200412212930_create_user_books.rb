class CreateUserBooks < ActiveRecord::Migration[6.0]
  def change
    create_table :user_books do |t|
      t.integer :user_id, foreign_key: true, null: false
      t.integer :book_id, foreign_key: true, null: false
      t.integer :page_id, foreign_key: true, null: false
      t.boolean :stucked, default: false

      t.timestamps
    end
  end
end
