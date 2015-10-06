class UserActivityPeriodSerializer < ActiveModel::Serializer
  attributes :user_activity_id, :completed_date
  has_many :activity_tracker_responses
end
