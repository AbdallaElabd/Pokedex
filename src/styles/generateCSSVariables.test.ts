import {
  generateCssGetters,
  generateCssVariables,
} from './generateCSSVariables';
import { Theme } from './theme';

describe('Theme CSS Variables', () => {
  const nestedObject = {
    foo: '1',
    bar: { foo: '2' },
    baz: { bar: { foo: '3' } },
    qux: { baz: { bar: { foo: '4' } } },
  };
  it('should serialized nested objects', () => {
    expect(generateCssVariables(nestedObject as unknown as Theme)).toEqual([
      '--foo: 1;',
      '--bar-foo: 2;',
      '--baz-bar-foo: 3;',
      '--qux-baz-bar-foo: 4;',
    ]);
  });
  it('should generate getters', () => {
    expect(generateCssGetters(nestedObject)).toEqual({
      foo: 'var(--foo)',
      bar: { foo: 'var(--bar-foo)' },
      baz: { bar: { foo: 'var(--baz-bar-foo)' } },
      qux: { baz: { bar: { foo: 'var(--qux-baz-bar-foo)' } } },
    });
  });
});
