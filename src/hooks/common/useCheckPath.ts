
export const useCheckPath = (props: any) => {
   const {str}: any = props
   const toLowerCase = window.location.href?.toString()?.toLocaleLowerCase()
   return toLowerCase?.includes(`${str}`)
}