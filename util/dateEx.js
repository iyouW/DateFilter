import StringEx from './stringEx'

export default class DateEx{

    static get metaChars(){
        return ['y','m','d','hh','mm','ss','msn']
    }

    static parseDate(dts){
        const type = typeof dts
        if(type == 'object' && value instanceof Date)
            return dts
        if(type == 'number')
            return new Date(dts)
        if(type == 'string')
            return new Date(parseInt(dts))
        throw new Error("无法解析该时间格式")
    }

    static format(dts,dtStr){
        const dt = this.parseDate(dts)
        const arr = this.parseDatetimeString(dtStr,this.metaChars)
        const dto = this.getFilledDatetime(dt)
        let res = ""
        arr.forEach(t=>{
            res += dto[t]?dto[t]:t
        })
        return res
    }

    static getDateTime(dt){
        const res = {}
        res.y = dt.getFullYear()
        res.m = dt.getMonth() + 1
        res.d = dt.getDate()
        res.hh = dt.getHours()
        res.mm = dt.getMinutes()
        res.ss = dt.getSeconds()
        res.msn = res.hh<=12?'上午':'下午'
        return res
    }

    static getFilledDatetime(dt){
        const res = this.getDateTime(dt)
        res.m = StringEx.toLength(res.m,2)
        res.d = StringEx.toLength(res.d,2)
        res.hh = StringEx.toLength(res.hh,2)
        res.mm = StringEx.toLength(res.mm,2)
        res.ss = StringEx.toLength(res.ss,2)
        return res
    }

    static parseDatetimeString(dtStr,metaChars){
        let res = [],i=0,j=dtStr.length,char='',find= false
        //find the first char  is included in the metaChars
        // loop dtStr
        while(i<j){
            char = dtStr[i]
            if(metaChars.find(t=>t.startsWith(char))){
                find = true
                break
            }else{
                i++
            }
        }
        if(!find)
            return [dtStr]
        // if find then push the un find block to res array
        if(i>0)
            res.push(dtStr.substring(0,i))
        // span the finded char to the longest on in the metaChars
        let k=i+1,chars = char
        do{
            k++
            chars = dtStr.substring(i,k)
            find = !!metaChars.find(t=>t.startsWith(chars))
        }while(find&&k<=j)
        // find the sequence
        if(k==j&&find){
            res.push(dtStr.substring(i,k))
        }else{
            chars = dtStr.substring(i,--k)
            res.push(chars)
            let index = metaChars.findIndex(t=>t==chars)
            if(index !=-1)
                metaChars.splice(index,1)
            res = res.concat(this.parseDatetimeString(dtStr.substring(k),metaChars))
        }
        return res 
    }
}