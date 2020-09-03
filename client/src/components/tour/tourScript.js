const maxPosition = 27

const tourCommands = pos => {
    switch(pos) {
        case 0:
            // return {
            //     message:{
            //         title:'Welcome to the virtual tour',
            //         text:'Use ICON_NEXT to go forward and ICON_PREV to visit previous slides. You can exit this tour anytime by pressing ICON_EXIT'
            //     }
            // }
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
        case 15:
            return {
                page: 'bug',
                stage: 0,
            }
        case 16:
            return {
                page: 'bug',
                stage: 0,
                selected: 'favButton',
                tooltip: {
                    title:'Favorite Bugs',
                    text:'tooltip text'
                }
            }
        case 17:
            return {
                page: 'bug',
                stage: 0,
                selected: 'stageButton',
                tooltip: {
                    title:'Fix Bugs',
                    text:'tooltip text'
                }
            }
        case 18:
            return {
                page: 'bug',
                stage: 1,
                selected: 'stageButton',
                tooltip: {
                    title:'Review Stage',
                    text:'tooltip text'
                }
            }
        case 19:
            return {
                page: 'bug',
                stage: 2,
                selected: 'stageButton',
                tooltip: {
                    title:'Fixed Stage',
                    text:'tooltip text'
                }
            }
        case 20:
            return {
                page: 'bug',
                stage: 2,
                selected: 'commentForm',
                tooltip: {
                    title:'Comment',
                    text:'tooltip text'
                }
            }
        case 21:
            return {
                page: 'bug',
                stage: 2,
                selected: 'comment0',
                tooltip: {
                    title:'Collaborate',
                    text:'tooltip text'
                }
            }
        case 22:
            return {
                page: 'bug',
                stage: 2,
                selected: 'sidebarButton',
                tooltip: {
                    title:'Sidebar',
                    text:'tooltip text'
                }
            }
        case 23:
            return {
                page: 'bug',
                stage: 2,
                sidebar: true
            }
        case 24:
            return {
                page: 'bug',
                stage: 2,
                sidebar: true,
                selected: 'userIcon',
                tooltip: {
                    title:'Visit Your Profile',
                    text:'tooltip text'
                }
            }
        case 25:
            return {
                page: 'profile'
            }
        case 26:
            return {
                page: 'profile',
                selected: 'inviteButton',
                tooltip: {
                    title:'Invite to Projects',
                    text:'tooltip text'
                }
            }
        case 27:
            return {
                page: 'profile',
                selected: 'dashboardIcon',
                sidebar: true,
                tooltip: {
                    title:'Visit Your Dashboard',
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