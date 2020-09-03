const maxPosition = 14

const tourCommands = pos => {
    switch(pos) {
        case 0:
            return {
                message:{
                    title:'Welcome to the virtual tour',
                    text:'Use ICON_NEXT to go forward and ICON_PREV to visit previous slides. You can exit this tour anytime by pressing ICON_EXIT'
                }
            }
        case 1:
            return {
                message:{
                    title:'BugTracker',
                    text:'Explanation'
                }
            }
        case 2:
            return {
                selected: 'navbar',
                tooltip: {
                    title:'The Navbar',
                    text:'tooltip text'
                }
            }
        case 3:
            return {
                selected: 'projectsNav',
                tooltip: {
                    title:'Projects Page',
                    text:'tooltip text'
                }
            }
        case 4:
            return {
                page: 'projects',
            }
        case 5:
            return {
                page: 'projects',
                selected: 'project0',
                tooltip: {
                    title:'Project Previews',
                    text:'tooltip text'
                }
            }
        case 6:
            return {
                page: 'projects',
                selected: 'searchBar',
                tooltip: {
                    title:'Project Searching',
                    text:'tooltip text'
                }
            }
        case 7:
            return {
                page: 'project'
            }
        case 8:
            return {
                page: 'project',
                selected: 'joinButton',
                tooltip: {
                    title:'Joining Projects',
                    text:'tooltip text'
                }
            }
        case 9:
            return {
                page: 'project',
                selected: 'languageIcons',
                tooltip: {
                    title:'Tech Stack',
                    text:'tooltip text'
                }
            }
        case 10:
            return {
                page: 'project',
                selected: 'membersButton',
                tooltip: {
                    title:'Members',
                    text:'tooltip text'
                }
            }
        case 11:
            return {
                page: 'project',
                selected: 'bugsButton',
                tooltip: {
                    title:'Bugs',
                    text:'tooltip text'
                }
            }
        case 12:
            return {
                page: 'bugs',
            }
        case 13:
            return {
                page: 'bugs',
                selected: 'bug0',
                tooltip: {
                    title:'Bug Previews',
                    text:'tooltip text'
                }
            }
        case 14:
            return {
                page: 'bugs',
                selected: 'searchBar',
                tooltip: {
                    title:'Search Bugs',
                    text:'tooltip text'
                }
            }
        default:
            return
    }
} 

export default tourCommands

export {
    maxPosition
}