setup :secret_key_base
env 'HOST', provide('Host', default: 'localhost:3000')
env 'ASSET_HOST', provide('Asset host', default: 'localhost:3000')
env 'FASTLY_API_KEY',
    provide('Fastly API Key (can be nil in non-production environments)',
            default: 'nil')
env 'FASTLY_SERVICE_ID',
    provide('Fastly Service ID (can be nil in non-production environments)',
            default: 'nil')
rake 'db:setup'
