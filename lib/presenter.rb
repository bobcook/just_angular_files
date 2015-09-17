class Presenter
  def self.present(resource, options = {})
    ResourcePresenter.new(resource, options)
  end

  def self.present_all(collection, options = {})
    CollectionPresenter.new(collection, options)
  end

  class ResourcePresenter
    attr_reader :resource, :role_types

    def initialize(resource, options = {})
      @role_types = options[:roles]
      @resource = resource
    end

    def roles
      @roles ||= role_types.map { |t| t.new(resource) }
    end

    def method_missing(method_sym, *arguments, &block)
      all_responders = [resource] + roles
      responder = all_responders.find { |r| r.respond_to?(method_sym) }
      return responder.send(method_sym, *arguments, &block) if responder
      super
    end

    def respond_to?(method_sym, include_private = false)
      resource.respond_to?(method_sym) ||
        roles.any? { |r| r.respond_to?(method_sym, include_private) } ||
        super
    end
  end

  class CollectionPresenter
    attr_reader :collection, :options

    # Need both #collection and #members;
    #
    # #collection is, i.e., the ActiveRecord::Relation, so relation-specific
    # methods will be proxied to it.
    #
    # #members is the actual collection of (presented) elements in the
    # #collection. All iteration methods (i.e. #each, #map, etc), will
    # be proxied here
    #
    # Note that #method_missing first tries proxying to #members THEN
    # #collection
    def initialize(collection, options = {})
      @collection = collection
      @options = options
    end

    def members
      @members ||=
        collection.map do |activity|
          ResourcePresenter.new(activity, options)
        end
    end

    def method_missing(method_sym, *args, &block)
      responders = [members, collection]
      responder = responders.find { |r| r.respond_to?(method_sym) }
      return responder.send(method_sym, *args, &block) if responder
      super
    end

    def respond_to?(method_sym, include_private = false)
      members.respond_to?(method_sym, include_private) ||
        collection.respond_to?(method_sym, include_private) ||
        super
    end
  end
end
