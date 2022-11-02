function right () {
    pins.servoSetPulse(AnalogPin.P8, 1700)
    pins.servoWritePin(AnalogPin.P13, 1700)
    control.waitMicros(20000)
}
function left () {
    pins.servoSetPulse(AnalogPin.P8, 1300)
    pins.servoWritePin(AnalogPin.P13, 1300)
    control.waitMicros(20000)
}
function stop () {
    pins.servoSetPulse(AnalogPin.P8, 0)
    pins.servoWritePin(AnalogPin.P0, 0)
    control.waitMicros(20000)
}
input.onButtonPressed(Button.A, function () {
    forward()
})
function backward () {
    pins.servoSetPulse(AnalogPin.P8, 1700)
    pins.servoSetPulse(AnalogPin.P13, 1300)
    control.waitMicros(20000)
}
input.onButtonPressed(Button.B, function () {
    backward()
})
function forward () {
    pins.servoSetPulse(AnalogPin.P8, 1300)
    pins.servoWritePin(AnalogPin.P13, 1700)
    control.waitMicros(20000)
}
function sensor () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    distance = pins.pulseIn(DigitalPin.P2, PulseValue.High) / 58
}
let distance = 0
basic.showIcon(IconNames.Skull)
distance = 0
sensor()
basic.forever(function () {
    sensor()
    basic.showNumber(distance)
    if (distance < 15) {
        stop()
        basic.pause(1000)
        backward()
        basic.pause(1000)
        right()
        basic.pause(1000)
        left()
    }
})
