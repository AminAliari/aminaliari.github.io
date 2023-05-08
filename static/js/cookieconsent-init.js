/**
 * Enable suggestions
 * @type {import('../../types')}
 */
 CookieConsent.run({

    cookie: {
        name: 'cc_cookie',
    },

    guiOptions: {
        consentModal: {
            layout: 'cloud inline',
            position: 'bottom center',
            flipButtons: false
        },
        preferencesModal: {
            layout: 'box',
            position: 'left',
            flipButtons: false
        }
    },

    onFirstConsent: () => {
        console.log('onFirstAction fired');
    },

    onConsent: () => {
        console.log('onConsent fired ...');
    },

    onChange: () => {
        console.log('onChange fired ...');
    },

    categories: {
        necessary: {
            readOnly: true,
            enabled: true
        },
        analytics: {
            autoClear: {
                cookies: [
                    {
                        name: /^(_ga|_gid)/
                    }
                ]
            }
        }
    },

    language: {
        default: 'en',

        translations: {
            en: {
                consentModal: {
                    title: 'Cookies',
                    description: 'Privacy & Cookies: This site uses cookies. By continuing to use this website, you agree to their use.',
                    acceptAllBtn: 'Close and accept',
                    acceptNecessaryBtn: '',
                    footer: `
                        <a href="https://automattic.com/cookies/" target="_blank">Privacy Policy</a>
                    `
                },
                preferencesModal: {
                    title: 'Cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Save preferences',
                    closeIconLabel: 'Close',
                    sections: [
                        {
                            title: 'Cookie usage',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. For more details, refer to our <a href="#" class="cc__link">privacy policy</a>.'
                        }, {
                            title: 'Strictly necessary cookies',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                            linkedCategory: 'necessary'
                        }, {
                            title: 'Performance and analytics cookies',
                            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                            linkedCategory: 'analytics'
                        }, {
                            title: 'More information',
                            description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc__link" href="#yourdomain.com">contact me</a>.',
                        }
                    ]
                }
            }
        }
    }
});