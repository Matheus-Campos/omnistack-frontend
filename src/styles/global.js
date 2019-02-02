import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #353940;
    color: #fff;
    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
    font-size: 14px;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
  }

  html, border-style, #root {
    height: 100%;
  }

  input, button {
    font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
