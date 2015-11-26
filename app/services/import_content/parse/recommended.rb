# In current CMS content, maintainers are passing in 'special' values
# of the form '11XXX' and '00XXX' along with ordinary keywords
#
# '00XXX': These keywords indicate a correlation between the piece of content
#          and question(s) in the questionnaire (aka Pillar questions)
#
# '11XXX': These keywords indicate a correlation between the piece of content
#          and question(s) in the NeuroPerformance test (aka
#          MBS assessment)
module ImportContent
  module Parse
    class Recommended
      class ParsesKeywords
        attr_reader :prefix

        def self.with_prefix(prefix)
          new(prefix)
        end

        def initialize(prefix)
          @prefix = prefix
        end

        def parse(keywords)
          keywords.select { |k| k.start_with?(prefix) }
        end
      end

      class NeuroTestQuestions
        def self.from(keywords)
          new.parse(keywords)
        end

        def parse(keywords)
          ParsesKeywords.with_prefix('11').parse(keywords)
        end
      end

      class PillarQuestions
        def self.from(keywords)
          new.parse(keywords)
        end

        def parse(keywords)
          ParsesKeywords.with_prefix('00').parse(keywords)
        end
      end
    end
  end
end
