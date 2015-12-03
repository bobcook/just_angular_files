module AssessmentResults
  module Categories
    extend CollectionUtils

    class Category
      attr_reader :name, :description, :type, :slug

      def initialize(fields = {})
        @name = fields[:name]
        @description = fields[:description]
        @type = fields[:type]
        @slug = fields[:slug]
      end
    end

    class CategoryData
      def self.lookup(type, name)
        new.send(type, name)
      end

      def neuro(name)
        I18n
          .t("assessment_result_categories.neuro.#{name}")
          .merge(type: 'NeuroPerformance')
      end

      def lifestyle(name)
        I18n
          .t("assessment_result_categories.lifestyle.#{name}")
          .merge(type: 'Lifestyle')
      end
    end

    def self.neuro
      Apis::MBS::AssessmentResults.neuro_category_names.map do |slug|
        Category.new(CategoryData.lookup(:neuro, slug).merge(slug: slug))
      end
    end

    def self.lifestyle
      Lifestyle::AssessmentResults.lifestyle_category_names.map do |slug|
        Category.new(CategoryData.lookup(:lifestyle, slug).merge(slug: slug))
      end
    end

    def self.all
      neuro + lifestyle
    end
  end
end
