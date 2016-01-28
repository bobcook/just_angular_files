require 'rails_helper'

describe ActivityTracker do
  it { should have_many(:activities) }
  it { should have_many(:activity_tracker_questions) }

  describe '#binary?' do
    it 'is true if name is binary' do
      subject = create(:activity_tracker, :binary)

      expect(subject.binary?).to eq(true)
    end

    it 'is false if name is quantity_steps' do
      subject = create(:activity_tracker, :quantity_steps)

      expect(subject.binary?).to eq(false)
    end

    it 'is false if name is scale' do
      subject = create(:activity_tracker, :scale)

      expect(subject.binary?).to eq(false)
    end
  end

  describe '#quantity_steps?' do
    it 'is false if name is binary' do
      subject = create(:activity_tracker, :binary)

      expect(subject.quantity_steps?).to eq(false)
    end

    it 'is true if name is quantity_steps' do
      subject = create(:activity_tracker, :quantity_steps)

      expect(subject.quantity_steps?).to eq(true)
    end

    it 'is false if name is scale' do
      subject = create(:activity_tracker, :scale)

      expect(subject.quantity_steps?).to eq(false)
    end
  end

  describe '#scale?' do
    it 'is false if name is binary' do
      subject = create(:activity_tracker, :binary)

      expect(subject.scale?).to eq(false)
    end

    it 'is false if name is quantity_steps' do
      subject = create(:activity_tracker, :quantity_steps)

      expect(subject.scale?).to eq(false)
    end

    it 'is true if name is scale' do
      subject = create(:activity_tracker, :scale)

      expect(subject.scale?).to eq(true)
    end
  end
end
