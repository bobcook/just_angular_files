require 'rails_helper'

describe Recipe do
  it { should have_many(:pillar_categorizations) }
  it { should have_many(:pillars).through(:pillar_categorizations) }
  it { should have_many(:user_recipes) }
  it { should have_many(:users).through(:user_recipes) }
end
