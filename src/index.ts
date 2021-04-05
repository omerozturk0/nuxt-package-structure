interface FullName {
  name: string;
  surname: string;
}

const customFunc = (): FullName => {
  return {
    name: 'Ömer',
    surname: 'Öztürk'
  }
}

export {
  customFunc
}
