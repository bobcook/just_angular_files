require 'rails_helper'

describe Recipe do
  it { should have_many(:pillar_categorizations) }
  it { should have_many(:pillars).through(:pillar_categorizations) }
  it { should have_many(:user_recipes) }
  it { should have_many(:users).through(:user_recipes) }

  describe 'scopes' do
    describe '::newest_first' do
      it 'has most recently updated recipes ahead of older ones' do
        old_recipes = create_list(:recipe, 2, last_modified: Time.now)
        latest_recipe = create(:recipe, last_modified: Time.now)
        recipe_count = (old_recipes + [latest_recipe]).count

        results = described_class.newest_first
        expect(results.count).to eq(recipe_count)
        expect(results.first).to eql(latest_recipe)
      end
    end
  end

  shared_examples 'it defaults to the current time' do |factory_name, field|
    def make_subject(factory_name, attrs = {})
      create(factory_name, attrs)
    end

    def factory_resource(factory_name)
      factory_name.to_s.capitalize.constantize
    end

    context 'for new resource' do
      it 'is the given time' do
        expected_time = 2.days.ago
        subject = make_subject(factory_name, field => expected_time)

        expect(subject.send(field).to_s).to eql(expected_time.to_s)
      end

      it 'is the current Time if nothing is given' do
        current_time = Time.current

        klass = factory_resource(factory_name)
        allow_any_instance_of(klass)
          .to receive(:current_time).and_return(current_time)

        subject = make_subject(factory_name, field => 'nil')
        expect(subject.send(field).to_s).to eql(current_time.to_s)
      end
    end

    context 'existing resource' do
      it 'is the existing value' do
        current_time = Time.current

        klass = factory_resource(factory_name)
        allow_any_instance_of(klass)
          .to receive(:current_time).and_return(current_time)

        make_subject(factory_name, field => current_time)
        subject = klass.first
        expect(subject.send(field).to_s).to eql(current_time.to_s)
      end
    end
  end

  describe '#last_modified' do
    it_behaves_like(
      'it defaults to the current time',
      :recipe,
      :last_modified
    )
  end

  describe '#published_at' do
    it_behaves_like(
      'it defaults to the current time',
      :recipe,
      :published_at
    )
  end
end
