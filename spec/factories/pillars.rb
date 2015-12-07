FactoryGirl.define do
  factory 'pillar' do
    Pillar.default_types.each do |slug|
      factory "#{slug}_pillar" do
        name slug.titleize
        display_name ImportContent::PillarMapping.new_name(slug.titleize)
        slug slug
        description '<h2>SWEET PILLAR DESCRIPTION</h2>'
      end
    end

    ImportContent::PillarMapping.new_slugs.each do |slug|
      factory "#{slug}_pillar" do
        name slug.titleize
        display_name slug.titleize
        slug slug
        description '<h2>NICE DESCRIPTION</h2>'
      end
    end
  end
end
