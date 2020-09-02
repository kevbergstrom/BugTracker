const maxPosition = 3

const tourCommands = pos => {
    switch(pos) {
        case 0:
            return {
                message:{
                    title:'message',
                    text:'message text'
                }
            }
        case 1:
            return {
                message:{
                    title:'message2',
                    text:'message text2'
                }
            }
        case 2:
            return {
                sidebar: true
            }
        case 3:
            return {
                sidebar: true,
                selected: 'logoutIcon',
                tooltip: {
                    title:'tooltip',
                    text:'tooltip text'
                }
            }
        case 4:
            return {
                selected: null,
                tooltip: null
            }
        default:
    }
} 

export default tourCommands

export {
    maxPosition
}