import React from 'react'
import InlineSVG from 'svg-inline-react'

export function AppIcons () {
  const svgSource = `
  <svg xmlns="http://www.w3.org/2000/svg" class="svg-hidden">
  <symbol id="delete" viewBox="0 0 32 32">
    <g id="surface1"><path style=" " d="M 13.59375 4 L 13.28125 4.28125 L 12.5625 5 L 6 5 L 6 7 L 7 7 L 7 25 C 7 26.644531 8.355469 28 10 28 L 22 28 C 23.644531 28 25 26.644531 25 25 L 25 7 L 26 7 L 26 5 L 19.4375 5 L 18.71875 4.28125 L 18.40625 4 Z M 14.4375 6 L 17.5625 6 L 18.28125 6.71875 L 18.59375 7 L 23 7 L 23 25 C 23 25.554688 22.554688 26 22 26 L 10 26 C 9.445313 26 9 25.554688 9 25 L 9 7 L 13.40625 7 L 13.71875 6.71875 Z M 11 11 L 11 22 L 13 22 L 13 11 Z M 15 11 L 15 22 L 17 22 L 17 11 Z M 19 11 L 19 22 L 21 22 L 21 11 Z "></path></g>
  </symbol>  
  <symbol id="edit_property" viewBox="0 0 32 32">
    <g id="surface1"><path style=" " d="M 4 5 L 4 27 L 17.0625 27 L 16.375 30.46875 L 16.0625 31.9375 L 17.53125 31.625 L 21.0625 30.9375 L 21.375 30.875 L 31.125 21.125 C 32.285156 19.964844 32.285156 18.035156 31.125 16.875 C 30.542969 16.292969 29.769531 16 29 16 C 28.65625 16 28.328125 16.070313 28 16.1875 L 28 5 Z M 6 7 L 26 7 L 26 9 L 6 9 Z M 6 11 L 26 11 L 26 17.75 L 18.75 25 L 6 25 Z M 9 14 L 9 16 L 11 16 L 11 14 Z M 13 14 L 13 16 L 23 16 L 23 14 Z M 9 18 L 9 20 L 11 20 L 11 18 Z M 13 18 L 13 20 L 19 20 L 19 18 Z M 29 18 C 29.253906 18 29.519531 18.082031 29.71875 18.28125 C 30.117188 18.679688 30.117188 19.289063 29.71875 19.6875 L 20.375 29.03125 L 18.59375 29.40625 L 18.96875 27.625 L 28.3125 18.28125 C 28.511719 18.082031 28.746094 18 29 18 Z "></path></g>
  </symbol>
  <symbol id="move" viewBox="0 0 32 32">
    <g id="surface1"><path style=" " d="M 16 2.585938 L 11.292969 7.292969 L 12.707031 8.707031 L 15 6.414063 L 15 12 L 17 12 L 17 6.414063 L 19.292969 8.707031 L 20.707031 7.292969 Z M 7.292969 11.292969 L 2.585938 16 L 7.292969 20.707031 L 8.707031 19.292969 L 6.414063 17 L 13 17 L 13 15 L 6.414063 15 L 8.707031 12.707031 Z M 24.707031 11.292969 L 23.292969 12.707031 L 25.585938 15 L 19 15 L 19 17 L 25.585938 17 L 23.292969 19.292969 L 24.707031 20.707031 L 29.414063 16 Z M 15 19 L 15 25.585938 L 12.707031 23.292969 L 11.292969 24.707031 L 16 29.414063 L 20.707031 24.707031 L 19.292969 23.292969 L 17 25.585938 L 17 19 Z "></path></g>
  </symbol>
  <symbol id="sort" viewBox="0 0 32 32">
    <g id="surface1"><path style=" " d="M 16 3.59375 L 15.28125 4.28125 L 7.28125 12.28125 L 5.59375 14 L 26.40625 14 L 24.71875 12.28125 L 16.71875 4.28125 Z M 16 6.4375 L 21.5625 12 L 10.4375 12 Z M 5.59375 18 L 7.28125 19.71875 L 15.28125 27.71875 L 16 28.40625 L 16.71875 27.71875 L 24.71875 19.71875 L 26.40625 18 Z M 10.4375 20 L 21.5625 20 L 16 25.5625 Z "></path></g>
  </symbol>
</svg>
  `
  return <InlineSVG src={svgSource} />
}
