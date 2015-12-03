module Api
  module V1
    module Me
      module AssessmentResults
        class CategoriesController < Api::V1::Me::BaseController
          def show
            respond_with categories
          end

          private

          def categories
            @categories ||= ::AssessmentResults::Categories.all
          end
        end
      end
    end
  end
end
