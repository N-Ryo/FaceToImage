class CreateImageOptions < ActiveRecord::Migration[6.0]
  def change
    create_table :image_options do |t|
      t.integer :image_id, foreign_key: true, null: false
      t.integer :x
      t.integer :y
      t.integer :anchor_x
      t.integer :anchor_y
      t.integer :rotate
      t.integer :scale_x
      t.integer :scale_y
      t.integer :alpha

      t.timestamps
    end
  end
end
