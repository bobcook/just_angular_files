require 'rails_helper'
require_relative './publishable_shared_examples'
require_relative './with_pillars_shared_examples'

describe Game do
  it { should have_many(:pillar_categorizations) }
  it { should have_many(:pillars).through(:pillar_categorizations) }

  it_behaves_like 'it fulfills the WithPillars interface', :game

  describe '#last_modified' do
    it_behaves_like(
      'it defaults to the current time',
      :game,
      :last_modified
    )
  end

  describe '#published_at' do
    it_behaves_like(
      'it defaults to the current time',
      :game,
      :published_at
    )
  end
end
