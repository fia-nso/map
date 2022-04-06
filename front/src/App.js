import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import './App.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import CreateLocation from './createLocation'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import { Form } from 'react-bootstrap'
import { Avatar } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import cookies from 'js-cookie'
import classNames from 'classnames'

const useStyles = makeStyles(theme => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}))

function App() {
    const [desti, setDesti] = useState("")
    const [sour, setSour] = useState()
    const [list, setList] = useState([])
    const classes = useStyles()
    const [sect, setSect] = React.useState({ sector: '' })
    const [open, setOpen] = React.useState(false)

    const { t } = useTranslation()
    const handleChange = event => {
        setSect({...sect, sector: event.target.value })
        console.log(sect)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleSubmit = async() => {
        const listings = await axios.put('http://localhost:5000/filtrer', sect)
        console.log(listings.data)
        setList(listings.data)
    }
    useEffect(async() => {
        const listings = await axios.get('http://localhost:5000')
        setList(listings.data)
    }, [])
    const handleClick = (e) => {
        console.log("eee", e)
        const { lat, lng } = e.latlng;
        console.log(lat, lng);
    }
    return ( <
        div className = 'container' >
        <
        div className = 'containe1' >
        <
        MapContainer center = {
            [51.505, -0.09] }
        zoom = { 6 }
        attributionControl = { true }
        zoomControl = { true }
        doubleClickZoom = { true }
        scrollWheelZoom = { true }
        dragging = { true }
        animate = { true }
        easeLinearity = { 0.35 }
        id = 'mapId'
        onClick = {
            (e) => (console.log("jdwgue", e)) } >
        <
        TileLayer attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' /
        > { ' ' } {
            list.map(lis => ( <
                > {}

                <
                Marker position = {
                    [lis.Latitude, lis.Longitude] } >
                <
                Popup > { ' ' } { lis.description }. < br / > { lis.name }. { ' ' } <
                Avatar / > { ' ' } <
                /Popup>{' '} <
                /Marker>{' '} <
                />
            ))
        } { ' ' } <
        /MapContainer>{' '}

        <
        /div>{' '} {
            /*<div className='containe2'>
                    <Form style={{ display: 'grid' }}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id='demo-controlled-open-select-label'>
                          {' '}
                          Listings{' '}
                        </InputLabel>{' '}
                        <Select
                          labelId='demo-controlled-open-select-label'
                          id='demo-controlled-open-select'
                          open={open}
                          name='sect'
                          onClose={handleClose}
                          onOpen={handleOpen}
                          value={sect.sector}
                          onChange={handleChange}
                        >
                          <MenuItem value=''>
                            <em> ALL </em>{' '}
                          </MenuItem>{' '}
                          <MenuItem value={'public'}> public </MenuItem>{' '}
                          <MenuItem value={'private'}> private </MenuItem>{' '}
                        </Select>{' '}
                      </FormControl>{' '}
                      <Button className={classes.button} onClick={handleSubmit}>
                        Search{' '}
                      </Button>{' '}
                    </Form>{' '}
                  </div>{' '}*/
        } <
        /div>
    )
}

export default App