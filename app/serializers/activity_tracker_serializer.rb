class ActivityTrackerSerializer < ActiveModel::Serializer
  attributes :id, name: :type
end
