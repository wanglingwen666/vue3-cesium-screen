/** vite的特殊性, 需要处理图片 */
const require = (imgPath: string) => {
  try {
    const handlePath = imgPath.replace('@', '..')
    // console.log('handlePath::', imgPath)
    return new URL(handlePath, import.meta.url).href
  } catch (error) {
    console.warn(error)
  }
}

export { require }
