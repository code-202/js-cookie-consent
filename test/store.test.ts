import { test, expect, afterAll, beforeAll } from '@jest/globals'
import { Service, Store } from '../src/js'
import { fn } from 'jest-mock'

test('first', () => {
    expect.assertions(76)

    const store = new Store({customizable: true})

    expect(store.consents).toStrictEqual([])
    expect(store.isCustomizable).toBe(true)

    const callback = fn(res => res)

    store.addService({
        id: 's1',
        needConsent: false,
        type: 't1',
        cookies: ['_s1'],
        onAccept: () => {
            callback('enable S1')
        },
        onDecline: () => {
            callback('disable S1')
        }
    })

    store.addService({
        id: 's2',
        needConsent: true,
        cookies: ['_s2'],
        onAccept: () => {
            callback('enable S2')
        },
        onDecline: () => {
            callback('disable S2')
        }
    })

    store.addService({
        id: 's3',
        needConsent: true,
        type: 't2',
        cookies: ['_s3.1', '_s3.2'],
        onAccept: () => {
            callback('enable S3')
        },
        onDecline: () => {
            callback('disable S3')
        }
    })

    store.addService({
        id: 's4',
        needConsent: true,
        type: 't2',
        cookies: ['_s4'],
        onAccept: () => {
            callback('enable S4')
        },
        onDecline: () => {
            callback('disable S4')
        }
    })

    expect(store.nbNeedConcentServices).toBe(3)
    expect(callback.mock.calls).toHaveLength(1)
    expect(callback.mock.results[0].value).toBe('enable S1')

    expect(store.dialogIsOpened).toBe(false)

    store.initialize()

    expect(store.dialogIsOpened).toBe(true)
    expect(store.isAcceptAll).toBe(false)
    expect(store.isDeclineAll).toBe(false)

    store.toggleDialog()
    expect(store.dialogIsOpened).toBe(true)

    let types = store.types
    expect(types).toHaveLength(3)
    expect(types[0].choice).toBe('yes')
    expect(types[0].expanded).toBe(false)
    expect(types[0].id).toBe('t1')
    expect(types[0].services).toHaveLength(1)
    expect(types[0].services[0].id).toBe('s1')

    expect(types[1].choice).toBe('unknown')
    expect(types[1].expanded).toBe(false)
    expect(types[1].id).toBe('default')
    expect(types[1].services).toHaveLength(1)
    expect(types[1].services[0].id).toBe('s2')

    expect(types[2].choice).toBe('unknown')
    expect(types[2].expanded).toBe(false)
    expect(types[2].id).toBe('t2')
    expect(types[2].services).toHaveLength(2)
    expect(types[2].services[0].id).toBe('s3')
    expect(types[2].services[1].id).toBe('s4')

    store.acceptAll()
    types = store.types

    expect(store.dialogIsOpened).toBe(false)
    expect(store.isAcceptAll).toBe(true)
    expect(store.isDeclineAll).toBe(false)

    expect(callback.mock.calls).toHaveLength(4)
    expect(callback.mock.results[1].value).toBe('enable S2')
    expect(callback.mock.results[2].value).toBe('enable S3')
    expect(callback.mock.results[3].value).toBe('enable S4')

    expect(types[0].choice).toBe('yes')
    expect(types[1].choice).toBe('yes')
    expect(types[2].choice).toBe('yes')

    store.declineAll()
    store.addService({
        id: 's5',
        needConsent: true,
        cookies: ['_s5'],
        onAccept: () => {
            callback('enable S5')
        },
        onDecline: () => {
            callback('disable S5')
        }
    })
    types = store.types

    expect(store.dialogIsOpened).toBe(false)
    expect(store.isAcceptAll).toBe(false)
    expect(store.isDeclineAll).toBe(true)

    expect(callback.mock.calls).toHaveLength(8)
    expect(callback.mock.results[4].value).toBe('disable S2')
    expect(callback.mock.results[5].value).toBe('disable S3')
    expect(callback.mock.results[6].value).toBe('disable S4')
    expect(callback.mock.results[7].value).toBe('disable S5')

    expect(types[0].choice).toBe('yes')
    expect(types[1].choice).toBe('no')
    expect(types[2].choice).toBe('no')


    store.toggleCustomize()
    expect(store.globalConsent).toBe('unknown')
    expect(store.customizing).toBe(true)

    // Service déjà en place
    store.addService({
        id: 's2',
        needConsent: true,
        cookies: ['_s2'],
        onAccept: () => {
            callback('enable S2')
        },
        onDecline: () => {
            callback('disable S2')
        }
    })

    store.addService({
        id: 's6',
        needConsent: true,
        type: 't2',
        cookies: ['_s6'],
        onAccept: () => {
            callback('enable S6')
        },
        onDecline: () => {
            callback('disable S6')
        }
    })

    types = store.types
    expect(types[0].choice).toBe('yes')
    expect(types[1].choice).toBe('no')
    expect(types[2].choice).toBe('unknown')

    expect(store.consents).toStrictEqual(['s1'])

    store.decline('s1')
    store.accept('s2')

    expect(store.consents).toStrictEqual(['s1', 's2'])

    types = store.types
    expect(types[0].choice).toBe('yes')
    expect(types[1].choice).toBe('unknown')
    expect(types[2].choice).toBe('unknown')

    store.accept('s5')
    store.accept('s6')

    expect(store.consents).toStrictEqual(['s1', 's2', 's5', 's6'])

    types = store.types
    expect(types[0].choice).toBe('yes')
    expect(types[1].choice).toBe('yes')
    expect(types[2].choice).toBe('unknown')

    store.decline('s6')

    expect(store.consents).toStrictEqual(['s1', 's2', 's5'])

    types = store.types
    expect(types[0].choice).toBe('yes')
    expect(types[1].choice).toBe('yes')
    expect(types[2].choice).toBe('no')

    store.acceptType('t2')
    store.declineType('default')

    expect(store.consents).toStrictEqual(['s1', 's3', 's4', 's6'])

    types = store.types
    expect(types[0].choice).toBe('yes')
    expect(types[1].choice).toBe('no')
    expect(types[2].choice).toBe('yes')

    store.toggleType('t1')
    store.toggleType('t2')

    types = store.types
    expect(types[0].expanded).toBe(true)
    expect(types[1].expanded).toBe(false)
    expect(types[2].expanded).toBe(true)

    store.toggleType('t2')

    types = store.types
    expect(types[0].expanded).toBe(true)
    expect(types[1].expanded).toBe(false)
    expect(types[2].expanded).toBe(false)
})

test('load cookie', () => {
    expect.assertions(16)

    const store = new Store({customizable: true}, '_cc=s1%7Cs3!s2')

    const callback = fn(res => res)

    store.addService({
        id: 's1',
        needConsent: false,
        type: 't1',
        cookies: ['_s1'],
        onAccept: () => {
            callback('enable S1')
        },
        onDecline: () => {
            callback('disable S1')
        }
    })

    store.addService({
        id: 's2',
        needConsent: true,
        cookies: ['_s2'],
        onAccept: () => {
            callback('enable S2')
        },
        onDecline: () => {
            callback('disable S2')
        }
    })

    store.addService({
        id: 's3',
        needConsent: true,
        type: 't2',
        cookies: ['_s3.1', '_s3.2'],
        onAccept: () => {
            callback('enable S3')
        },
        onDecline: () => {
            callback('disable S3')
        }
    })

    store.initialize()
    expect(store.consents).toStrictEqual(['s1', 's3'])
    expect(callback.mock.calls).toHaveLength(3)
    expect(callback.mock.results[0].value).toBe('enable S1')
    expect(callback.mock.results[1].value).toBe('enable S3')
    expect(callback.mock.results[2].value).toBe('disable S2')

    expect(store.nbNeedConcentServices).toBe(0)
    expect(store.dialogIsOpened).toBe(false)
    expect(store.newServiceSinceLastConsent).toBe(false)

    const store2 = new Store({customizable: true}, '_cc=s1%7Cs3!s2')

    const callback2 = fn(res => res)

    store2.addService({
        id: 's1',
        needConsent: false,
        type: 't1',
        cookies: ['_s1'],
        onAccept: () => {
            callback2('enable S1')
        },
        onDecline: () => {
            callback2('disable S1')
        }
    })

    store2.addService({
        id: 's2',
        needConsent: true,
        cookies: ['_s2'],
        onAccept: () => {
            callback2('enable S2')
        },
        onDecline: () => {
            callback2('disable S2')
        }
    })

    store2.addService({
        id: 's3',
        needConsent: true,
        type: 't2',
        cookies: ['_s3.1', '_s3.2'],
        onAccept: () => {
            callback2('enable S3')
        },
        onDecline: () => {
            callback2('disable S3')
        }
    })

    store2.addService({
        id: 's4',
        needConsent: true,
        type: 't2',
        cookies: ['_s4'],
        onAccept: () => {
            callback2('enable S4')
        },
        onDecline: () => {
            callback2('disable S4')
        }
    })

    store2.initialize()
    expect(store2.consents).toStrictEqual(['s1', 's3'])
    expect(callback2.mock.calls).toHaveLength(3)
    expect(callback2.mock.results[0].value).toBe('enable S1')
    expect(callback2.mock.results[1].value).toBe('enable S3')
    expect(callback2.mock.results[2].value).toBe('disable S2')

    expect(store2.nbNeedConcentServices).toBe(1)
    expect(store2.dialogIsOpened).toBe(true)
    expect(store2.newServiceSinceLastConsent).toBe(true)
})

test('normalize', () => {
    expect.assertions(2)

    const store = new Store({customizable: true})

    store.addService({
        id: 's4',
        needConsent: true,
        type: 't2',
        cookies: ['_s4'],
        onAccept: () => {},
        onDecline: () => {}
    })

    expect(store.normalize()).toStrictEqual({
        noCookie: undefined,
        dialogIsOpened: false,
    })

    store.initialize()

    expect(store.normalize()).toStrictEqual({
        noCookie: true,
        dialogIsOpened: true,
    })
})

test('denormalize', () => {
    expect.assertions(4)

    const store = new Store({customizable: true})

    store.denormalize({
        noCookie: true,
        dialogIsOpened: true,
    })

    expect(store.noCookie).toBe(true)
    expect(store.dialogIsOpened).toBe(true)

    store.denormalize({
        noCookie: false,
        dialogIsOpened: false,
    })

    expect(store.noCookie).toBe(false)
    expect(store.dialogIsOpened).toBe(false)
})
