class UserActivityPeriodSerializer < ActiveModel::Serializer
  attributes :id, :completed_date
  has_many :activity_tracker_responses
end
