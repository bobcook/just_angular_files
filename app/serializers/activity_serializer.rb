class ActivitySerializer < ActiveModel::Serializer
  delegate :benefits_to_brain_health, :card_image, :card_title, :description,
           :duration, :id, :mast_head_image, :mast_head_title,
           :payload, :section1_body, :source_materials_citation, :title,
           to: :common

  attributes :benefits_to_brain_health, :card_image, :card_title, :description,
             :duration, :how_to, :id, :mast_head_image, :mast_head_title,
             :payload, :recommended_effort_frequency, :section1_body, :slug,
             :source_materials_citation, :title

  has_many :pillars
  has_one :activity_tracker

  def duration
    common.effort
  end

  def how_to
    object.payload['howTo']
  end

  private

  def common
    @common ||= CommonContent.new(object)
  end
end
