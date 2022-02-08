import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const sidebarListItems = [
    {
        option: 'Home',
        icon: <HomeRoundedIcon sx={{ fontSize: 21 }} />,
        url:'/'
    },
    {
        option: "Today's Weather",
        icon: <WbSunnyRoundedIcon sx={{ fontSize: 21 }} />,
        url:'/weather'
    },
    {
        option: 'Post News Articles',
        icon: <PostAddRoundedIcon sx={{ fontSize: 21 }} />,
        url:'/addNewsArticles'
    },

    {
        option: 'Saved Articles',
        icon: <FavoriteRoundedIcon sx={{ fontSize: 21 }} />,
        url:'/savedArticles'
    },
    {
        option: 'About us',
        icon: <PersonRoundedIcon sx={{ fontSize: 21 }} />,
        url:'/about'

    },

]

export default sidebarListItems