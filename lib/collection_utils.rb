module CollectionUtils
  def map_values(hash, &block)
    to_return = hash.map do |k, v|
      [k, block.call(v)]
    end
    Hash[to_return]
  end
end