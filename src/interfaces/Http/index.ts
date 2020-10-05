export interface HttpResponseType<T> {
  statusCode: number
  success: boolean
  data: T
  messages: string[]
}
