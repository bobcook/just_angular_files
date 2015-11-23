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

env 'SHARECARE_PUBLIC_CERT',
    provide('Sharecare Public Cert ' \
            '(run `KEY_FILE=<path to sharecare_stg_public.crt> ' \
            'bundle exec rake rsa_keys:format`)')
env 'SHARECARE_PRIVATE_KEY',
    provide('Sharecare Private Key ' \
            '(run `KEY_FILE=<path to sharecare_stg_private.key> ' \
            'bundle exec rake rsa_keys:format`)')

env 'DSO_API',
    provide('AARP Digital API base URL',
            default: 'https://services.share.aarp.org/' \
                     'applications/CoreServices')

env 'CMS_BASE_URL',
    provide('AARP CMS base URL',
            default: 'http://www.aarp.org/content/specialized-membership/' \
                     'staying-sharp/en')

env 'MBS_API',
    provide('Brain Solutions API base URL',
            default: 'https://stage.mybrainsolutions.com/' \
                     'services/SolutionsService.svc')

rake 'db:setup'
