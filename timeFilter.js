import DateEx from "./util/dateEx"

export default function timeFilter(value,dtStr){
    return DateEx.format(value,dtStr)
}