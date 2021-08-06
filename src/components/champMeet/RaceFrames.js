import React, { useState, useEffect, useContext, useCallback  } from 'react';

const RaceFrames = (props) => {
	const [ params, setParams ] = useState(props.params)
	const [ frames, setFrames ] = useState([])

	const calAcc = (currentSpeed, targetSpeed, phase, a) => {
		let speedDiff = targetSpeed - currentSpeed
		if (speedDiff < 0) {
			switch (phase) {
				case 0:
				  return -1.2
				case 1:
				  return -0.8
				case 2:
				default:
				  return -1.0
			}
		} else {
			const c = 0.0006
			return a[String(phase + 1)]
		}
	};


	useEffect(() => {
		// console.log(params['a'])
		let framesTmp = []

		// constant
		const a = params['a']
		const v = params['v']
		const frameLength = params['frameLength']
		const baseSpeed = params['baseSpeed']
		const courseLength = params['courseLength']
		const phaseLine = [
			courseLength / 6.0,
			courseLength * 2.0 / 3,
			courseLength * 5.0 / 6,
		]
		const spurtSpCoef = params['spurtSpCoef']

		// init value
		let position = 0
		let currentSpeed = 3
		let acc = a['0']
		let targetSpeed = v['0']
		let sp = params['spMax']
		let phase = 0
		let state = 'startdash'
		let consumeSp









		while (position < courseLength) {

			// before move
			if (state === 'tired') {
				consumeSp = 0
				acc = -1.2
				targetSpeed = v['min']
			} else {
				consumeSp = (currentSpeed - baseSpeed + 12.0) ** 2 / 144 * frameLength
				if (state === 'startdash') {
					targetSpeed = v['0']
					acc = a['0']
				} else {
					targetSpeed = v[String(phase + 1)]
					acc = calAcc(currentSpeed, targetSpeed, phase, a)
				}
			}

			let frame = {
				frameLength,
				position,
				sp,
				currentSpeed,
				acc,
				targetSpeed,
				phase,
				state,
			}

			// move 
			position += currentSpeed * frameLength
			phase = (position >= phaseLine[phase]) ? phase + 1 : phase
			sp -= consumeSp
			if (sp <= 0) {
				sp = 0
				state = 'tired'
			}

			if (state === 'tired') {
				currentSpeed = (currentSpeed + acc * frameLength > targetSpeed) 
					? currentSpeed + acc * frameLength 
					: targetSpeed
			} else {
				currentSpeed = (currentSpeed + acc * frameLength > targetSpeed) 
						? (currentSpeed + acc * frameLength) 
						: targetSpeed

				if (currentSpeed === targetSpeed && state === 'startdash') {
					state = ''
				}

			}

			framesTmp.push(frame)
		}
		console.log(framesTmp)
		setFrames(framesTmp)


	}, [])

	return (
		<>
			<div>aaaaaa</div>

		</>
		)


}

export default RaceFrames;