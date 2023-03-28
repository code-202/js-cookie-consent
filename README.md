# react-mobx-cookie-consent
Rich cookie consent with react / mobx and bootstrap design

## Store injection
Launcher and Dialog components use the @code-202/kernel to get the store service with code 'cookie-consent'
Add it in your container like this
```
    const cookieConsentStore = new CookieConsentStore({ cookie: { secure: false }, cookies: kernel.environment.get('cookies') })

    cookieConsentStore.addService({
        id: 'main',
        needConsent: false,
        type: 'main',
        name: 'Fonctionnement',
        cookies: ['rmcc', 'api-token']
    })

    cookieConsentStore.addService({
        id: 'ga',
        needConsent: true,
        type: 'analytics',
        name: 'Google Analytics',
        cookies: ['_ga', '_gid'],
        onAccept: () => {
            console.log('enable GA')
            //ga.enable()
        },
        onDecline: () => {
            console.log('disable GA')
            //ga.disable()
        }
    })

    kernel.container.add('cookie-consent', cookieConsentStore)

```
