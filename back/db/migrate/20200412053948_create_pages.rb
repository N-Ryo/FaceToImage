class CreatePages < ActiveRecord::Migration[6.0]
  def change
    create_table :pages do |t|
      t.integer :book_id, foreign_key: true, null: false
      t.string :title
      t.integer :index, null: false

      t.timestamps
    end
  end
end
