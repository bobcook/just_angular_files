module Lifestyle
  class AssessmentResults
    def self.lifestyle_category_names
      ImportContent::PillarMapping.new_slugs
    end
  end
end
