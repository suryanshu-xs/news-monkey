import React, { useEffect, useState, useContext } from 'react'
import Logo from '../../news-monkey-logo.svg'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import countryCodeData from '../../Data/CountryCodes';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import sidebarListItems from '../../Data/SidebarListItems';
import { UserContext } from '../../App';
import { Button } from '@mui/material';
import { signInUser,signOutUser } from '../../Data/functions';




const Navbar = ({ selectedCountry, setSelectedCountry, setOpen, setSelectedTopic, searchPlaceHolder, setSelectedCity, disabled,setSnackBarMessage }) => {

    const [weatherInfo, setWeatherInfo] = useState(null)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [user, setUser] = useContext(UserContext)


    const handleSearchSubmit = (event) => {
        event.preventDefault()
        if (searchPlaceHolder === 'City Name') {
            setSelectedCity(searchText)


        } else {
            setSelectedTopic(searchText)
        }

    }

  
    const handleCountrySelectChange = (event) => {
        setSelectedCountry(countryCodeData.filter((countryInfo) => countryInfo.code === event.target.value)[0]);
    }

    useEffect(() => {

        fetch(`https://api.weatherapi.com/v1/current.json?key=fa4d691095f5439fa86134444212412&q=${selectedCountry.capital}`, {
            method: 'GET'
        }).then(res => {
            if (res.ok) {
                res.json().then(data => setWeatherInfo({
                    temperature: data.current.feelslike_c,
                    condition: data.current.condition.text
                }))
                setOpen(true)

            } else {
                setWeatherInfo(null)
            }
        })


    }, [selectedCountry])

    return (
        <>
            <nav className='navbar'>

                <Link to='/' >
                    <div className="logo-container">
                        <img src={Logo} alt="" className='logo' />
                    </div>
                </Link>

                <div className='search-box'>
                    <SearchRoundedIcon style={{
                        color: '#4a4a4a'
                    }} />
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder={searchPlaceHolder}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className='search-input'
                            disabled={disabled}
                        />
                    </form>
                </div>

                <Link to='/weather' style={{
                    color: 'inherit', textDecoration: 'inherit'
                }} >
                    <div className='weather-time-date-info'>
                        <p className='city'>{selectedCountry.capital}</p>
                        <p className='temp-day'>{
                            weatherInfo ? `${weatherInfo.temperature} ${"\u00B0"}C ${weatherInfo.condition}` : ''
                        }</p>
                    </div>
                </Link>

                <div className='country-select-tag'>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Country</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedCountry.code}
                            label="Country"
                            onChange={handleCountrySelectChange}
                            style={{
                                height: 35,
                                borderColor: 'green',
                                borderWidth: 3,
                                fontSize: 15,
                                borderRadius: 30
                            }}
                        >

                            {
                                countryCodeData.map(({ country, code }, index) => <MenuItem style={{
                                    fontSize: 13
                                }} key={index} value={code} >{country}</MenuItem>)
                            }
                        </Select>
                    </FormControl>

                </div>

                <div className='options-box' >
                    <IconButton onClick={() => setOpenDrawer(true)}>
                        <MenuRoundedIcon style={{
                            color: '#4a4a4a',
                            transform: openDrawer ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: '0.5s',
                            transitionDelay: '0.2s'
                        }} />
                    </IconButton>
                </div>


            </nav>
            <div>

                <Drawer
                    anchor='right'
                    open={openDrawer}
                    onClose={() => setOpenDrawer(false)}
                >
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={() => setOpenDrawer(false)}>
                        <div className='sidebar-title' >
                            <p className='sidebar-title-hello'>Hello</p>
                            <p className='sidebar-title-name'>{ user?user.displayName:'Guest' }</p>
                        </div>
                        <div className='navbar-button-container' >

                            <Button size='small' onClick={()=>signInUser(setUser,setOpen,setSnackBarMessage)}  > Log In </Button>
                            
                            <Button size='small' onClick={()=>signOutUser(setUser,setOpen,setSnackBarMessage)} > Log Out </Button>

                        </div>
                        {
                            sidebarListItems.map(({ option, icon, url }, index) => (<Link to={url} style={{
                                color: 'inherit', textDecoration: 'inherit'
                            }} key={index} >
                                <ListItem button  >
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={option} />
                                </ListItem>
                            </Link>))
                        }

                    </Box>
                </Drawer>
            </div>
        </>
    )
}

export default Navbar
