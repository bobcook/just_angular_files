class PillarSerializer < ActiveModel::Serializer
  attributes :id, :name, :display_name, :description, :slug
end
