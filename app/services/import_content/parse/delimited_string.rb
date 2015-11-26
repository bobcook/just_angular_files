module ImportContent
  module Parse
    class DelimitedString
      attr_reader :delimiter

      def initialize(delimiter = ',')
        @delimiter = delimiter
      end

      def self.from(input, options = {})
        delimiter = options[:with] || ','
        new(delimiter).parse(input)
      end

      def parse(input)
        return [] unless input
        input = input.split(delimiter).map(&:strip) if input.is_a? String
        input
      end
    end
  end
end
