export const confirmLink = link => {
    let https = link.search('https://')
    let http = link.search('http://')
    if(https < 0 && http < 0){
        return 'https://' + link
    }
    return link
}