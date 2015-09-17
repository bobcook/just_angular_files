require 'rails_helper'

describe Presenter do
  let(:resource_test_class) do
    Class.new do
      def resource_method
      end
    end
  end

  let(:collection_test_class) do
    Class.new(Array) do
      def collection_method
      end
    end
  end

  let(:role_class) do
    Class.new do
      attr_reader :resource

      def initialize(resource)
        @resource = resource
      end

      def role_method
      end
    end
  end

  def make_resource
    resource_test_class.new
  end

  def make_collection(members = [])
    collection_test_class.new(members)
  end

  it 'returns a ResourcePresenter for .present' do
    resource = make_resource
    expect(described_class.present(resource))
      .to be_an_instance_of(Presenter::ResourcePresenter)
  end

  it 'returns a CollectionPresenter for .present_all' do
    collection = make_collection
    expect(described_class.present_all(collection))
      .to be_an_instance_of(Presenter::CollectionPresenter)
  end

  describe Presenter::ResourcePresenter do
    def make_subject(resource, role_class)
      Presenter.present(resource, roles: [role_class])
    end

    it 'delegates methods to #resource' do
      resource = make_resource
      subject = make_subject(resource, role_class)
      method_name = :resource_method

      expect(resource).to receive(method_name)
      subject.send(method_name)
    end

    it 'delegates methods to #roles if #resource does not respond to them' do
      resource = make_resource
      subject = make_subject(resource, role_class)
      method_name = :role_method

      expect_any_instance_of(role_class).to receive(method_name)
      subject.send(method_name)
    end

    describe '#roles' do
      let(:other_role_class) do
        Struct.new(:resource)
      end

      it 'has an instance of each of the passed in roles' do
        resource = make_resource
        subject =
          Presenter.present(resource, roles: [role_class, other_role_class])
        role_class_instance = double
        other_role_class_instance = double
        expected_roles = [role_class_instance, other_role_class_instance]

        allow(role_class).to receive(:new).and_return role_class_instance
        allow(other_role_class)
          .to receive(:new).and_return other_role_class_instance

        expect(subject.roles).to match_array(expected_roles)
      end
    end
  end

  describe Presenter::CollectionPresenter do
    def make_subject(collection, role_class)
      Presenter.present_all(collection, roles: [role_class])
    end

    it 'delegates methods to #members' do
      collection = make_collection
      subject = make_subject(collection, role_class)
      method_name = :resource_method
      members = double
      allow(subject).to receive(:members).and_return(members)

      expect(members).to receive(method_name)
      subject.send(method_name)
    end

    it 'delegates methods to #collection if #members does not respond' do
      collection = make_collection
      subject = make_subject(collection, role_class)
      method_name = :collection_method

      expect(collection).to receive(method_name)
      subject.send(method_name)
    end

    describe '#members' do
      it 'is an Array of ResourcePresenters' do
        collection = make_collection([1, 2, 3])
        subject = make_subject(collection, role_class)

        expect(subject.members.first)
          .to be_an_instance_of(Presenter::ResourcePresenter)
      end

      it 'has length of the passed #collection' do
        collection = make_collection([1, 2, 3])
        subject = make_subject(collection, role_class)

        expect(subject.members.length).to eq(collection.length)
      end
    end

    describe '#collection' do
      it 'is the original collection passed in' do
        collection = make_collection([1, 2, 3])
        subject = make_subject(collection, role_class)

        expect(subject.collection).to eq(collection)
      end
    end
  end
end
