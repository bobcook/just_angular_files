module Apis
  module MBS
    class Endpoints
      include WithFaraday

      attr_reader :http

      ACCESS_CODE = 'aarpsc'

      ENDPOINTS = {
        get_latest_user_score: '/GetLatestUserScore',
        get_assessment_num: '/GetAssessmentNum',
        get_assessment_result: '/GetAssessmentResult'
      }

      def initialize(options = {})
        @http = options[:http] || faraday
      end

      def last_assessment(user_model)
        user = make_user(user_model)
        params = {
          email: user.email
        }
        make_response(http.get(url(:get_latest_user_score), params))
      end

      def all_assessments(user_model)
        user = make_user(user_model)
        params = {
          email: user.email,
          accesscode: ACCESS_CODE
        }
        make_response(http.get(url(:get_assessment_num), params))
      end

      def assessment_result(user_model, assessment_num)
        user = make_user(user_model)
        params = {
          email: user.email,
          accesscode: ACCESS_CODE,
          'AssessmentNumber' => assessment_num,
          format: 'xml'
        }
        make_response(
          http.get(url(:get_assessment_result), params),
          &normalizer.method(:normalize_xml)
        )
      end

      private

      def make_response(faraday_response, &block)
        normalize = block || normalizer.method(:normalize_body)

        Response.new(
          status: faraday_response.status,
          headers: faraday_response.headers,
          body: normalize.call(faraday_response.body)
        )
      end

      def make_user(user_model)
        Apis::MBS::User.for_user_model(user_model)
      end

      def url(endpoint)
        base_url + ENDPOINTS.fetch(endpoint)
      end

      def base_url
        ENV.fetch('MBS_API')
      end

      def normalizer
        @normalizer ||= BodyNormalizer.new
      end

      class BodyNormalizer
        include CollectionUtils

        def normalize_xml(body)
          normalize_body(MultiXml.parse(body))
        end

        def normalize_body(body)
          case body
          when Hash then normalize_hash(body)
          when Array then normalize_array(body)
          else body
          end
        end

        private

        def normalize_hash(hash)
          zipmap(
            hash.keys.map(&:underscore),
            normalize_array(hash.values)
          ).with_indifferent_access
        end

        def normalize_array(array)
          array.map(&method(:normalize_body))
        end
      end
    end
  end
end
