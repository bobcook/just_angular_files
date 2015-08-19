# See `Provider Authentication` section of /doc/SSO Web Service User Guide.doc
module Apis
  module DSO
    class Crypto
      attr_reader :public_cert_contents, :private_key_contents

      def initialize(options = {})
        @public_cert_contents =
          options[:public_cert] || ENV.fetch('AARP_PUBLIC_CERT')
        @private_key_contents =
          options[:private_key] || ENV.fetch('AARP_PRIVATE_KEY')
      end

      def authentication_header
        @authentication_header ||= encode(encrypted_message)
      end

      def signature_header
        @signature_header ||= encode(signed_digest_message)
      end

      private

      def arbitrary_message
        '1234567890123456789012345678901234567890123456789012345678901234'
      end

      def encode(message)
        Base64.encode64(message).split("\n").join
      end

      def public_key
        @public_key ||=
          OpenSSL::X509::Certificate.new(public_cert_contents).public_key
      end

      def private_key
        @private_key ||= OpenSSL::PKey::RSA.new(private_key_contents)
      end

      def encrypted_message
        public_key.public_encrypt(arbitrary_message)
      end

      def digest_message
        Digest::MD5.digest(arbitrary_message).force_encoding('UTF-8')
      end

      def signed_digest_message
        private_key
          .sign(OpenSSL::Digest::MD5.new, digest_message)
          .force_encoding('UTF-8')
      end
    end
  end
end
