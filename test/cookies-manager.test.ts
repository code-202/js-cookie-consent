import { test, expect } from '@jest/globals'
import { AccessDeniedError, CookieError, CookiesManager, CookiesManagerWrapper, DisabledError } from '../src/js'
import { fn } from 'jest-mock'
import { Cookie, CookieGetOptions, CookieSetOptions } from 'universal-cookie'

test('getters', () => {
    expect.assertions(27)

    const mockGet = fn(res => res)
    const mockSet = fn(res => res)
    const mockRemove = fn(res => res)

    const cm: CookiesManager  = {
        get(name: string, options?: CookieGetOptions): any {
            mockGet(name)
            return name
        },
        set(name: string, value: Cookie, options?: CookieSetOptions): void { mockSet(name+value) },
        remove(name: string, options?: CookieSetOptions): void { mockRemove(name) },
    }

    let enable = true

    const cmw = new CookiesManagerWrapper(cm, ['_foo', '_bar'], () => enable)

    cmw.get('_foo')
    expect(mockGet.mock.calls).toHaveLength(1)
    expect(mockGet.mock.results[0].value).toBe('_foo')

    expect(() => cmw.get('foo')).toThrow('access denied')
    expect(() => cmw.get('foo')).toThrow(AccessDeniedError)
    expect(() => cmw.get('foo')).toThrow(CookieError)
    expect(mockGet.mock.calls).toHaveLength(1)

    cmw.set('_bar', 'tock')
    expect(mockSet.mock.calls).toHaveLength(1)
    expect(mockSet.mock.results[0].value).toBe('_bartock')

    expect(() => cmw.set('foo', 'bar')).toThrow('access denied')
    expect(() => cmw.set('foo', 'bar')).toThrow(AccessDeniedError)
    expect(() => cmw.set('foo', 'bar')).toThrow(CookieError)
    expect(mockSet.mock.calls).toHaveLength(1)

    cmw.remove('_bar')
    expect(mockRemove.mock.calls).toHaveLength(1)
    expect(mockRemove.mock.results[0].value).toBe('_bar')

    expect(() => cmw.remove('foo')).toThrow('access denied')
    expect(() => cmw.remove('foo')).toThrow(AccessDeniedError)
    expect(() => cmw.remove('foo')).toThrow(CookieError)
    expect(mockRemove.mock.calls).toHaveLength(1)

    enable = false

    expect(() => cmw.get('foo')).toThrow('access disabled')
    expect(() => cmw.get('foo')).toThrow(DisabledError)
    expect(() => cmw.get('foo')).toThrow(CookieError)
    expect(mockGet.mock.calls).toHaveLength(1)

    expect(() => cmw.set('foo', 'bar')).toThrow('access disabled')
    expect(() => cmw.set('foo', 'bar')).toThrow(DisabledError)
    expect(() => cmw.set('foo', 'bar')).toThrow(CookieError)
    expect(mockSet.mock.calls).toHaveLength(1)

    cmw.remove('_bar')
    expect(mockRemove.mock.calls).toHaveLength(2)
})