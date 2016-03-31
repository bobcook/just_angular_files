class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :engagement_level,
             :membership_status, :membership_product
end
