class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.integer :page_id, foreign_key: true, null: false
      t.string :title
      t.integer :index, null: false
      t.string :image, null: false
      t.integer :width, null: false
      t.integer :height, null: false

      t.timestamps
    end
  end
end
