class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :title, :recommended_effort_time,
             :recommended_effort_frequency, :payload, :points
  has_many :pillars
  has_one :activity_tracker
end
