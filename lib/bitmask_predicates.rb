require 'active_support/concern'

# Extends bitmask_attributes gem (https://github.com/joelmoss/bitmask_attributes)
# with predicate methods for values of each bitmask field, i.e.:
#
# class MyModel < ActiveRecord::Base
#   bitmask :days, as: [:monday, :tuesday, ...]
# end
#
# m = MyModel.new(days: [:monday])
# m.monday?  # => true
# m.tuesday? # => false

module BitmaskPredicates
  extend ActiveSupport::Concern

  class_methods do
    def bitmask_predicates
      bitmasks.flat_map { |_, ks_and_vs| ks_and_vs.keys }
    end

    def bitmask_predicate?(method_name)
      predicate_name = method_name.to_s.delete('?')
      bitmask_predicates.include?(predicate_name)
    end
  end

  def method_missing(method_name, *arguments, &block)
    if respond_to?(method_name) && self.class.bitmask_predicate?(method_name)
      send(
        "#{bitmask_field_for(method_name)}?",
        method_name.to_s.delete('?').to_sym
      )
    else
      super
    end
  end

  def respond_to?(method_name, include_private = false)
    self.class.bitmask_predicate?(method_name) || super
  end

  private

  def bitmask_field_for(bitmask_value)
    self.class.bitmasks.find do |_field, ks_and_vs|
      ks_and_vs.keys.include?(bitmask_value.to_s.delete('?'))
    end[0]
  end
end
