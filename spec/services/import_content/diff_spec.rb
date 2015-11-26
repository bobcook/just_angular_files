require 'rails_helper'

module ImportContent
  describe Diff do
    def make_subject(old_items, new_items)
      ImportContent::Diff.new(old_items, new_items)
    end

    describe '#to_add' do
      it 'is empty if there is nothing new' do
        old_items = %w(a b c)
        new_items = []
        subject = make_subject(old_items, new_items)

        expect(subject.to_add).to be_empty
      end

      it 'is empty if there is nothing to add' do
        old_items = %w(a b c)
        new_items = old_items
        subject = make_subject(old_items, new_items)

        expect(subject.to_add).to be_empty
      end

      it 'is the list of new items if there are no old items' do
        old_items = []
        new_items = %w(a b c)
        subject = make_subject(old_items, new_items)

        expect(subject.to_add).to eq(new_items)
      end

      it 'is the diff of new items to add' do
        old_items = %w(a b)
        new_items = %w(b c d)
        diff = %w(c d)
        subject = make_subject(old_items, new_items)

        expect(subject.to_add).to eq(diff)
      end
    end

    describe '#to_remove' do
      it 'is empty if there is nothing old' do
        old_items = []
        new_items = %w(a b c)
        subject = make_subject(old_items, new_items)

        expect(subject.to_remove).to be_empty
      end

      it 'is empty if there is nothing to remove' do
        old_items = %w(a b c)
        new_items = %w(a b c d)
        subject = make_subject(old_items, new_items)

        expect(subject.to_remove).to be_empty
      end

      it 'is the list of old items if there are no new items' do
        old_items = %w(a b c)
        new_items = []
        subject = make_subject(old_items, new_items)

        expect(subject.to_remove).to eq(old_items)
      end

      it 'is the diff of old items to remove' do
        old_items = %w(a b c)
        new_items = %w(c d e)
        diff = %w(a b)
        subject = make_subject(old_items, new_items)

        expect(subject.to_remove).to eq(diff)
      end
    end
  end
end
