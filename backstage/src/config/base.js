export const baseUrl=
    process.env.NODE_ENV === 'production'
    ? '/api/'
    : '/api/';