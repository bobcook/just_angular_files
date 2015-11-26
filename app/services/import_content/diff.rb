module ImportContent
  class Diff
    attr_reader :old_items, :new_items

    def initialize(old_items, new_items)
      @old_items = old_items
      @new_items = new_items
    end

    def to_add
      new_items - old_items
    end

    def to_remove
      old_items - new_items
    end
  end
end
