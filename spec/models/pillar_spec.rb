require 'rails_helper'

describe Pillar do
  it { should have_many(:pillar_categorizations).dependent(:destroy) }
  it { should have_many(:activities).through(:pillar_categorizations) }
end
