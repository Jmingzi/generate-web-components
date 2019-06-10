import copy from 'deep-copy'

export const deepCopy = <T>(data: T): T => copy(data)
