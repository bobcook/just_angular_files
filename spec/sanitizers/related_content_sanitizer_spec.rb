require 'rails_helper'

describe RelatedContentSanitizer do
  def make_subject(params)
    RelatedContentSanitizer.new(params)
  end

  describe ':pillars validations' do
    it 'has errors if passed unknown pillars' do
      known_pillars = ['known_pillar']
      unknown_pillars = %w(not_known definitely_not_known)
      allow(RelatedContentSanitizer)
        .to receive(:known_pillars).and_return(known_pillars)

      params = {
        pillars: unknown_pillars
      }
      subject = make_subject(params)

      expect(subject.valid?).to eq(false)
      expect(subject.errors[:pillars]).to_not be_empty
    end
  end

  describe 'item type validations' do
    it 'has errors if :recipes is not an integer' do
      params = {
        recipes: 'hi'
      }
      subject = make_subject(params)

      expect(subject.valid?).to eq(false)
      expect(subject.errors[:recipes]).to_not be_empty
    end

    it 'has errors if :articles is not an integer' do
      params = {
        articles: 'hi'
      }
      subject = make_subject(params)

      expect(subject.valid?).to eq(false)
      expect(subject.errors[:articles]).to_not be_empty
    end

    it 'has errors if :activities is not an integer' do
      params = {
        activities: 'hi'
      }
      subject = make_subject(params)

      expect(subject.valid?).to eq(false)
      expect(subject.errors[:activities]).to_not be_empty
    end
  end

  it 'has no errors otherwise' do
    known_pillars = ['known_pillar']
    allow(RelatedContentSanitizer)
      .to receive(:known_pillars).and_return(known_pillars)

    params = {
      pillars: known_pillars
    }
    subject = make_subject(params)

    expect(subject.valid?).to eq(true)
  end
end
