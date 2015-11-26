require 'rails_helper'
require_relative './publishable_shared_examples'
require_relative './with_pillars_shared_examples'

describe Article do
  def last_week
    Time.zone.now.noon - 1.week
  end

  def make_subject
    Article.new(last_modified: last_week)
  end

  it { should have_many(:pillar_categorizations) }
  it { should have_many(:pillars).through(:pillar_categorizations) }
  it { should have_many(:question_recommendations) }

  it_behaves_like 'it fulfills the WithPillars interface', :basic_article

  describe '#outdated' do
    it 'returns true if specified time is after last_modified' do
      subject = make_subject
      expect(subject.outdated?(Time.zone.now)).to eq(true)
    end

    it 'returns false if specified time is same as last_modified' do
      subject = make_subject
      expect(subject.outdated?(last_week)).to eq(false)
    end

    it 'returns false if specified time is before last_modified' do
      subject = make_subject
      expect(subject.outdated?(Time.zone.now.noon - 2.week)).to eq(false)
    end
  end

  describe '#last_modified' do
    it_behaves_like(
      'it defaults to the current time',
      :basic_article,
      :last_modified
    )
  end

  describe '#published_at' do
    it_behaves_like(
      'it defaults to the current time',
      :basic_article,
      :published_at
    )
  end
end
