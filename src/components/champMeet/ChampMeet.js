import React, { useState, useEffect, useContext, useCallback  } from 'react';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import NativeSelect from '@material-ui/core/NativeSelect';

import ChampMeetResult from './ChampMeetResult'

const ChampMeet = () => {

	// const [ champMeet, setChampMeet ] = useState({});
	const [ status, setStatus ] = useState({
		speed: 100,
		stamina: 1000,
		power: 100,
		guts: 100,
		wisdom: 100
	})
	const [ fit, setFit ] = useState({
		// condition: ''
		style: 1,
		distanceFit: 'A',
		surfaceFit: 'A',
		styleFit: 'A'
	})
	const [ submit, setSubmit ] = useState(false)

	useEffect(() => {
		
	}, [])

	const handleChange = (e) => {
		setStatus({...status, [e.target.name]: parseInt(e.target.value)})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		setSubmit(true)
	};

	const handleDropdownChange = (e) => {
		setFit({...fit, [e.target.name]: e.target.value})
	}

	return (
		<React.Fragment>
			<form onSubmit={handleSubmit}>
				<TextField id="speed" name="speed" value={ status["speed"] } type="number" label="速度" variant="outlined" onChange={handleChange} />
				<TextField id="stamina" name="stamina" value={ status["stamina"] } type="number" label="耐力" variant="outlined" onChange={handleChange}/>
				<TextField id="power" name="power" value={ status["power"] } type="number" label="力量" variant="outlined" onChange={handleChange}/>
				<TextField id="guts" name="guts" value={ status["guts"] } type="number" label="根性" variant="outlined" onChange={handleChange}/>
				<TextField id="wisdom" name="wisdom" value={ status["wisdom"] } type="number" label="智慧" variant="outlined" onChange={handleChange}/>
				<Button type="submit" variant="contained" color="primary" />
			</form>

			<FormControl required>
		        <InputLabel id="style-label">跑法</InputLabel>
		        <Select
		          labelId="style-label"
		          id="style"
		          name='style'
		          value={ fit['style'] }
  		          onChange={ handleDropdownChange }
		        >
					<option value={1}>逃</option>
					<option value={2}>先</option>
					<option value={3}>差</option>
					<option value={4}>追</option>
		        </Select>
		        <FormHelperText>Required</FormHelperText>
			</FormControl>

			<FormControl required>
		        <InputLabel id="distanceFit-label">距離適性</InputLabel>
		        <Select
		          labelId="distanceFit-label"
		          id="distanceFit"
		          name='style'
		          value={ fit['distanceFit'] }
  		          onChange={ handleDropdownChange }
		        >
		          <option value="S">S</option>
		          <option value="A">A</option>
		          <option value="B">B</option>
		          <option value="C">C</option>
		          <option value="D">D</option>
		          <option value="E">E</option>
		          <option value="F">F</option>
		          <option value="G">G</option>
		        </Select>
		        <FormHelperText>Required</FormHelperText>
			</FormControl>

			<FormControl required>
		        <InputLabel id="surfaceFit-label">場地適性</InputLabel>
		        <Select
		          labelId="surfaceFit-label"
		          id="surfaceFit"
		          name='surfaceFit'
		          value={ fit['surfaceFit'] }
  		          onChange={ handleDropdownChange }
		        >
		          <option value="S">S</option>
		          <option value="A">A</option>
		          <option value="B">B</option>
		          <option value="C">C</option>
		          <option value="D">D</option>
		          <option value="E">E</option>
		          <option value="F">F</option>
		          <option value="G">G</option>
		        </Select>
		        <FormHelperText>Required</FormHelperText>
			</FormControl>

			<FormControl required>
		        <InputLabel id="styleFit-label">跑法適性</InputLabel>
		        <Select
		          labelId="styleFit-label"
		          id="styleFit"
		          name='styleFit'
		          value={ fit['styleFit'] }
  		          onChange={ handleDropdownChange }
		        >
		          <option value="S">S</option>
		          <option value="A">A</option>
		          <option value="B">B</option>
		          <option value="C">C</option>
		          <option value="D">D</option>
		          <option value="E">E</option>
		          <option value="F">F</option>
		          <option value="G">G</option>
		        </Select>
			</FormControl>

			{ submit && 
				<ChampMeetResult status={status} fit={fit} />
			}
		</React.Fragment>
	)


}

export default ChampMeet;
