class UserInfoSerializer < ActiveModel::Serializer
  def self.all_attributes
    Lifestyle::UserInfo.attribute_names
  end

  attributes(*all_attributes)
end
