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

ActiveRecord::Schema.define(version: 20160427005055) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.string   "title"
    t.string   "recommended_effort"
    t.json     "payload"
    t.integer  "activity_tracker_id"
    t.integer  "points"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "published_at",        null: false
    t.datetime "last_modified",       null: false
    t.string   "cms_url"
    t.string   "slug"
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

  create_table "activity_tracker_questions", force: :cascade do |t|
    t.integer  "activity_tracker_id"
    t.string   "text"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "activity_tracker_questions", ["activity_tracker_id"], name: "index_activity_tracker_questions_on_activity_tracker_id", using: :btree

  create_table "activity_tracker_responses", force: :cascade do |t|
    t.decimal  "response"
    t.integer  "activity_tracker_question_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_activity_period_id"
  end

  add_index "activity_tracker_responses", ["activity_tracker_question_id"], name: "activity_tracker_responses_on_question", using: :btree
  add_index "activity_tracker_responses", ["user_activity_period_id"], name: "index_activity_tracker_responses_on_user_activity_period_id", using: :btree

  create_table "activity_trackers", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "cms_name"
  end

  create_table "articles", force: :cascade do |t|
    t.string   "title",         null: false
    t.datetime "published_at",  null: false
    t.datetime "last_modified", null: false
    t.json     "payload",       null: false
    t.string   "type",          null: false
    t.string   "uuid"
    t.string   "cms_url"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "slug"
  end

  create_table "assessment_questions", force: :cascade do |t|
    t.string   "text"
    t.string   "answer_options",              default: [],              array: true
    t.string   "answer_values",               default: [],              array: true
    t.integer  "order",                                    null: false
    t.integer  "assessment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "external_recommendation_id"
    t.integer  "question_recommendations_id"
    t.string   "type"
    t.integer  "pillar_id"
  end

  add_index "assessment_questions", ["assessment_id"], name: "index_assessment_questions_on_assessment_id", using: :btree
  add_index "assessment_questions", ["pillar_id"], name: "index_assessment_questions_on_pillar_id", using: :btree
  add_index "assessment_questions", ["question_recommendations_id"], name: "index_assessment_questions_on_question_recommendations_id", using: :btree

  create_table "assessment_responses", force: :cascade do |t|
    t.integer  "assessment_question_id"
    t.integer  "user_assessment_id"
    t.string   "response"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "assessment_responses", ["assessment_question_id"], name: "index_assessment_responses_on_assessment_question_id", using: :btree
  add_index "assessment_responses", ["user_assessment_id"], name: "index_assessment_responses_on_user_assessment_id", using: :btree

  create_table "assessments", force: :cascade do |t|
    t.string   "name"
    t.integer  "order"
    t.string   "type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "claim_token_holders", force: :cascade do |t|
    t.string   "claim_token", null: false
    t.text     "auth_token",  null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "games", force: :cascade do |t|
    t.string   "title"
    t.datetime "published_at",  null: false
    t.datetime "last_modified", null: false
    t.json     "payload"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "cms_url"
    t.string   "slug"
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
    t.string   "display_name"
  end

  create_table "question_recommendations", force: :cascade do |t|
    t.string   "external_id",            null: false
    t.integer  "assessment_question_id"
    t.integer  "recommendable_id"
    t.string   "recommendable_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "question_recommendations", ["assessment_question_id"], name: "index_question_recommendations_on_assessment_question_id", using: :btree
  add_index "question_recommendations", ["recommendable_type", "recommendable_id"], name: "by_recommendable", using: :btree

  create_table "recipes", force: :cascade do |t|
    t.string   "title"
    t.string   "prep_time"
    t.json     "payload"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "published_at",  null: false
    t.datetime "last_modified", null: false
    t.string   "cms_url"
    t.string   "slug"
  end

  create_table "reviews", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "reviewable_id"
    t.string   "reviewable_type"
    t.string   "comment"
    t.boolean  "recommend",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "reviews", ["reviewable_type", "reviewable_id"], name: "index_reviews_on_reviewable_type_and_reviewable_id", using: :btree
  add_index "reviews", ["user_id", "reviewable_id", "reviewable_type"], name: "index_reviews_on_user_id_and_reviewable_id_and_reviewable_type", unique: true, using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "user_activities", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "activity_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "archived",    default: false
  end

  add_index "user_activities", ["activity_id"], name: "index_user_activities_on_activity_id", using: :btree
  add_index "user_activities", ["user_id"], name: "index_user_activities_on_user_id", using: :btree

  create_table "user_activity_periods", force: :cascade do |t|
    t.integer  "user_activity_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.date     "completed_date"
  end

  add_index "user_activity_periods", ["user_activity_id"], name: "index_user_activity_periods_on_user_activity_id", using: :btree

  create_table "user_articles", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "article_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_articles", ["article_id"], name: "index_user_articles_on_article_id", using: :btree
  add_index "user_articles", ["user_id", "article_id"], name: "index_user_articles_on_user_id_and_article_id", unique: true, using: :btree
  add_index "user_articles", ["user_id"], name: "index_user_articles_on_user_id", using: :btree

  create_table "user_assessment_groups", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_assessment_groups", ["user_id"], name: "index_user_assessment_groups_on_user_id", using: :btree

  create_table "user_assessments", force: :cascade do |t|
    t.integer  "assessment_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_assessment_group_id"
    t.boolean  "completed"
    t.integer  "order"
    t.json     "raw_results"
    t.string   "external_session_id"
  end

  add_index "user_assessments", ["assessment_id"], name: "index_user_assessments_on_assessment_id", using: :btree
  add_index "user_assessments", ["user_assessment_group_id"], name: "index_user_assessments_on_user_assessment_group_id", using: :btree

  create_table "user_games", force: :cascade do |t|
    t.integer  "game_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_games", ["game_id"], name: "index_user_games_on_game_id", using: :btree
  add_index "user_games", ["user_id", "game_id"], name: "index_user_games_on_user_id_and_game_id", unique: true, using: :btree
  add_index "user_games", ["user_id"], name: "index_user_games_on_user_id", using: :btree

  create_table "user_recipes", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "recipe_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "user_recipes", ["recipe_id"], name: "index_user_recipes_on_recipe_id", using: :btree
  add_index "user_recipes", ["user_id", "recipe_id"], name: "index_user_recipes_on_user_id_and_recipe_id", unique: true, using: :btree
  add_index "user_recipes", ["user_id"], name: "index_user_recipes_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "auth_token"
    t.string   "provider"
    t.string   "uid"
    t.string   "email",                 default: ""
    t.string   "encrypted_password",    default: "", null: false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",         default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "external_id"
    t.integer  "membership_status_cd"
    t.string   "membership_product"
    t.datetime "membership_expiration"
  end

  add_foreign_key "activity_reminder_settings", "user_activities"
  add_foreign_key "activity_tracker_questions", "activity_trackers"
  add_foreign_key "activity_tracker_responses", "activity_tracker_questions"
  add_foreign_key "activity_tracker_responses", "user_activity_periods"
  add_foreign_key "assessment_questions", "assessments"
  add_foreign_key "assessment_questions", "pillars"
  add_foreign_key "assessment_responses", "assessment_questions"
  add_foreign_key "assessment_responses", "user_assessments"
  add_foreign_key "reviews", "users"
  add_foreign_key "user_activities", "activities"
  add_foreign_key "user_activities", "users"
  add_foreign_key "user_activity_periods", "user_activities"
  add_foreign_key "user_articles", "articles"
  add_foreign_key "user_articles", "users"
  add_foreign_key "user_assessment_groups", "users"
  add_foreign_key "user_assessments", "assessments"
  add_foreign_key "user_assessments", "user_assessment_groups"
  add_foreign_key "user_games", "games"
  add_foreign_key "user_games", "users"
  add_foreign_key "user_recipes", "recipes"
  add_foreign_key "user_recipes", "users"
end
