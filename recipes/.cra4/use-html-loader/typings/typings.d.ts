/**
 * To resolve "Cannot find module error on importing html file in webpack" if you use Typescript
 * Usage: import foo from './foo.html';
 */
declare module '*.html' {
  const value: string;
  export default value;
}
