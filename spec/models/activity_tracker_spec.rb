require 'rails_helper'

describe ActivityTracker do
  it { should have_many(:activities) }

  describe '#binary?' do
    it 'is true if name is binary' do
      subject = create(:binary_tracker)

      expect(subject.binary?).to eq(true)
    end

    it 'is false if name is quantity' do
      subject = create(:quantity_tracker)

      expect(subject.binary?).to eq(false)
    end

    it 'is false if name is scale' do
      subject = create(:scale_tracker)

      expect(subject.binary?).to eq(false)
    end
  end

  describe '#quantity?' do
    it 'is false if name is binary' do
      subject = create(:binary_tracker)

      expect(subject.quantity?).to eq(false)
    end

    it 'is true if name is quantity' do
      subject = create(:quantity_tracker)

      expect(subject.quantity?).to eq(true)
    end

    it 'is false if name is scale' do
      subject = create(:scale_tracker)

      expect(subject.quantity?).to eq(false)
    end
  end

  describe '#scale?' do
    it 'is false if name is binary' do
      subject = create(:binary_tracker)

      expect(subject.scale?).to eq(false)
    end

    it 'is false if name is quantity' do
      subject = create(:quantity_tracker)

      expect(subject.scale?).to eq(false)
    end

    it 'is true if name is scale' do
      subject = create(:scale_tracker)

      expect(subject.scale?).to eq(true)
    end
  end
end
