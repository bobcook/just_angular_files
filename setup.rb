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
            default: 'http://www.aarp.org/')

env 'CMS_CONTENT_FEED_ENDPOINT',
    provide('AARP CMS content feed endpoint',
            default: 'http://www.aarp.org/etc/aarp/datashare/staying-sharp/' \
                     'stayingSharp.json')

env 'CMS_IMAGES_BASE_URL',
    provide('AARP images CMS base URL',
            default: '//www.aarp.org')

env 'MBS_API',
    provide('Brain Solutions API base URL',
            default: 'https://stage.mybrainsolutions.com/' \
                     'services/SolutionsService.svc')

env 'MBS_AUTH',
    provide('Brain Solutions authentication URL',
            default: 'https://stage.mybrainsolutions.com/' \
                     'SSO/AARP.aspx')

env 'FRONTEND_URL', provide('Frontend Url', default: 'http://localhost:9000')
env 'ELASTICSEARCH_HOST',
    provide('Elasticsearch Url', default: 'localhost:9200')

env 'DSO_MAIL_API',
    provide('Engagement Email endpoint (leave blank in dev environment)',
            default: '')

env 'DSO_MAIL_DATA_EXTENSION',
    provide('Engagement email data extension',
            default: 'SM_1398936_SS_Sharecare_User_Data_DE')
rake 'db:setup'
