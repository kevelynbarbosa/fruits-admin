export default interface PaginationResponse<T> {
  rows: T[]
  count: number
}
