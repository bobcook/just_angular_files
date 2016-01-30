class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :engagement_level, :membership_status
end
