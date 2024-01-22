// const isFalsy = (val: unknown): boolean => (val === 0 ? false : !val) //当该值为非0的falsy值(undefine || null)则返回true

const isVoid = (val: unknown) => val === undefined || val === null || val === '' 

export const cleanObject = (obj: {[key: string]: unknown}) => {
  //不要试图改变传入的对象; 不要污染传入的对象
  const res = { ...obj } //成一个新对象
  Object.keys(obj).forEach((key) => {
    const val = res[key]
    if (isVoid(val)) {
      delete res[key]
    }
  })
  return res
}


//重置路由
export const resetRouter =  () => window.location.href = window.location.origin