require 'rails_helper'

describe Article do
  def last_week
    Time.zone.now.noon - 1.week
  end

  def make_subject
    Article.new(last_modified: last_week)
  end

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
end
