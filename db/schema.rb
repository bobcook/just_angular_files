# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150919040204) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string   "title"
    t.string   "recommended_effort_time"
    t.string   "recommended_effort_frequency"
    t.json     "payload"
    t.integer  "activity_tracker_id"
    t.integer  "points"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "activities", ["activity_tracker_id"], name: "index_activities_on_activity_tracker_id", using: :btree

  create_table "activity_reminder_settings", force: :cascade do |t|
    t.integer  "days"
    t.integer  "contact_methods"
    t.integer  "times"
    t.integer  "user_activity_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "activity_reminder_settings", ["user_activity_id"], name: "index_activity_reminder_settings_on_user_activity_id", using: :btree

  create_table "activity_trackers", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "articles", force: :cascade do |t|
    t.string   "title",         null: false
    t.datetime "publish_date"
    t.datetime "last_modified"
    t.json     "payload",       null: false
    t.string   "type",          null: false
    t.string   "uuid"
    t.string   "url"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "pillar_categorizations", force: :cascade do |t|
    t.integer  "pillar_id"
    t.integer  "categorizable_id"
    t.string   "categorizable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "pillar_categorizations", ["categorizable_id"], name: "index_pillar_categorizations_on_categorizable_id", using: :btree
  add_index "pillar_categorizations", ["pillar_id"], name: "index_pillar_categorizations_on_pillar_id", using: :btree

  create_table "pillars", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.string   "slug"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "recipes", force: :cascade do |t|
    t.string   "title"
    t.string   "prep_time"
    t.json     "payload"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_activities", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "activity_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_activities", ["activity_id"], name: "index_user_activities_on_activity_id", using: :btree
  add_index "user_activities", ["user_id"], name: "index_user_activities_on_user_id", using: :btree

  create_table "user_recipes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "recipe_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_recipes", ["recipe_id"], name: "index_user_recipes_on_recipe_id", using: :btree
  add_index "user_recipes", ["user_id"], name: "index_user_recipes_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "auth_token"
    t.string   "provider"
    t.string   "uid"
    t.string   "email",               default: "", null: false
    t.string   "encrypted_password",  default: "", null: false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

  add_foreign_key "activity_reminder_settings", "user_activities"
  add_foreign_key "user_activities", "activities"
  add_foreign_key "user_activities", "users"
  add_foreign_key "user_recipes", "recipes"
  add_foreign_key "user_recipes", "users"
end
