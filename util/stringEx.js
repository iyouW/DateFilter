export default class StringEx{
    static toLength(obj,desiredLength,fillChar="0"){
        let res = ""
        const rs = obj.toString()
        const diff = rs.length - desiredLength
        if(diff>=0){
            res = rs.substring(diff)
        }else{
            res = `${fillChar.repeat(Math.abs(diff))}${rs}`
        }
        return res
    }
}