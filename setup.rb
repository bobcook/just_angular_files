setup :secret_key_base
env 'HOST', provide('Host', default: 'localhost:3000')
env 'ASSET_HOST', provide('Asset host', default: 'localhost:3000')

env 'FASTLY_API_KEY',
    provide('Fastly API Key (can be nil in non-production environments)',
            default: 'nil')
env 'FASTLY_SERVICE_ID',
    provide('Fastly Service ID (can be nil in non-production environments)',
            default: 'nil')

env 'AARP_PUBLIC_CERT',
    provide('AARP Public Cert ' \
            '(run `KEY_FILE=<path to wso_cert.pem> ' \
            'bundle exec rake rsa_keys:format`)')
env 'AARP_PRIVATE_KEY',
    provide('AARP Private Key ' \
            '(run `KEY_FILE=<path to ShareCare_private_key_pkcs8.pem> ' \
            'bundle exec rake rsa_keys:format`)')

rake 'db:setup'
