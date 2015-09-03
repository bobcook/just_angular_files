require 'rails_helper'

describe PillarCategorization do
  it { should belong_to(:pillar) }
  it { should belong_to(:categorizable) }
end
