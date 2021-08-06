const Frame(position, sp, currentSpeed, phase, frameLength, isSpurt) {
  this.frameLength = frameLength
  this.position = position
  this.sp = sp
  this.currentSpeed = currentSpeed
  this.phase = phase
  this.isSpurt = isSpurt

  const move = (v, a, baseSpeed, spurtSpCoef) => {
    this.targetSpeed = calTargetSpeed(v, baseSpeed)
    this.consumeSp = calConsumeSp(baseSpeed, spurtSpCoef)
    this.acc = (this.targetSpeed === this.currentSpeed) ? 0 : calAcc(v, a)

    let nextPosition = this.position + this.currentSpeed * this.frameLength

    let diff = this.targetSpeed - this.currentSpeed
    if (diff === 0) {
      nextSpeed = this.currentSpeed
    } else if (Math.abs(diff) > Math.abs(this.acc * this.frameLength)) {
      nextSpeed = this.currentSpeed + this.acc * this.frameLength
    } else {
      nextSpeed = this.targetSpeed
    }

    return [nextPosition, sp - consumeSp, nextSpeed]

  }

  const calConsumeSp = (baseSpeed, spurtSpCoef) => {
    return (this.currentSpeed - baseSpeed + 12.0) ** 2 / 144 * ((this.isSpurt) ? spurtSpCoef : 1)
  }



}

export default Frame;