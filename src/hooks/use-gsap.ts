import gsap from 'gsap'
export default function () {
  gsap.from('.left-pane', { x: -500, opacity: 0, duration: 1 })
  gsap.from('.right-pane', { x: 400, opacity: 0, duration: 1 })
  gsap.from('.common-header', { y: -100, opacity: 0, duration: 1 })
  gsap.from('.info-pane', { y: 200, opacity: 0, duration: 1 })
}
