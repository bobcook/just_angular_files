require 'rails_helper'

describe PillarFiltering do
  let(:relation_class) do
    Activity
  end

  let(:relation) do
    relation_class.all
  end

  before(:each) do
    Pillar.default_types.each do |slug|
      create("#{slug}_pillar")
    end
  end

  def make_subject(relation, params = { pillar: Pillar.default_types.first })
    PillarFiltering.new(relation, params)
  end

  def create_model(options = {})
    pillar_slug = options[:pillar] || Pillar.default_types.first
    relation_class.create(pillars: [Pillar.find_by(slug: pillar_slug)])
  end

  describe '#collection' do
    context 'filter pillar is present' do
      it 'calls #for_pillar on the relation' do
        filter_param = Pillar.default_types.first
        params = {
          pillar: filter_param
        }

        relation = double
        subject = make_subject(relation, params)

        expect(relation).to receive(:for_pillar)
        subject.collection
      end
    end

    context 'filter pillar not present' do
      it 'does not call #for_pillar on the relation' do
        params = {}

        relation = double
        subject = make_subject(relation, params)

        expect(relation).not_to receive(:for_pillar)
        subject.collection
      end

      it 'returns the original relation' do
        filter_param = Pillar.default_types.first
        params = {}

        expected_models = [
          create_model(pillar: filter_param),
          create_model(pillar: filter_param),
          create_model(pillar: Pillar.default_types.last)
        ]

        expected_relation = relation_class.find(expected_models.map(&:id))
        subject = make_subject(relation, params)

        expect(subject.collection).to match_array(expected_relation)
      end
    end
  end

  describe '#paginated_collection' do
    it 'returns up to NUM_PER_PAGE values' do
      filter_param = Pillar.default_types.first
      params = {
        pillar: filter_param
      }

      (0...described_class.num_per_page + 1).map do
        create_model(pillar: filter_param)
      end

      subject = make_subject(relation, params)

      expect(subject.paginated_collection.length)
        .to eq(described_class.num_per_page)
    end
  end
end
