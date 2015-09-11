class UserActivitySerializer < ActiveModel::Serializer
  attributes :id
  has_one :activity
  has_many :user_activity_periods
end
