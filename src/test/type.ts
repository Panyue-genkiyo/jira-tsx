// type p = Partial<{name: string, personId: number}>
// type p = {
//     name?: string,
//     personId?: number
// }

// import { basename } from "path/win32"

// type t = {
//     personId: number | undefined,
//     name: string
// }

// const a : p  = {
//     name: 'sss',
//     personId: undefined
// }

// type a = {
//     name?: string
//     personId?: number
// }

// type t = {
//     name?: unknown,
//     personId?: unknown
// }


// let x: t ={
//     name: 1,
//     personId: 2
// }

//逆变 参数类型

// let a = (params: Partial<{name: string, personId: number}>) => ({star: true})
// let b = (params: Partial<{name: unknown, personId: unknown}>) => ({star: false, name:'panyue'})
// // let c = (params: {}) => undefined
                                                                                                                                                                                                                                                                                                                                                                                                                                  
// //
// // b = a;
// a = b




// let c : unknown = 2;
// let t: number = c;
// let d: unknown = 1;
// let x = (a: number, b: string, c: string) => d;
// let y = (b: number, c: string, d: string) => 1;
// // 

export {}

