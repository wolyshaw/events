export const setBodyOverflow = () => {
  let { overflow = 0 } = document.body.dataset
    overflow ++
    document.body.style.overflow = 'hidden'
    document.body.dataset.overflow = overflow
}

export const cleanBodyOverflow = () => {
  let { overflow = 0 } = document.body.dataset
    overflow --
    if(overflow <= 0) {
      document.body.style.overflow = ''
      overflow = 0
    }
    document.body.dataset.overflow = overflow
}
