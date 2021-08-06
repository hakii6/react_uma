import React, { useState, useEffect, useContext, useCallback    } from 'react';

// import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Constant from '../Constant'
import CourseData from '../CourseData.json'

// import Frame from './Frame'

import RaceFrames from './RaceFrames'

const ChampMeetResult = (props) => {

    const [ params, setParams ] = useState(null)

    useEffect(() => {
    	let tmp = {}

		let frameLength = 1/15
		let trackDetail = CourseData['10009']['courses']['10906']
		let courseLength= trackDetail.distance
		let statusCheckModifier = 1
		let modifiedCondition = 2
		let status = {
		    speed: props.status.speed * Constant.condCoef[modifiedCondition] * statusCheckModifier,
		    stamina: props.status.stamina * Constant.condCoef[modifiedCondition] ,
		    power: props.status.power * Constant.condCoef[modifiedCondition] ,
		    guts: props.status.guts * Constant.condCoef[modifiedCondition] ,
		    wisdom: props.status.wisdom * Constant.condCoef[modifiedCondition]
		}
		let fit = props.fit



		let baseSpeed = 20 - (courseLength - 2000) / 1000.0

		// Max stamina
		let spMax = courseLength + 0.8 * status.stamina * Constant.styleSpCoef[1]
		let spurtSpCoef = 1 + 200 / ((600 * status.guts) ** .5)

		let v = {
		    0: baseSpeed * 0.85,
		    1: baseSpeed * (Constant.styleSpeedCoef[fit.style][0]
			    + (status.wisdom * Math.log10(status.wisdom / 10)) / 550000 - 0.00325),
		    2: baseSpeed * (Constant.styleSpeedCoef[fit.style][1]
			    + (status.wisdom * Math.log10(status.wisdom / 10)) / 550000 - 0.00325),
		    3: baseSpeed * (Constant.styleSpeedCoef[fit.style][2]
			    + (status.wisdom * Math.log10(status.wisdom / 10)) / 550000 - 0.00325) 
			    + ((status.speed / 500) ** .5)
			    * Constant.distanceFitSpeedCoef[fit.distanceFit],
		    min: 0.85 * baseSpeed 
			    + 0.01 * ((status.guts * 200) ** .5),
		    maxSpurt: baseSpeed * (Constant.styleSpeedCoef[fit.style][2] + 0.01) 
			    + (((status.speed / 500) ** .5) * Constant.distanceFitSpeedCoef[fit.distanceFit]) * 1.05
			    + ((500 * status.speed) ** .5) * Constant.distanceFitSpeedCoef[fit.distanceFit] * 0.002
		}
		let a = {
		    0: 24 + 0.0006 * ((500 * status.power) ** .5)
			    * Constant.styleAccelerateCoef[fit.style][0]
			    * Constant.surfaceFitAccelerateCoef[fit.surfaceFit]
			    * Constant.distanceFitAccelerateCoef[fit.distanceFit],
		    1: 0.0006 * ((500 * status.power) ** .5)
			    * Constant.styleAccelerateCoef[fit.style][0]
			    * Constant.surfaceFitAccelerateCoef[fit.surfaceFit]
			    * Constant.distanceFitAccelerateCoef[fit.distanceFit],
		    2: 0.0006 * ((500 * status.power) ** .5)
			    * Constant.styleAccelerateCoef[fit.style][1]
			    * Constant.surfaceFitAccelerateCoef[fit.surfaceFit]
			    * Constant.distanceFitAccelerateCoef[fit.distanceFit],
		    3: 0.0006 * ((500 * status.power) ** .5)
			    * Constant.styleAccelerateCoef[fit.style][2]
			    * Constant.surfaceFitAccelerateCoef[fit.surfaceFit]
			    * Constant.distanceFitAccelerateCoef[fit.distanceFit]
		}
		let spConsumeCoef = Constant.spConsumptionCoef[trackDetail.surface][0]

		tmp = {
			frameLength,
			trackDetail,
			courseLength,

			statusCheckModifier,
			modifiedCondition,
			status,
			fit,
			baseSpeed,

			spMax,
			spurtSpCoef,
			v,
			a,
			spConsumeCoef,

		};

		setParams(tmp)
    }, [props])


	return (
		<React.Fragment>
	    {console.log("aaaaaa")}
	    <TableContainer>
		<Table aria-label="simple table">
		    <TableHead>
			<TableRow>
			    <TableCell>/</TableCell>
			    <TableCell align="right">序盤</TableCell>
			    <TableCell align="right">中盤</TableCell>
			    <TableCell align="right">終盤</TableCell>
			    <TableCell align="right">最後衝刺</TableCell>
			</TableRow>
		    </TableHead>
		    <TableBody>
			{ params && 
			    <RaceFrames params={params} /> }
		    </TableBody>
		</Table>
	    </TableContainer>
	</React.Fragment>
	)


}

export default ChampMeetResult;


/*                 <div>補正後：速度129.2 ／耐力123.0 ／力量-27.0 ／根性313.0 ／智慧222.0
初期耐力：2097.9／金回復≒144耐力／白回復≒39耐力／終盤耐力消耗係数：1.462
技能發動率：59.5％／焦慮率(掛かり率)：22.7％
起跑目標速度：17.00／起跑加速度：NaN
序盤目標速度：18.57／序盤加速度：NaN ｜ 中盤目標速度：19.95／中盤加速度：NaN
終盤目標速度：20.45／終盤加速度：NaN ｜ 最高衝刺速度：22.25</div>
*/