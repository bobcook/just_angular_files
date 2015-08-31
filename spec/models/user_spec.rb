require 'rails_helper'

describe User do
  it 'is omniauthable' do
    expect(described_class).to respond_to(:from_omniauth)
  end
end
