require 'rails_helper'

module Apis
  describe Response do
    def make_subject(status = 200)
      Response.new(status: status, body: {}, headers: {})
    end

    it 'is ok when status is 200' do
      expect(make_subject(200).ok?).to eq(true)
    end

    it 'is not ok when status is not 200' do
      expect(make_subject(404).ok?).to eq(false)
    end
  end
end
