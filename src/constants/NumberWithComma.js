// export const numberWithCommas = (x) => {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
// export const numberWithCommasinParsian = (x) => {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "،");
// }


export const numberWithCommas = (x) => {
    if(x.toString().length==4 && x.toString().substr(1,3)=="000")
     {
       return x;
     }else{
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
     }
 }
 export const numberWithCommasinParsian = (x) => {
     if(x.toString().length==4 && x.toString().substr(1,3)=="000")
     {
       return x;
     }else{
     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "،");
     }
 }


 export const numberCheck = (val) => {
  var a = parseInt(val) == val
  return a
}