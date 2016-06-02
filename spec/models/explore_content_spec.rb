require 'rails_helper'

describe ExploreContent do
  let(:limit) { 2 }

  def make_subject
    ExploreContent.new(
      games: limit, articles: limit, recipes: limit, activities: limit, page: 1
    )
  end

  ExploreContent::PILLAR_FILTERABLE_RESOURCE_NAMES.each do |resource_name|
    plural_name = resource_name.to_s.pluralize.to_sym

    describe "\##{plural_name}" do
      it 'returns resources from all pillars when no pillar is provided' do
        resources = [
          create(resource_name, pillars: [create(:pillar)]),
          create(resource_name, pillars: [create(:pillar)])
        ]

        instance = ExploreContent.new(plural_name => 2)

        expect(instance.send(plural_name).map(&:id))
          .to match_array resources.map(&:id)
      end

      it 'returns resources only from the provided pillar' do
        pillar = create :pillar

        resources = [
          create(resource_name, pillars: [create(:pillar)]),
          create(resource_name, pillars: [pillar]),
          create(resource_name, pillars: [create(:pillar)]),
          create(resource_name, pillars: [create(:pillar), pillar]),
          create(resource_name, pillars: [create(:pillar)])
        ]

        expected_resources = resources.select { |r| r.pillars.include? pillar }

        instance = ExploreContent.new(plural_name => 2, pillar: pillar)

        expect(instance.send(plural_name).map(&:id))
          .to match_array expected_resources.map(&:id)
      end

      it 'returns empty resources if page is beyond page limit' do
        create_list(resource_name, 2)

        instance = ExploreContent.new(page: 2, plural_name => 2)

        expect(instance.send(plural_name)).to eq([])
      end

      it 'returns different resource based on day of year' do
        create_list(resource_name, 2)

        first_day_resources = []
        second_day_resources = []
        start_date = Time.zone.now

        Timecop.freeze(start_date) do
          instance = ExploreContent.new(page: 1, plural_name => 1)
          first_day_resources = instance.send(plural_name).map(&:id)
        end

        Timecop.freeze(start_date.tomorrow) do
          instance = ExploreContent.new(page: 1, plural_name => 1)
          second_day_resources = instance.send(plural_name).map(&:id)
        end

        expect(first_day_resources).to_not eq(second_day_resources)
      end
    end
  end

  describe '#no_content_left?' do
    def make_content
      create_list(:basic_article, limit)
      create_list(:recipe, limit)
      create_list(:activity, limit)
    end

    it 'returns true if number of items is below the limit' do
      create_list(:game, limit - 1)
      make_content

      expect(make_subject.no_content_left?).to eq(true)
    end

    it 'returns true if number of items is equal the limit' do
      create_list(:game, limit)
      make_content

      expect(make_subject.no_content_left?).to eq(true)
    end

    it 'returns false if number of items above the limit' do
      create_list(:game, limit + 1)
      make_content

      expect(make_subject.no_content_left?).to eq(false)
    end
  end
end
