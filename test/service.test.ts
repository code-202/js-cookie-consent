import { test, expect } from '@jest/globals'
import { Service } from '../src/js'
import { fn } from 'jest-mock'

test('getters', () => {
    expect.assertions(14)

    const service = new Service({
        id: 'foo',
        needConsent: false,
        type: 'bar',
        cookies: ['_foo', '_bar'],
        onAccept: () => {
            console.log('enable Foo')
            //ga.enable()
        },
        onDecline: () => {
            console.log('disable Foo')
            //ga.disable()
        }
    })

    const service2 = new Service({
        id: 'foo',
        needConsent: true,
        type: 'bar',
        name: 'foobar',
        cookies: ['_foo'],
        onAccept: () => {
            console.log('enable Foo')
            //ga.enable()
        },
        onDecline: () => {
            console.log('disable Foo')
            //ga.disable()
        }
    })

    const service3 = new Service({
        id: 'foo',
        needConsent: true,
        onAccept: () => {
            console.log('enable Foo')
            //ga.enable()
        },
        onDecline: () => {
            console.log('disable Foo')
            //ga.disable()
        }
    })

    expect(service.id).toBe('foo')
    expect(service.needConsent).toBe(false)
    expect(service.type).toBe('bar')
    expect(service.name).toBe('bar.foo')
    expect(service.cookies).toStrictEqual(['_foo', '_bar'])
    expect(service.definition).toStrictEqual({
        id: 'foo',
        needConsent: false,
        type: 'bar',
        name: 'bar.foo',
        cookies: ['_foo', '_bar'],
    })


    expect(service2.id).toBe('foo')
    expect(service2.needConsent).toBe(true)
    expect(service2.type).toBe('bar')
    expect(service2.name).toBe('foobar')
    expect(service2.cookies).toStrictEqual(['_foo'])
    expect(service2.definition).toStrictEqual({
        id: 'foo',
        needConsent: true,
        type: 'bar',
        name: 'foobar',
        cookies: ['_foo'],
    })

    expect(service3.name).toBe('default.foo')
    expect(service3.cookies).toStrictEqual([])
})

test('callbacks', () => {
    expect.assertions(17)

    const callback = fn(res => res)

    const service = new Service({
        id: 'foo',
        needConsent: true,
        type: 'bar',
        cookies: ['_foo'],
        onAccept: () => {
            callback('enable')
        },
        onDecline: () => {
            callback('disable')
        }
    })

    expect(service.consent).toBe('unknown')

    service.accept()
    expect(service.consent).toBe('yes')
    expect(callback.mock.calls).toHaveLength(1)
    expect(callback.mock.results[0].value).toBe('enable')

    service.decline()
    expect(service.consent).toBe('no')
    expect(callback.mock.calls).toHaveLength(2)
    expect(callback.mock.results[1].value).toBe('disable')

    service.accept()
    expect(service.consent).toBe('yes')
    expect(callback.mock.calls).toHaveLength(3)
    expect(callback.mock.results[2].value).toBe('enable')

    service.accept()
    expect(service.consent).toBe('yes')
    expect(callback.mock.calls).toHaveLength(3)

    service.decline()
    expect(service.consent).toBe('no')
    expect(callback.mock.calls).toHaveLength(4)
    expect(callback.mock.results[3].value).toBe('disable')

    service.decline()
    expect(service.consent).toBe('no')
    expect(callback.mock.calls).toHaveLength(4)
})