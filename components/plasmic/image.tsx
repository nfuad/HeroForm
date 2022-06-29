import Image from 'next/image'
import type { ImageProps } from 'next/image'

function NextImage(props: ImageProps) {
  const { src, alt, width, height, ...other } = props

  return (
    <Image
      quality={100}
      src={src}
      alt={alt}
      width={width}
      height={height}
      {...other}
    />
  )
}

export default NextImage
