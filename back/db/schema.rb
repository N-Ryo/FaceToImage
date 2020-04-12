# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_12_210910) do

  create_table "books", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "title", null: false
    t.integer "status", null: false
    t.integer "range"
    t.datetime "limit"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "image_options", force: :cascade do |t|
    t.integer "image_id", null: false
    t.integer "x"
    t.integer "y"
    t.integer "anchor_x"
    t.integer "anchor_y"
    t.integer "rotate"
    t.integer "scale_x"
    t.integer "scale_y"
    t.integer "alpha"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "images", force: :cascade do |t|
    t.integer "page_id", null: false
    t.string "title"
    t.integer "index", null: false
    t.string "image", null: false
    t.integer "width", null: false
    t.integer "height", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "pages", force: :cascade do |t|
    t.integer "book_id", null: false
    t.string "title"
    t.integer "index", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
