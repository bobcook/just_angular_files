require 'rails_helper'

describe Pillar do
  it { should have_many(:pillar_categorizations).dependent(:destroy) }
  it { should have_many(:activities).through(:pillar_categorizations) }
  it { should have_many(:recipes).through(:pillar_categorizations) }
  it { should have_many(:articles).through(:pillar_categorizations) }
end
