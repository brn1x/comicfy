type OptionalProps<Interface, Props extends keyof Interface> = Omit<Interface, Props> &
  Partial<Pick<Interface, Props>>

export { OptionalProps }
